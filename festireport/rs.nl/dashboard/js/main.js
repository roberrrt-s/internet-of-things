// Declare global variables, and change the feedback color to white on startup.
var current = {};
var list = [];

$('#feedback').css('background-color', '#FFF');

// Interval to check if the NodeMCU has published new data, runs every 2 seconds
var checkNodeMcu = setInterval(function() {
	// Perform a GET request to read the JSON file.
	$.getJSON("../input/output.json", function(data) {

		// If the time doesn't match with the last entry, replace it, and push the new variables into the list.
		if(data.time !== current.time) {
			current = data;
			list.push(data);

			// Redraw the line chart
			drawLineChart();
		}
		else {
			console.log('nothing new!')
		}
	})
}, 2000)

// Interval to check the radio button for user feedback, runs every second
var checkCheckBoxes = setInterval(function() {

	// Query for the checked radio box
	var checked = document.querySelector('input[type="radio"]:checked');

	// Invoke sendData() based on the radio button.
	switch(checked.id) {
		case "off":
			sendData(0);
		break;
		case "low":
			sendData(1);
		break;
		case "medium":
			sendData(2);
		break;
		case "high":
			sendData(3);
		break;
	}


}, 1000);

// sendData sends a POST request to be read by the NodeMCU for feedback.
var sendData = function(value) {

	// Get the threshold option values
	var opt1 = Number($('#opt1').val());
	var opt2 = Number($('#opt2').val());
	var opt3 = Number($('#opt3').val());

	var feedback = $('#feedback');

	// Tricky code, should be editted properly, it basically says that when the radio buttons are off, the value should be changed based on the POT data 
	// If not, always emit the radio button that has been checked, and only change the background color of the feedback div.
	if(value === 0) {
		if(current.pot < opt1) {
			value = 0;
			console.log('too low')
			feedback.css('background-color', "#FFF")
		}
		if(current.pot > opt1) {
			value = 1;
			console.log('opt 1')
			feedback.css('background-color', "#FF0")
		}
		if(current.pot > opt2) {
			value = 2;
			console.log('opt 2')
			feedback.css('background-color', "#FFA500")
		}
		if(current.pot > opt3){
			value = 3;
			console.log('opt 3')
			feedback.css('background-color', "#F00")
		}
	}
	else {
		if(current.pot < opt1) {
			feedback.css('background-color', "#FFF")
		}
		if(current.pot > opt1) {
			feedback.css('background-color', "#FF0")
		}
		if(current.pot > opt2) {
			feedback.css('background-color', "#FFA500")
		}
		if(current.pot > opt3){
			feedback.css('background-color', "#F00")
		}
	}

	console.log("sending: " + value)

	// Perform the actual POST request with the value specified.
    $.post("../output/fire.php", {
        string: value
    },
    function(data, status){
    	console.log('posted new data')
    });
}

// Basic Google Maps code to place it inside #map and push a marker on it, the marker has a click event for user feedback
var initMap = function() {
	var mapDiv = document.getElementById('map');
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 52.370216, lng: 4.895168},
		zoom: 16
	});

	var marker = new google.maps.Marker({
	    position: {lat: 52.370051, lng: 4.890633},
	    map: map,
	    animation: google.maps.Animation.DROP,
    	title: 'Current location',
  	});

	marker.addListener('click', function() {
		alert('Bottleneck location, view sidebar for options and statistics')
	});
}