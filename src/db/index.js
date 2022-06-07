const mongoose = require('mongoose')

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const databaseUri = `mongodb+srv://${user}:${password}@cluster0.cc54h.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(
    databaseUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = mongoose