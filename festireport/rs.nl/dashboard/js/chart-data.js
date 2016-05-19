function drawLineChart() {

	// Declare variables we'll be using
	var labels = [],
		data = [];

	// For each array value in the list, push into the new variables
	list.forEach(function(value) {
		labels.push(value.time);
		data.push(parseInt(value.pot));
	});

	// Set the chart.js data and parameters.
	var dataChart = {
		labels: labels,
		datasets: [
			{
				label: "History",
				fillColor: "#000",
				strokeColor: "#000",
				pointColor: "#000", 
				pointStrokeColor: "#000",
				pointHighlightFill: "#000",
				pointHighlightStroke: "#000",
				data: data
			}
		]
	};

	// Generate a line chart in #linechart
	var ctx = document.getElementById("linechart").getContext("2d");
	var myLineChart = new Chart(ctx, {
		type: "line",
		data: dataChart
	})

}