const API_KEY = 'ecd0a29645a0b5cd92c98317a533d702';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const AIR_QUALITY_API_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';
const GEOCODING_API_URL = 'https://api.openweathermap.org/geo/1.0/reverse';

let currentWeatherData = null;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherContainer = document.getElementById('weatherContainer');
const initialMessage = document.getElementById('initialMessage');

function showLoading() {
    loadingSpinner.style.display = 'block';
    searchBtn.disabled = true;
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
    searchBtn.disabled = false;
}

function capitalizeWords(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
}

function getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getAQILabel(aqi) {
    const labels = {
        1: 'Good',
        2: 'Fair', 
        3: 'Moderate',
        4: 'Poor',
        5: 'Very Poor'
    };
    return labels[aqi] || 'Unknown';
}

function updateAgriculturalInsights(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    const cropConditions = document.getElementById('cropConditions');
    const irrigationNeeds = document.getElementById('irrigationNeeds');

    // Crop conditions analysis
    if (humidity > 60 && temp > 15 && temp < 30) {
        cropConditions.innerHTML = '🌱 <strong>Excellent conditions</strong> for crop growth. Temperature and humidity are optimal.';
        cropConditions.className = 'insight-card good';
    } else if (temp < 5 || temp > 35) {
        cropConditions.innerHTML = '⚠️ <strong>Extreme temperature</strong> detected. Monitor crops closely for stress signs.';
        cropConditions.className = 'insight-card warning';
    } else {
        cropConditions.innerHTML = '📊 <strong>Moderate conditions</strong> for crop growth. Monitor weather changes.';
        cropConditions.className = 'insight-card moderate';
    }

    // Irrigation needs analysis
    if (humidity < 30) {
        irrigationNeeds.innerHTML = '💧 <strong>High irrigation needed</strong> - Low humidity detected. Increase watering frequency.';
        irrigationNeeds.className = 'insight-card warning';
    } else if (humidity > 80) {
        irrigationNeeds.innerHTML = '☔ <strong>Reduce irrigation</strong> - High humidity levels. Risk of overwatering.';
        irrigationNeeds.className = 'insight-card moderate';
    } else {
        irrigationNeeds.innerHTML = '✅ <strong>Normal irrigation</strong> schedule is adequate. Humidity levels are good.';
        irrigationNeeds.className = 'insight-card good';
    }
}

function processWeatherData(weatherData, airQualityData) {

    currentWeatherData = weatherData;
    
    const cityName = document.getElementById('cityName');
    const countryName = document.getElementById('countryName');
    const weatherIcon = document.getElementById('weatherIcon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    
    cityName.textContent = weatherData.name;
    countryName.textContent = weatherData.sys.country;

    temperature.textContent = `${Math.round(weatherData.main.temp)}°C`;
    description.textContent = capitalizeWords(weatherData.weather[0].description);
    
    weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
    weatherIcon.alt = weatherData.weather[0].description;
    
    const airQuality = document.getElementById('airQuality');
    const realFeel = document.getElementById('realFeel');
    const humidity = document.getElementById('humidity');
    const highTemp = document.getElementById('highTemp');
    const lowTemp = document.getElementById('lowTemp');
    const windSpeed = document.getElementById('windSpeed');
    const windDirection = document.getElementById('windDirection');
    const visibility = document.getElementById('visibility');
    const pressure = document.getElementById('pressure');
    const sunrise = document.getElementById('sunrise');
    const sunset = document.getElementById('sunset');


    realFeel.textContent = `${Math.round(weatherData.main.feels_like)}°C`;
    humidity.textContent = `${weatherData.main.humidity}%`;
    highTemp.textContent = `${Math.round(weatherData.main.temp_max)}°C`;
    lowTemp.textContent = `${Math.round(weatherData.main.temp_min)}°C`;
    windSpeed.textContent = `${weatherData.wind.speed} m/s`;
    windDirection.textContent = getWindDirection(weatherData.wind.deg);
    visibility.textContent = `${(weatherData.visibility / 1000).toFixed(1)} km`;
    pressure.textContent = `${weatherData.main.pressure} hPa`;
    sunrise.textContent = formatTime(weatherData.sys.sunrise);
    sunset.textContent = formatTime(weatherData.sys.sunset);

    if (airQualityData && airQualityData.list && airQualityData.list[0]) {
        const aqi = airQualityData.list[0].main.aqi;
        airQuality.textContent = getAQILabel(aqi);
    } else {
        airQuality.textContent = 'Not Available';
    }

    updateAgriculturalInsights(weatherData);

    weatherContainer.style.display = 'block';
}

async function searchWeather(city) {
    showLoading();
    errorMessage.style.display = 'none';
    weatherContainer.style.display = 'none';

    try {

        const weatherUrl = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error('City not found. Please check the city name.');
        }
        const weatherData = await weatherResponse.json();

        const aqiUrl = `${AIR_QUALITY_API_URL}?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${API_KEY}`;
        const aqiResponse = await fetch(aqiUrl);
        if (!aqiResponse.ok) {
            throw new Error('City not found. Please check the city name.');
        }
        const airQualityData = await aqiResponse.json();

        processWeatherData(weatherData, airQualityData);
        
    } catch (error) {
        console.error('Weather API Error:', error);
        errorMessage.textContent = error.message;
        errorMessage.style.display = 'block';
    } finally {
        hideLoading();
    }
}

function detectUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async function(position) {
                try {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    const geoUrl = `${GEOCODING_API_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
                    
                    const response = await fetch(geoUrl);
                    if (response.ok) {
                        const [locationData] = await response.json();
                        if (locationData) {
                            searchInput.value = locationData.name;
                            // searchWeather(locationData.name);
                        }
                    }
                } catch (error) {
                    console.log('Could not get location name:', error);
                    searchInput.value = 'Sylhet';
                }
            },
            function(error) {
                console.log('Geolocation error:', error);
                searchInput.value = 'Sylhet';
            }
        );
    } else {
        searchInput.value = 'Sylhet';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    searchBtn.addEventListener('click', () => {
        initialMessage.style.display = 'none';
        const city = searchInput.value.trim();
        if (!city) {
            errorMessage.textContent = 'Please enter a city name';
            errorMessage.style.display = 'block';
            return;
        }
            
        searchWeather(city);
    });

    detectUserLocation();
});

initialMessage.style.display = 'block';