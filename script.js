document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks  = document.getElementById('nav-links');
    const navbar    = document.querySelector('nav.navbar');
  
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      navbar.classList.toggle('menu-open');
    });
  
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navbar.classList.remove('menu-open');
      });
    });
  });
  