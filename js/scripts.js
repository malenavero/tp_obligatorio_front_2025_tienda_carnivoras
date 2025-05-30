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
            if (callback) {
                callback();
            }
        })
        .catch(error => console.error('Error loading HTML:', error));
}

// Cargar el header cuando el DOM esté listo
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

/* Slide y botones*/

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }
  
    // Mostrar la primer slide al cargar
    showSlide(currentIndex);
  
    // Cambiar de slide cada 4 segundos
    setInterval(nextSlide, 20000);
  });

  const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

document.querySelector('.next').addEventListener('click', () => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
});

document.querySelector('.prev').addEventListener('click', () => {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[currentIndex].classList.add('active');
});

  
