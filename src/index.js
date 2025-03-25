import "./styles.css";

async function callWeatherAPI(location, unit){
    location = 'tokyo';
    try {
        let initCall = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=S7RTNY7YMKM6ZUE7HJ9DZK3B9`, {mode: 'cors'});
        let callJson = await initCall.json();
        let importantInfo = {'conditions': callJson.currentConditions.conditions, 'description': callJson.description, 'temp': callJson.currentConditions.temp, 'feelslike': callJson.currentConditions.feelslike, 'humidity': callJson.currentConditions.humidity, 'uvindex': callJson.currentConditions.uvindex};
        console.log(importantInfo);
    } catch (error) {
        console.log(error);
    }
}