const apiKey = "73b41495e76b5d1053e1ce8832281325";
let city = JSON.parse(localStorage.getItem("city"));
let area = JSON.parse(localStorage.getItem("coords"));
const holderEl = document.querySelector("#holder");
const town = document.querySelector("#town")

function getLocation(cityName) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=imperial&appid=${apiKey}`

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        getWeather(lat, lon, cityName);

    })
}

function getWeather(lat, lon, city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(url).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        const temp = data.list[0].main.temp;
        const wind = data.list[0].wind.speed;
        const humidity = data.list[0].main.humidity;
        const hOne = `
        <div class="row-6">
            <h2>City: ${city}</h2>
            <h4>Temp: ${temp}° F</h4>
            <h4>Wind: ${wind} MpH</h4>
            <h4>Humidity: ${humidity}%</h4>
        </div>`

        $("#today").append(hOne);

    })
}




//function renderCity() {
   // let city = JSON.parse(localStorage.getItem("city")) || []
    //for (const town of city) {
      //  console.log(town);

       // const infoEl = `
       // <div class="side">
        //    <button type="button" class="list-group-item list-group-item-action">${city}</button>
       // </div>`
       // holderEl.innerHTML = holderEl.innerHTML + infoEl;
   // }

    //const town = {
    //    city: city.value,
    //};

    //city.push(town);

   // localStorage.setItem("city", JSON.stringify(city));
    //location.assign('index.html') 
//}
//renderCity();



$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const cityName = $('#exampleInputLocation1').val().trim();

    getLocation(cityName)
});