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


/*document.addEventListener("DOMContentLoaded", function() {
    const timestampField = document.getElementById('timestamp');
    const currentTimestamp = new Date().toISOString();
    timestampField.value = currentTimestamp;
});*/


const apiKey = '815fbb06782bb6c9f36fd4a8ca6dc311';
const lat = 3.45;
const lon = -76.53;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `🌡️ ${temperature.toFixed(2)}°C - ${description} <img src="${iconUrl}" alt="${description}">`;
  })
  .catch(error => console.error('Error fetching weather data:', error));
