// update the current date and time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${currentDay}, ${hours}:${minutes}`;

// library

//let locationInput = document.querySelector("#location-input");
let currentTemperature = document.querySelector(".temperature");
let apiKey = "5ea5bf71af2f79fa3116e3b7d34b1266";
let city = document.querySelector("#city");
let humidity = document.querySelector("#humidity-value");
let wind = document.querySelector("#wind-value");

// get real time temperature in C - tbc

function currentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function updateTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    currentTemperature.innerHTML = `${temperature}`;
    let cityName = response.data.name;
    city.innerHTML = cityName;
    let humidityValue = response.data.main.humidity;
    humidity.innerHTML = humidityValue;
    let windValue = Math.round(response.data.wind.speed);
    wind.innerHTML = windValue;
  });
}

city.innerHTML = navigator.geolocation.getCurrentPosition(currentCity);

// display city search - OK

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;
  document.querySelector("#wind-value").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(cityInput) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#location-input").value;
  searchCity(cityInput);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Zürich");

// Use current button

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);
