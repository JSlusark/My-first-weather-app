// Change degrees from Celsius to Fahrenheit and vice versa
let mainTempertature = document.querySelector("#mainTemp");
let fahrenight = document.querySelector("#F");
fahrenight.addEventListener("click", fTemperature);
let celsius = document.querySelector("#C");
celsius.addEventListener("click", cTemperature);
let temp1 = document.querySelector("#t1");
let temp2 = document.querySelector("#t2");
let temp3 = document.querySelector("#t3");
let temp4 = document.querySelector("#t4");
let temp5 = document.querySelector("#t5");
let temp6 = document.querySelector("#t6");
console.log("check below");
console.log(mainTempertature.innerHTML);
console.log(temp1.innerHTML + 1);

function fTemperature(F) {
  mainTempertature.innerHTML = Math.round(
    (mainTempertature.innerHTML * 9) / 5 + 32
  );
  temp1.innerHTML = Math.round((temp1.innerHTML * 9) / 5 + 32);
  temp2.innerHTML = Math.round((temp2.innerHTML * 9) / 5 + 32);
  temp3.innerHTML = Math.round((temp3.innerHTML * 9) / 5 + 32);
  temp4.innerHTML = Math.round((temp4.innerHTML * 9) / 5 + 32);
  temp5.innerHTML = Math.round((temp5.innerHTML * 9) / 5 + 32);
  temp6.innerHTML = Math.round((temp6.innerHTML * 9) / 5 + 32);
  celsius.style.color = "#ffffff30";
  fahrenight.style.color = "#ffffff";
}

function cTemperature(C) {
  mainTempertature.innerHTML = "-1";
  temp1.innerHTML = "20";
  temp2.innerHTML = "18";
  temp3.innerHTML = "12";
  temp4.innerHTML = "17";
  temp5.innerHTML = "17";
  temp6.innerHTML = "17";
  celsius.style.color = "#ffffff";
  fahrenight.style.color = "#ffffff30";
}

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
    
    // gives temperature when writing a new city 
    let apiKey = "f5029b784306910c19746e40c14d6cd3";
    let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?q=${cityTitle.innerHTML}&appid=${apiKey}`;
    function cityTemperature(response) {
      console.log(Math.floor(response.data.main.temp))
      let searchedCityTemp = Math.floor(response.data.main.temp)
      //change main temperature
      mainTempertature.innerHTML = searchedCityTemp
    
    }
    axios.get(`${apiGeocode}&&units=metric`).then(cityTemperature)
  }

let form = document.querySelector("#citysearch");
form.addEventListener("submit", citySearch);

let cityTitle = document.querySelector("#citytitle");
console.log(cityTitle.innerHTML);



//Geolocation button
let locationButton = document.querySelector("#locationicon")
function detectLocation(location) {
  function myPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
  
    let apiKey = "f5029b784306910c19746e40c14d6cd3";
    let apiGeocode = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios.get(`${apiGeocode}&&units=metric`).then(myTemperature);

   
  }
  navigator.geolocation.getCurrentPosition(myPosition);
}

//Show temperature of typed city
function myTemperature(response) {
  console.log(Math.floor(response.data.main.temp));
  let locationTemp = Math.floor(response.data.main.temp);
  mainTempertature.innerHTML = locationTemp;
  console.log(response.data.name);
  let detectedLocationName = response.data.name;
  cityTitle.innerHTML = detectedLocationName;
  if (detectedLocationName === "Land Berlin") {   cityTitle.innerHTML = "Berlin";


    
  }

}

locationButton.addEventListener("click", detectLocation)

