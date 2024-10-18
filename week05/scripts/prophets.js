const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.getElementById('cards');

async function getProphetData(url) {
    try {
        // Realiza la solicitud fetch para obtener los datos
        const response = await fetch(url);
    
        // Convierte la respuesta a formato JSON
        const data = await response.json();
    
        // Muestra los datos en formato tabla en la consola (opcional para verificar)
        console.table(data.prophets);
    
        // Llama a la función displayProphets pasando el array de profetas
        displayProphets(data.prophets);
    
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
}

const displayProphets = (prophets) => {
    prophets.forEach(element => {
        let card = document.createElement('section');

        let fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        // Crea un elemento 'img' para el retrato
        let portrait = document.createElement('img');
        portrait.setAttribute('src', prophet.imageurl); // Establece la URL de la imagen
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // Texto alternativo
        portrait.setAttribute('loading', 'lazy'); // Lazy loading
        portrait.setAttribute('width', '200'); // Ancho
        portrait.setAttribute('height', '300'); // Altura

        // Agrega el nombre y la imagen al card
        card.appendChild(fullName);
        card.appendChild(portrait);

        // Agrega la tarjeta al contenedor de cards
        cards.appendChild(card);
    });
}

getProphetData();


