import "./styles.css";
import images from './imageLoader.js';

const locationSearchInput = document.querySelector('#location-search');
const locationSearchButton = document.querySelector('#location-search-button');
const locationNameDiv = document.querySelector('.location-name');
const currentWeatherNumber = document.querySelector('.current-weather-number');
const fcDisplay = document.querySelector('.f-c-display');
const currentWeatherIcon = document.querySelector('.current-weather-icon');
const currentWeatherText = document.querySelector('.current-weather-text');
const currentWeatherDescription = document.querySelector('.current-weather-description');
const currentWeatherFeelsLike = document.querySelector('.feels-like');
const currentWeatherHumidity = document.querySelector('.humidity');
const currentWeatherUVIndex = document.querySelector('.uv-index');
const currentWeatherWind = document.querySelector('.wind');

let metric = true;
let currentLocation = 'Tokyo';
callWeatherAPI(currentLocation, 'metric').then(updateDOM);

async function callWeatherAPI(location, unit){
    location = 'tokyo';
    unit = 'metric';
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
    fcDisplay.textContent  = newWeatherObject.unit;
    currentWeatherIcon.src = images[newWeatherObject.icon];
    currentWeatherText.textContent = newWeatherObject.conditions;
    currentWeatherDescription.textContent = newWeatherObject.description;
    currentWeatherFeelsLike.textContent = newWeatherObject.feelslike;
    currentWeatherHumidity.textContent = newWeatherObject.humidity;
    currentWeatherUVIndex.textContent = newWeatherObject.uvindex;
    currentWeatherWind.textContent = newWeatherObject.windspeed;
}