import "./styles.css";
import images from './imageLoader.js';

const locationSearchInput = document.querySelector('#location-search');
const locationSearchButton = document.querySelector('#location-search-button');
const headerForm = document.querySelector('.header-form');
const locationNameDiv = document.querySelector('.location-name');
const currentWeatherNumber = document.querySelector('.current-weather-number');
const fcDisplay = document.querySelectorAll('.f-c-display');
const currentWeatherIcon = document.querySelector('.current-weather-icon');
const currentWeatherText = document.querySelector('.current-weather-text');
const currentWeatherDescription = document.querySelector('.current-weather-description');
const currentWeatherFeelsLike = document.querySelector('.feels-like');
const currentWeatherHumidity = document.querySelector('.humidity');
const currentWeatherUVIndex = document.querySelector('.uv-index');
const currentWeatherWind = document.querySelector('.wind');

let currentUnit = 'metric';
let currentLocation = 'Tokyo';
callWeatherAPI(currentLocation, currentUnit).then(updateDOM);

locationSearchButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (locationSearchInput.validity.valid) {
        const selectedUnit = document.querySelector('input[name="f-c-toggle"]:checked');
        if (selectedUnit) {
            currentUnit = selectedUnit.value === 'f' ? 'us' : 'metric';
        } else {
            currentUnit = 'metric';
        }

        callWeatherAPI(locationSearchInput.value, currentUnit).then(updateDOM);
        headerForm.reset();
    }
});

async function callWeatherAPI(location, unit){
    try {
        let initCall = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=S7RTNY7YMKM6ZUE7HJ9DZK3B9&unitGroup=${unit}`, {mode: 'cors'});
        let callJson = await initCall.json();
        let fc;
        if(unit === 'metric'){
            fc = '°C';
        }else{
            fc = '°F';
        }
        let importantInfo = {'conditions': callJson.currentConditions.conditions, 'description': callJson.description, 'temp': callJson.currentConditions.temp, 'feelslike': callJson.currentConditions.feelslike, 'humidity': callJson.currentConditions.humidity, 'uvindex': callJson.currentConditions.uvindex, 'icon': callJson.currentConditions.icon + '.svg', 'address': callJson.address, 'unit': fc, 'windspeed': callJson.currentConditions.windspeed};
        return importantInfo;
    } catch (error) {
        console.log(error);
    }
}

function updateDOM(newWeatherObject){
    locationNameDiv.textContent = newWeatherObject.address;
    currentWeatherNumber.textContent = newWeatherObject.temp;
    /* fcDisplay.textContent  = newWeatherObject.unit; */
    fcDisplay.forEach((element) => {
        element.textContent = newWeatherObject.unit;
    });
    currentWeatherIcon.src = images[newWeatherObject.icon];
    currentWeatherText.textContent = newWeatherObject.conditions;
    currentWeatherDescription.textContent = newWeatherObject.description;
    currentWeatherFeelsLike.textContent = newWeatherObject.feelslike;
    currentWeatherHumidity.textContent = newWeatherObject.humidity;
    currentWeatherUVIndex.textContent = newWeatherObject.uvindex;
    currentWeatherWind.textContent = newWeatherObject.windspeed;
}