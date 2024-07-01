
var div1 = document.getElementById('CreateChalet');
var div2 = document.getElementById('Edit');
var div3 = document.getElementById('CreateUser');
var div4 = document.getElementById('EditUser');
document.getElementById('button1').onclick = function() {
    
    if (div1.style.display === 'none' || div1.style.display === '') {
        div1.style.display = 'block';
        div2.style.display = 'none'
    } 
};


/*document.getElementById('button2').onclick = function() {
    
    if (div2.style.display === 'none' || div2.style.display === '') {
        div2.style.display = 'block';
        div1.style.display = 'none'
    } 
};*/

document.getElementById('close1').onclick = function() {
   
    div1.style.display = 'none';
}

document.getElementById('close2').onclick = function() {
   
    div2.style.display = 'none';
}

document.getElementById('button3').onclick = function() {
    
    if (div3.style.display === 'none' || div3.style.display === '') {
        div3.style.display = 'block';
        div4.style.display = 'none'
    } 
};


document.getElementById('button4').onclick = function() {
    
    if (div4.style.display === 'none' || div4.style.display === '') {
        div4.style.display = 'block';
        div3.style.display = 'none'
    } 
};

document.getElementById('close3').onclick = function() {
   
    div3.style.display = 'none';
}

document.getElementById('close4').onclick = function() {
    
    div4.style.display = 'none';
}

var today = new Date().toISOString().split('T')[0];


var dateInputs = document.querySelectorAll('input[type="date"]');


dateInputs.forEach(function(input) {
    input.value = today;
});


// Function to validate passwords
function validatePassword1() {
    const password1 = document.getElementById('password1').value;
    const confirmPassword1 = document.getElementById('confirmPassword1').value;
    const message1 = document.getElementById('message1');

    if (password1 === confirmPassword1) {
        message1.textContent = 'Passwords match.';
        message1.className = 'success';
        createChalet(); // Call function to submit form if passwords match
        return false; // Prevent default form submission
    } else {
        message1.textContent = 'Passwords do not match.';
        message1.className = 'error';
        return false; // Prevent default form submission
    }
}




function validatePassword2() {

const password2 = document.getElementById('password2').value;
const confirmPassword2 = document.getElementById('confirmPassword2').value;
const message2 = document.getElementById('message2');


if (password2 === confirmPassword2) {
    message2.textContent = 'Passwords match.';
    message2.className = 'success';
    return true; 
} else {
    message2.textContent = 'Passwords do not match.';
    message2.className = 'error';
    return false;
}
}
function validatePassword3() {

const password3 = document.getElementById('password3').value;
const confirmPassword3 = document.getElementById('confirmPassword3').value;
const message3 = document.getElementById('message3');


if (password3 === confirmPassword3) {
    message3.textContent = 'Passwords match.';
    message3.className = 'success';
    return true; 
} else {
    message3.textContent = 'Passwords do not match.';
    message3.className = 'error';
    return false; 
}
}
function validatePassword4() {

const password4 = document.getElementById('password4').value;
const confirmPassword4 = document.getElementById('confirmPassword4').value;
const message4 = document.getElementById('message4');


if (password4 === confirmPassword4) {
    message4.textContent = 'Passwords match.';
    message4.className = 'success';
    return true; 
} else {
    message4.textContent = 'Passwords do not match.';
    message4.className = 'error';
    return false; 
}
}

var chalets_div = document.getElementById('chalets_div');
    var users_div = document.getElementById('users_div');
    var dashboard_div = document.getElementById('dashboard_div');

document.getElementById('chalets_tab').onclick = function() {
    dashboard_div.style.display = "none";
    users_div.style.display =  'none';
    chalets_div.style.display =  '';
};

document.getElementById('users_tab').onclick = function() {
    users_div.style.display =  '';
    chalets_div.style.display =  'none';
    dashboard_div.style.display = "none";
};

document.getElementById('dashboard_tab').onclick = function() {
    users_div.style.display =  'none';
    chalets_div.style.display =  'none';
    dashboard_div.style.display = '';
};

document.addEventListener('DOMContentLoaded', (event) => {
    Promise.all([
        fetch('price-data.php').then(response => response.json()),
        fetch('location-data.php').then(response => response.json()),
        fetch('age-data.php').then(response => response.json())
    ]).then(([priceData, locationData, ageData]) => {
        // Process priceData
        const prices = priceData.map(item => '$' + item.price);
        const priceCounts = priceData.map(item => item.count);

        const ctx1 = document.getElementById('costChart').getContext('2d');
        const costChart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: prices,
                datasets: [{
                    label: 'Number of Chalets',
                    data: priceCounts,
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

        // Process locationData
        const locations = locationData.map(item => item.location);
        const locationCounts = locationData.map(item => item.count);

        const ctx2 = document.getElementById('chaletCountChart').getContext('2d');
        const chaletsChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: locations,
                datasets: [{
                    label: function(context) {
                        return 'Number of Chalets in ' + locations[context.dataIndex];
                    },
                    data: locationCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Process ageData
        const ageLabels = ageData.labels;
        const ageCounts = ageData.counts;

        const ctx3 = document.getElementById('ageChart').getContext('2d');
        const ageChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ageLabels,
                datasets: [{
                    label: 'User Ages',
                    data: ageCounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw;
                            }
                        }
                    }
                }
            }
        });

    }).catch(error => console.error('Error fetching data:', error));
});

// Function to handle form submission using fetch


    
    // Function to fetch and display chalets
    function fetchChalets(page = 1, perPage = 5) {
        fetch(`fetch_chalets.php?page=${page}&perPage=${perPage}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const tableBody = document.querySelector('table tbody');
                    tableBody.innerHTML = '';

                    data.data.chalets.forEach(chalet => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="text-nowrap align-middle">${chalet.name}</td>
                            <td class="text-nowrap align-middle">${chalet.location}</td>
                            <td class="text-nowrap align-middle"><span>${chalet.date}</span></td>
                            <td class="text-center align-middle">
                                <div class="btn-group align-top">
                                    <button class="btn btn-sm btn-outline-secondary badge btn-blue" id="edit-${chalet.id}" data-id="${chalet.id}" data-name="${chalet.name}" data-location="${chalet.location}" data-date="${chalet.date}">Edit</button>
                                    <button class="btn btn-sm btn-outline-secondary badge btn-red" id="delete-${chalet.id}" data-id="${chalet.id}">Delete</button>
                                </div>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });

                    // Pagination
                    const pagination = document.querySelector('.pagination');
                    pagination.innerHTML = '';
                    for (let i = 1; i <= data.data.totalPages; i++) {
                        const li = document.createElement('li');
                        li.className = `page-item ${i === page ? 'active' : ''}`;
                        li.innerHTML = `<a href="#" class="page-link" data-page="${i}">${i}</a>`;
                        pagination.appendChild(li);
                    }

                    // Add event listeners for delete buttons
                    document.querySelectorAll('.btn-red').forEach(button => {
                        button.addEventListener('click', function() {
                            const chaletId = this.getAttribute('data-id');
                            deleteChalet(chaletId);
                        });
                    });

                    
                }
            });
    }

    // Function to delete chalet
    function deleteChalet(chaletId) {
        if (confirm('Are you sure you want to delete this chalet?')) {
            fetch('delete_chalet.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: chaletId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    fetchChalets();
                } else {
                    alert('Failed to delete chalet: ' + data.message);
                }
            });
        }
    }

    // Fetch chalets on page load
    fetchChalets();

    // Handle pagination clicks
    document.querySelector('.pagination').addEventListener('click', function(event) {
        if (event.target.classList.contains('page-link')) {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            fetchChalets(page);
        }
    });



function createChalet() {
    let formData = new FormData(document.getElementById('createChaletForm'));

    fetch('create_chalet.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle JSON response from server
        console.log(data); // Log response for debugging

        if (data.status === 'success') {
            alert(data.message); // Show success message
            resetCreateChaletForm(); // Reset form fields
            fetchChalets();
            clearPasswordMessage(); 
            setDefaultDate();
        } else {
            alert(data.message); // Show error message
        }
    })
    .catch(error => {
        console.error('Error creating chalet:', error);
        // Handle errors if any
    });
}

// Function to reset form fields in CreateChalet form
function resetCreateChaletForm() {
    document.getElementById('createChaletForm').reset();
}



function clearPasswordMessage() {
    const message1 = document.getElementById('message1');
    message1.textContent = '';
    message1.className = '';
}


function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(function(input) {
        input.value = today;
    });
}
     

