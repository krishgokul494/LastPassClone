const User = require('../models').user
const {validationResult} = require('express-validator')
const register = async (req, res) => {
    var errors = validationResult(req)
    if(errors.isEmpty()){
        await User.create({
            email: req.body.email,
            masterpassword: req.body.masterpassword,
            remainder: req.body.remainder
        }).then((user) => {
            res.send(user)
        }).catch((error) => {
            res.status(400).send({
                error: error
            })
        })
    }else{
        res.status(400).send({
            error: errors.errors
        })
    }
}

module.exports = {
    register
}