Template.sensorslist.helpers({
    'showSensor': function () {
        return WaterSensors.find()
    },
    'countSensors': function () {
        return WaterSensors.find().count()
    },
    'selectedClass': function () {
        return "active"
    }
});

Template.sensorslist.events({
    'change': function () {
        console.log("change")
    },
    'click li.sensor': function () {
        var sensorId = this._id
        console.log(sensorId)
    }
});
