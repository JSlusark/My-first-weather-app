// Current date and time - DONE
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthcycle = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let now = new Date();
let day = now.getDate();
let weekday = week[now.getDay()];
let month = monthcycle[now.getMonth()];
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
let time = (`0` + hours).slice(-2) + `:` + (`0` + minutes).slice(-2);

let lineOneRight = document.querySelector("#line1r");
let lineTwoRight = document.querySelector("#line2r");

lineOneRight.innerHTML = `${day} ${month} ${year}`;
lineTwoRight.innerHTML = `${weekday}, ${time}`;
//________________________________________________

// nextdays
let temp1 = document.querySelector("#t1");
let temp2 = document.querySelector("#t2");
let temp3 = document.querySelector("#t3");
let temp4 = document.querySelector("#t4");
let temp5 = document.querySelector("#t5");
let temp6 = document.querySelector("#t6");
let cityTitle = document.querySelector("#citytitle"); // Berlin
let mainTempertature = document.querySelector("#mainTemp");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let weather = document.querySelector("#weather");
let fahrenight = document.querySelector("#F");
let celsius = document.querySelector("#C");
let apiKey = "appid=f5029b784306910c19746e40c14d6cd3";
let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?`;
let weatherIcon = document.querySelector("#weathericon");
let apiIcon = `https://openweathermap.org/img/wn/`; //+ 01.png

// Daily Forecast fuction
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  forecast.slice(1).forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col week">
  <p class="dayname">${formatDay(forecastDay.dt)}</p>
  <div> <img
    src="${apiIcon}${forecastDay.weather[0].icon}@2x.png"
    alt="cloudy"
    class="weathericon"
  />
  </div>
  <span class="ptemp"><span id="t1">${Math.round(
    forecastDay.temp.min
  )}</span>°</span>
  <span class="ptemp"><span id="t1">${Math.round(
    forecastDay.temp.max
  )}</span>°</span>
</div>
`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

//show days of week insetad of numbers
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Show today temperature for cityTitle
function cityTemperature(response) {
  let searchedCityTemp = Math.round(response.data.main.temp);
  cityTitle.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed * 1.852); // check if accurate kts
  weather.innerHTML = response.data.weather[0].description;
  console.log("humidity: " + response.data.main.humidity);
  console.log("wind: " + response.data.wind.speed);
  console.log("weather: " + response.data.weather[0].description);
  mainTempertature.innerHTML = searchedCityTemp;
  let mainIcon = apiIcon + response.data.weather[0].icon + "@2x.png";
  console.log(response.data.weather[0].icon);
  weatherIcon.setAttribute("src", `${mainIcon}`);
  console.log(
    "cityTitle: " + cityTitle.innerHTML + " City Temp: " + searchedCityTemp
  );
  //get info from daily api called with response's lat and lon
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  console.log(response.data);
  console.log("lat: " + lat);
  console.log("lon: " + lon);
  let apiOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&${apiKey}&units=metric`;
  axios.get(apiOneCall).then(displayForecast);
}

//Type of cityTitles
//1. Pre-defined
axios
  .get(`${apiGeocode}q=${cityTitle.innerHTML}&${apiKey}&&units=metric`)
  .then(cityTemperature);

//2. Form submission
function citySearch(event) {
  event.preventDefault();
  let tipedCity = document.querySelector("#city").value.trim(); //h2select
  axios
    .get(`${apiGeocode}q=${tipedCity}&${apiKey}&&units=metric`)
    .then(cityTemperature);
  locationButton.addEventListener("click", detectLocation);
  console.log(`Tiped City: ${tipedCity}`);
}
let form = document.querySelector("#citysearch");
form.addEventListener("submit", citySearch);

//3. Geolocation button
function detectLocation(location) {
  navigator.geolocation.getCurrentPosition(myPosition);
  locationButton.removeEventListener("click", detectLocation);
}
function myPosition(position) {
  let lat = `lat=${position.coords.latitude}`;
  let lon = `lon=${position.coords.longitude}`;
  console.log(lat + "" + lon);
  axios
    .get(`${apiGeocode}${lat}&${lon}&${apiKey}&&units=metric`)
    .then(cityTemperature);
}
let locationButton = document.querySelector("#locationicon");
locationButton.addEventListener("click", detectLocation);

//celsius and fahrenight change
// dato in celsius non deve cambiare, perche' quei dati ce li ho gia, non conertire da f to c ma fatti dare il dato che hai gia'

function fTemperature(fNumber) {
  mainTempertature.innerHTML = Math.round(
    (mainTempertature.innerHTML * 9) / 5 + 32
  );
  console.log(mainTempertature.innerHTML);
  celsius.style.color = "#ffffff30";
  fahrenight.style.color = "#ffffff";
  celsius.addEventListener("click", cTemperature);
  fahrenight.removeEventListener("click", fTemperature);

  function cTemperature(cNumber) {
    console.log(mainTempertature.innerHTML);
    let celsiusTemp = Math.round(((mainTempertature.innerHTML - 32) * 5) / 9);
    mainTempertature.innerHTML = celsiusTemp;
    celsius.style.color = "#ffffff";
    fahrenight.style.color = "#ffffff30";
    console.log(mainTempertature.innerHTML);
    celsius.removeEventListener("click", cTemperature);
    fahrenight.addEventListener("click", fTemperature);
  }
  celsius.addEventListener("click", cTemperature);
}
fahrenight.addEventListener("click", fTemperature);
