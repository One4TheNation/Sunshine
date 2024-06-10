const apiKey = "8b7aeadf1b3c92eec962330f1b7c05cf";

function getLocation (cityName) {
    const url = `http://api.openweather.org/geo/1.0/direct?q=${cityName}&appid-${apikey}`;
    
    fetch(url).then(function (response){
        return response.json();
    }).then(function(data) {
        console.lat = data[0].lat;
        const lon = data[0].lon;
        getWeather(lat, lon);

    })
}

function getWeather(lat, lon) {
    const url = `http://api.openweather.org/data/2.5/forecast?lat=${lat}&lon-${lon}&appid-${apikey}`;

    fetch(url).then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
    })
}

getLocation("")