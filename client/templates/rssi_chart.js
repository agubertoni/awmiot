Template.rssiChart.rendered = function () {
    var drawChart = function (update) {
        $('#secondChart').empty();
        var data = WaterSensors.find({},{fields:{node:1,rssi:1},sort:{node:1}}).fetch();

        if (!update) {
        } else {
        }

        if (data) {
            new Morris.Line({
                // ID of the element in which to draw the chart.
                element: 'secondChart',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data:    data,
                // The name of the data record attribute that contains x-values.
                xkey:    'node',
                // A list of names of data record attributes that contain y-values.
                ykeys:   ['rssi'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels:  ['Value'],
                resize:  true
            });
        }
    };


    WaterSensors.find().observe({
        added: function () {
            drawChart(false);
        },
        changed: _.partial(drawChart, true)
    });

};
