/* ============================================================
   Volunteer portal — passwordless sign-in.

   Fixed from the previous version, which:
     - showed "Magic Link Dispatched!" whether or not the call
       succeeded (the catch only console.warn'd),
     - rendered that panel even when the Supabase library had
       failed to load and no auth call was attempted at all,
     - offered a direct "Enter Volunteer Dashboard" link that
       bypassed authentication entirely,
     - interpolated the user's email into innerHTML unescaped.
   ============================================================ */
(function () {
  'use strict';

  const RESEND_COOLDOWN_MS = 45000;
  let lastSentAt = 0;

  document.addEventListener('DOMContentLoaded', async function () {
    const supabase = CANARY.client;
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const button = document.getElementById('loginBtn');
    const alerts = document.getElementById('alertContainer');

    if (!supabase) {
      CANARY.showAlert(alerts, 'danger', 'Sign-in unavailable',
        'We could not load the sign-in service. Please refresh the page, or email the campaign if this continues.',
        'bi bi-exclamation-triangle-fill');
      if (button) button.disabled = true;
      return;
    }

    // Already signed in? Go straight through.
    try {
      const { data } = await supabase.auth.getSession();
      if (data && data.session) {
        window.location.replace('dashboard.html');
        return;
      }
    } catch (err) {
      console.warn('[canary] session check failed', err);
    }

    if (!form) return;

    const idleLabel = '<i class="bi bi-envelope-check-fill me-2" aria-hidden="true"></i> Send Magic Link';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = (emailInput.value || '').trim().toLowerCase();
      if (!email || !emailInput.checkValidity()) {
        CANARY.showAlert(alerts, 'danger', 'Check your email address',
          'Please enter a valid email address so we can send your sign-in link.',
          'bi bi-exclamation-circle-fill');
        emailInput.focus();
        return;
      }

      const sinceLast = Date.now() - lastSentAt;
      if (sinceLast < RESEND_COOLDOWN_MS) {
        CANARY.showAlert(alerts, 'warning', 'Just a moment',
          'We already sent a link. You can request another in ' +
          Math.ceil((RESEND_COOLDOWN_MS - sinceLast) / 1000) + ' seconds.',
          'bi bi-hourglass-split');
        return;
      }

      button.disabled = true;
      button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Sending sign-in link…';
      if (alerts) alerts.innerHTML = '';

      const redirectTo = new URL('dashboard.html', window.location.href).href;

      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: redirectTo,
            // Do not let an arbitrary address mint an auth user.
            // Volunteers register through volunteer.html first.
            shouldCreateUser: false
          }
        });

        if (error) throw error;

        lastSentAt = Date.now();

        // Success is only reported when the call actually succeeded.
        CANARY.showAlert(alerts, 'success', 'Check your inbox',
          'We sent a secure sign-in link to ' + email +
          '. It expires in one hour. If it does not arrive within a few minutes, check your spam folder.',
          'bi bi-check-circle-fill');

        form.reset();
      } catch (err) {
        console.warn('[canary] sign-in failed', err);

        // A "user not found" is expected for people who have not
        // registered yet — point them at the signup form instead.
        const notRegistered = /signup|not found|disabled/i.test(String(err && err.message));
        CANARY.showAlert(alerts, 'danger',
          notRegistered ? 'We do not recognise that address' : 'We could not send your link',
          notRegistered
            ? 'That email is not registered as a volunteer yet. Use "Join as a New Volunteer" below to sign up first.'
            : CANARY.friendlyError(err),
          'bi bi-exclamation-triangle-fill');
      } finally {
        button.disabled = false;
        button.innerHTML = idleLabel;
        if (alerts) {
          const live = alerts.querySelector('[role]');
          if (live) live.focus && live.focus();
        }
      }
    });
  });
})();
