


function timeConvert(time) {
    var milliseconds = time * 1000
    var date = new Date(milliseconds)
    var dateFormat = date.toLocaleString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric'});

    return dateFormat;
}

var cityName=[];

function createCityName() {
    var searchCity = document.querySelector("#search-city").value;

    cityName.push(searchCity);

    var ulist = document.querySelector("#ulist");
    var savedCities = searchCity;
    var li = document.createElement("li");

    li.className = 'city-space btn btn-secondary';
    li.appendChild(document.createTextNode(savedCities));
    ulist.appendChild(li);

    localStorage.setItem('cityName', JSON.stringify(cityName));
}

function returnLocalStorage() {
    
    var saved = JSON.parse(localStorage.getItem("cityName"));

    if (!saved){
        return false;
    }

    saved.push(cityName);
    
    for(i = 0; i < saved.length - 1; i++){
        var cities = saved[i];
        var ulist = document.querySelector("#ulist");
        var li = document.createElement("li");

        li.className = 'city-space btn btn-secondary';
        li.appendChild(document.createTextNode(cities));
        ulist.appendChild(li);
        console.log(cities)
        cityName.push(cities);
    }
}

function getWeather() {
    var searchCity = document.querySelector("#search-city").value;
    console.log(searchCity);

    if (!searchCity){
        alert("you need to enter something")
        return false;
    }

    var currentHeader = document.querySelector('#current-header');
    currentHeader.innerHTML = '';

    var dayOneImgDisplay = document.querySelector("#dayone-img");
    dayOneImgDisplay.innerHTML = '';
    
    var dayTwoImgDisplay = document.querySelector("#daytwo-img");
    dayTwoImgDisplay.innerHTML = '';

    var dayThreeImgDisplay = document.querySelector("#daythree-img");
    dayThreeImgDisplay.innerHTML = '';

    var dayFourImgDisplay = document.querySelector("#dayfour-img");
    dayFourImgDisplay.innerHTML = '';

    var dayFiveImgDisplay = document.querySelector("#dayfive-img");
    dayFiveImgDisplay.innerHTML = '';
    
    var userSearchCity = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=metric&appid=2d15ff373909278e33246059d67a42b6"
    fetch (userSearchCity)
    .then(function(response) {
        if (response.ok) {
            console.log(response);
            return response.json();
            
        }
        else {
            alert('Error: City Not Found');
            return;
        }
        
    })
    .then(function(response) {
       
        var lon = response.coord.lon;
        console.log(lon)
        var lat = response.coord.lat;
        console.log(lat);

        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly&units=metric&appid=2d15ff373909278e33246059d67a42b6');
    })
    .then(function(response) {
        return response.json();
    })

    .then(function(response) {
        var currentImg = response.current.weather[0].icon
        console.log(currentImg);
        var currentImgEl = document.createElement('img')

        var currentTime = response.current.dt

        currentHeader.innerHTML = searchCity +' (' + timeConvert(currentTime) + ')';


        currentImgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + currentImg + '.png')
        currentHeader.appendChild(currentImgEl);

        // current day display
        var currentTemp = response.current.temp;
        var currentTempEl = document.querySelector("#current-temp")
        currentTempEl.innerHTML = '<span>' + currentTemp + '&#176;C' + '<span>'

        var currentWind = response.current.wind_speed;
        var currentWindEl = document.querySelector("#current-wind")
        currentWindEl.innerHTML = '<span>' + currentWind + ' MPS' + '<span>'

        var currentHumid = response.current.humidity;
        var currentHumidEl = document.querySelector("#current-humid")
        currentHumidEl.innerHTML = '<span>' + currentHumid + ' %' + '<span>'

        var currentUv = response.current.uvi;
        var currentUvEl = document.querySelector("#current-uv")
        currentUvEl.innerHTML = '<span>' + currentUv + '<span>'
        
        console.log(response.daily[0].temp.day)
        console.log(response.daily[0].wind_speed)
        console.log(response.daily[0].humidity)

        // day one display
        // get time
        var dayOneTimeEl = document.querySelector('#dayone-date')
        var dayOneTime = response.daily[1].dt
        dayOneTimeEl.innerHTML = '(' + timeConvert(dayOneTime) + ')'

        //display weather image
        var dayOneImg = response.daily[0].weather[0].icon
        console.log(dayOneImg);
        var dayOneImgEl = document.createElement('img')
        dayOneImgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + dayOneImg + '.png')
        dayOneImgDisplay.appendChild(dayOneImgEl)

        //get daily temperature
        var dayOneTemp = response.daily[0].temp.day;
        var dayOneTempEl = document.querySelector("#dayone-temp")
        dayOneTempEl.innerHTML = '<span>' + dayOneTemp + '&#176;C' + '<span>'

        //get daily windspeed
        var dayOneWind = response.daily[0].wind_speed;
        var dayOneWindEl = document.querySelector("#dayone-wind")
        dayOneWindEl.innerHTML = '<span>' + dayOneWind + ' MPS' + '<span>'

        //get daily humidity
        var dayOneHumid = response.daily[0].humidity;
        var dayOneHumidEl = document.querySelector("#dayone-humid")
        dayOneHumidEl.innerHTML = '<span>' + dayOneHumid + ' %' + '<span>'

        // day two display
        var dayTwoTimeEl = document.querySelector('#daytwo-date')
        var dayTwoTime = response.daily[2].dt
        dayTwoTimeEl.innerHTML = '(' + timeConvert(dayTwoTime) + ')'

        var dayTwoImg = response.daily[1].weather[0].icon
        console.log(dayTwoImg);
        var dayTwoImgEl = document.createElement('img')
        dayTwoImgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + dayTwoImg + '.png')
        dayTwoImgDisplay.appendChild(dayTwoImgEl)

        var dayTwoTemp = response.daily[1].temp.day;
        var dayTwoTempEl = document.querySelector("#daytwo-temp")
        dayTwoTempEl.innerHTML = '<span>' + dayTwoTemp + '&#176;C' + '<span>'

        var dayTwoWind = response.daily[1].wind_speed;
        var dayTwoWindEl = document.querySelector("#daytwo-wind")
        dayTwoWindEl.innerHTML = '<span>' + dayTwoWind + ' MPS' + '<span>'

        var dayTwoHumid = response.daily[1].humidity;
        var dayTwoHumidEl = document.querySelector("#daytwo-humid")
        dayTwoHumidEl.innerHTML = '<span>' + dayTwoHumid + ' %' + '<span>'
        
        // day three display
        var dayThreeTimeEl = document.querySelector('#daythree-date')
        var dayThreeTime = response.daily[3].dt
        dayThreeTimeEl.innerHTML = '(' + timeConvert(dayThreeTime) + ')'

        var dayThreeImg = response.daily[2].weather[0].icon
        console.log(dayThreeImg);
        var dayThreeImgEl = document.createElement('img')
        dayThreeImgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + dayThreeImg + '.png')
        dayThreeImgDisplay.appendChild(dayThreeImgEl)

        var dayThreeTemp = response.daily[2].temp.day;
        var dayThreeTempEl = document.querySelector("#daythree-temp")
        dayThreeTempEl.innerHTML = '<span>' + dayThreeTemp + '&#176;C' + '<span>'

        var dayThreeWind = response.daily[2].wind_speed;
        var dayThreeWindEl = document.querySelector("#daythree-wind")
        dayThreeWindEl.innerHTML = '<span>' + dayThreeWind + ' MPS' + '<span>'

        var dayThreeHumid = response.daily[2].humidity;
        var dayThreeHumidEl = document.querySelector("#daythree-humid")
        dayThreeHumidEl.innerHTML = '<span>' + dayThreeHumid + ' %' + '<span>'

        // day four display
        var dayFourTimeEl = document.querySelector('#dayfour-date')
        var dayFourTime = response.daily[4].dt
        dayFourTimeEl.innerHTML = '(' + timeConvert(dayFourTime) + ')'

        var dayFourImg = response.daily[3].weather[0].icon
        console.log(dayFourImg);
        var dayFourImgEl = document.createElement('img')
        dayFourImgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + dayFourImg + '.png')
        dayFourImgDisplay.appendChild(dayFourImgEl)

        var dayFourTemp = response.daily[3].temp.day;
        var dayFourTempEl = document.querySelector("#dayfour-temp")
        dayFourTempEl.innerHTML = '<span>' + dayFourTemp + '&#176;C' + '<span>'

        var dayFourWind = response.daily[3].wind_speed;
        var dayFourWindEl = document.querySelector("#dayfour-wind")
        dayFourWindEl.innerHTML = '<span>' + dayFourWind + ' MPS' + '<span>'

        var dayFourHumid = response.daily[3].humidity;
        var dayFourHumidEl = document.querySelector("#dayfour-humid")
        dayFourHumidEl.innerHTML = '<span>' + dayFourHumid + ' %' + '<span>'

        // day five display

        var dayFiveTimeEl = document.querySelector('#dayfive-date')
        var dayFiveTime = response.daily[5].dt
        dayFiveTimeEl.innerHTML = '(' + timeConvert(dayFiveTime) + ')'

        var dayFiveImg = response.daily[4].weather[0].icon
        console.log(dayFiveImg);
        var dayFiveImgEl = document.createElement('img')
        dayFiveImgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + dayFiveImg + '.png')
        dayFiveImgDisplay.appendChild(dayFiveImgEl)

        var dayFiveTemp = response.daily[4].temp.day;
        var dayFiveTempEl = document.querySelector("#dayfive-temp")
        dayFiveTempEl.innerHTML = '<span>' + dayFiveTemp + '&#176;C' + '<span>'

        var dayFiveWind = response.daily[4].wind_speed;
        var dayFiveWindEl = document.querySelector("#dayfive-wind")
        dayFiveWindEl.innerHTML = '<span>' + dayFiveWind + ' MPS' + '<span>'

        var dayFiveHumid = response.daily[4].humidity;
        var dayFiveHumidEl = document.querySelector("#dayfive-humid")
        dayFiveHumidEl.innerHTML = '<span>' + dayFiveHumid + ' %' + '<span>'
    })
    createCityName();

    document.querySelector("#search-city").value = "";
}

//when clicked clears localstorage
function clearStorage(){
    localStorage.clear();
    cityName = [];
    location.reload();    
}

returnLocalStorage();