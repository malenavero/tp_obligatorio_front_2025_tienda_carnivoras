// ======================================
// Carga Dinámica de Encabezado y Pie de Página
// ======================================
function loadHTML(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback(); // Ejecuta el callback después de cargar el contenido
        })
        .catch(error => console.error('Error al cargar el HTML:', error));
}

// ======================================
// Funcionalidad del Menú Hamburguesa
// ======================================
function setupHamburgerMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.querySelector('.main-nav'); // Seleccionar por clase, según tu HTML

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('show');
    });
  }
}

// ======================================
// Slider Principal con Flechas y Puntos
// ======================================
function setupMainSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }

    document.querySelector('.next')?.addEventListener('click', nextSlide);
    document.querySelector('.prev')?.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    showSlide(currentIndex); // Inicializa el primer slide

    // Auto-slide cada 20 segundos, limpia el intervalo si no hay slides
    if (slides.length > 1) { // Solo auto-slide si hay más de un slide
        setInterval(nextSlide, 20000);
    }
}

// ======================================
// Carrusel de Productos (5 tarjetas a la vez)
// ======================================
function setupProductCarousel() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const grid = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.card');
    const dotsContainer = document.querySelector('.product-dots');

    if (!grid || cards.length === 0) return; // Sale si no se encuentran elementos

    const cardsPerSlide = 5;
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    let currentSlide = 0;

    // Crea los puntos dinámicamente
    dotsContainer.innerHTML = ''; 
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.carousel-dot'); 

    function updateSlider() {
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(getComputedStyle(grid).gap) || 0; // Obtiene el valor del gap calculado

      const scrollPosition = (cardWidth + gap) * cardsPerSlide * currentSlide;
      grid.style.transform = `translateX(-${scrollPosition}px)`;

      // Actualiza el punto activo
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
      });

      // Deshabilita/habilita los botones de navegación según el slide actual
      if (prevBtn) prevBtn.disabled = currentSlide === 0;
      if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
    }


    prevBtn?.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    nextBtn?.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);

    updateSlider();
}

// ======================================
// Inicializa Todos los Scripts al Cargar el DOM
// ======================================
document.addEventListener('DOMContentLoaded', () => {
    // Carga el encabezado primero, luego configura los enlaces activos y el menú hamburguesa
    loadHTML('header-placeholder', 'header.html', () => {
        const currentPath = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('activo');
            } else {
                link.classList.remove('activo');
            }
        });
        setupHamburgerMenu(); 
    });

    loadHTML('footer-placeholder', 'footer.html');

    setupMainSlider();
    setupProductCarousel();
});