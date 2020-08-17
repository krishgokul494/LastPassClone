const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser({extended: false}))
app.use(cors())

// routes 
const registerRoutes = require('./routes/register')

app.get('/', (req, res) => {
    res.send('Hello...')
})

app.use('/register', registerRoutes)

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
        console.log("The app is listening to "+ config.port)
    })
})
