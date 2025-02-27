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
const viewport = document.querySelector('.carousel-viewport');
    let slides = document.querySelectorAll('.slide');

    // Clonar el primer y último slide para lograr efecto infinito
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    const firstClone = firstSlide.cloneNode(true);
    const lastClone = lastSlide.cloneNode(true);
    firstClone.id = "first-clone";
    lastClone.id = "last-clone";
    viewport.appendChild(firstClone);
    viewport.insertBefore(lastClone, firstSlide);

    // Actualizamos la lista de slides (ahora incluyen los clones)
    slides = document.querySelectorAll('.slide');

    // El índice real inicia en 1 (primer slide real)
    let currentIndex = 1;

    function updateCarousel() {
      const slideWidthPercent = 100 / 3; // Cada slide ocupa 33.33%
      viewport.style.transform = `translateX(-${(currentIndex - 1) * slideWidthPercent}%)`;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });
    }

    const prevBtn = document.querySelector('.arrow.left');
    const nextBtn = document.querySelector('.arrow.right');

    prevBtn.addEventListener('click', () => {
      currentIndex--;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex++;
      updateCarousel();
    });

    // Al finalizar la transición, comprobamos si estamos en un clon y reubicamos sin animación
    viewport.addEventListener('transitionend', () => {
      if (slides[currentIndex].id === 'first-clone') {
        viewport.style.transition = 'none';
        currentIndex = 1;
        updateCarousel();
        setTimeout(() => {
          viewport.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 0);  // Retardo reducido a 0ms para un cambio inmediato
      }
      if (slides[currentIndex].id === 'last-clone') {
        viewport.style.transition = 'none';
        currentIndex = slides.length - 2;
        updateCarousel();
        setTimeout(() => {
          viewport.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 0);
      }
    });

    // Inicializamos el carrusel
    updateCarousel();
