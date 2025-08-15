document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.getElementById('nav-links');
    const navItems = navLinks.querySelectorAll('a'); // Obtener todos los enlaces del menú

    // Función para cerrar el menú
    const closeMenu = () => {
        navLinks.classList.remove('active');
    };

    // Alternar menú al hacer clic en el botón de hamburguesa
    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });
});
