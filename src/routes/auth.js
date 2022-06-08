const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const UserStatus = require('../models/UserStatus')

const router = express.Router()

router.patch("/auth/reset-password/:username", async (req, res) => {
    try {
        const username = req.params.username
        const { temporaryPassword, newPassword } = req.body

        const user = await User.findOne({ username }).select('+password')
        if (!user)
            return res.status(400).send({ 'error': 'Username not found' })

        if (user.status !== UserStatus.RESET_PASSWORD)
            return res.status(400).send({ 'error': `User status is: ${user.status}. Contact the server admin` })

        if (temporaryPassword === newPassword)
            return res.status(400).send({ 'error': 'New password cannot be equal to the temporary one' })

        // TODO validate if new password is valid (min length...)
        // TODO check all requests params to return bad request (?)
        // TODO fix all response codes...

        if (!await bcrypt.compare(temporaryPassword, user.password))
            return res.status(400).send({ 'error': `Invalid password` })

        const updatedUser = await User.findOneAndUpdate({ username }, {
            password: await bcrypt.hash(newPassword, 10),
            status: UserStatus.ACTIVE
        }, {returnOriginal: false})

        return res.send(updatedUser)
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to reset password' })
    }
})

router.post("/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username }).select('+password')
        if (!user)
            return res.status(400).send({ 'error': 'Username not found' })

        if (user.status === UserStatus.RESET_PASSWORD)
            return res.status(400).send({ 'error': 'Reset your password first!' })

        if (user.status !== UserStatus.ACTIVE)
            return res.status(400).send({ 'error': `User status is: ${user.status}. Contact the server admin` })

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ 'error': `Invalid password` })

        // TODO generate jwt token..
        return res.send("ok!")
    } catch (err) {
        return res.status(400).send({ 'error': 'Failed to get token' })
    }
})

module.exports = router