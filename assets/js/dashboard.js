/* ============================================================
   Volunteer dashboard.

   This file did not exist. dashboard.html referenced it, got a
   404, and every control on the page was inert — including the
   authentication check, which meant anyone could open the
   dashboard by typing the URL.

   Note on what "gating" means here: the redirect below is a
   convenience, not a security boundary. On a static host any
   client-side check can be skipped. The actual protection is
   Row Level Security on the database — see supabase_schema.sql.
   Without a valid session, every query returns zero rows.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supabase = CANARY.client;

  const state = { profile: null, shifts: [], signups: [], articles: [], assets: [] };

  /* ---------------------------------------------------------- helpers */

  const el = (id) => document.getElementById(id);

  function fmtDate(iso) {
    if (!iso) return { month: '', day: '', time: 'Time TBC' };
    const d = new Date(iso);
    return {
      month: d.toLocaleString('en-US', { month: 'short', timeZone: 'America/New_York' }).toUpperCase(),
      day: d.toLocaleString('en-US', { day: 'numeric', timeZone: 'America/New_York' }),
      time: d.toLocaleString('en-US', {
        hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York', timeZoneName: 'short'
      })
    };
  }

  const CATEGORY_LABEL = {
    town_hall: 'Town Hall', canvassing: 'Door-to-Door', phone_bank: 'Virtual / Remote',
    tabling: 'Tabling', environment: 'Environment', public_safety: 'Public Safety',
    housing: 'Housing', economy: 'Economy', general: 'General'
  };
  const CATEGORY_BADGE = {
    town_hall: 'bg-success', canvassing: 'bg-danger', phone_bank: 'bg-primary',
    tabling: 'bg-warning text-dark'
  };
  const label = (c) => CATEGORY_LABEL[c] || (c || 'General').replace(/_/g, ' ');

  function skeleton(container, count, message) {
    if (!container) return;
    container.innerHTML =
      '<div class="col-12"><p class="text-secondary small mb-0" role="status">' +
      CANARY.escapeHtml(message) + '</p></div>';
  }

  function emptyState(container, icon, message) {
    if (!container) return;
    container.innerHTML =
      '<div class="col-12"><div class="dashboard-card p-5 text-center">' +
      '<i class="bi ' + icon + ' fs-1 text-secondary opacity-50" aria-hidden="true"></i>' +
      '<p class="text-secondary mt-3 mb-0">' + CANARY.escapeHtml(message) + '</p>' +
      '</div></div>';
    }

  /* ------------------------------------------------- minimal markdown
     Escapes first, then applies a small subset of markdown. Because
     escaping happens before any tag is introduced, article content
     cannot inject markup even if the source table is compromised. */
  function renderMarkdown(src) {
    const lines = CANARY.escapeHtml(src || '').split('\n');
    const out = [];
    let inList = false, inCode = false;

    const inline = (s) => s
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|\W)\*([^*]+)\*/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
               '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };

    lines.forEach((raw) => {
      const line = raw.replace(/\s+$/, '');

      if (/^```/.test(line)) {
        closeList();
        out.push(inCode ? '</code></pre>' : '<pre class="bg-light p-3 rounded-3"><code>');
        inCode = !inCode;
        return;
      }
      if (inCode) { out.push(line); return; }

      const heading = line.match(/^(#{1,6})\s+(.*)$/);
      if (heading) {
        closeList();
        // Article headings start at h3: the modal title is the h2.
        const level = Math.min(6, heading[1].length + 2);
        out.push('<h' + level + ' class="serif-font fw-bold mt-4 mb-2">' + inline(heading[2]) + '</h' + level + '>');
        return;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        if (!inList) { out.push('<ul class="mb-3">'); inList = true; }
        out.push('<li>' + inline(line.replace(/^\s*[-*]\s+/, '')) + '</li>');
        return;
      }
      if (/^&gt;\s?/.test(line)) {
        closeList();
        out.push('<blockquote class="border-start border-3 ps-3 text-secondary fst-italic">' +
                 inline(line.replace(/^&gt;\s?/, '')) + '</blockquote>');
        return;
      }
      if (!line.trim()) { closeList(); return; }

      closeList();
      out.push('<p>' + inline(line) + '</p>');
    });

    closeList();
    if (inCode) out.push('</code></pre>');
    return out.join('\n');
  }

  /* ------------------------------------------------------- auth gate */

  async function requireSession() {
    if (!supabase) {
      document.body.innerHTML =
        '<main id="main" class="container py-5">' +
          '<h1 class="serif-font h3 fw-bold text-dark mb-3">Volunteer portal unavailable</h1>' +
          '<div class="alert alert-danger" role="alert">' +
            'We could not load the volunteer portal. Please refresh the page, or ' +
            'contact the campaign if this keeps happening.' +
          '</div>' +
          '<a href="index.html" class="btn btn-red-patriot">Back to the main site</a>' +
        '</main>';
      return null;
    }

    const { data } = await supabase.auth.getSession();
    if (!data || !data.session) {
      window.location.replace('portal.html');
      return null;
    }

    supabase.auth.onAuthStateChange(function (event) {
      if (event === 'SIGNED_OUT') window.location.replace('portal.html');
    });

    return data.session;
  }

  /* ----------------------------------------------------------- shifts */

  function renderShifts(filter) {
    const grid = el('shiftsGrid');
    if (!grid) return;

    const visible = state.shifts.filter((s) => filter === 'all' || s.category === filter);
    if (!visible.length) {
      emptyState(grid, 'bi-calendar-x', 'No shifts in this category right now. Check back soon.');
      return;
    }

    const signedUpIds = new Set(
      state.signups.filter((s) => s.signup_status === 'confirmed').map((s) => s.shift_id)
    );

    grid.innerHTML = visible.map(function (s) {
      const d = fmtDate(s.date_time);
      const full = (s.filled_spots || 0) >= (s.capacity || 0);
      const mine = signedUpIds.has(s.id);
      const remaining = Math.max(0, (s.capacity || 0) - (s.filled_spots || 0));

      let button;
      if (mine) {
        button = '<button class="btn btn-outline-success btn-sm" data-cancel="' + s.id + '">' +
                 '<i class="bi bi-check-circle-fill me-1" aria-hidden="true"></i> You are registered' +
                 '<span class="visually-hidden"> — activate to cancel</span></button>';
      } else if (full) {
        button = '<button class="btn btn-outline-secondary btn-sm" disabled>Shift full</button>';
      } else {
        button = '<button class="btn btn-red-patriot btn-sm" data-signup="' + s.id + '">' +
                 '<i class="bi bi-plus-circle me-1" aria-hidden="true"></i> Register for shift</button>';
      }

      return '' +
      '<div class="col-lg-6">' +
        '<div class="dashboard-card p-4 h-100 d-flex flex-column justify-content-between">' +
          '<div>' +
            '<div class="d-flex justify-content-between align-items-start gap-3 mb-3">' +
              '<div class="shift-date-badge"><div class="fs-4 fw-bold">' + d.month +
                '</div><div class="fs-5">' + d.day + '</div></div>' +
              '<div class="flex-grow-1">' +
                '<span class="badge ' + (CATEGORY_BADGE[s.category] || 'bg-secondary') + ' mb-1">' +
                  CANARY.escapeHtml(label(s.category)) + '</span>' +
                '<h3 class="h5 serif-font fw-bold text-dark mb-1">' + CANARY.escapeHtml(s.title) + '</h3>' +
                '<div class="text-secondary small"><i class="bi bi-clock me-1" aria-hidden="true"></i>' +
                  CANARY.escapeHtml(d.time) + '</div>' +
                '<div class="text-secondary small"><i class="bi bi-geo-alt me-1" aria-hidden="true"></i>' +
                  CANARY.escapeHtml(s.location || '') + '</div>' +
              '</div>' +
            '</div>' +
            '<p class="text-secondary small mb-3">' + CANARY.escapeHtml(s.description || '') + '</p>' +
          '</div>' +
          '<div class="pt-3 border-top border-light d-flex justify-content-between align-items-center gap-2 flex-wrap">' +
            '<span class="text-muted small"><i class="bi bi-people me-1" aria-hidden="true"></i>' +
              remaining + ' of ' + (s.capacity || 0) + ' spots open</span>' +
            button +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  async function loadShifts() {
    const grid = el('shiftsGrid');
    skeleton(grid, 4, 'Loading shifts…');

    const [shiftRes, signupRes] = await Promise.all([
      supabase.from('shifts').select('*').eq('is_active', true).order('date_time', { ascending: true }),
      supabase.from('shift_signups').select('id, shift_id, signup_status')
    ]);

    if (shiftRes.error) {
      emptyState(grid, 'bi-exclamation-triangle', 'We could not load shifts. Please refresh the page.');
      return;
    }

    state.shifts = shiftRes.data || [];
    state.signups = signupRes.error ? [] : (signupRes.data || []);
    renderShifts(currentShiftFilter());
  }

  function currentShiftFilter() {
    const active = document.querySelector('.shift-filter-btn.active');
    return active ? active.dataset.filter : 'all';
  }

  async function signUpForShift(shiftId, button) {
    if (!state.profile) return;
    button.disabled = true;

    const { error } = await supabase.from('shift_signups').insert({
      shift_id: shiftId,
      volunteer_id: state.profile.id,
      volunteer_email: state.profile.email,
      signup_status: 'confirmed'
    });

    if (error) {
      button.disabled = false;
      announce(error.code === '23505'
        ? 'You are already registered for that shift.'
        : 'We could not register you for that shift. It may have just filled up.');
      await loadShifts();
      return;
    }

    announce('You are registered. Thank you for signing up.');
    await loadShifts();
  }

  async function cancelSignup(shiftId) {
    const mine = state.signups.find((s) => s.shift_id === shiftId && s.signup_status === 'confirmed');
    if (!mine) return;

    const { error } = await supabase.from('shift_signups')
      .update({ signup_status: 'cancelled' }).eq('id', mine.id);

    announce(error ? 'We could not cancel that registration.' : 'Your registration has been cancelled.');
    await loadShifts();
  }

  /* ------------------------------------------------------------- wiki */

  function renderWiki() {
    const grid = el('wikiCardsGrid');
    if (!grid) return;

    const q = (el('wikiSearchInput')?.value || '').trim().toLowerCase();
    const activeCat = document.querySelector('.wiki-cat-btn.active')?.dataset.cat || 'all';

    const visible = state.articles.filter(function (a) {
      const catOk = activeCat === 'all' || a.category === activeCat;
      const text = (a.title + ' ' + (a.summary || '') + ' ' + (a.markdown_content || '')).toLowerCase();
      return catOk && (!q || text.includes(q));
    });

    if (!visible.length) {
      emptyState(grid, 'bi-search', q
        ? 'No articles match “' + q + '”.'
        : 'No articles in this category yet.');
      return;
    }

    grid.innerHTML = visible.map(function (a) {
      const date = a.published_date
        ? new Date(a.published_date).toLocaleDateString('en-US',
            { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' })
        : 'Undated';
      return '' +
      '<div class="col-lg-4 col-md-6">' +
        '<article class="dashboard-card wiki-card p-4 h-100 d-flex flex-column" ' +
                 'tabindex="0" role="button" data-slug="' + CANARY.escapeHtml(a.slug) + '" ' +
                 'aria-label="Read: ' + CANARY.escapeHtml(a.title) + '">' +
          '<span class="substack-article-badge">' + CANARY.escapeHtml(label(a.category)) + '</span>' +
          '<h3 class="h5 serif-font fw-bold text-dark mb-2">' + CANARY.escapeHtml(a.title) + '</h3>' +
          '<p class="text-secondary small flex-grow-1">' + CANARY.escapeHtml(a.summary || '') + '</p>' +
          '<div class="substack-article-footer mt-2">' +
            '<span><i class="bi bi-calendar3 me-1" aria-hidden="true"></i>' + CANARY.escapeHtml(date) + '</span>' +
            '<span class="fw-bold text-substack">Read <i class="bi bi-arrow-right" aria-hidden="true"></i></span>' +
          '</div>' +
        '</article>' +
      '</div>';
    }).join('');
  }

  function buildWikiFilters() {
    const bar = el('wikiCategoryBar');
    if (!bar) return;

    const counts = state.articles.reduce(function (acc, a) {
      acc[a.category] = (acc[a.category] || 0) + 1; return acc;
    }, {});

    const buttons = ['<button type="button" class="btn btn-sm btn-outline-dark active wiki-cat-btn" ' +
                     'data-cat="all" aria-pressed="true">All (' + state.articles.length + ')</button>'];

    Object.keys(counts).sort().forEach(function (cat) {
      buttons.push('<button type="button" class="btn btn-sm btn-outline-dark wiki-cat-btn" data-cat="' +
        CANARY.escapeHtml(cat) + '" aria-pressed="false">' +
        CANARY.escapeHtml(label(cat)) + ' (' + counts[cat] + ')</button>');
    });

    bar.innerHTML = buttons.join('');
  }

  async function loadWiki() {
    const grid = el('wikiCardsGrid');
    skeleton(grid, 6, 'Loading the campaign wiki…');

    const { data, error } = await supabase.from('wiki_articles')
      .select('*').eq('is_published', true).order('published_date', { ascending: false });

    if (error) {
      emptyState(grid, 'bi-exclamation-triangle', 'We could not load the wiki. Please refresh the page.');
      return;
    }

    state.articles = data || [];
    const search = el('wikiSearchInput');
    if (search) search.placeholder = 'Search ' + state.articles.length + ' policy articles…';
    buildWikiFilters();
    renderWiki();
  }

  function openArticle(slug) {
    const a = state.articles.find((x) => x.slug === slug);
    if (!a || !window.bootstrap) return;

    el('wikiModalTitle').textContent = a.title;
    el('wikiModalBadge').textContent = label(a.category);
    el('wikiModalDate').textContent = a.published_date
      ? new Date(a.published_date).toLocaleDateString('en-US',
          { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' })
      : '';
    el('wikiModalBody').innerHTML = renderMarkdown(a.markdown_content);

    const link = el('wikiModalOriginalLink');
    if (link) {
      if (a.substack_url) { link.href = a.substack_url; link.classList.remove('d-none'); }
      else { link.classList.add('d-none'); }
    }

    bootstrap.Modal.getOrCreateInstance(el('wikiModal')).show();
  }

  /* ----------------------------------------------------------- assets */

  async function loadAssets() {
    const grid = el('assetsGrid');
    if (!grid) return;
    skeleton(grid, 3, 'Loading campaign media…');

    const { data, error } = await supabase.from('campaign_assets').select('*').order('title');
    if (error || !data || !data.length) {
      emptyState(grid, 'bi-images', 'No campaign assets have been published yet.');
      return;
    }

    state.assets = data;
    grid.innerHTML = data.map(function (a) {
      return '' +
      '<div class="col-lg-4 col-md-6">' +
        '<div class="dashboard-card p-4 h-100 d-flex flex-column justify-content-between">' +
          '<div>' +
            '<div class="asset-preview-box mb-3">' +
              '<img src="' + CANARY.escapeHtml(a.file_url) + '" alt="" loading="lazy">' +
            '</div>' +
            '<span class="badge bg-secondary mb-1">' + CANARY.escapeHtml(label(a.asset_type)) + '</span>' +
            '<h3 class="h5 serif-font fw-bold text-dark mb-1">' + CANARY.escapeHtml(a.title) + '</h3>' +
            '<p class="text-secondary small mb-3">' + CANARY.escapeHtml(a.description || '') +
              (a.dimensions ? ' <span class="text-muted">(' + CANARY.escapeHtml(a.dimensions) + ')</span>' : '') +
            '</p>' +
          '</div>' +
          '<a href="' + CANARY.escapeHtml(a.file_url) + '" download class="btn btn-outline-dark btn-sm w-100">' +
            '<i class="bi bi-download me-1" aria-hidden="true"></i> Download' +
            '<span class="visually-hidden"> ' + CANARY.escapeHtml(a.title) + '</span></a>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ---------------------------------------------------------- profile */

  function fillProfile() {
    const p = state.profile;
    if (!p) return;

    const badge = el('userEmailBadge');
    if (badge) badge.textContent = p.email;

    const greeting = el('welcomeGreeting');
    if (greeting && p.full_name) {
      greeting.textContent = 'Welcome back, ' + p.full_name.split(' ')[0] + '!';
    }

    if (el('profName')) el('profName').value = p.full_name || '';
    if (el('profPhone')) el('profPhone').value = p.phone || '';
    if (el('profDistrict')) el('profDistrict').value = p.precinct_district || '';
    if (el('profAvailability')) el('profAvailability').value = p.availability || '';

    const skills = new Set(p.skills || []);
    document.querySelectorAll('#profileForm input[name="skills"]').forEach(function (cb) {
      cb.checked = skills.has(cb.value);
    });

    const hours = el('profileHours');
    if (hours) hours.textContent = (p.hours_logged || 0) + ' hours logged';
  }

  async function saveProfile(e) {
    e.preventDefault();
    const button = el('saveProfileBtn');
    const alerts = el('profileAlertContainer');
    const original = button ? button.innerHTML : '';

    if (button) {
      button.disabled = true;
      button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Saving…';
    }

    const skills = Array.from(
      document.querySelectorAll('#profileForm input[name="skills"]:checked')
    ).map((cb) => cb.value);

    const { error } = await supabase.from('volunteers').update({
      full_name: el('profName').value.trim() || null,
      phone: el('profPhone').value.trim() || null,
      precinct_district: el('profDistrict').value || null,
      availability: el('profAvailability').value || null,
      skills: skills,
      updated_at: new Date().toISOString()
    }).eq('id', state.profile.id);

    if (button) { button.disabled = false; button.innerHTML = original; }

    if (error) {
      CANARY.showAlert(alerts, 'danger', 'Not saved', CANARY.friendlyError(error),
        'bi bi-exclamation-triangle-fill');
      return;
    }

    CANARY.showAlert(alerts, 'success', 'Profile saved',
      'Your details and availability have been updated.', 'bi bi-check-circle-fill');
    announce('Profile saved.');
  }

  /* ------------------------------------------------- live announcements */

  function announce(message) {
    let region = el('a11yLiveRegion');
    if (!region) {
      region = document.createElement('div');
      region.id = 'a11yLiveRegion';
      region.className = 'visually-hidden';
      region.setAttribute('role', 'status');
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    region.textContent = '';
    setTimeout(function () { region.textContent = message; }, 60);
  }

  /* ------------------------------------------------------------- init */

  document.addEventListener('DOMContentLoaded', async function () {
    const session = await requireSession();
    if (!session) return;

    // Link this auth user to their volunteer record (or create one).
    const { data: profile, error: profileError } = await supabase.rpc('claim_volunteer_profile');
    if (profileError) {
      console.error('[canary] could not load volunteer profile', profileError);
    }
    state.profile = Array.isArray(profile) ? profile[0] : profile;
    fillProfile();

    await Promise.all([loadShifts(), loadWiki(), loadAssets()]);

    /* Delegated events -------------------------------------------- */

    document.addEventListener('click', function (e) {
      const signup = e.target.closest('[data-signup]');
      if (signup) { signUpForShift(signup.dataset.signup, signup); return; }

      const cancel = e.target.closest('[data-cancel]');
      if (cancel) { cancelSignup(cancel.dataset.cancel); return; }

      const shiftFilter = e.target.closest('.shift-filter-btn');
      if (shiftFilter) {
        document.querySelectorAll('.shift-filter-btn').forEach(function (b) {
          b.classList.toggle('active', b === shiftFilter);
          b.setAttribute('aria-pressed', b === shiftFilter ? 'true' : 'false');
        });
        renderShifts(shiftFilter.dataset.filter);
        return;
      }

      const wikiFilter = e.target.closest('.wiki-cat-btn');
      if (wikiFilter) {
        document.querySelectorAll('.wiki-cat-btn').forEach(function (b) {
          b.classList.toggle('active', b === wikiFilter);
          b.setAttribute('aria-pressed', b === wikiFilter ? 'true' : 'false');
        });
        renderWiki();
        return;
      }

      const card = e.target.closest('[data-slug]');
      if (card) openArticle(card.dataset.slug);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      const card = e.target.closest('[data-slug]');
      if (!card) return;
      e.preventDefault();
      openArticle(card.dataset.slug);
    });

    const search = el('wikiSearchInput');
    if (search) {
      let debounce;
      search.addEventListener('input', function () {
        clearTimeout(debounce);
        debounce = setTimeout(renderWiki, 180);
      });
    }

    const profileForm = el('profileForm');
    if (profileForm) profileForm.addEventListener('submit', saveProfile);

    const signOut = el('signOutBtn');
    if (signOut) {
      signOut.addEventListener('click', async function () {
        signOut.disabled = true;
        await supabase.auth.signOut();
        window.location.replace('portal.html');
      });
    }
  });
})();
