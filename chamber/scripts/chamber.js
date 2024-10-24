// Update the current year
const currentYearElement = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
currentYearElement.textContent = currentYear;

// Update the last modified date
const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = new Date(document.lastModified);
lastModifiedElement.textContent = `Last Modification: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`;



// Toggle burger menu and X icon
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle'); // Toggle the X animation
});

/*
// Get the visit message element
const visitMessage = document.getElementById('visit-message');

// Get the current date in milliseconds
const currentDate = Date.now();

// Check if there is a previous visit date stored
const lastVisitDate = localStorage.getItem('lastVisitDate');

if (!lastVisitDate) {
    // First visit
    visitMessage.innerHTML = "Welcome! Let us know if you have any questions.";
} else {
    // Calculate the time difference
    const timeDifference = currentDate - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    if (daysDifference < 1) {
        // Less than a day
        visitMessage.innerHTML = "Back so soon! Awesome!";
    } else {
        // More than a day
        visitMessage.innerHTML = `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
    }
}

// Store the current visit date
localStorage.setItem('lastVisitDate', currentDate);
*/


// directory code
const directoryContainer = document.getElementById('directory-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

// Fetch and display members
async function getMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    directoryContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${member.membershipLevel}</p>
        `;

        directoryContainer.appendChild(memberCard);
    });
}

// Make sure the buttons exist before adding the events
if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
        directoryContainer.classList.add('directory-grid');
        directoryContainer.classList.remove('directory-list');
    });

    listViewBtn.addEventListener('click', () => {
        directoryContainer.classList.add('directory-list');
        directoryContainer.classList.remove('directory-grid');
    });
}

// Call funtion to show
getMembers();

//Weather JS code
const apiKey = '815fbb06782bb6c9f36fd4a8ca6dc311';
const lat = 3.45;
const lon = -76.53;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeatherData() {
    try {
        // Obtener clima actual
        const response = await fetch(weatherUrl);
        const data = await response.json();

        // Mostrar clima actual
        const temp = data.main.temp.toFixed(1);
        const description = data.weather[0].description;
        document.querySelector('.weather-content').innerHTML = `
            <p>🌡️ <b>${temp}°C</b> -☁️ ${description}</p>
        `;

        // Obtener pronóstico de 3 días
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Filtrar pronóstico de 3 días (cada 24 horas)
        const forecastList = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

        let forecastHTML = '<h3>3-Day Forecast</h3>';
        forecastList.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString('en-GB', { weekday: 'long', month: 'short', day: 'numeric' });
            const dayTemp = day.main.temp.toFixed(1);
            const dayDescription = day.weather[0].description;
            forecastHTML += `
                <p><b>${date}:</b> ${dayTemp}°C - ${dayDescription}</p>
            `;
        });

        document.querySelector('.weather-content').innerHTML += forecastHTML;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.querySelector('.weather-content').innerHTML = '<p>Error loading weather data.</p>';
    }
}

fetchWeatherData();

//Member Spotligths JS code
// Fetch members from JSON
async function getMembersForSpotlight() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displaySpotlightMembers(data.members);
}

// Filter and randomly select 2-3 'silver' or 'gold' members
function displaySpotlightMembers(members) {
    // Filtrar miembros con niveles de membresía "Gold" o "Silver"
    const qualifiedMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');
    
    // Mezclar los miembros calificados
    shuffleArray(qualifiedMembers);
    
    // Seleccionar aleatoriamente 2 o 3 miembros
    const selectedMembers = qualifiedMembers.slice(0, 3);
    
    // Mostrar los miembros seleccionados en el contenedor de spotlights
    const spotlightContainer = document.querySelector('.spotlight-cards');
    spotlightContainer.innerHTML = ''; // Limpiar contenido previo

    selectedMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('spotlight-card');
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p><a href="tel:${member.phone}">${member.phone}</a></p>
            <p><a href="${member.website}" target="_blank">Website</a></p>
        `;
        spotlightContainer.appendChild(memberCard);
    });
}

// Función para mezclar el array de miembros (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Ejecutar al cargar la página
getMembersForSpotlight();
