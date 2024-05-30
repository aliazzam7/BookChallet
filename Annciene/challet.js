/*const calendarGrid = document.getElementById('calendarGrid');
const yearMonth = document.getElementById('yearMonth');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    yearMonth.textContent = `${year} ${new Date(year, month).toLocaleString('default', { month: 'long' })}`;

    calendarGrid.innerHTML = `
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
    `;

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const className = getDayClassName(day);
        calendarGrid.innerHTML += `<div class="${className}" onclick="toggleBooking(this)" ondblclick="makeAvailable(this)">${day}</div>`;
    }
}

function getDayClassName(day) {
    // Example logic for assigning classes, you can customize this based on your needs
    if (day % 5 === 0) return 'booked';
    if (day % 7 === 0) return 'pending';
    return 'available';
}

function toggleBooking(dayElement) {
    if (dayElement.classList.contains('available')) {
        dayElement.classList.remove('available');
        dayElement.classList.add('booked');
    }
}

function makeAvailable(dayElement) {
    if (dayElement.classList.contains('booked')) {
        dayElement.classList.remove('booked');
        dayElement.classList.add('available');
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
});
*/
//2 code 
/*
const calendarGrid = document.getElementById('calendarGrid');
const yearMonth = document.getElementById('yearMonth');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    yearMonth.textContent = `${year} ${new Date(year, month).toLocaleString('default', { month: 'long' })}`;

    calendarGrid.innerHTML = `
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
    `;

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarGrid.innerHTML += `<div class="available" onclick="toggleBooking(this)" ondblclick="makeAvailable(this)">${day}</div>`;
    }
}

function toggleBooking(dayElement) {
    if (dayElement.classList.contains('available')) {
        dayElement.classList.remove('available');
        dayElement.classList.add('booked');
    }
}

function makeAvailable(dayElement) {
    if (dayElement.classList.contains('booked')) {
        dayElement.classList.remove('booked');
        dayElement.classList.add('available');
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
});
*/

//3 code
const calendarGrid = document.getElementById('calendarGrid');
const yearMonth = document.getElementById('yearMonth');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar(month, year) {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    yearMonth.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

    // Reset the calendar
    calendarGrid.innerHTML = `
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
    `;

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += '<div></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarGrid.innerHTML += `<div class="available" onclick="toggleBooking(this)" ondblclick="makeAvailable(this)">${day}</div>`;
    }
}

function toggleBooking(dayElement) {
    if (dayElement.classList.contains('available')) {
        dayElement.classList.remove('available');
        dayElement.classList.add('booked');
    }
}

function makeAvailable(dayElement) {
    if (dayElement.classList.contains('booked')) {
        dayElement.classList.remove('booked');
        dayElement.classList.add('available');
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentMonth, currentYear);
});