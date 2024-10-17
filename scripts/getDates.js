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


// Function to handle the page visit counter
function updatePageVisitCounter() {
    // Check if the 'visitCount' is already in localStorage
    let visitCount = localStorage.getItem('visitCount');

    if (visitCount) {
        // If exists, increment the counter
        visitCount = parseInt(visitCount) + 1;
    } else {
        // If not, initialize it
        visitCount = 1;
    }

    // Save the updated count in localStorage
    localStorage.setItem('visitCount', visitCount);

    // Update the content of the span with the new count
    document.getElementById('page-visit-counter').textContent = visitCount;
}

// Call the function to update the counter on page load
updatePageVisitCounter();



// Form Code
document.getElementById('signup-form').addEventListener('submit', function(event) {
    // Password Match Validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please re-enter.");
        event.preventDefault(); // Prevent form submission
    }

    // Email validation is handled by the pattern attribute in the HTML
});



document.addEventListener("DOMContentLoaded", function() {
    const timestampField = document.getElementById('timestamp');
    const currentTimestamp = new Date().toISOString();
    timestampField.value = currentTimestamp;
});