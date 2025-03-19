const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API Key

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    const weatherResult = document.getElementById("weatherResult");

    if (!city) {
        weatherResult.innerHTML = "<p>Please enter a city name.</p>";
        weatherResult.style.display = "block";
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found!");
        }
        const data = await response.json();

        // Extract necessary data
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // Display weather info
        weatherResult.innerHTML = `
            <h2>${city.toUpperCase()}</h2>
            <img src="${icon}" alt="Weather Icon">
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;
        weatherResult.style.display = "block";
    } catch (error) {
        weatherResult.innerHTML = `<p>${error.message}</p>`;
        weatherResult.style.display = "block";
    }
}
