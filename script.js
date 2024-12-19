function initMap(latitude, longitude) {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });
  
    const marker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map,
    });
  }
  
  // Update the location fetching code to show the map
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      document.getElementById("location").innerHTML = `Latitude: ${latitude} <br>Longitude: ${longitude}`;
      
      initMap(latitude, longitude);  // Initialize map with user's location
    },
    (error) => {
      document.getElementById("location").innerHTML = `Error: ${error.message}`;
    }
  );
  