// 1) Burger (igual que antes)
const burger = document.querySelector('.header__burger');
const mobileNav = document.querySelector('.mobile-nav');
burger.addEventListener('click', () => {
  mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
  burger.classList.toggle('open');
});

// 2) Dropdown por clic en TODOS los dispositivos
document.querySelectorAll('.has-dropdown > a').forEach(toggle => {
  toggle.addEventListener('click', e => {
    e.preventDefault();                       // siempre evitamos el href
    const parentLi = toggle.parentElement;    // el <li class="has-dropdown">
    parentLi.classList.toggle('open');        // muestra/oculta el menú
  });
});
