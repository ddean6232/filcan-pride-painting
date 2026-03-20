import './style.css'

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Simple Sticky Header logic for visual polish
const header = document.querySelector('header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('shadow-md', 'py-2');
      header.classList.remove('py-4');
    } else {
      header.classList.remove('shadow-md', 'py-2');
      header.classList.add('py-4');
    }
  });
}

// Intercept form submit to show a nice alert instead of page reload
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! In a production environment, this would trigger our automation flows (e.g. Zapier / GoHighLevel) to send follow-ups.');
    contactForm.reset();
  });
}
