var clicked = false;

function myfunction() {
    clicked = !clicked;
    const el = document.getElementById("btn");
    if (clicked) {
        el.style.color = "red"
    } else {
        el.style.color = "white"
    }
}

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar-custom");
    sidebar.classList.toggle("show");
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        var sidebar = document.getElementById("sidebar-custom");
        if (sidebar.classList.contains("show")) {
            sidebar.classList.remove("show");
        }
    }
});

function toggleHeart(element, chaletId) {
    console.log('Toggle heart clicked for chaletId:', chaletId);
    element.classList.toggle('clicked');

    // Replace with actual user_id (e.g., from session or input)
    const user_id = 3; 

    // Prepare data to send in the POST request
    const postData = {
        user_id: user_id,
        chalet_id: chaletId
    };

    fetch('toggle_wishlist.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        console.log('Server response:', result); // Log server response (added or removed)
    })
    .catch(error => {
        console.error('Error toggling wishlist:', error);
    });
    console.log('Sending POST request with user_id:', user_id, 'and chalet_id:', chaletId);
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('search.php')
    .then(response => response.json())
    .then(data => {
        // Check if data is an object or array
        if (!Array.isArray(data.chalets)) {
            console.error('Invalid data format: chalets array is missing or invalid');
            return;
        }
        
        function createCards() {
            const container = document.getElementById("card-container");

            // Clear existing content
            container.innerHTML = '';
            if (data.error) {
                container.innerHTML = `<p>${data.error}</p>`;
                return;
            }
            // Check if chalets array is empty
            if (data.chalets.length === 0) {
                container.innerHTML = '<p>No chalets match your criteria.</p>';
                return;
            }
            
            // Loop through each chalet and create a card
            data.chalets.forEach((chalet) => {
                const isWishlisted = data.wishlist.includes(chalet.id);
                const heartClass = isWishlisted ? 'fas fa-heart heart-icon clicked' : 'fas fa-heart heart-icon';

                const card = `
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${chalet.image ? chalet.image : 'images/no-image.png'}" class="img-fluid rounded-start" alt="Chalet Image" style="object-fit: cover; height: 100%; width: 100%;">
                            </div>
                            <div class="col-md-5">
                                <div class="card-body">
                                    <h5 class="card-title">${chalet.name}<span style="color: black; font-size: medium;"> | ${chalet.location}</span></h5>
                                    <p class="card-text">${chalet.description}</p>
                                </div>
                            </div>
                            <div class="col-md-3 price-column">
                                <p>${chalet.price}$</p>
                                <button class="btn btn-light">View Details</button>
                            </div>
                        </div>
                        <i class="${heartClass}" onclick="toggleHeart(this, ${chalet.id})"></i>
                    </div>`;

                // Append each card to the container
                container.innerHTML += card;
            });
        }

        // Call the function to initially create the cards
        createCards();
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});
