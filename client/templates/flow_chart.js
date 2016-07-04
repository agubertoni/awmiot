/**
 * Created by agubertoni on 6/13/16.
 */

Template.flowChart.rendered = function () {
    var drawChart = function (update) {
        $('#firstchart').empty();
        var pointer = WaterSensors.find({},{fields:{node:1, reads:1, _id:0},sort:{node:1}}).fetch();

        var uNode = pointer[0].node;
        //var uFlow = pointer[0].reads[0].flow;
        var uFlow = WaterSensors.findOne({node:"01"}).reads[0].flow;
        var data = [];
        var obj = {};

        obj['node'] = uNode;
        obj['flow'] = uFlow;
        data.push(obj);

        /*
        var data = [
            { year: '2008', value: 10},
            { year: '2009', value: 20}
        ];
        */

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
                xkey:    'node',
                // A list of names of data record attributes that contain y-values.
                ykeys:   ['flow'],
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
