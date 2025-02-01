const apiKey = "db3e1653c5c1ea294133cc3e25dd9ce5"; // API key

// Function to fetch weather data based on city name
async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please try again.");
      return;
    }

    displayWeather(data);
  } catch (error) {
    alert("Error fetching data. Please try again later.");
  }
}

// Function to fetch weather based on geolocation
async function fetchWeatherByGeolocation(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert("Error fetching data. Please try again later.");
  }
}

// Function to display weather data
function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const weatherDescription = document.getElementById("weatherDescription");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const unit = document.getElementById("unit");

  cityName.innerText = data.name;
  weatherDescription.innerText = data.weather[0].description;
  temperature.innerText = data.main.temp;
  humidity.innerText = data.main.humidity;
  windSpeed.innerText = data.wind.speed;
  unit.innerText = "C"; // Default to Celsius

  // Show weather data
  document.getElementById("weatherData").style.display = "block";
}

// Event listener for city search
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeather(city);
  }
});

// Event listener for geolocation
document.getElementById("geolocationBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByGeolocation(lat, lon);
      },
      () => alert("Geolocation is not supported or permission denied.")
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

// Toggle between Celsius and Fahrenheit
document.getElementById("toggleUnit").addEventListener("click", () => {
  const unit = document.getElementById("unit").innerText;
  let temperature = parseFloat(document.getElementById("temperature").innerText);

  if (unit === "C") {
    // Convert Celsius to Fahrenheit
    temperature = (temperature * 9) / 5 + 32;
    document.getElementById("temperature").innerText = temperature.toFixed(2);
    document.getElementById("unit").innerText = "F";
  } else {
    // Convert Fahrenheit to Celsius
    temperature = (temperature - 32) * (5 / 9);
    document.getElementById("temperature").innerText = temperature.toFixed(2);
    document.getElementById("unit").innerText = "C";
  }
});

// Default city (Gurugram) to show data initially
fetchWeather("Gurugram");
