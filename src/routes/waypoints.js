const express = require('express')
const Waypoint = require('../models/waypoint')

const router = express.Router()

router.get('/waypoints', async (req, res) => {
    try {
        const waypointsList = await Waypoint.find()

        return res.send(waypointsList)
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to fetch waypoints' })
    }
})


router.post('/waypoints', async (req, res) => {
    try {
        const waypoint = await Waypoint.create(req.body)

        return res.send(waypoint)
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to insert waypoint' })
    }
})

module.exports = router