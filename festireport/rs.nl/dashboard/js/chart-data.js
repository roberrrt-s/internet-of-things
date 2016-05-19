function drawLineChart() {

  var labels = [],
      data = [];

  list.forEach(function(value) {
      labels.push(value.time);
      data.push(parseInt(value.pot));
  });

  var tempData = {
    labels: labels,
    data: data
  };

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

  var ctx = document.getElementById("linechart").getContext("2d");
  var myLineChart = new Chart(ctx, {
    type: "line",
    data: dataChart
  })

}