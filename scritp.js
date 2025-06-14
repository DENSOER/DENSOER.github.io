const burger = document.querySelector('.header__burger');
const mobileNav = document.querySelector('.mobile-nav');
burger.addEventListener('click', () => {
  mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  burger.classList.toggle('open');
});


// Dropdown en móvil
const dropdownToggle = document.querySelector('.has-dropdown > a');
const dropdownMenu   = document.querySelector('.has-dropdown .dropdown');

dropdownToggle.addEventListener('click', e => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    document.querySelector('.has-dropdown').classList.toggle('open');
  }
});
