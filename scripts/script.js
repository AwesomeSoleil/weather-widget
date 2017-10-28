$(document).ready(function() {
	
	var api;
	var cityName = "moscow";

//***********************************************************

	var cubes = document.getElementsByClassName("cube__info");
	for (var cube = 0; cube < cubes.length; cube ++) {
		cubes[cube].addEventListener("click", displayPrompt);
	}

	function displayPrompt() {
		console.log(event.target);
		var form = document.getElementById("search-form");
		var searchFormContainer = document.getElementById("search-form-container");
		form.elements.text.value = "";

		function complete(value) {
			document.onkeydown = null;
			searchFormContainer.style.display = "none";
//			setCityName(value);
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


//***********************************************************
	
	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&&APPID=bf03de8120fbabf27fdd083f9d1fddc0", function(data) {
		api = data;
		render();
	});
	
	function render() {
		$("#message").html(api["name"]);
		$("#temp").html(api["main"]["temp"]);
		var iconClass = "owf owf-" + api["weather"][0]["id"] + " owf-5x";
        $(".icon").attr("class", iconClass);
	}
        
});

//search form

/* var cubes = document.getElementsByClassName("cube");
for (var cube = 0; cube < cubes.length; cube ++) {
	cubes[cube].addEventListener("click", displayPrompt);
}

function displayPrompt() {
	console.log(event.target);
	var form = document.getElementById("search-form");
	var searchFormContainer = document.getElementById("search-form-container");
	form.elements.text.value = "";

	function complete(value) {
		document.onkeydown = null;
		searchFormContainer.style.display = "none";
//		set cityName;
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
} */

/* function weatherModule() {
	const APIKey = "bf03de8120fbabf27fdd083f9d1fddc0";
	const baseAPICall = "http://api.openweathermap.org/data/2.5/weather?q=";
	const metricSystem = "units=metric";
	var request = new XMLHttpRequest();
//	var cityName = "Chicago";
	request.onreadystatechange = function() {

	}
	request.open("GET", baseAPICall + cityName + "&" + metricSystem + "&&APPID=" + APIKey, true);
	request.send();
	var data = request.responseText;
	console.log(data["cod"]);
//	полученный json не парсится!
}; */

//weatherModule();