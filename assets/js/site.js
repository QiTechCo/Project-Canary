// Smooth Scrolling for Hash Links with dynamic navbar height buffer
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.navbar-campaign')?.offsetHeight || 76;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - (navHeight + 20);
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: 'smooth'
      });
      // Close mobile menu if open
      const navbarCollapse = document.getElementById('navbarCampaignNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    }
  });
});
