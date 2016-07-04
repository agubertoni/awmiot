/**
 * Created by agubertoni on 6/23/16.
 */

Template.reactiveChart.onRendered(function () {
    var cursor = Template.currentData(),
        query = WaterSensors.find({},{fields:{node:1, reads:1, _id:0},sort:{node:1}}).fetch();
        initializing = true, // add initializing variable, see:  http://docs.meteor.com/#/full/meteor_publish
        liveChart;

    // Create basic line-chart:
    liveChart = Highcharts.chart(cursor.chart_id, {
        title: {
            text: 'Number of elements'
        },
        series: [{
            type: 'spline',
            name: 'sensors',
            data: [query]
        }]
    });

    // Add watchers:
    query.observeChanges({
        added: function () {
            if (!initializing) {
                // We will use Highcharts API to add point with "value = previous_value + 1" to indicate number of tasks
                var points = liveChart.series[0].points;
                liveChart.series[0].addPoint(
                    points[points.length - 1].y + 1
                );
            }
        },
        removed: function () {
            if (!initializing) {
                // We will use Highcharts API to add point with "value = previous_value - 1" to indicate number of tasks
                var points = liveChart.series[0].points;
                liveChart.series[0].addPoint(
                    points[points.length - 1].y - 1
                );
            }
        }
    });
    initializing = false;
});