const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#weather-forecast");

const apiKey = "cf8cfddb4ae7caaddbdcffc1620f3269";
const latitude = -34.1708;
const longitude = -70.7444;
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5";

async function getWeather() {
    try {
        if (apiKey === "YOUR_OPENWEATHERMAP_API_KEY") {
            throw new Error("Add your OpenWeatherMap API key in weather.js.");
        }

        const query = `lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${apiKey}`;
        const currentResponse = await fetch(`${weatherBaseUrl}/weather?${query}`);
        const forecastResponse = await fetch(`${weatherBaseUrl}/forecast?${query}`);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data is currently unavailable.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        currentWeather.innerHTML = `<p class="weather-error">${error.message}</p>`;
        forecastContainer.innerHTML = "<li>Forecast unavailable</li>";
    }
}

function displayCurrentWeather(data) {
    currentWeather.innerHTML = `
        <p class="temperature">${Math.round(data.main.temp)}&deg;C</p>
        <p class="description">${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
    const timezoneOffset = data.city.timezone;
    const currentLocalDate = getLocalDateKey(Date.now() / 1000, timezoneOffset);
    const dailyForecasts = new Map();

    data.list.forEach((forecast) => {
        const dateKey = getLocalDateKey(forecast.dt, timezoneOffset);
        const localHour = getLocalHour(forecast.dt, timezoneOffset);

        if (dateKey !== currentLocalDate) {
            const savedForecast = dailyForecasts.get(dateKey);

            if (!savedForecast || Math.abs(localHour - 12) < Math.abs(savedForecast.localHour - 12)) {
                dailyForecasts.set(dateKey, { ...forecast, localHour });
            }
        }
    });

    const nextThreeDays = [...dailyForecasts.values()].slice(0, 3);

    forecastContainer.innerHTML = nextThreeDays.map((forecast) => {
        const localDate = new Date((forecast.dt + timezoneOffset) * 1000);
        const day = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            timeZone: "UTC"
        }).format(localDate);

        return `
            <li>
                <strong>${day}</strong>
                <span>${Math.round(forecast.main.temp)}&deg;C</span>
            </li>
        `;
    }).join("");
}

function getLocalDateKey(timestamp, timezoneOffset) {
    return new Date((timestamp + timezoneOffset) * 1000).toISOString().slice(0, 10);
}

function getLocalHour(timestamp, timezoneOffset) {
    return new Date((timestamp + timezoneOffset) * 1000).getUTCHours();
}

getWeather();
