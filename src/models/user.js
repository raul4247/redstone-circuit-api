const mongoose = require('../db/index')
const bcrypt = require('bcryptjs')
const UserStatus = require('./uuserStatus')

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
        default: UserStatus.DISABLED
    }
})

userSchema.pre('save', async function(next) { 
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return next()
})

module.exports = mongoose.model('User', userSchema)