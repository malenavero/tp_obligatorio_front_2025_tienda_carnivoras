// ======================================
// CARGA DE HEADER Y FOOTER DINÁMICOS
// ======================================
function loadHTML(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Error loading HTML:', error));
}

document.addEventListener('DOMContentLoaded', () => {
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
    });

    loadHTML('footer-placeholder', 'footer.html');
});

// ======================================
// SLIDER PRINCIPAL CON FLECHAS Y DOTS
// ======================================
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

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

    showSlide(currentIndex);

    setInterval(nextSlide, 20000); // Auto-slide cada 20 segundos
});

// ======================================
// CARRUSEL DE PRODUCTOS (5 CARDS POR VEZ)
// ======================================
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const grid = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.card');
    const dotsContainer = document.querySelector('.product-dots');

    if (!grid || cards.length === 0) return;

    const cardsPerSlide = 5;
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    let currentSlide = 0;

    // Crear los dots dinámicamente
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
        dotsContainer?.appendChild(dot);
    }

    const dots = document.querySelectorAll('.carousel-dot');

    function updateSlider() {
      const cardWidth = cards[0].offsetWidth;
      const gap = parseInt(getComputedStyle(grid).gap) || 0;

      const scrollPosition = (cardWidth + gap) * cardsPerSlide * currentSlide;
      grid.style.transform = `translateX(-${scrollPosition}px)`;

      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentSlide);
      });
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
});
