const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(require('./routes'))

app.get('/', (req, res) => {
    res.send('redstone-circuit-api 👌')
})

app.listen(process.env.SERVER_PORT, () => {
    console.log('Redstone circuit is running! 🌎')
})