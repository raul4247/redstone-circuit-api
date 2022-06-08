const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.get("/users", async (req, res) => {
    try {
        const usersList = await User.find()
        
        return res.send(usersList)
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to get the users list' })
    }
})

router.post("/user", async (req, res) => {
    const username = req.body.username

    try {
        if (await User.findOne({ username }))
            return res.status(400).send({ 'error': 'Username already exists!' })

        const user = await User.create(req.body)
        user.password = undefined

        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ 'error': 'User registration failed' })
    }
})



module.exports = router