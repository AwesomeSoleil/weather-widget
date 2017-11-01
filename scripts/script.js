(function() {

    var list = document.querySelector(".cube--extended ul");//ugly but should be global to avoid multiple DOM queries
    const method = "GET";
    const APIKey = "bf03de8120fbabf27fdd083f9d1fddc0";
    const baseAPICall = "http://api.openweathermap.org/data/2.5/";
    const metricSystem = "units=metric";

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
            if (value !== null) {
                queryOpenWeatherMap(value, "forecast", document.querySelector(".cube--extended"));
            }
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

    function queryOpenWeatherMap(cityName, queryType, cube) {
        var request = new XMLHttpRequest();
        var url = baseAPICall + queryType + "?q=" + cityName + "&" + metricSystem + "&&APPID=" + APIKey;
        request.open(method, url);
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                var data = JSON.parse(request.responseText);
                render(data, queryType, cube);
            } else if (request.readyState === XMLHttpRequest.DONE) {
                alert("bad request");
            }
        };
        request.send();
    }

function render(data, queryType, cube) {
    var iconClass = null;
    var cityNameSlashTemp = null;

    if (queryType === "weather") {
        iconClass = "owf owf-" + data["weather"][0]["id"] + " owf-5x";
        cityNameSlashTemp = data["name"] + " &#47; " + (data["main"]["temp"]).toFixed(0) + " &#8451;";
        cube.querySelector(".icon").setAttribute("class", iconClass);
    } else {
        iconClass = "owf owf-" + data["list"][0]["weather"][0]["id"] + " owf-5x";
        cityNameSlashTemp = data["city"]["name"] + " &#47; " + data["list"][0]["main"]["temp"].toFixed(0) + " &#8451;";
        cube.querySelector(".icon").setAttribute("class", iconClass);
        setList(data);
    }
    cube.querySelector(".cube__info").innerHTML = cityNameSlashTemp;
}

    function getDayOfWeek(timeStamp) {
        const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        return days[new Date(timeStamp * 1000).getDay()];
    }

    function setList(data) {
        list.innerHTML = "";
        var docFragment = document.createDocumentFragment();
        for (var i = 1; i < data["list"].length; i += 8) {
            var listItem = document.createElement("li");

            var dayDiv = document.createElement("div");
            dayDiv.textContent = getDayOfWeek(data["list"][i]["dt"]);
            listItem.appendChild(dayDiv);

            var iconDiv = document.createElement("div");
            var icon = document.createElement("i");
            var iconClass = "icon owf owf-" + data["list"][i]["weather"][0]["id"] + " owf-2x";
            icon.setAttribute("class", iconClass);
            iconDiv.appendChild(icon);
            listItem.appendChild(iconDiv);

            var tempDiv = document.createElement("div");
            var temp = data["list"][i]["main"]["temp"].toFixed(0) + " &#8451;";
            tempDiv.innerHTML = temp;
            listItem.appendChild(tempDiv);

            docFragment.appendChild(listItem);
        }
        list.appendChild(docFragment);
    }

    init();
}());
