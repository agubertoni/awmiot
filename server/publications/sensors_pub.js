Meteor.publish('sensors', function () {
    return WaterSensors.find();
});
