function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
  }
  function flipCard() {
    document.getElementById('cards').classList.toggle('flipped');
  }
   // JavaScript to set the minimum date for the date input field to today
   document.addEventListener('DOMContentLoaded', function() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById('date').setAttribute('min', today);
  });