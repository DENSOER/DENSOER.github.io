// Animación al hacer scroll
window.addEventListener('scroll', function () {
  const scrollPosition = window.scrollY;
  const imagenPrincipal = document.querySelector('.imagen-principal');
  const menu = document.querySelector('.menu');
  const contenidoCentral = document.querySelector('.contenido-central');
  const contenedorImagen = document.querySelector('.contenedor-imagen-principal');

  // Umbral según ancho de pantalla
  const scrollThreshold = window.innerWidth < 768 ? 50 : 100;

  if (scrollPosition > scrollThreshold) {
    imagenPrincipal.classList.add('scrolled');
    menu.classList.add('menu-active'); // Activa el logo en la izquierda y cambia el layout
    if (contenidoCentral && !contenidoCentral.classList.contains('hide')) {
      contenidoCentral.classList.add('hide');
    }
  } else {
    imagenPrincipal.classList.remove('scrolled');
    menu.classList.remove('menu-active');
    if (contenidoCentral && contenidoCentral.classList.contains('hide')) {
      contenidoCentral.classList.remove('hide');
    }
  }

  // Animación para el contenedor de la imagen principal
  if (scrollPosition > window.innerHeight) {
    contenedorImagen.classList.add('scrolled');
  } else {
    contenedorImagen.classList.remove('scrolled');
  }
});

// Toggle para el menú responsive
const menuToggle = document.getElementById('menu-toggle');
const menuItems = document.querySelector('.menu-items');
menuToggle.addEventListener('click', function () {
  menuItems.classList.toggle('active');
  menuToggle.classList.toggle('open');
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
