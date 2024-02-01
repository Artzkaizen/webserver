let lat;
let lon;
const city = document.querySelector('#city');
const apiKey = 'd9bf64b1f9361be132205f7e4c051a7f';

const weatherUrl = (lat, lon) => `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${apiKey}`;
const locationUrl = () => `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;

async function updateCurrentWeatherInformation(lat, lon) {

    try {
        const res = await fetch(weatherUrl(lat, lon));
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const resData = await res.json();
        const options = {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric'
        };

        const input = document.querySelector('.text');
        const weatherIcon = document.querySelector('.icon');
        input.innerHTML = `${Math.round(resData.current.temp)}&degC`;
        weatherIcon.src = `https://openweathermap.org/img/w/${resData.current.weather[0].icon}.png`;

        // create date object and gets locationOffset
        const myDate = new Date();
        const localOffSetHours = myDate.getTimezoneOffset() * 60;
        const currentTimeStamp = new Date((resData.current.dt + resData.timezone_offset + localOffSetHours) * 1000)

        // displays time of desired location
        const  currentTime = document.querySelector('.time-dt');
        currentTime.innerHTML = currentTimeStamp.toLocaleTimeString('en-GB', {weekday: 'long',hour: 'numeric', minute: 'numeric'});

        //displays sunrise and sunset
        const sunriseTime = document.querySelector('.sunrise-time');
        const sunsetTime = document.querySelector('.sunset-time');
        sunriseTime.innerHTML = `${new Date(resData.current.sunrise * 1000).toLocaleTimeString('en-GB',options)}`
        sunsetTime.innerHTML = `${new Date(resData.current.sunset * 1000).toLocaleTimeString('en-GB',options)}`

        //displays temp for weekdays
        const divWeek = document.querySelectorAll('.w-box')
        divWeek.forEach((wBox, i) => {
            const dayText = wBox.querySelector('.day');
            const max_temp = document.querySelectorAll('.max-temp');
            const min_temp = document.querySelectorAll('.min-temp');

            //grabs timestamp for the weekday
            const weekDayTimeStamp = new Date(resData.daily[i].dt * 1000);
            weekDayTimeStamp.setHours(0, 0, 0, 0);

            // displays weekdays
            dayText.innerText = weekDayTimeStamp.toLocaleString('en-GB', {weekday:"short"});

            // displays max and min temps for specific days
            max_temp[i].innerHTML = `${Math.floor(resData.daily[i].temp.max)}&degC`;
            min_temp[i].innerHTML = `${Math.floor(resData.daily[i].temp.min)}&degC`;
        });
        // displays weekday icons
        const dayIcon = document.querySelectorAll('.day-icon');
        for (let i = 0; i < resData.daily.length - 1 ; i++) {
            dayIcon[i].src = `https://openweathermap.org/img/w/${resData.daily[i].weather[0].icon}.png`;
            dayIcon[i].alt = `${resData.daily[i].weather[0].description}`;
        }

        // displays humidity
        const humidityInput = document.querySelector('#humidity');
        humidityInput.innerHTML =`${resData.current.humidity}%`;

        // displays wind speed
        const windInput = document.querySelector('#wind');
        windInput.innerHTML= `${Math.round(resData.current.wind_speed)}<span >m/h</span>`;

        // displays UVI
        const uvi = document.querySelector('#uvi');
        uvi.innerHTML= `${Math.round(resData.current.uvi)}`;

        // displays atmosphere visibility in km
        const visibility = document.querySelector('#visibility');
        visibility.innerHTML= `${Math.round(resData.current.visibility / 1000)}<span >km</span>`;

        // displays weather condition
        const feelsLike = document.querySelector('#feels-like');
        feelsLike.innerHTML= `${Math.round(resData.current.feels_like)}&degC</span>`;

    }catch (error) {
        console.error('Error fetching weather:', error.message);
    }
}

async function getLocation() {
    const place = document.querySelector('.location');

    const res = await fetch(locationUrl());
    const resData = await res.json();
    if (resData.cod !== 200) {
        alert('Please enter a valid city');
        return;
    }

    lat = resData.coord.lat;
    lon = resData.coord.lon;

    // displays desired location
    place.innerHTML = resData.name;
    console.log(resData.name)
    city.value = '';
}

city.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        event.preventDefault();
        if (!city.value) {
            alert('Please enter a city');
            return;
        }
        getLocation().then(() => {
            updateCurrentWeatherInformation(lat, lon);
        });
        
    }
});


const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', () => {
    window.location.href = '/home'
    document.cookie = `sessionToken=; expires=`;
    sessionStorage.clear();
})
