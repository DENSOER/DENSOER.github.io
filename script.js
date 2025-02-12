// *************************** ANIMACIONES AL HACER SCROLL ***************************
window.addEventListener('scroll', function () {
    const scrollPosition = window.scrollY;
    const imagenPrincipal = document.querySelector('.imagen-principal');
    const menu = document.querySelector('.menu');
    const menuItem = document.querySelector('.menu-item');
    const contenidoCentral = document.querySelector('.contenido-central');
    const body = document.body;
    const contenedorImagen = document.querySelector('.contenedor-imagen-principal');

    // Ajustar el umbral según el tamaño de pantalla
    const scrollThreshold = window.innerWidth < 768 ? 50 : 100;
    
    if (scrollPosition > scrollThreshold) {
        imagenPrincipal?.classList.add('scrolled');
        menu?.classList.add('menu-active');
        if (menuItem) menuItem.style.display = 'block';
        if (contenidoCentral) contenidoCentral.style.opacity = 0;
        body?.classList.add('scroll-active');
    } else {
        imagenPrincipal?.classList.remove('scrolled');
        menu?.classList.remove('menu-active');
        if (menuItem) menuItem.style.display = 'none';
        if (contenidoCentral) contenidoCentral.style.opacity = 1;
        body?.classList.remove('scroll-active');
    }

    // Aplicamos la animación a la imagen contenedora
    if (scrollPosition > window.innerHeight) {
        contenedorImagen?.classList.add('scrolled');
    } else {
        contenedorImagen?.classList.remove('scrolled');
    }
});

// ************************** CARRUSEL RESPONSIVE ***************************
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let caps = document.querySelectorAll(".cap");
    let capWidth = caps[0]?.offsetWidth + 20 || 300;
    let index = 0;

    function updateCapWidth() {
        caps = document.querySelectorAll(".cap"); // Actualizar lista de elementos
        capWidth = caps[0]?.offsetWidth + 20 || 300; // Ajustar ancho al cambiar de tamaño
    }

    function moveSlide() {
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${index * capWidth}px)`;
    }

    nextBtn?.addEventListener("click", () => {
        if (index >= caps.length - 1) {
            index = 0; // Regresar al inicio
        } else {
            index++;
        }
        moveSlide();
    });

    prevBtn?.addEventListener("click", () => {
        if (index <= 0) {
            index = caps.length - 1; // Ir al final
        } else {
            index--;
        }
        moveSlide();
    });

    // Actualizar el tamaño del carrusel al cambiar de tamaño la ventana
    window.addEventListener("resize", updateCapWidth);
});

window.addEventListener("scroll", function () {
    let menu = document.querySelector(".menu");

    if (window.scrollY > 50) { 
        menu.classList.add("menu-active"); // Agrega la clase cuando baja
    } else {
        menu.classList.remove("menu-active"); // La quita cuando sube
    }
});


