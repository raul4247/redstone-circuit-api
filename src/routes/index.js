const router = require('express').Router()

router.use('/api', require('./users'))
router.use('/api', require('./waypoints'))

module.exports = router