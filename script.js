"use strict";

const go = document.querySelector("button");
go.addEventListener("click", getInput);

function getInput() {
  let userInput = document.querySelector("input").value.toLowerCase();
  console.log(userInput);
  getLocation(userInput);
}

function getLocation(input) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=6658b5987a716f929da6227307c0bafd`;
  fetch(url)
    .then((res) => res.json()) //pase response as JSON
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
      // console.log(data);
      // console.log(data.name);
      // console.log(data.main.temp);
      // console.log(data.main.feels_like);
      // console.log(data.main.humidity);
      // console.log(data.wind.speed);
      // updating dom with returned data
      document.querySelector(".location").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = data.main.temp;
      document.querySelector(".feels-like").innerHTML = data.main.feels_like;
      document.querySelector(".humidity").innerHTML = data.main.humidity;
      document.querySelector(".wind").innerHTML = data.wind.speed;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}
