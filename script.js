"use strict";
// Initially, main should be hidden
// document.querySelector(".main").style.display = "none";

// When submit btn is clicked, the action starts
const go = document.querySelector("button");
go.addEventListener("click", getInput);

// pressing enter should also start the action
// document.addEventListener("keydown", (e) => {
//   console.log(e.key);
//   if (e.key === "Enter") {
//     getInput();
//   }
// });

// radioBtn for temp Conversion
const radioBtn = document.querySelector("#convert");

function getInput() {
  let userInput = document.querySelector("input").value.toLowerCase();
  console.log(userInput);
  getLocation(userInput);
}

function getLocation(input) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=6658b5987a716f929da6227307c0bafd`;
  fetch(url)
    .then((res) => res.json()) //parse response as JSON
    .then((data) => {
      // console.log(data);
      console.log(data[0].lat);
      console.log(data[0].lon);

      // With the lat and long data that comes back, well call the  getWeatherInfo function
      // This is simply due to how this api works, info which i got to know by READING THE DOCS!
      getWeatherInfo(data[0].lat, data[0].lon);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getWeatherInfo(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6658b5987a716f929da6227307c0bafd&units=metric`;
  fetch(url)
    .then((res) => res.json()) //parse response as JSON
    .then((data) => {
      // showing main container when data returns
      document.querySelector(".main").style.visibility = "visible";

      // updating dom with returned data
      document.querySelector(".location").innerHTML = data.name;
      document.querySelector(".location-country").innerHTML = data.sys.country;
      document.querySelector(".temp").innerHTML = data.main.temp;
      document.querySelector(".feels-like").innerHTML = data.main.feels_like;
      document.querySelector(".humidity").innerHTML = data.main.humidity;
      document.querySelector(".wind").innerHTML = data.wind.speed;

      // calling the convert function after initial results have displayed and user checks or unchecks the checkbox
      radioBtn.addEventListener("change", () => {
        convert(data.main.temp, data.main.feels_like);
      });
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

// Checking the radio should convert to farenheit
function convert(temp, feelsLike) {
  const tempInFarenheit = temp * (9 / 5) + 32;
  const feelsLikeInFarenheit = feelsLike * (9 / 5) + 32;

  // If checkbox is checked, display farenheit values, else display the original celcius values.
  if (radioBtn.checked) {
    document.querySelector(".temp").innerHTML = tempInFarenheit;
    document.querySelector(".feels-like").innerHTML = feelsLikeInFarenheit;
    document.querySelector(".unit-1").innerHTML = "&deg;F";
    document.querySelector(".unit-2").innerHTML = "&deg;F";
  } else {
    document.querySelector(".temp").innerHTML = temp;
    document.querySelector(".feels-like").innerHTML = feelsLike;
    document.querySelector(".unit-1").innerHTML = "&deg;C";
    document.querySelector(".unit-2").innerHTML = "&deg;C";
  }
}
