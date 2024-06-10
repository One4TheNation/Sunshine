const apiKey = "";

function getLocation (cityName) {
    const url = "";
    
    fetch(url).then(function (response){
        return response.json();
    }).then(function(data) {
        console.lat = data[0].lat;
        const lon = data[0].lon;
        getWeather(lat, lon);

    })
}

function getWeather(lat, lon) {
    const url = ""

    fetch(url).then(function (response){
        return response.json();
    }).then(function(data){
        console.log(data);
    })
}

getLocation("")