/**
 * DimpleAjmera.com 2.0 - Interactive Scripting & Event Countdown
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // Live Event Countdown Timer (August 20, 2026 18:00:00 EST)
  const eventDate = new Date('August 20, 2026 18:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('countDays');
      const hoursEl = document.getElementById('countHours');
      const minsEl = document.getElementById('countMins');
      const secsEl = document.getElementById('countSecs');

      if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
      if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
      if (minsEl) minsEl.innerText = minutes < 10 ? '0' + minutes : minutes;
      if (secsEl) secsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animated Stats Counter on Scroll
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  function checkScrollStats() {
    if (animated || statNumbers.length === 0) return;
    
    const triggerBottom = window.innerHeight * 0.85;
    const firstStat = statNumbers[0].getBoundingClientRect().top;

    if (firstStat < triggerBottom) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = Math.ceil(target / 40);

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.innerText = prefix + current + suffix;
        }, 30);
      });
    }
  }

  window.addEventListener('scroll', checkScrollStats);
  checkScrollStats();

  // Volunteer Form Submission Handler
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const alertBox = document.getElementById('volunteerSuccessAlert');
      const cardBox = document.getElementById('volunteerFormCard');

      if (volunteerForm.checkValidity()) {
        if (cardBox) cardBox.style.display = 'none';
        if (alertBox) {
          alertBox.classList.remove('d-none');
          alertBox.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        volunteerForm.classList.add('was-validated');
      }
    });
  }
});
