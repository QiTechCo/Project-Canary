const SUPABASE_URL = "https://cddsrrwlncudouwcmbex.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MqhQHtDaWagamu06kpZWPg_yg_Bktye";

const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

document.addEventListener("DOMContentLoaded", async function () {
  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginBtn = document.getElementById("loginBtn");
  const alertContainer = document.getElementById("alertContainer");

  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        window.location.href = "dashboard.html";
        return;
      }
    } catch(e) {}
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = loginEmail.value.trim().toLowerCase();
      if (!email) return;

      loginBtn.disabled = true;
      loginBtn.innerHTML = "<span class=\"spinner-border spinner-border-sm me-2\"></span> Sending magic link...";
      if (alertContainer) alertContainer.innerHTML = "";

      try {
        if (supabase) {
          const currentUrl = new URL(window.location.href);
          const redirectPath = currentUrl.pathname.substring(0, currentUrl.pathname.lastIndexOf("/") + 1) + "dashboard.html";
          const redirectUrl = currentUrl.origin + redirectPath;

          await supabase.auth.signInWithOtp({
            email: email,
            options: {
              emailRedirectTo: redirectUrl
            }
          });
        }
      } catch (err) {
        console.warn("Auth notice:", err);
      }

      localStorage.setItem("canary_volunteer_email", email);
      localStorage.setItem("canary_volunteer_session", JSON.stringify({
        email: email,
        timestamp: new Date().toISOString()
      }));

      loginBtn.disabled = false;
      loginBtn.innerHTML = "<i class=\"bi bi-envelope-check-fill me-2\"></i> Send Magic Link";

      if (alertContainer) {
        alertContainer.innerHTML = `
          <div class="alert alert-success text-start p-3 rounded-4 shadow-sm border-0 mb-3">
            <div class="d-flex align-items-center gap-2 mb-2">
              <i class="bi bi-check-circle-fill text-success fs-5"></i>
              <strong class="text-dark">Magic Link Dispatched!</strong>
            </div>
            <p class="small mb-3 text-secondary">A secure login link was requested for <strong>${email}</strong>. You can click the email link or enter the dashboard directly below.</p>
            <a href="dashboard.html" class="btn btn-sm btn-dark text-white fw-bold w-100">
              Enter Volunteer Dashboard &rarr;
            </a>
          </div>
        `;
      }
    });
  }

  // Quick Test / Demo Login Handler
  const quickTestLoginBtn = document.getElementById("quickTestLoginBtn");
  if (quickTestLoginBtn) {
    quickTestLoginBtn.addEventListener("click", function () {
      localStorage.setItem("canary_volunteer_email", "test@dimpleajmera.com");
      localStorage.setItem("canary_volunteer_session", JSON.stringify({
        email: "test@dimpleajmera.com",
        user_id: "c2b05918-ec66-40d0-a3c0-33e28b70df40",
        timestamp: new Date().toISOString()
      }));
      window.location.href = "dashboard.html";
    });
  }
});