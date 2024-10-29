// Update the current year
const currentYearElement = document.getElementById('currentYear');
const currentYear = new Date().getFullYear();
if (currentYearElement) {
    currentYearElement.textContent = currentYear;
}

// Update the last modified date
const lastModifiedElement = document.getElementById('lastModified');
const lastModifiedDate = new Date(document.lastModified);
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${lastModifiedDate.toLocaleDateString()} ${lastModifiedDate.toLocaleTimeString()}`;
}

// Toggle burger menu and X icon
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle'); 
    });
}

// Discover JS code
const visitMessage = document.getElementById('visit-message');

if (visitMessage) {  // Run only if the element exists
    const currentDate = Date.now();
    const lastVisitDate = localStorage.getItem('lastVisitDate');

    if (!lastVisitDate) {
        visitMessage.innerHTML = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessage.innerHTML = "Back so soon! Awesome!";
        } else {
            visitMessage.innerHTML = `You last visited ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago.`;
        }
    }
    localStorage.setItem('lastVisitDate', currentDate);
}

// Directory code
const directoryContainer = document.getElementById('directory-container');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

if (directoryContainer) {  // Only run this code if directoryContainer exists
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

    // Call function to show members
    getMembers();
}

//Weather JS code
const apiKey = '815fbb06782bb6c9f36fd4a8ca6dc311';
const lat = 3.45;
const lon = -76.53;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const weatherContainer = document.querySelector('.weather-content'); // Adjust selector as needed

if (weatherContainer) {  // Run only if the element exists
    fetchWeatherData();
}

async function fetchWeatherData() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();

        const temp = data.main.temp.toFixed(1);
        const description = data.weather[0].description;

        const weatherContent = document.querySelector('.weather-content');
        if (weatherContent) {
            weatherContent.innerHTML = `
                <p>🌡️ <b>${temp}°C</b> -☁️ ${description}</p>
            `;

            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();

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

            weatherContent.innerHTML += forecastHTML;
        }

    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherContent = document.querySelector('.weather-content');
        if (weatherContent) {
            weatherContent.innerHTML = '<p>Error loading weather data.</p>';
        }
    }
}

//Member Spotlights JS code
// Fetch members from JSON
function getMembersForSpotlight() {
    const spotlightContainer = document.querySelector('.spotlight-cards');

    // Verificar si el contenedor de spotlight existe antes de ejecutar el código
    if (!spotlightContainer) {
        console.log("Spotlight container not found on this page. Skipping spotlight functionality.");
        return; // Salir de la función si el contenedor no existe
    }

    // Resto de la lógica para obtener y mostrar los miembros spotlight
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            // Accede a `data.members` porque el JSON tiene la propiedad `members`
            displaySpotlightMembers(data.members);
        })
        .catch(error => console.error("Error fetching members data:", error));
}

// Filter and randomly select 2-3 'silver' or 'gold' members
function displaySpotlightMembers(members) {
    // Filter members with "Gold" or "Silver" membership levels
    const qualifiedMembers = members.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');
    
    // Mix the qualified members
    shuffleArray(qualifiedMembers);
    
    // Randomly select 2 or 3 members
    const selectedMembers = qualifiedMembers.slice(0, 3);
    
    // Display selected members in the spotlight container
    const spotlightContainer = document.querySelector('.spotlight-cards');
    spotlightContainer.innerHTML = ''; 

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

// Function to shuffle the array of members (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Run on page load
getMembersForSpotlight();


// JavaScript for displaying the banner only on Monday, Tuesday, and Wednesday
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("meet-greet-banner");
    const closeBannerBtn = document.getElementById("close-banner-btn");

    // Function to check the current day and show the banner if it's Mon, Tue, or Wed
    function showBannerOnSelectedDays() {
        const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        if (today === 1 || today === 2 || today === 3) {
            banner.style.display = "flex"; // Show the banner
        }
    }

    // Event listener to close the banner
    closeBannerBtn.addEventListener("click", () => {
        banner.style.display = "none"; // Hide the banner when close button is clicked
    });

    showBannerOnSelectedDays();
});