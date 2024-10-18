// Declara la URL del JSON
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

// Selecciona el elemento div con id "cards"
const cards = document.getElementById('cards');

// Función asincrónica para obtener los datos de los profetas
async function getProphetData() {
  try {
    // Realiza la solicitud fetch para obtener los datos
    const response = await fetch(url);

    // Verifica si la respuesta es válida
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convierte la respuesta a formato JSON
    const data = await response.json();

    // Muestra los datos en formato tabla en la consola
    console.table(data.prophets);

    // Llama a la función displayProphets pasando el array de profetas
    displayProphets(data.prophets);

  } catch (error) {
    console.error('Error fetching the data:', error);
  }
}

// Función para mostrar los profetas
const displayProphets = (prophets) => {
  // Procesa cada profeta con un forEach
  prophets.forEach((prophet) => {
    // Crea un elemento 'section' para la tarjeta
    let card = document.createElement('section');

    // Crea un elemento 'h2' para el nombre completo
    let fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    let birthDate = document.createElement('p');
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

    let birthPlace = document.createElement('p');
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Crea un elemento 'img' para el retrato
    let portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '150');
    portrait.setAttribute('height', '150');

    // Agrega el nombre y la imagen al card
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    // Agrega la tarjeta al contenedor de cards
    cards.appendChild(card);
  });
};

// Llama a la función para obtener los datos al cargar la página
getProphetData();
