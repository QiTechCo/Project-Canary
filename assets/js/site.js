/**
 * DimpleAjmera.com 3.4 - Interactive Hero Background Slideshow & Navigation ScrollSpy
 */

document.addEventListener('DOMContentLoaded', function () {
  
  // Hero Stage Slowly Moving Background Slideshow
  const heroSlides = document.querySelectorAll('.splc-slide-img');
  if (heroSlides.length > 0) {
    let currentSlide = 0;
    heroSlides[0].classList.add('active');

    setInterval(() => {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      heroSlides[currentSlide].classList.add('active');
    }, 6000); // Crossfades every 6 seconds slowly
  }

  // Animated ScrollSpy Navigation Marker Underline
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar-campaign .nav-link');

  function activateNavMarker() {
    let scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const targetId = section.getAttribute('id');
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes('#' + targetId)) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', activateNavMarker);
  activateNavMarker();

  // Smooth Scroll Trigger with Instant Active State Update
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

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

  // Animated Impact Statistics Counter
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

  // Volunteer & Substack Form Handlers
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

  // ========================================================
  // Photo Gallery High-Resolution Fullscreen Lightbox Engine
  // ========================================================
  const galleryItems = document.querySelectorAll('.gallery-lightbox-trigger');
  const lightboxModal = document.getElementById('campaignLightbox');
  
  if (galleryItems.length > 0 && lightboxModal) {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTag = document.getElementById('lightboxTag');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const backdrop = document.querySelector('.campaign-lightbox-backdrop');

    let currentIndex = 0;
    const totalItems = galleryItems.length;

    function openLightbox(index) {
      currentIndex = index;
      const item = galleryItems[currentIndex];
      const src = item.getAttribute('data-src') || item.querySelector('img').getAttribute('src');
      const title = item.getAttribute('data-title') || item.querySelector('.gallery-title')?.innerText || 'Campaign Photo';
      const desc = item.getAttribute('data-desc') || 'Council Member Dimple Ajmera on the campaign trail in Charlotte.';
      const tag = item.getAttribute('data-tag') || 'Community Event';

      if (lightboxImg) lightboxImg.src = src;
      if (lightboxTag) lightboxTag.innerText = tag;
      if (lightboxTitle) lightboxTitle.innerText = title;
      if (lightboxDesc) lightboxDesc.innerText = desc;
      if (lightboxCounter) lightboxCounter.innerText = `${currentIndex + 1} of ${totalItems}`;

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % totalItems;
      openLightbox(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      openLightbox(currentIndex);
    }

    // Attach click listeners to all gallery trigger cards
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    // Keyboard navigation (Escape to close, Left/Right arrows)
    document.addEventListener('keydown', function (e) {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    });
  }
});
