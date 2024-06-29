document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display chalets initially
    fetchChalets();

    // Event listeners for tabs
    document.getElementById('chalets_tab').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllTabs();
        document.getElementById('chalets_div').style.display = '';
        fetchChalets();
    });

    document.getElementById('users_tab').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllTabs();
        document.getElementById('users_div').style.display = '';
        fetchUsers();
    });

    document.getElementById('dashboard_tab').addEventListener('click', function(event) {
        event.preventDefault();
        hideAllTabs();
        document.getElementById('dashboard_div').style.display = '';
        fetchDashboardData();
    });

    // Function to hide all tab content
    function hideAllTabs() {
        document.getElementById('chalets_div').style.display = 'none';
        document.getElementById('users_div').style.display = 'none';
        document.getElementById('dashboard_div').style.display = 'none';
    }

    // Fetch chalets from the server
    function fetchChalets() {
        fetch('fetch-chalets.php')
            .then(response => response.json())
            .then(data => {
                displayChalets(data);
            })
            .catch(error => console.error('Error fetching chalets:', error));
    }

    // Display chalets in the table
    function displayChalets(chalets) {
        const chaletsTable = document.getElementById('chalets_table');
        chaletsTable.innerHTML = ''; // Clear previous content

        chalets.forEach(chalet => {
            const row = `
                <tr>
                    <td>${chalet.name}</td>
                    <td>${chalet.location}</td>
                    <td>${chalet.price}</td>
                    <td>${chalet.capacity}</td>
                    <td>${chalet.description}</td>
                    <td>${chalet.date_added}</td>
                    <td>
                        <button class="btn btn-primary edit-chalet" data-id="${chalet.id}">Edit</button>
                        <button class="btn btn-danger delete-chalet" data-id="${chalet.id}">Delete</button>
                    </td>
                </tr>
            `;
            chaletsTable.innerHTML += row;
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-chalet').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const chaletId = this.getAttribute('data-id');
                openEditChaletModal(chaletId);
            });
        });

        document.querySelectorAll('.delete-chalet').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const chaletId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this chalet?')) {
                    deleteChalet(chaletId);
                }
            });
        });
    }

    // Function to delete a chalet
    function deleteChalet(chaletId) {
        fetch('delete-chalet.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: chaletId }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle success or show error messages
            console.log(data);
            fetchChalets(); // Reload chalets after deletion
        })
        .catch(error => {
            console.error('Error deleting chalet:', error);
        });
    }

    // Function to open edit chalet modal (implement as needed)
    function openEditChaletModal(chaletId) {
        // Implement your modal logic here
        console.log('Editing chalet with ID:', chaletId);
    }

    // Fetch users from the server
    function fetchUsers() {
        fetch('fetch-users.php')
            .then(response => response.json())
            .then(data => {
                displayUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Display users in the table
    function displayUsers(users) {
        const usersTable = document.getElementById('users_table');
        usersTable.innerHTML = ''; // Clear previous content

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.date_registered}</td>
                    <td>
                        <button class="btn btn-primary edit-user" data-id="${user.id}">Edit</button>
                        <button class="btn btn-danger delete-user" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `;
            usersTable.innerHTML += row;
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-user').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const userId = this.getAttribute('data-id');
                openEditUserModal(userId);
            });
        });

        document.querySelectorAll('.delete-user').forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const userId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this user?')) {
                    deleteUser(userId);
                }
            });
        });
    }

    // Function to delete a user
    function deleteUser(userId) {
        fetch('delete-user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle success or show error messages
            console.log(data);
            fetchUsers(); // Reload users after deletion
        })
        .catch(error => {
            console.error('Error deleting user:', error);
        });
    }

    // Function to open edit user modal (implement as needed)
    function openEditUserModal(userId) {
        // Implement your modal logic here
        console.log('Editing user with ID:', userId);
    }

    // Fetch dashboard data (if needed)
    function fetchDashboardData() {
        // Implement fetching and displaying dashboard data if required
    }
});

// Additional JavaScript for Charts
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('price-data.php')
        .then(response => response.json())
        .then(data => {
            const prices = data.map(item => '$' + item.price); // Add $ to each price
            const counts = data.map(item => item.count);
            
            const ctx1 = document.getElementById('costChart').getContext('2d');
            const costChart = new Chart(ctx1, {
                type: 'doughnut',
                data: {
                    labels: prices, // Use prices with $ as labels
                    datasets: [{
                        label: 'Number of Chalets',
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    let label = tooltipItem.label || '';

                                    if (label) {
                                        label += ': ' + tooltipItem.raw + ' chalets';
                                    }

                                    return label;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Bar chart
document.addEventListener('DOMContentLoaded', (event) => {
    fetch('age-data.php')
        .then(response => response.json())
        .then(data => {
            const labels = data.labels;
            const counts = data.counts;
            
            const ctx2 = document.getElementById('ageChart').getContext('2d');
            const ageChart = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: labels, // Use labels as categories
                    datasets: [{
                        label: 'User Ages',
                        data: counts,
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.raw + ' users';
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
