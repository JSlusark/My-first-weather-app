// Current date and time - DONE
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
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
let cityTitle = document.querySelector("#citytitle");
let mainTempertature = document.querySelector("#mainTemp");
let fahrenight = document.querySelector("#F");
let celsius = document.querySelector("#C");
let apiKey = "appid=f5029b784306910c19746e40c14d6cd3";
let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?`;
console.log(`predefined temp: ${mainTempertature.innerHTML} + ${cityTitle.innerHTML}`);

// Show temperature for cityTitle  
function cityTemperature(response) {
  let searchedCityTemp = Math.floor(response.data.main.temp)
  cityTitle.innerHTML= response.data.name
  mainTempertature.innerHTML = searchedCityTemp
  console.log("City Title: " + cityTitle.innerHTML + " City Temp: " + searchedCityTemp)  
  }

//Type of cityTitles
//1. Pre-defined
axios.get(`${apiGeocode}q=${cityTitle.innerHTML}&${apiKey}&&units=metric`).then(cityTemperature);

//2. Form submission
function citySearch(event) {  
  event.preventDefault();
  let tipedCity = document.querySelector("#city").value.trim(); //h2select
  axios.get(`${apiGeocode}q=${tipedCity}&${apiKey}&&units=metric`).then(cityTemperature);
  locationButton.addEventListener("click", detectLocation);
}
let form = document.querySelector("#citysearch");
form.addEventListener("submit", citySearch);


//3. Geolocation button 
function detectLocation(location) {
  navigator.geolocation.getCurrentPosition(myPosition);
  locationButton.removeEventListener("click", detectLocation);}
 function myPosition(position) {
  let lat = `lat=${position.coords.latitude}`;
  let lon = `lon=${position.coords.longitude}`;
  console.log(lat + "" + lon);
  axios.get(`${apiGeocode}${lat}&${lon}&${apiKey}&&units=metric`).then(cityTemperature);}
let locationButton = document.querySelector("#locationicon")
locationButton.addEventListener("click", detectLocation)

//celsius and fahrenight change
function cTemperature(cNumber) {
  console.log(mainTempertature.innerHTML)
  let celsiusTemp = Math.round((mainTempertature.innerHTML-32)* 5/9 );
  mainTempertature.innerHTML = celsiusTemp;
  celsius.style.color = "#ffffff";
  fahrenight.style.color = "#ffffff30";
  console.log(mainTempertature.innerHTML);
  celsius.removeEventListener("click", cTemperature);
  fahrenight.addEventListener("click", fTemperature);
}
celsius.addEventListener("click", cTemperature);

function fTemperature(fNumber) {
  mainTempertature.innerHTML = Math.round((mainTempertature.innerHTML * 9) / 5 + 32);
  console.log(mainTempertature.innerHTML)
  celsius.style.color = "#ffffff30";
  fahrenight.style.color = "#ffffff";
  celsius.addEventListener("click", cTemperature);
  fahrenight.removeEventListener("click", fTemperature);
}
fahrenight.addEventListener("click", fTemperature);







