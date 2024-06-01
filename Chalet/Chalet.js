document.addEventListener("DOMContentLoaded", function() {
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  const today = new Date().toISOString().split('T')[0];
  
  checkinInput.setAttribute('min', today);
  checkoutInput.setAttribute('min', today);
  
  checkinInput.addEventListener('change', function() {
    const checkinDate = checkinInput.value;
    checkoutInput.setAttribute('min', checkinDate);
  });
});
  
  /*// Initialize and add the map
  function initMap() {
    // The location
    var location = {lat: -25.344, lng: 131.036};  // Coordinates for Uluru, Australia
    // The map, centered at location
    var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: location});
    // The marker, positioned at location
    var marker = new google.maps.Marker({position: location, map: map});
  }*/