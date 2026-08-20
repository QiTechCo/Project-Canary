/* ============================================================
   DimpleAjmera.com — shared site behaviour
   Restored from 3bc168e (the 278 lines dropped by f7cd06c) with
   timezone, accessibility and reduced-motion fixes applied.
   ============================================================ */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  document.addEventListener('DOMContentLoaded', function () {

    /* --------------------------------------------------------
       Smooth scrolling for hash links, with navbar offset and
       mobile menu auto-collapse (the change f7cd06c intended).
       -------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        if (href === '#top' || href === '#main') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: scrollBehavior });
          collapseMobileNav();
          return;
        }

        let target;
        try {
          target = document.querySelector(href);
        } catch (err) {
          return; // not a valid selector
        }
        if (!target) return;

        e.preventDefault();
        const nav = document.querySelector('.navbar-campaign');
        const navHeight = nav && getComputedStyle(nav).position === 'sticky' ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - (navHeight + 20);

        window.scrollTo({ top: Math.max(0, top), behavior: scrollBehavior });

        // Move keyboard focus to the destination, not just the viewport.
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });

        collapseMobileNav();
      });
    });

    function collapseMobileNav() {
      const nav = document.getElementById('navbarCampaignNav');
      if (!nav || !nav.classList.contains('show') || !window.bootstrap) return;
      const instance = bootstrap.Collapse.getInstance(nav) || new bootstrap.Collapse(nav, { toggle: false });
      instance.hide();
    }

    // Collapse the menu when the login or donate button is used too.
    document.querySelectorAll('.nav-login-hyperscript, .navbar-campaign .btn').forEach(function (el) {
      el.addEventListener('click', collapseMobileNav);
    });

    /* --------------------------------------------------------
       Scrollspy: underline the nav item for the section in view
       -------------------------------------------------------- */
    const spySections = Array.from(document.querySelectorAll('section[id], div[id="gallery"]'));
    const spyLinks = Array.from(document.querySelectorAll('.navbar-campaign .nav-link[href^="#"]'));

    if (spySections.length && spyLinks.length && 'IntersectionObserver' in window) {
      const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          spyLinks.forEach(function (link) {
            const match = link.getAttribute('href') === id;
            link.classList.toggle('active', match);
            if (match) { link.setAttribute('aria-current', 'true'); }
            else { link.removeAttribute('aria-current'); }
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      spySections.forEach(function (s) { spy.observe(s); });
    }

    /* --------------------------------------------------------
       Add to Calendar — .ics download for Apple / Outlook
       -------------------------------------------------------- */
    const icsBtn = document.getElementById('downloadIcsBtn');
    if (icsBtn) {
      icsBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const ics = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//Dimple Ajmera for Charlotte//Town Hall Event//EN',
          'CALSCALE:GREGORIAN',
          'METHOD:PUBLISH',
          'BEGIN:VEVENT',
          'UID:townhall-20260820@dimpleajmera.com',
          'DTSTAMP:20260819T180000Z',
          'DTSTART:20260820T220000Z',
          'DTEND:20260821T000000Z',
          'SUMMARY:State of Our Environment: Data Centers, Water & Charlotte’s Future',
          'DESCRIPTION:Join Council Member Dimple Ajmera and local environmental leaders to discuss protecting our natural water supply, green infrastructure, and smart policies for data center expansion.\\n\\nRSVP: https://charlottenc.seamlessdocs.com/ng/fa/rjotkfzz0tct',
          'LOCATION:Project 658, 3646 Central Ave, Charlotte, NC 28205',
          'STATUS:CONFIRMED',
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n');

        const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Dimple_Ajmera_Environment_Town_Hall.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    }

    /* --------------------------------------------------------
       Live event countdown
       Fixed: the original parsed a bare date string, so it used
       the *visitor's* timezone. Pinned to Charlotte (-04:00),
       and it now handles the event being live or finished.
       -------------------------------------------------------- */
    const countdownRoot = document.getElementById('eventCountdown');
    const cd = {
      days: document.getElementById('countDays'),
      hours: document.getElementById('countHours'),
      mins: document.getElementById('countMins'),
      secs: document.getElementById('countSecs')
    };

    if (cd.days && cd.hours && cd.mins && cd.secs) {
      const startsAt = new Date('2026-08-20T18:00:00-04:00').getTime();
      const endsAt = new Date('2026-08-20T20:00:00-04:00').getTime();
      const pad = function (n) { return n < 10 ? '0' + n : String(n); };

      const tick = function () {
        const now = Date.now();
        const distance = startsAt - now;

        if (distance > 0) {
          cd.days.textContent = pad(Math.floor(distance / 86400000));
          cd.hours.textContent = pad(Math.floor((distance % 86400000) / 3600000));
          cd.mins.textContent = pad(Math.floor((distance % 3600000) / 60000));
          cd.secs.textContent = pad(Math.floor((distance % 60000) / 1000));
          return;
        }

        // Event has started or finished — stop ticking and say so.
        clearInterval(timer);
        if (countdownRoot) {
          countdownRoot.innerHTML =
            '<p class="countdown-state mb-0">' +
            (now <= endsAt
              ? '<span class="countdown-live"></span> Happening now'
              : 'Thank you to everyone who joined us.') +
            '</p>';
        }
      };

      tick();
      var timer = setInterval(tick, 1000);
    }

    /* --------------------------------------------------------
       Animated impact statistics
       IntersectionObserver instead of a scroll listener, and
       the animation is skipped entirely for reduced motion.
       -------------------------------------------------------- */
    const stats = document.querySelectorAll('.stat-number[data-target]');
    if (stats.length) {
      const render = function (el, value) {
        el.textContent = (el.dataset.prefix || '') + value + (el.dataset.suffix || '');
      };

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        stats.forEach(function (el) { render(el, parseInt(el.dataset.target, 10)); });
      } else {
        const io = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);

            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const step = Math.max(1, Math.ceil(target / 40));
            let current = 0;

            const run = setInterval(function () {
              current += step;
              if (current >= target) { current = target; clearInterval(run); }
              render(el, current);
            }, 30);
          });
        }, { threshold: 0.4 });

        stats.forEach(function (el) { io.observe(el); });
      }
    }

    /* --------------------------------------------------------
       Photo gallery lightbox
       Restored, plus: keyboard-operable triggers, focus trap,
       focus restoration, and correct aria-hidden handling.
       -------------------------------------------------------- */
    const triggers = Array.from(document.querySelectorAll('.gallery-lightbox-trigger'));
    const modal = document.getElementById('campaignLightbox');

    if (triggers.length && modal) {
      const img = document.getElementById('lightboxImg');
      const tag = document.getElementById('lightboxTag');
      const title = document.getElementById('lightboxTitle');
      const desc = document.getElementById('lightboxDesc');
      const counter = document.getElementById('lightboxCounter');
      const closeBtn = document.getElementById('lightboxClose');
      const prevBtn = document.getElementById('lightboxPrev');
      const nextBtn = document.getElementById('lightboxNext');
      const backdrop = modal.querySelector('.campaign-lightbox-backdrop');

      let index = 0;
      let lastFocused = null;

      function show(i) {
        index = (i + triggers.length) % triggers.length;
        const item = triggers[index];
        const inner = item.querySelector('img');

        if (img) {
          img.src = item.dataset.src || (inner ? inner.getAttribute('src') : '');
          img.alt = item.dataset.title || (inner ? inner.alt : 'Campaign photograph');
        }
        if (tag) tag.textContent = item.dataset.tag || 'Community Event';
        if (title) title.textContent = item.dataset.title || 'Campaign Photo';
        if (desc) desc.textContent = item.dataset.desc || '';
        if (counter) counter.textContent = (index + 1) + ' of ' + triggers.length;
      }

      function open(i) {
        lastFocused = document.activeElement;
        show(i);
        modal.classList.add('active');
        modal.removeAttribute('aria-hidden');
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.focus();
      }

      function close() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      }

      triggers.forEach(function (item, i) {
        // Make each card a real, focusable control.
        if (!item.hasAttribute('tabindex')) item.setAttribute('tabindex', '0');
        if (!item.hasAttribute('role')) item.setAttribute('role', 'button');
        if (!item.hasAttribute('aria-label')) {
          item.setAttribute('aria-label',
            'View larger: ' + (item.dataset.title || 'campaign photograph'));
        }

        item.addEventListener('click', function (e) { e.preventDefault(); open(i); });
        item.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            open(i);
          }
        });
      });

      if (closeBtn) closeBtn.addEventListener('click', close);
      if (backdrop) backdrop.addEventListener('click', close);
      if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); });
      if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); });

      document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'ArrowRight') { show(index + 1); return; }
        if (e.key === 'ArrowLeft') { show(index - 1); return; }

        // Trap Tab inside the dialog.
        if (e.key !== 'Tab') return;
        const focusables = modal.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      });
    }
  });
})();
