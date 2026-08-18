/**
 * Dimple Ajmera Campaign Website - JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // Sticky Navbar shadow on scroll
  const navbar = document.querySelector('.navbar-campaign');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('shadow-sm');
      } else {
        navbar.classList.remove('shadow-sm');
      }
    });
  }

  // Handle Volunteer Form Submission
  const volunteerForm = document.getElementById('volunteerForm');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const successAlert = document.getElementById('volunteerSuccessAlert');
      const formCard = document.getElementById('volunteerFormCard');
      
      if (volunteerForm.checkValidity()) {
        if (formCard) formCard.style.display = 'none';
        if (successAlert) {
          successAlert.classList.remove('d-none');
          successAlert.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        volunteerForm.classList.add('was-validated');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
