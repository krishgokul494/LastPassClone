const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config({path: 'F:/LastPassClone/server/.env'})

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello...')
})

app.listen(process.env.PORT, () => {
    console.log("The app is listening to "+ process.env.PORT)
})