var current = {};
var list = [];
$('#feedback').css('background-color', '#FFF');

var checkNodeMcu = setInterval(function() {
	$.getJSON("../input/output.json", function(data) {

		if(data.time !== current.time) {
			current = data;
			list.push(data);
			drawLineChart();
		}
		else {
			console.log('nothing new!')
		}
	})
}, 2000)

var checkCheckBoxes = setInterval(function() {

	var checked = document.querySelector('input:checked');

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

var sendData = function(value) {

	var opt1 = Number($('#opt1').val());
	var opt2 = Number($('#opt2').val());
	var opt3 = Number($('#opt3').val());

	var feedback = $('#feedback');

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
		feedback.css('background-color', "#FFF")
	}

	console.log("sending: " + value)

    $.post("../output/fire.php", {
        string: value
    },
    function(data, status){
    	console.log('posted new data')
    });
}

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