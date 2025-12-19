const apiKey = 'API_KEY';

function showweatherDetails(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetchDataByUrl(cityUrl)
}

function showWeatherByLocation() {
    if (navigator.geolocation) {
        // Attempt to get the current position
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude
            lon = position.coords.longitude
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchDataByUrl(geoUrl)
        }, showError);
    } else {
        // Geolocation is not supported by the browser
        alert("Geolocation is not supported by this browser.");
    }
}

function showError(error) {
    // Handle various error cases
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function fetchDataByUrl(apiUrl) {

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<h2>Weather in ${data.name}</h2>
                              <p>Temperature: ${data.main.temp} &#8451;</p>
                              <p>Weather: ${data.weather[0].description}</p>`;
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Failed to fetch weather. Please try again.</p>`;
        });
}


document.getElementById('weatherForm').addEventListener('submit', showweatherDetails);
document.getElementById('btnlocation').addEventListener('click', showWeatherByLocation)