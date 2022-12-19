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
 <span id="t1">${Math.round(
   forecastDay.temp.min
 )}</span><span class="circle1">°</span>
<span id="t2">${Math.round(
          forecastDay.temp.max
        )}</span><span class="circle2">°</span>
</div>
`;
      //let minTemperatures = [Math.round(forecastDay.temp.min)];
      //let maxTemperatures = [Math.round(forecastDay.temp.max)];
      //console.log(Array.from(minTemperatures));
      //console.log(Array.from(maxTemperatures));
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
  console.log(response);
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
  apiFromCitySearch = `${apiGeocode}q=${tipedCity}&${apiKey}&&units=metric`;
  axios.get(apiFromCitySearch).then(cityTemperature);
  locationButton.addEventListener("click", detectLocation);
  console.log(`Tiped City: ${tipedCity}`);
  console.log(cityTemperature);
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
// se clicco su c prima mi calcora su c
// crea una sola funzione per cambiare temp?

function fTemperature(cNumber, fNumber) {
  cNumber = mainTempertature.innerHTML;
  fNumber = Math.round((cNumber * 9) / 5 + 32);
  mainTempertature.innerHTML = fNumber;
  console.log(fNumber);
  celsius.style.color = "#ffffff30";
  fahrenight.style.color = "#ffffff";

  //forecast min
  let t1 = document.querySelectorAll("#t1");
  let min0 = t1[0];
  let min1 = t1[1];
  let min2 = t1[2];
  let min3 = t1[3];
  let min4 = t1[4];
  console.log(min0, min1, min2, min3, min4);
  min0.innerHTML = Math.round((min0.innerHTML * 9) / 5 + 32);
  min1.innerHTML = Math.round((min1.innerHTML * 9) / 5 + 32);
  min2.innerHTML = Math.round((min2.innerHTML * 9) / 5 + 32);
  min3.innerHTML = Math.round((min3.innerHTML * 9) / 5 + 32);
  min4.innerHTML = Math.round((min4.innerHTML * 9) / 5 + 32);

  //forecast max
  let t2 = document.querySelectorAll("#t2");
  let max0 = t2[0];
  let max1 = t2[1];
  let max2 = t2[2];
  let max3 = t2[3];
  let max4 = t2[4];
  console.log(min0, min1, min2, min3, min4);
  max0.innerHTML = Math.round((max0.innerHTML * 9) / 5 + 32);
  max1.innerHTML = Math.round((max1.innerHTML * 9) / 5 + 32);
  max2.innerHTML = Math.round((max2.innerHTML * 9) / 5 + 32);
  max3.innerHTML = Math.round((max3.innerHTML * 9) / 5 + 32);
  max4.innerHTML = Math.round((max4.innerHTML * 9) / 5 + 32);

  fahrenight.removeEventListener("click", fTemperature);
  celsius.addEventListener("click", cTemperature);
}

function cTemperature(cNumber, fNumber) {
  fNumber = mainTempertature.innerHTML;
  cNumber = Math.round(((fNumber - 32) * 5) / 9);
  mainTempertature.innerHTML = cNumber;
  console.log(cNumber);
  fahrenight.style.color = "#ffffff30";
  celsius.style.color = "#ffffff";
  fahrenight.addEventListener("click", fTemperature);
  celsius.removeEventListener("click", cTemperature);

  //forecast min
  let t1 = document.querySelectorAll("#t1");
  let min0 = t1[0];
  let min1 = t1[1];
  let min2 = t1[2];
  let min3 = t1[3];
  let min4 = t1[4];
  console.log(min0, min1, min2, min3, min4);
  min0.innerHTML = Math.round(((min0.innerHTML - 32) * 5) / 9);
  min1.innerHTML = Math.round(((min1.innerHTML - 32) * 5) / 9);
  min2.innerHTML = Math.round(((min2.innerHTML - 32) * 5) / 9);
  min3.innerHTML = Math.round(((min3.innerHTML - 32) * 5) / 9);
  min4.innerHTML = Math.round(((min4.innerHTML - 32) * 5) / 9);

  //forecast max
  let t2 = document.querySelectorAll("#t2");
  let max0 = t2[0];
  let max1 = t2[1];
  let max2 = t2[2];
  let max3 = t2[3];
  let max4 = t2[4];
  console.log(min0, min1, min2, min3, min4);
  max0.innerHTML = Math.round(((max0.innerHTML - 32) * 5) / 9);
  max1.innerHTML = Math.round(((max1.innerHTML - 32) * 5) / 9);
  max2.innerHTML = Math.round(((max2.innerHTML - 32) * 5) / 9);
  max3.innerHTML = Math.round(((max3.innerHTML - 32) * 5) / 9);
  max4.innerHTML = Math.round(((max4.innerHTML - 32) * 5) / 9);
}

fahrenight.addEventListener("click", fTemperature);
