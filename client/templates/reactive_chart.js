/**
 * Created by agubertoni on 6/23/16.
 */

Template.reactiveChart.onRendered(function () {

    var cursor = Template.currentData(),
        initializing = true, // add initializing variable, see:  http://docs.meteor.com/#/full/meteor_publish
        liveChart,
        data1 = [45, 30, 20, 50, 80, 61, 75],
        data3 = [50, 50, 50];

    var processed_data = [];

    Deps.autorun(function (c) {
        console.log('run');
        var curs = WaterSensors.find({},{fields:{node:1, values:1, hour:1}, sort:{hour:-1}});
        if(!curs.count()) return;

        curs.forEach(function (row) {
            console.log(row.values);
            processed_data.push(row.values);
        });

        console.log(processed_data[0]);

        // Create basic line-chart:
        liveChart = Highcharts.chart(cursor.chart_id, {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Average Monthly Weather Data for Tokyo'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: [{
                categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Temperature',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: true

            }, { // Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Rainfall',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

            }, { // Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'Sea-Level Pressure',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value} mb',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 80,
                verticalAlign: 'top',
                y: 55,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [{
                name: 'Rainfall',
                type: 'column',
                yAxis: 1,
                data: processed_data[0],
                tooltip: {
                    valueSuffix: ' mm'
                }

            }, {
                name: 'Sea-Level Pressure',
                type: 'spline',
                yAxis: 2,
                data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
                marker: {
                    enabled: false
                },
                dashStyle: 'shortdot',
                tooltip: {
                    valueSuffix: ' mb'
                }

            }, {
                name: 'Temperature',
                type: 'spline',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                tooltip: {
                    valueSuffix: ' °C'
                }
            }]

        });

        // Add watchers:
        curs.observeChanges({
            added: function () {
                if (!initializing) {
                    var points = liveChart.series[0].values;
                    liveChart.series[0].addPoint(
                        points[points.length - 1].y + 1
                    );

                }
            }
        });

        c.stop();
    });


    initializing = false;
});
