// Google Maps initialization with the user’s latitude and longitude
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

// Function to get weather data from OpenWeatherMap API
// Function to get weather data from OpenWeatherMap API
function getWeatherData(latitude, longitude) {
    const apiKey = "638fc1452091c8bda0337a9f55a6089f"; // Your OpenWeatherMap API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
        .then((response) => {
            if (!response.ok) {
                // Check if response is OK (status 200-299)
                throw new Error("Failed to fetch weather data. Status code: " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data); // Log the actual weather data to see it in the console

            // Check if the response contains valid data
            if (data.cod !== 200) {
                throw new Error("Weather data fetch error: " + data.message);
            }

            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            // Display weather data on the webpage
            document.getElementById("weatherDescription").innerText = `Weather: ${weather}`;
            document.getElementById("temperature").innerText = `Temperature: ${temperature}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
            document.getElementById("windSpeed").innerText = `Wind Speed: ${windSpeed} m/s`;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Unable to fetch weather data: " + error.message);
        });
}


// Fetch user's geolocation and display on the map, also get weather information
navigator.geolocation.getCurrentPosition(
    (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Display the user's latitude and longitude on the page
        document.getElementById("location").innerHTML = `Latitude: ${latitude} <br>Longitude: ${longitude}`;

        // Initialize map with user's location
        initMap(latitude, longitude);

        // Fetch and display weather data
        getWeatherData(latitude, longitude);
    },
    (error) => {
        document.getElementById("location").innerHTML = `Error: ${error.message}`;
    }
);
