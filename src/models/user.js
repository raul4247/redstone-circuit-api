const mongoose = require('../db/index')
const bcrypt = require('bcryptjs')

const USER_STATUS = {
    DISABLED: 'DISABLED',
    RESET_PASSWORD: 'RESET_PASSWORD',
    ACTIVE: 'ACTIVE'
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    status: {
        type: String,
        default: USER_STATUS.DISABLED
    }
})

userSchema.pre('save', async function(next) { 
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return next()
})

const user = mongoose.model('User', userSchema)

module.exports = user