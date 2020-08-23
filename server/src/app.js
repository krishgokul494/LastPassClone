const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')
const morgan = require('morgan')
// const session = require('express-session')
const session = require('cookie-session')
const {sequelize} = require('./models')
const config = require('./config/config')
const passport = require('passport')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser({extended: false}))
// app.options('*', cors())
// app.use(cors({
//     origin: 'http://localhost:8080'
// }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'http://localhost:8080')
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Headers", "content-type")
    next()
})
app.use(session({
    // secret: config.sessionSecret,
    // resave: false,
    // saveUninitialized: false,
    maxAge: 24*60*60*1000,
    keys: [config.sessionSecret]
  }))

require('./config/passport-setup')
app.use(passport.initialize())
app.use(passport.session())

// routes 
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')

app.get('/', (req, res) => {
    // console.log(req.user)
    console.log('isAuth')
    console.log(req.isAuthenticated())
    res.send('Hello...')
})

app.post('/isAuthenticated', (req, res) => {
    console.log('isAuth')
    console.log(req.isAuthenticated())
    res.send(req.isAuthenticated())
})

app.post('/logout', (req, res) => {
    req.logOut()
    res.send(true)
})

app.post('/vault', (req, res, ) => {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        res.send('vault')
    }else{
        res.status(401).send('not logged')
    }
})

app.use('/login', loginRoutes)

app.use('/register', registerRoutes)

sequelize.sync()
    .then(() => {
        app.listen(config.port, () => {
        console.log("The app is listening to "+ config.port)
    })
})
