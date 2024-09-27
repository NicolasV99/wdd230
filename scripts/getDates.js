// Update the current year
const currentYearElement = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

// Update the last modified date
const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = new Date(document.lastModified);
lastModifiedElement.textContent = `Last Modification: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`;

//Action for open or close menu when click to the menu button
const menuButton = document.getElementById('menu-toggle');
const menuItems = document.querySelector('.menu');

menuButton.addEventListener('click', function() {
    // Alternar clases 'open' en el botón y el menú
    menuItems.classList.toggle('open');
    menuButton.classList.toggle('open');

    // Cambiar el icono del botón de hamburguesa
    if (menuButton.classList.contains('open')) {
        menuButton.textContent = '✖'; // Mostrar "X"
    } else {
        menuButton.textContent = '☰'; // Volver al icono de hamburguesa
    }
});

document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
