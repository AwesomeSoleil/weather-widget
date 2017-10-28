$(document).ready(function() {

	var cities = [
		{
			cityName: "Moscow"
		},
		{
			cityName: "Saint Petersburg"
		},
		{},
		{},
		{},
		{}
	];
	
	var api;
	
	$.getJSON( "http://api.openweathermap.org/data/2.5/weather?q=budva&units=metric&&APPID=bf03de8120fbabf27fdd083f9d1fddc0", function(data) {
		$.each( data, function(key, value) {
			console.log(key + " =>=> " + value);
		});
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

function popUpSearchForm() {
	var shadowDiv = document.createElement("div");
	shadowDiv.setAttribute("id", "shadow");
}

function hideSearchForm() {
	document.removeChild()(document.getElementById("shadow"));
}

function displayPrompt() {
	popUpSearchForm();
	var form = document.getElementById("search-form");
	var searchFormContainer = document.getElementById("search-form-container");
//	form.elements.text.value = ""; click on div, not input field !

	function complete(value) {
		hideSearchForm();
		searchFormContainer.style.display = "none";
		document.onkeydown = null;
		callback(value); //?????????????????????????????????
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
	form.elements.search.focus(); //error pops up! I saw it !
}//end displayPrompt

document.querySelector(".icon").onclick = function() {
	displayPrompt();
};

function weatherModule() {
	const APIKey = "bf03de8120fbabf27fdd083f9d1fddc0";
	const baseAPICall = "http://api.openweathermap.org/data/2.5/weather?q=";
	const metricSystem = "units=metric";
	var request = new XMLHttpRequest();
	var cityName = "Chicago";
	request.onreadystatechange = function() {

	}
	request.open("GET", baseAPICall + cityName + "&" + metricSystem + "&&APPID=" + APIKey, true);
	request.send();
	var data = request.responseText;
	console.log(data["cod"]);
//	полученный json не парсится!
};

weatherModule();