// Función para cargar HTML desde un archivo
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

// Cargar header y footer
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

// ===========================
// SLIDE PRINCIPAL Y BOTONES
// ===========================

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

    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    showSlide(currentIndex);

    setInterval(nextSlide, 20000);
});

// ===========================
// SLIDER DE PRODUCTOS
// ===========================

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const grid = document.querySelector('.grid');
const card = document.querySelector('.card');
const cardWidth = card.offsetWidth;
const cardsVisible = 5;
const cardMarginRight = 20;

let scrollPosition = 0;

prevBtn.addEventListener('click', () => {
    scrollPosition -= cardWidth * cardsVisible;
    if (scrollPosition < 0) scrollPosition = 0;
    grid.style.transform = `translateX(-${scrollPosition}px)`;
});

nextBtn.addEventListener('click', () => {
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    scrollPosition += cardWidth * cardsVisible;
    if (scrollPosition > maxScroll) scrollPosition = maxScroll;
    grid.style.transform = `translateX(-${scrollPosition}px)`;
});
