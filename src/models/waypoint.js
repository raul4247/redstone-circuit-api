const mongoose = require('../db/index')

const waypointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coordinateX: {
        type: Number,
        required: true
    },
    coordinateY: {
        type: Number,
        required: true
    },
    coordinateZ: {
        type: Number,
        required: true
    }
})

const waypoint = mongoose.model('Waypoint', waypointSchema)

module.exports = waypoint