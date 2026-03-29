
let details = document.querySelector('.details');
let form = document.querySelector('form');
let input = document.getElementById('city');
let historyArea = document.getElementById('history');

let his = JSON.parse(localStorage.getItem('history')) || [];   
let hisCities = []; 


function populateHistory() {
    historyArea.innerHTML = '';
    hisCities = [];
    his.forEach(city=>{
        let cityP = document.createElement('p');
        cityP.textContent = city;
        historyArea.appendChild(cityP);
        hisCities.push(cityP);
    })
}

populateHistory();


const historySearch = () => {
    hisCities.forEach(city=>{
    city.addEventListener('click', (e)=>{
        let city = e.target.textContent;
        details.innerHTML = 'Loading...'
        getWeatherDetails(city);
        console.log('clicked', e.target.textContent)
    })
})};

historySearch();


async function getCityName(cityName = "Delhi") {
    try {
        let name = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
        let response = await name.json();
        let result = response.results[0]
        let latitude = result.latitude;
        let longitude = result.longitude;
        let city = result.name;
        
        return [latitude, longitude, city]
    } catch (error) {
        console.log(error);
    }

}


async function getWeatherDetails(cityName = 'Delhi') {
    try {
    
        let [latitude, longitude, city] = await getCityName(cityName);
        console.log(city)
        let url =  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,weather_code&current_weather=true&
timezone=auto`
        console.log(url);

        let weatherObject = await fetch(url);
        let response = await weatherObject.json();

     
        let weather_code = await fetch('./weather_code.json');
        let weather_code_response = await weather_code.json();
        console.log(response)


        let current_weather = response.current_weather;
        let current_weather_units = response.current_weather_units;

        let temperature = current_weather.temperature;
        let temperatureUnit = current_weather_units.temperature;

        let weather = weather_code_response[current_weather.weathercode];

        let humidity = Math.round(response.hourly.relative_humidity_2m.reduce((curr, acc)=> curr+acc ,0)/response.hourly.relative_humidity_2m.length); // taking the average of the humidity array and rouding it off.
        let humidity_unit = response.hourly_units.relative_humidity_2m;

        let wind = current_weather.windspeed;
        let wind_unit = current_weather_units.windspeed;

        console.log(temperature, temperatureUnit);
        console.log(weather);
        console.log(humidity, humidity_unit);
        console.log(wind, wind_unit);

        let cityDOM = document.createElement('div');
        cityDOM.className = 'info-strip';
        cityDOM.innerHTML = `<p>City: </p><p>${city}</p>`;

        let temperatureDOM = document.createElement('div');
        temperatureDOM.className = 'info-strip';
        temperatureDOM.innerHTML = `<p>Temperature: </p><p>${temperature}${temperatureUnit}</p>`;

        let weatherDOM = document.createElement('div');
        weatherDOM.className = 'info-strip';
        weatherDOM.innerHTML = `<p>Weather: </p><p>${weather}</p>`;

        let humidityDOM = document.createElement('div');
        humidityDOM.className = 'info-strip';
        humidityDOM.innerHTML = `<p>Humidity: </p><p>${humidity}${humidity_unit}</p>`;

        let windDOM = document.createElement('div');
        windDOM.className = 'info-strip';
        windDOM.innerHTML = `<p>Wind: </p><p>${wind}${wind_unit}</p>`;

      
        details.innerHTML = '';
        details.appendChild(cityDOM);
        details.appendChild(temperatureDOM);
        details.appendChild(weatherDOM);
        details.appendChild(humidityDOM);
        details.appendChild(windDOM);

   
        let tempArr = JSON.parse(localStorage.getItem('history')) || [];
        if(!his.includes(city)){
            tempArr.push(city);
            localStorage.setItem('history', JSON.stringify(tempArr));
            his = JSON.parse(localStorage.getItem('history'));
        }

        populateHistory(); 
        historySearch();   

    } catch (err) {
        details.innerHTML = '';
        console.log(err);
        let errCard = document.createElement('div');
        errCard.style.textAlign = 'center';
        errCard.style.fontSize = '2rem';
        errCard.textContent = 'Data Not Found';
        details.appendChild(errCard);
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let city = input.value;
    details.innerHTML = 'Loading...'
    getWeatherDetails(city);
    input.value = '';
})


