const api = {
  key: "5585df2bff792a8556e3fda6c5eda943",
  base: "https://api.openweathermap.org/data/2.5/",
  location_api: "0f761a30-fe14-11e9-b59f-e53803842572",
};
let weather = {};
let mainClass = "";
const app_container = document.getElementById("app_container");
const weather_location = document.getElementById("location");
const date = document.getElementById("date");
const temperature_current = document.getElementById("temperature_current");
const temperature_max_min = document.getElementById("temperature_max_min");
const _weather = document.getElementById("weather");
const weather_desc = document.getElementById("weather_desc");

const getWeatherData=(city)=>{
  fetch(
    `${api.base}weather?q=${city}&units=metric&appid=${api.key}`
  )
    .then((res) => res.json())
    .then((result) => {
      weather = { ...result };
      fill_data(weather);

      console.log(result);
    });
};

document.addEventListener("readystatechange", (e) => {
  if (e.target.readyState === "complete") {
    console.log("ready");
    firstCall();
    AddSearchListner();
  }
});

const AddSearchListner = () => {
  let location_input = document.getElementById("location_input");
  location_input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let location_search = location_input.value;
      getWeatherData(location_search);
    }
  });
};

const firstCall = () => {
  fetch("https://geolocation-db.com/json/" + api.location_api)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      getWeatherData(result.city);
     
    });
};

const fill_data = (weather) => {
  mainClass =
    typeof weather.main != "undefined"
      ? weather.main.temp > 18
        ? "hot"
        : "cold"
      : "";

  app_container.className = mainClass;
  weather_location.textContent = weather.name + " , " + weather.sys.country;
  date.textContent = dateBuild(new Date());
  temperature_current.textContent =
    "Current Temparature:" + Math.round(weather.main.temp) + "°C";
  temperature_max_min.textContent =
    "High:" +
    Math.round(weather.main.temp_max) +
    "°C / Low:" +
    Math.round(weather.main.temp_min) +
    "°C";
  _weather.textContent = weather.weather[0].main;
  weather_desc.textContent =
    weather.weather[0].description + " , wind speed is " + weather.wind.speed;
};
const dateBuild = (d) => {
  let date = String(new window.Date());
  date = date.slice(3, 15);
  return date;
};
