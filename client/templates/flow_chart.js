/**
 * Created by agubertoni on 6/13/16.
 */

Template.flowChart.rendered = function () {
    var drawChart = function (update) {
        $('#firstchart').empty();
        var data = WaterSensors.findOne({"doc_type": "morris_doc"},{fields:{node:1, hour:1, values:1},sort:{hour:-1}});
        data = data.values;

        //var data = [
        //    { year: '2008', value: 10},
        //    { year: '2009', value: 20}
        //];

        if (!update) {
        } else {
        }

        if (data) {
            new Morris.Line({
                // ID of the element in which to draw the chart.
                element: 'firstchart',
                // Chart data records -- each entry in this array corresponds to a point on
                // the chart.
                data:    data,
                // The name of the data record attribute that contains x-values.
                xkey:    'timestamp',
                // A list of names of data record attributes that contain y-values.
                ykeys:   ['temp', 'rssi'],
                // Labels for the ykeys -- will be displayed when you hover over the
                // chart.
                labels:  ['Temp', 'Brix'],
                postUnits: ['°C'],
                dateFormat: function(date) {
                    d = new Date(date);
                    return d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' | '+
                        d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();
                },
                //goals: [70.0, 30.0],
                //goalStrokeWidth: 4,
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
