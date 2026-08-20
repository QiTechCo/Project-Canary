/* ============================================================
   Volunteer registration form.

   Previously this form had no name attributes, no action, and no
   handler — every submission was silently discarded. It now
   validates, posts to Supabase, and reports what actually
   happened.

   The insert relies on the "public may submit a signup" RLS
   policy, which permits INSERT only. There is deliberately no
   SELECT policy for anonymous users, so a submitted row can
   never be read back from the browser. That also means we must
   not chain .select() onto the insert.
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('volunteerForm');
    if (!form) return;

    const card = document.getElementById('volunteerFormCard');
    const success = document.getElementById('volunteerSuccessAlert');
    const alerts = document.getElementById('volunteerAlertContainer');
    const button = form.querySelector('button[type="submit"]');
    const honeypot = document.getElementById('volWebsite');
    const idleLabel = button ? button.innerHTML : '';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      form.classList.add('was-validated');

      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Bots fill hidden fields; humans never see this one.
      if (honeypot && honeypot.value) {
        showDone();
        return;
      }

      const data = new FormData(form);
      const first = (data.get('first_name') || '').toString().trim();
      const last = (data.get('last_name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim().toLowerCase();
      const phone = (data.get('phone') || '').toString().trim();
      const skills = data.getAll('skills').map(String);

      const supabase = CANARY.client;
      if (!supabase) {
        CANARY.showAlert(alerts, 'danger', 'We could not submit your form',
          'The signup service did not load. Please refresh and try again, or email the campaign directly.',
          'bi bi-exclamation-triangle-fill');
        return;
      }

      if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Submitting…';
      }
      if (alerts) alerts.innerHTML = '';

      try {
        const { error } = await supabase.from('volunteers').insert({
          email: email,
          full_name: [first, last].filter(Boolean).join(' ') || null,
          phone: phone || null,
          skills: skills.length ? skills : null,
          status: 'pending',
          hours_logged: 0
        });

        // 23505 = unique_violation on volunteers.email
        if (error && error.code === '23505') {
          CANARY.showAlert(alerts, 'info', 'You are already on the list',
            'That email is already registered with Team Dimple. Head to the volunteer portal to sign in and pick up a shift.',
            'bi bi-info-circle-fill');
          return;
        }
        if (error) throw error;

        showDone();
      } catch (err) {
        console.warn('[canary] volunteer signup failed', err);
        CANARY.showAlert(alerts, 'danger', 'We could not submit your form',
          CANARY.friendlyError(err), 'bi bi-exclamation-triangle-fill');
      } finally {
        if (button) {
          button.disabled = false;
          button.innerHTML = idleLabel;
        }
      }
    });

    function showDone() {
      if (card) card.classList.add('d-none');
      if (success) {
        success.classList.remove('d-none');
        success.setAttribute('tabindex', '-1');
        success.focus();
        success.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'center'
        });
      }
    }
  });
})();
