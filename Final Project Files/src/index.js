document.addEventListener("DOMContentLoaded", function changeDate() {
  let h3 = document.querySelector("h3");

  let now = new Date();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes();

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];

  h3.innerHTML = `${hour}:${minutes} ${day} ${month} ${date}, ${year}`;
});

let apiKey = `cabdbda40038ba7d1165b953b1c7bd6c`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-engine");
  let changeCity = document.querySelector("h1");
  changeCity.textContent = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;
  searchInput.value = "";
  axios.get(apiUrl).then((response) => {
    changeDescription(response);
    changeHumidity(response);

    changeFeelsLike(response);
    changeWind(response);
    changeTemp(response);
  });
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function changeTemp(response) {
  console.log(response.data.main.temp);
  let wholeTemp = document.querySelector("#big-temp");
  let temperature = Math.round(response.data.main.temp);
  wholeTemp.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios
    .get(apiUrlPosition)
    .then(changeTemp)
    .then(changeDescription)
    .then(changeHumidity)
    .then(changeFeelsLike)
    .then(changeWind);
}

function changeDescription(response) {
  console.log(response.data.weather[0].description);
  let weatherPattern = document.querySelector("#weather-pattern");
  let description = response.data.weather[0].description;
  weatherPattern.innerHTML = `${description}`;
}

function changeHumidity(response) {
  console.log(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
}

function changeFeelsLike(response) {
  console.log(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${response.data.main.feels_like}`;
}

function changeWind(response) {
  console.log(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windSpeed}`;
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#position-button");
button.addEventListener("click", getCurrentPosition);
