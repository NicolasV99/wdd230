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

// Toggle views
gridViewBtn.addEventListener('click', () => {
    directoryContainer.classList.add('directory-grid');
    directoryContainer.classList.remove('directory-list');
});

listViewBtn.addEventListener('click', () => {
    directoryContainer.classList.add('directory-list');
    directoryContainer.classList.remove('directory-grid');
});

// Load members when page loads
getMembers();