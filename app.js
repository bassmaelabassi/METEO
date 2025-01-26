const apiKey = "92501781fe959a44d22301991297314b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiforecast = "https://api.openweathermap.org/data/2.5/forecast";
const searchField = document.querySelector('#city-search');
const searchBtn = document.querySelector('#search-btn');
const weatherCards = document.querySelector('.forecast-timeline');

function getIcon(weatherCode) {
    const iconMap = {
        800: 'amcharts_weather_icons_1.0.0/animated/day.svg',
        801: 'amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg',
        802: 'amcharts_weather_icons_1.0.0/animated/cloudy-day-2.svg',
        803: 'amcharts_weather_icons_1.0.0/animated/cloudy-day-3.svg',
        804: 'amcharts_weather_icons_1.0.0/animated/cloudy.svg',
        500: 'amcharts_weather_icons_1.0.0/animated/rainy-1.svg',
        // ... بقية الأيقونات
    };
    return iconMap[weatherCode] || iconMap[800];
}

async function check(cityname) {
    try {
        const result = await fetch(apiUrl + cityname + `&appid=${apiKey}`);
        if (!result.ok) {
            throw new Error("City not found");
        }
        const data = await result.json();
        document.querySelector('.cityname').innerHTML = data.name;
        document.querySelector(".temp-value").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".windS").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".windD").innerHTML = data.wind.deg;
        document.querySelector(".hum").innerHTML = data.main.humidity + " %";
        document.querySelector(".vis").innerHTML = data.visibility + " m";
        document.querySelector(".pre").innerHTML = data.main.pressure + " hPa";
    } catch (error) {
        alert("Error: " + error.message);
    }
}

async function forecast(cityname) {
    try {
        const forecastResult = await fetch(`${apiforecast}?q=${cityname}&appid=${apiKey}&units=metric`);
        if (!forecastResult.ok) {
            throw new Error("Forecast not available");
        }
        const forecastData = await forecastResult.json();
        weatherCards.innerHTML = "";
        forecastData.list.forEach((item, index) => {
            if (index % 8 === 0) {
                const card = document.createElement("div");
                card.classList.add("card", "text-center", "m-1");
                const date = new Date(item.dt_txt);
                const dayName = date.toLocaleDateString("en-EN", { weekday: "short" });
                const dayTemp = Math.round(item.main.temp);
                const weatherCode = item.weather[0].id;
                card.innerHTML = `
                    <div class="card-body">
                        <h6 class="card-title">${dayName}</h6>
                        <img src="${getIcon(weatherCode)}" class="card-img-top" style="max-height: 70px; object-fit: contain;">
                        <p class="card-text">${dayTemp}°C</p>
                    </div>
                `;
                weatherCards.appendChild(card);
            }
        });
    } catch (error) {
        alert("Error: " + error.message);
    }
}

searchBtn.addEventListener('click', () => {
    const cityname = searchField.value;
    if (cityname) {
        check(cityname);
        forecast(cityname);
    } else {
        alert("Please enter a city name.");
    }
});
