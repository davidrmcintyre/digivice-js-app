   // Function to fetch Digimon data
   function fetchDigimon() {
    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Call the displayDigimonList function with the retrieved data
            displayDigimonList(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }


    function displayDigimonList(digimonList, sorted = true) {
        const digimonListContainer = document.getElementById('digimonList');
    
        // Clear any previous list items
        digimonListContainer.innerHTML = '';
    
        // Create a sorted copy of the digimonList array if sorted is true
        if (sorted) {
            digimonList = [...digimonList].sort((a, b) => a.name.localeCompare(b.name));
        }
    
        // Loop through the list of Digimon and create list items for each
        digimonList.forEach(digimon => {
            const listItem = document.createElement('li');
            let digimonButton = document.createElement('button');
            listItem.className = 'list-group-item btn digimon-button';
            listItem.appendChild(digimonButton);
            listItem.textContent = digimon.name; // Display the sorted name
    
            // Add a click event listener to each list item to display details
            listItem.addEventListener('click', () => {
                displayDigimonDetails(digimon);
            });
    
            digimonListContainer.appendChild(listItem);
        });
    }
    

// Function to fetch Digimon data by name and display in modal
function fetchDigimonByNameAndDisplayModal(name) {
    fetch(`https://digimon-api.vercel.app/api/digimon/name/${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const digimon = data[0];
                displayDigimonDetails(digimon);
            } else {
                alert('Digimon not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// Function to display Digimon details in the modal
function displayDigimonDetails(digimon) {
    document.getElementById('digimonImage').src = digimon.img;
    document.getElementById('digimonName').textContent = digimon.name;
    document.getElementById('digimonLevel').textContent = `Level: ${digimon.level}`;
    $('#digimonModal').modal('show');
}


// Event listener for search by name form
document.getElementById('searchButton').addEventListener('click', function () {
    const name = document.getElementById('search').value.trim();
    if (name !== '') {
        fetchDigimonByNameAndDisplayModal(name);
    }
});

// Event listener for Enter key press
document.getElementById('search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const name = document.getElementById('search').value.trim();
        if (name !== '') {
            fetchDigimonByNameAndDisplayModal(name);
        }
    }
});

// Initial fetch of all Digimon
fetchDigimon();