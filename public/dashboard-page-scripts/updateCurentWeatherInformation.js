let lat;
let lon;
const city = document.querySelector('#city');
const apiKey = 'd9bf64b1f9361be132205f7e4c051a7f';

const weatherUrl = (lat, lon) => `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`;
const locationUrl = () => `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`;

const placeApikey = 'AIzaSyB0XlRG6XLBG2Yn9vtM0kqHtvFCNMudl4g';
const form = document.getElementById('form');

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${placeApikey}&libraries=places&callback=initAutocomplete`;
script.async = true;
document.head.appendChild(script);

let autocomplete;
let citySearch;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        city,
        {
            types: ['(regions)'],
            fields: ['place_id', 'geometry', 'name', 'address_components'],
        });
    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    const place = autocomplete.getPlace();
    let country = place.country


    if (!place.geometry) {
        city.placeholder = 'Enter a city';
    } else {
        lat = place.geometry.location.lat();
        lon = place.geometry.location.lng();
        city.value = '';
        
        for(let i = 0; i < place.address_components.length; i++) {
            if(place.address_components[i].types[0] === 'country') {
               country = place.address_components[i].short_name;
            }
        }
        if(country) {
            valid_place.innerHTML = `${place.name}, ${country}`;
        } else {
            valid_place.innerHTML = place.name
        }
        updateCurrentWeatherInformation(lat, lon);
    }
}
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
        currentTime.innerHTML = currentTimeStamp.toLocaleTimeString('en-GB', {weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric'});


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

        // displays hourly temps
        const hourBoxes = document.querySelectorAll('.mb-hour');
            hourBoxes.forEach((hourBox) => {
            hourBox.innerHTML = ''; // Clear the content of each hour box
        });

        resData.hourly.forEach((hour, i) => {
            hourBoxes.forEach((hourBox) => {
                const hourTimeStamp = hour.dt * 1000;
                const myHour = new Date(hourTimeStamp);
                const weatherIconUrl = `https://openweathermap.org/img/w/${hour.weather[0].icon}.png`
                hourBox.innerHTML += `<div>${myHour.toLocaleTimeString('en-GB', {hour:"numeric", minute:"numeric",})}<img class="day-icon" src="${weatherIconUrl}"><br><p>${Math.round(hour.temp)}&degC<p></div>`;
            });
        });

        // displays humidity
        const humidityInput = document.querySelector('#humidity');
        humidityInput.innerHTML =`${resData.current.humidity}%`;

        // displays wind speed
        const windInput = document.querySelector('#wind');
        windInput.innerHTML= `${Math.round(resData.current.wind_speed * 3.6)}<span >km/h</span>`;

        // displays UVI
        const uvi = document.querySelector('#uvi');
        uvi.innerHTML= `${Math.round(resData.current.uvi)}`;

        // displays atmosphere visibility in km
        const visibility = document.querySelector('#visibility');
        visibility.innerHTML= `${Math.round(resData.current.visibility / 1000)}<span>km</span>`;

        // displays weather condition
        const feelsLike = document.querySelector('#feels-like');
        feelsLike.innerHTML= `${Math.round(resData.current.feels_like)}&degC</span>`;

    }catch (error) {
        console.error('Error fetching weather:', error.message);
    }
}

const valid_place = document.querySelector('.location');
async function getLocation() {

    const res = await fetch(locationUrl());
    const resData = await res.json();
    if (resData.cod !== 200) {
        alert('Please enter a valid city');
        return;
    }

    lat = resData.coord.lat;
    lon = resData.coord.lon;

    // displays desired location
    valid_place.innerText = resData.name;
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

// Function to update user data
async function updateUserLocation() {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
            // Make a fetch request to your server to get user information
            const response = await fetch(`/api/${storedUsername}/city`);
            const userData = await response.text();
            // Check if the request was successful
            if (response.ok) {
                city.value = userData
                getLocation().then(() => {
                    updateCurrentWeatherInformation(lat, lon);
                });
            } else {
                console.error('Error fetching user information:', userData.message);
            }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    updateUserLocation();
});