/**
 * Created by agubertoni on 6/13/16.
 */

Template.flowChart.rendered = function () {
    var drawChart = function (update) {
        $('#firstchart').empty();
        var pointer = WaterSensors.find({},{fields:{node:1, reads:1, _id:0},sort:{node:1}}).fetch();

        var data = [
            { year: '2008', value: 10},
            { year: '2009', value: 20}
        ];


        if (!update) {
        } else {
        }

        if (data) {
            new Morris.Bar({
                // ID of the element in which to draw the chart.
                element: 'firstchart',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data:    data,
                // The name of the data record attribute that contains x-values.
                xkey:    'year',
                // A list of names of data record attributes that contain y-values.
                ykeys:   ['value'],
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
