//! First Attempt 
// const apiKey = "73b41495e76b5d1053e1ce8832281325";

// let city = JSON.parse(localStorage.getItem("city"));
// let area = JSON.parse(localStorage.getItem("coords"));
// const holderEl = document.querySelector("#holder");
// const town = document.querySelector("#town")

// function getLocation(cityName) {
//     const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=imperial&appid=${apiKey}`

//     fetch(url).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         const lat = data[0].lat;
//         const lon = data[0].lon;
//         getWeather(lat, lon, cityName);

//     })
// }

// function getWeather(lat, lon, city) {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

//     fetch(url).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log(data);

//         const temp = data.list[0].main.temp;
//         const wind = data.list[0].wind.speed;
//         const humidity = data.list[0].main.humidity;
//         const hOne = `
//         <div class="row-6">
//             <h2>City: ${city}</h2>
//             <h4>Temp: ${temp}° F</h4>
//             <h4>Wind: ${wind} MpH</h4>
//             <h4>Humidity: ${humidity}%</h4>
//         </div>`

//         $("#today").empty()
//         $("#today").append(hOne);

//         for (let i = 7; i < data.list.length; i = i + 8) {
//             const weatherData = data.list[i];

//             const html = `
//             <p>${weatherData.temp}</p>
//             `
//         }

//     })
// }




// function renderCity() {
//    let city = JSON.parse(localStorage.getItem("city")) || []
//     for (const town of city) {
//        console.log(town);

//        const infoEl = `
//        <div class="side">
//            <button type="button" class="list-group-item list-group-item-action">${city}</button>
//        </div>`
//        holderEl.innerHTML = holderEl.innerHTML + infoEl;
//    }

//     const town = {
//        city: city.value,
//     };

//     city.push(town);

//    localStorage.setItem("city", JSON.stringify(city));
//     location.assign('index.html') 
// }
// renderCity();



// $('#search-form').on('submit', function(event) {
//     event.preventDefault();

//     const cityName = $('#exampleInputLocation1').val().trim();

//     // Check if the city is not already in the array
//     if (cityName && !cityArray.includes(cityName)) {
//         // Add cityName to local storage array
//         cityArray.push(cityName);

//         // Save array into local storage
//         localStorage.setItem("cityArray", JSON.stringify(cityArray));
//     }

//     // Call the getLocation function with the new city
//     getLocation(cityName);

//     // Clear the input field
//     $('#exampleInputLocation1').val('');
// });


//? Second Attempt
const apiKey = "73b41495e76b5d1053e1ce8832281325";
let cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

function getLocation(cityName) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.length === 0) throw new Error('City not found');
            const lat = data[0].lat;
            const lon = data[0].lon;
            getWeather(lat, lon, cityName);
        })
        .catch(error => {
            console.error('Error:', error);
            $("#today").html(`<p>Error: ${error.message}</p>`);
        });
}

function getWeather(lat, lon, city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log(data);

            // Display current weather
            const currentWeather = data.list[0];
            const currentHtml = `
                <div class="col">
                    <h2>Current Weather in ${city}</h2>
                    <p>Temperature: ${currentWeather.main.temp}° F</p>
                    <p>Wind: ${currentWeather.wind.speed} MPH</p>
                    <p>Humidity: ${currentWeather.main.humidity}%</p>
                </div>
            `;
            $("#today").html(currentHtml);

            // Display 5-day forecast
            const fiveDayForecast = $("#five-day-row");
            fiveDayForecast.empty();

            for (let i = 0; i < 5; i++) {
                const forecast = data.list[i * 8 + 4]; // Get forecast for next 5 days at noon
                const date = new Date(forecast.dt * 1000).toLocaleDateString();
                const html = `
                    <div class="col">
                        <div class="p-2" style="width: 12rem;">Day ${i + 1}</div>
                        <div class="card" style="width: 12rem;">
                            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" class="card-img-top" alt="${forecast.weather[0].description}">
                            <div class="card-body">
                                <h5 class="card-title">${date}</h5>
                                <p class="card-text">Wind: ${forecast.wind.speed} MPH</p>
                                <p class="card-text">Humidity: ${forecast.main.humidity}%</p>
                                <a href="#" class="btn btn-primary">${forecast.main.temp}° F</a>
                            </div>
                        </div>
                    </div>
                `;
                fiveDayForecast.append(html);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            $("#today").html(`<p>Error: ${error.message}</p>`);
        });
}

$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const cityName = $('#exampleInputLocation1').val().trim();

    if (cityName && !cityArray.includes(cityName)) {
        cityArray.push(cityName);
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
        displaySearchHistory();
    }

    getLocation(cityName);
    $('#exampleInputLocation1').val('');
});

function displaySearchHistory() {
    const historyContainer = $('#city');
    historyContainer.find('button:not(:first-child)').remove();

    cityArray.forEach(city => {
        const cityButton = $('<button>')
            .text(city)
            .addClass('list-group-item list-group-item-action')
            .on('click', function() {
                getLocation(city);
            });
        historyContainer.append(cityButton);
    });
}

// Initial display of search history
displaySearchHistory();