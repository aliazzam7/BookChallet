
var div1 = document.getElementById('CreateChalet');
var div2 = document.getElementById('Edit');

document.getElementById('button1').onclick = function() {
    
    if (div1.style.display === 'none' || div1.style.display === '') {
        div1.style.display = 'block';
        div2.style.display = 'none'
    } 
};



document.getElementById('close1').onclick = function() {
   
    div1.style.display = 'none';
}

function closeEditDiv(x) {
    document.getElementById(x).style.display = "none";
    
  }







/*document.getElementById('button4').onclick = function() {
    
    if (div4.style.display === 'none' || div4.style.display === '') {
        div4.style.display = 'block';
        div3.style.display = 'none'
    } 
};*/

/*document.getElementById('close3').onclick = function() {
   
    div3.style.display = 'none';
}

document.getElementById('close4').onclick = function() {
    
    div4.style.display = 'none';
}*/

var today = new Date().toISOString().split('T')[0];


var dateInputs = document.querySelectorAll('input[type="date"]');


dateInputs.forEach(function(input) {
    input.value = today;
});







function validatePassword2() {

const password2 = document.getElementById('password2').value;
const confirmPassword2 = document.getElementById('confirmPassword2').value;
const message2 = document.getElementById('message2');


if (password2 === confirmPassword2) {
    message2.textContent = 'Passwords match.';
    message2.className = 'success';
    update();
    return false; 
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
                    label: 'Number of Chalets',
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
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Number of Chalets in ' + locations[context.dataIndex] + ': ' + context.raw;
                            }
                        }
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

document.addEventListener('DOMContentLoaded', (event) => {
    fetchChalets();
});


    
    // Function to fetch and display chalets
    function fetchChalets(page = 1, perPage = 10, event) {
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
                                    <button class="btn btn-sm btn-outline-secondary badge btn-blue edit-btn" id="edit-${chalet.id}" data-id="${chalet.id}" >Edit</button>

                                    <button class="btn btn-sm btn-outline-secondary badge btn-red delete-btn" id="delete-${chalet.id}" data-id="${chalet.id}">Delete</button>
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
                    document.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', function(event) {
                            const chaletId = this.getAttribute('data-id');
                            deleteChalet(chaletId);
                            event.preventDefault();
                        });
                    });
                    document.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', function(event) {
                            const chaletId = this.getAttribute('data-id');
                            const chaletname = this.getAttribute('data-name');
                            const location = this.getAttribute('data-location');
                            const date = this.getAttribute('data-date');
                            EditChalet(chaletId);
                            event.preventDefault();
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
    

    // Handle pagination clicks
    document.querySelector('.pagination').addEventListener('click', function(event) {
        if (event.target.classList.contains('page-link')) {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            fetchChalets(page);
        }
    });



function createChalet(event) {
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
            const message1 = "message1";
            alert(data.message); // Show success message
            resetCreateChaletForm(); // Reset form fields
            fetchChalets();
            
            setDefaultDate();
        } else {
            alert(data.message); // Show error message
        }
    })
    .catch(error => {
        console.error('Error creating chalet:', error);
        // Handle errors if any
    });
    event.preventDefault();
}

// Function to reset form fields in CreateChalet form
function resetCreateChaletForm() {
    document.getElementById('createChaletForm').reset();
}



function clearPasswordMessage(m) {
    const message = document.getElementById(m);
    message.textContent = '';
    message.className = '';
}


function setDefaultDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(function(input) {
        input.value = today;
    });
}
     
function EditChalet(chaletId) {
    fetch(`get_chalet_data.php?chaletId=${chaletId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const chalet = data.chalet;
                const ownerIds = data.owners;

                document.querySelector('#chaletId').value = chaletId;
                document.querySelector('#Edit input[name="name"]').value = chalet.name;
                document.querySelector('#Edit input[name="Location"]').value = chalet.location;
                document.querySelector('#Edit #date2').value = chalet.date;
                document.querySelector('#Edit input[name="price"]').value = chalet.price;
                document.querySelector('#Edit input[name="Owner_Id"]').value = ownerIds;
                div2.style.display = "block";
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching chalet data:', error);
            alert('An error occurred while fetching chalet data.');
        });
}

function update(event) {
    // Get the values from the input fields
    const chaletId = document.querySelector('#Edit input[name="chaletId"]').value;
    const chaletName = document.querySelector('#Edit input[name="name"]').value;
    const location = document.querySelector('#Edit input[name="Location"]').value;
    const date = document.querySelector('#Edit #date2').value;
    const price = document.querySelector('#Edit input[name="price"]').value;
    const ownerIds = document.querySelector('#Edit input[name="Owner_Id"]').value;

    // Create an object with the data
    const data = {
        chaletId: chaletId,
        name: chaletName,
        location: location,
        date: date,
        price: price,
        owner_ids: ownerIds
    };

    // Send the data to the server using fetch (AJAX request)
    fetch('update_chalet.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const message2 = "message2";
            alert('Chalet updated successfully!');
            // Optionally, hide the modal and refresh the chalet list
            document.getElementById("Edit").style.display = "none";
            
            fetchChalets();
        } else {
            alert(data.message || 'Failed to update chalet.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    event.preventDefault();
}


// Function to handle search input
function searchChalets() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('chalets_table');
    const rows = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
        let shouldDisplay = false;
        const cells = rows[i].getElementsByTagName('td');

        // Check each cell in the current row
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const textValue = cell.textContent || cell.innerText;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    shouldDisplay = true;
                    break;
                }
            }
        }

        // Toggle display of the row based on search match
        if (shouldDisplay) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Event listener for input field to trigger search
document.getElementById('searchInput').addEventListener('input', searchChalets);

--
$(document).ready(function() {
    var currentPage = 1; // Variable to store current page state

    // Function to fetch user data from fetch_users.php
    function fetchUsers() {
        fetch('fetch_users.php')
            .then(response => response.json())
            .then(data => {
                let html = '';
                data.forEach(user => {
                    html += `<tr data-user-id="${user.id}">
                                <td>${user.id}</td>
                                <td>${user.first_name}</td>
                                <td>${user.last_name}</td>
                                <td>${user.phone_number}</td>
                                <td>${user.email}</td>
                                <td><input type="password" class="form-control passwordField" value="${user.password}" readonly><button class="btn btn-sm togglePassword">Show</button></td>
                                <td>
                                    <button class="btn btn-success btn-sm saveBtn" style="display:none;">Save</button>
                                    <button class="btn btn-warning btn-sm editBtn">Edit</button>
                                    <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
                                </td>
                            </tr>`;
                });
                $('#userTableBody').html(html);

                // Re-initialize search, pagination, edit, and delete functionality after fetching new data
                initSearch();
                initPagination();
                initEdit();
                initDelete();

                // Ensure pagination stays on the current page
                showPage(currentPage);
            })
            .catch(error => console.error('Error fetching users:', error));
    }

    // Initial fetch of users and setup search, pagination, edit, and delete functionality when the page loads
    fetchUsers();

    // Password visibility toggle
    $(document).on('click', '.togglePassword', function() {
        var $passwordField = $(this).prev('.passwordField');
        var type = $passwordField.attr('type') === 'password' ? 'text' : 'password';
        $passwordField.attr('type', type);
        $(this).text(type === 'password' ? 'Show' : 'Hide');
    });

    // Initialize search functionality
    function initSearch() {
        $("#searchInput2").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#userTableBody tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });

            // Re-initialize pagination when search input is empty
            if (value === '') {
                initPagination();
            }
        });
    }

    // Pagination setup
    function initPagination() {
        var rowsPerPage = 2;
        var $userTableBody = $('#userTableBody');
        var totalRows = $userTableBody.find('tr').length;
        var numPages = Math.ceil(totalRows / rowsPerPage);

        // Show first page by default
        showPage(currentPage);

        // Pagination click event
        $(document).off('click', '.page-link').on('click', '.page-link', function(e) {
            e.preventDefault();
            var page = $(this).text();
            showPage(page);
        });

        function showPage(page) {
            $userTableBody.find('tr').hide();
            var start = (page - 1) * rowsPerPage;
            var end = start + rowsPerPage;
            $userTableBody.find('tr').slice(start, end).show();

            // Update active page link
            $('.page-item').removeClass('active');
            $('.page-link:contains(' + page + ')').parent().addClass('active');

            // Update current page variable
            currentPage = page;

            // Handle Previous and Next buttons
            $('#prevPage').toggleClass('disabled', page === '1');
            $('#nextPage').toggleClass('disabled', page === numPages.toString());
        }

        // Generate pagination links
        var paginationHtml = '';
        for (var i = 1; i <= numPages; i++) {
            paginationHtml += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
        }
        $('.pagination').html(paginationHtml);
    }

    // Edit functionality
    function initEdit() {
        $(document).off('click', '.editBtn').on('click', '.editBtn', function() {
            var $row = $(this).closest('tr');
            $row.find('.passwordField').prop('readonly', false); // Enable editing for password field only
            $row.find('.saveBtn').show();
            $(this).hide();
            $row.find('.deleteBtn').hide(); // Hide delete button while editing
        });

        $(document).off('click', '.saveBtn').on('click', '.saveBtn', function() {
            var $row = $(this).closest('tr');
            var userId = $row.data('user-id');
            var newPassword = $row.find('.passwordField').val();

            // Send update request to server
            fetch(`update_user.php?id=${userId}&password=${newPassword}`, {
                method: 'PUT'
            })
            .then(response => response.json())
            .then(data => {
                // Handle success response
                console.log('User updated successfully:', data);
                // Re-fetch users to update table and maintain pagination
                fetchUsers();
                alert('Changes saved');
                // Show edit button after save
                $row.find('.editBtn').show();
                $row.find('.deleteBtn').show();
                $row.find('.saveBtn').hide();
                $row.find('.passwordField').prop('readonly', true); // Disable editing after save
            })
            .catch(error => console.error('Error updating user:', error));
        });
    }

    // Delete functionality
    function initDelete() {
        $(document).off('click', '.deleteBtn').on('click', '.deleteBtn', function() {
            var $row = $(this).closest('tr');
            var userId = $row.data('user-id');

            if (confirm('Are you sure you want to delete this user?')) {
                // Perform delete operation using fetch
                fetch(`delete_user.php?id=${userId}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    // Handle success response
                    console.log('User deleted successfully:', data);
                    // Re-fetch users to update table and maintain pagination
                    fetchUsers();
                })
                .catch(error => console.error('Error deleting user:', error));
            }
        });
    }
});











