(function() {
    function init() {
        document.querySelector(".cube--extended").addEventListener("click", displayPrompt);
        var cities = ["saint petersburg", "prague", "becici", "antalya", "atlanta"];
        var cubes = document.getElementsByClassName("cube--current");
        for (var i = 0; i < cubes.length; i ++) {
            queryOpenWeatherMap(cities[i], "weather", cubes[i]);
        }
    }

    //********************search form*******************************

    function displayPrompt() {
        var form = document.getElementById("search-form");
        var searchFormContainer = document.getElementById("search-form-container");
        form.elements.text.value = "";

        function complete(value) {
            document.onkeydown = null;
            searchFormContainer.style.display = "none";
            queryOpenWeatherMap(value, "forecast", document.querySelector(".cube--extended")) ;
        }

        form.onsubmit = function() {
            var userInput = form.elements.text.value;
            if (userInput === "") {
                return false;
            }
            complete(userInput);
            return false;
        };

        form.elements.cancel.onclick = function() {
            complete(null);
        };

        document.onkeydown = function(event) {
            if(event.keyCode === 27) { //keyboard esc button pressed
                complete(null);
            }
        }

        searchFormContainer.style.display = "block";
        form.elements.text.focus();
    }

    //***************end search form*******************************

    const method = "GET";
    const APIKey = "bf03de8120fbabf27fdd083f9d1fddc0";
    const baseAPICall = "http://api.openweathermap.org/data/2.5/";
    const metricSystem = "units=metric";

    function queryOpenWeatherMap(cityName, queryType, cube) {
        var request = new XMLHttpRequest();
        var url = baseAPICall + queryType + "?q=" + cityName + "&" + metricSystem + "&&APPID=" + APIKey;
        request.open(method, url);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var data = JSON.parse(request.responseText);
                if (queryType === "forecast") {
                    renderForecast(data, cube);
                } else {
                    renderCurrent(data, cube);
                }
            } else if (request.readyState === XMLHttpRequest.DONE) {
                alert("bad request");
            }
        };
        request.send();
    }

    function renderCurrent(data, cube) {
        var iconClass = "owf owf-" + data["weather"][0]["id"] + " owf-5x";
        var cityNameSlashTemp = data["name"] + " &#47; " + data["main"]["temp"] + " &#8451;";
        cube.querySelector(".icon").setAttribute("class", iconClass);
        cube.querySelector(".cube__info").innerHTML = cityNameSlashTemp;
    }

    function renderForecast(data, cube) {
        console.log(data);
        var iconClass = "owf owf-" + data["list"][0]["weather"][0]["id"] + " owf-5x";
        var cityNameSlashTemp = data["city"]["name"] + " &#47; " + data["list"][0]["main"]["temp"] + " &#8451;";
        cube.querySelector(".icon").setAttribute("class", iconClass);
        cube.querySelector(".cube__info").innerHTML = cityNameSlashTemp;
    }

    init();
}());