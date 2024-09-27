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
    menuItems.classList.toggle('open');
    menuButton.classList.toggle('open');

    // Change the icon
    if (menuButton.classList.contains('open')) {
        menuButton.textContent = '✖'; // Show "X"
    } else {
        menuButton.textContent = '☰'; // Back to hamburguer icon
    }
});

//Dark mode code
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});
