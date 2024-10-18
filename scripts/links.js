const baseURL = "https://nicolasv99.github.io/wdd230/";
const linksURL = baseURL + "data/links.json";

async function getLinks() {
    try {
        const response = await fetch(linksURL);
        const data = await response.json();
        console.log(data); // Check the data structure in the console
        displayLinks(data.weeks); // Call the function to display links
    } catch (error) {
        console.error("Error fetching links:", error);
    }
}

// Test the fetch functionality
getLinks();


function displayLinks(weeks) {
    const learnList = document.getElementById("learn-list"); // Target the UL element

    weeks.forEach(week => {
        // Create a new list item for each week
        const listItem = document.createElement("li");
        listItem.textContent = `${week.week}: `;

        // Loop through the links for that week
        week.links.forEach((link, index) => {
            const anchor = document.createElement("a");
            anchor.href = baseURL + link.url; // Construct the full URL
            anchor.textContent = link.title;

            listItem.appendChild(anchor);

            // Add a separator for links, but not after the last link
            if (index < week.links.length - 1) {
                const separator = document.createTextNode(" | ");
                listItem.appendChild(separator);
            }
        });

        // Append the list item to the list
        learnList.appendChild(listItem);
    });
}
