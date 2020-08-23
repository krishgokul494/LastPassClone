const router = require('express').Router()
// const loginController = require('../controllers/login')
const passport = require('passport')

router.post('', passport.authenticate('local'), (req, res) => {
    res.send('logged');
})

module.exports = router