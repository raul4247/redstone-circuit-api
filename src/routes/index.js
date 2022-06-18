const router = require('express').Router()
const authMiddleware = require('../middleware/authentication')

router.use('/api/auth', require('./auth'))
router.use('/api/user', require('./users'))
router.use('/api/waypoint', authMiddleware, require('./waypoints'))
router.use('/api/minecraft-server', authMiddleware, require('./minecraftServer'))

module.exports = router