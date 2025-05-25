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
