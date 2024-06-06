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


document.getElementById('button2').onclick = function() {
    
    if (div2.style.display === 'none' || div2.style.display === '') {
        div2.style.display = 'block';
        div1.style.display = 'none'
    } 
};

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


function validatePassword1() {

const password1 = document.getElementById('password1').value;
const confirmPassword1 = document.getElementById('confirmPassword1').value;
const message1 = document.getElementById('message1');


if (password1 === confirmPassword1) {
    message1.textContent = 'Passwords match.';
    message1.className = 'success';
    return true;
} else {
    message1.textContent = 'Passwords do not match.';
    message1.className = 'error';
    return false; 
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





const ctx1 = document.getElementById('costChart').getContext('2d');
        const costChart = new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                datasets: [{
                    label: 'Mean Cost',
                    data: [300, 50, 100, 75],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
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
                                return tooltipItem.label + ': $' + tooltipItem.raw;
                            }
                        }
                    }
                }
            }
        });

        // Bar chart
        const ctx2 = document.getElementById('ageChart').getContext('2d');
        const ageChart = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ['0-18', '19-30', '31-50', '51+'],
                datasets: [{
                    label: 'User Ages',
                    data: [50, 100, 75, 25],
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





         // Data for the chart
         const countries = ['France', 'Switzerland', 'Austria', 'Italy', 'Germany'];
        const numberOfChalets = [120, 95, 80, 65, 50];

        // Create the chart
        const ctx = document.getElementById('chaletCountChart').getContext('2d');
        const chaletsChart = new Chart(ctx, {
            type:'bar',  // Type of chart is bar
            data: {
                labels: countries,  // Labels for the horizontal axis
                datasets: [{
                    label: 'Number of Chalets',
                    data: numberOfChalets,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 3
                }]
            },
            options: {
                indexAxis: 'y',  // This option makes the bar chart horizontal
                scales: {
                    x: {
                        beginAtZero: true  // Ensure the x-axis starts at zero
                    }
                }
            }
        });

        