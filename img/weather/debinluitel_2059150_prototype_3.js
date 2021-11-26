//EventListener listens every event that is being emitted in the window
window.addEventListener("load", () => { //load waits until every DOM element loads and then executes the code inside
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  // Assigning value to variables selected in HTML(classes)
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperaturedata = document.querySelector(".humidity");
  let temperatureinformation = document.querySelector(".pressure");
  //let temperaturefiles = document.querySelector(".sunrise");
  //  let Weatherdata = document.querySelector(".sunset");
  let minimumtemp = document.querySelector(".minimum_temperature");
  let maximumtemp = document.querySelector(".maximum_temperature");
  let datas = document.querySelector(".icon");
  let weather =document.querySelector(".feels_like");
  let degree =document.querySelector(".deg");
  let description =document.querySelector(".description");
/*converting unix time to local time
  function timer(etime, time) {
    var min= new Date((etime + time) * 1000);
    let fake = min.toUTCString().split(" ");
    return fake[4];
  }*/
  data = JSON.parse(localStorage.getItem("data")) //parse converts json to object
 if ((data != null) && parseInt((data.stored_when) + 1000) < Date.now()) {
  temperatureDegree.textContent = `${data.weather_temperature}°C`;
  temperaturedata.textContent = `Humidity=${data.humidity}%`;
  temperatureinformation.textContent = `Pressure=${data.pressure}`;
  /*temperaturefiles.textContent = `Sunrise=${timer(data.sys.sunrise,data.timezone)}`;
  Weatherdata.textContent = `Sunset=${timer(data.sys.sunset,data.timezone)}`;*/
  minimumtemp.textContent = `Min.Temp=${data.min_temp}°C`;
  maximumtemp.textContent = `Max.Temp=${data.max_temp}°C`;
  weather.textContent =`Feelslike=${data.feels_like}°C`;
  degree.textContent= `WindDegree=${data.wind_degree}`;
  description.textContent=`${data.weather_description}`;

// url link of weather icon
 datas.innerHTML = `<img class="icons" src="http://openweathermap.org/img/wn/${data.icon}@2x.png"/>`;}
 else{


 
  //Returns json from the local server
  const api = `http://localhost/img/weather/my_api.php?city=Islington`;
  fetch(api)
  //the promise is true so we resolve the data
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      //Set DOM Elements from the API
      temperatureDegree.textContent = `${data.weather_temperature}°C`;
      temperaturedata.textContent = `Humidity=${data.humidity}%`;
      temperatureinformation.textContent = `Pressure=${data.pressure}`;
      /*temperaturefiles.textContent = `Sunrise=${timer(data.sys.sunrise,data.timezone)}`;
      Weatherdata.textContent = `Sunset=${timer(data.sys.sunset,data.timezone)}`;*/
      minimumtemp.textContent = `Min.Temp=${data.temp_min}°C`;
      maximumtemp.textContent = `Max.Temp=${data.temp_max}°C`;
      weather.textContent =`Feelslike=${data.feels_like}°C`;
      degree.textContent= `WindDegree=${data.weather_wind}`;
      description.textContent=`${data.weather_description}`;

// url link of weather icon
     datas.innerHTML = `<img class="icons" src="http://openweathermap.org/img/wn/${data.icon}@2x.png"/>`;
     //new object created to set item in local storage
     var new_data = {
      "weather_temperature": data.weather_temperature,
      "icon": data.icon,
      "feels_like": data.feels_like,
      "min_temp": data.temp_min,
      "max_temp": data.temp_max,
      "pressure": data.pressure,
      "humidity": data.humidity,
      "visibility": data.visibility,
      "weather_description": data.weather_description,
      "wind_degree": data.weather_wind,
      "wind_direction": data.wind_wind,
      "stored_when": Date.now(),
      "Timezone": data.timezone,
  }
  //putting the value in key on local storage i.e (data)
  localStorage.setItem("data", JSON.stringify(new_data)); //stringify converts js objects or value to js string
    });}
});
