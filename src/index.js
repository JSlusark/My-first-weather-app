// nextdays
let temp1 = document.querySelector("#t1");
let temp2 = document.querySelector("#t2");
let temp3 = document.querySelector("#t3");
let temp4 = document.querySelector("#t4");
let temp5 = document.querySelector("#t5");
let temp6 = document.querySelector("#t6");
let cityTitle = document.querySelector("#citytitle");
let mainTempertature = document.querySelector("#mainTemp");
console.log("check below");
console.log(mainTempertature.innerHTML + cityTitle.innerHTML);
let fahrenight = document.querySelector("#F");
let celsius = document.querySelector("#C");

//show predefined temperature
function predefinedTemperature (berlinTemperature) {
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
  let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?q=${cityTitle.innerHTML}&appid=${apiKey}`;
  axios.get(`${apiGeocode}&&units=metric`).then(showTemperature);}
 
  predefinedTemperature();

  // City search

function citySearch(event) {
  event.preventDefault();
  let tipedCity = document.querySelector("#city"); //h2select
  let writtenCity = tipedCity.value.trim(); //what has been written in H2
  let finalCity =
    writtenCity.charAt(0).toUpperCase() + writtenCity.slice(1).toLowerCase();
  cityTitle.innerHTML = finalCity;

  console.log(tipedCity)
  console.log(writtenCity)
    console.log(finalCity)
    
// weather APIs
    let apiKey = "f5029b784306910c19746e40c14d6cd3";
    let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?q=${finalCity}&appid=${apiKey}`;
    axios.get(`${apiGeocode}&&units=metric`).then(cityTemperature)

    // gives temperature when writing a new city 
    function cityTemperature(response) {
      let searchedCityTemp = Math.floor(response.data.main.temp)
      console.log(finalCity + " " + searchedCityTemp)
      //change main temperature
      mainTempertature.innerHTML = searchedCityTemp
    
    }
  }


let form = document.querySelector("#citysearch");
form.addEventListener("submit", citySearch);


//location button detectslocation and then calls showTemperature function 👆)
function detectLocation(location) {
  navigator.geolocation.getCurrentPosition(myPosition);

  function myPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
  console.log(`lat:${lat} lon:${lon}`);
    let apiKey = "f5029b784306910c19746e40c14d6cd3";
    let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios.get(`${apiGeocode}&&units=metric`).then(showTemperature);
  }}

let locationButton = document.querySelector("#locationicon")
locationButton.addEventListener("click", detectLocation)


//Show temperature of typed or geolocated city
function showTemperature(celsius) {
  let locationTemp = Math.floor(celsius.data.main.temp);
  let detectedLocationName = celsius.data.name;
  console.log(`detectedLocationName:${detectedLocationName} locationTemp:${locationTemp}`);
  mainTempertature.innerHTML = locationTemp;
  cityTitle.innerHTML = detectedLocationName;
}





function cTemperature(cNumber) {
  mainTempertature.innerHTML = Math.round((mainTempertature.innerHTML-32)* 5/9 );
  celsius.style.color = "#ffffff";
  fahrenight.style.color = "#ffffff30";
celsius.style.noHover = true;
}
celsius.addEventListener("click", cTemperature);


function fTemperature(fNumber) {
  mainTempertature.innerHTML = Math.round((mainTempertature.innerHTML * 9) / 5 + 32);
  console.log(mainTempertature.innerHTML)
  celsius.style.color = "#ffffff30";
  fahrenight.style.color = "#ffffff";
}
fahrenight.addEventListener("click", fTemperature);


// week and monthcycle array
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

