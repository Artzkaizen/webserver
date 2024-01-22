const easterEggs = ['🌦️', '❄️', '🌪️', '☀️', '⚡️',];
document.addEventListener('DOMContentLoaded', function () {
    const weatherIcon = document.querySelector('.weather-icon');

    weatherIcon.addEventListener('click', (event) => {
        weatherIcon.innerHTML = easterEggs[Math.floor(Math.random() * easterEggs.length)];
    });
});