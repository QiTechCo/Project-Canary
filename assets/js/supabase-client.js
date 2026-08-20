/* ============================================================
   Shared Supabase client for the volunteer portal.

   SECURITY NOTE — read before changing anything here.

   The key below is a *publishable* key. It is designed to ship
   in client-side code and is not a secret. It is safe only for
   as long as Row Level Security is correctly configured on the
   database: RLS is the sole thing standing between this key and
   the volunteer roster.

   Never put a `service_role` key in this file, or in any file
   served to a browser. If you need roster-wide access (exports,
   admin tooling, bulk email), do it server-side.

   The current policy set is documented in supabase_schema.sql.
   ============================================================ */
window.CANARY = window.CANARY || {};

CANARY.SUPABASE_URL = 'https://cddsrrwlncudouwcmbex.supabase.co';
CANARY.SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_MqhQHtDaWagamu06kpZWPg_yg_Bktye';

CANARY.client = (function () {
  if (!window.supabase || typeof window.supabase.createClient !== 'function') {
    console.error('[canary] Supabase library failed to load — the portal will run in offline mode.');
    return null;
  }
  return window.supabase.createClient(
    CANARY.SUPABASE_URL,
    CANARY.SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
  );
})();

/* Escape untrusted text before it goes anywhere near innerHTML. */
CANARY.escapeHtml = function (value) {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : String(value);
  return div.innerHTML;
};

/* Render a Bootstrap alert into a container using textContent only. */
CANARY.showAlert = function (container, variant, heading, message, iconClass) {
  if (!container) return;
  container.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'alert alert-' + variant + ' text-start p-3 rounded-4 border-0 mb-3';
  wrap.setAttribute('role', variant === 'danger' ? 'alert' : 'status');

  const head = document.createElement('div');
  head.className = 'd-flex align-items-center gap-2 mb-1';

  const icon = document.createElement('i');
  icon.className = (iconClass || 'bi bi-info-circle-fill') + ' fs-5';
  icon.setAttribute('aria-hidden', 'true');

  const strong = document.createElement('strong');
  strong.textContent = heading;

  head.append(icon, strong);

  const body = document.createElement('p');
  body.className = 'small mb-0';
  body.textContent = message;

  wrap.append(head, body);
  container.appendChild(wrap);
};

/* Human-readable, non-leaky error text. */
CANARY.friendlyError = function (error) {
  if (!error) return 'Something went wrong. Please try again.';
  const msg = String(error.message || error);
  if (/rate|too many/i.test(msg)) return 'Too many attempts. Please wait a minute and try again.';
  if (/network|fetch|Failed to fetch/i.test(msg)) return 'We could not reach the server. Check your connection and try again.';
  if (/invalid|not authorized|JWT/i.test(msg)) return 'That sign-in link is no longer valid. Please request a new one.';
  return 'Something went wrong on our end. Please try again, or email the campaign if it keeps happening.';
};
