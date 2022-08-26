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
      console.log(data);
      // With the lat and long data that comes back, well call the  getWeatherInfo function
      // This is simply due to how this api works, info which i got to know by READING THE DOCS!
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getWeatherInfo() {}
