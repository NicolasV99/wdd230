const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

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
        
    });
}

getProphetData();


