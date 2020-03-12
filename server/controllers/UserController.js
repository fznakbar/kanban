require('dotenv').config()
const Model = require('../models')
const User = Model.User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

class UserController {
    static register(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
        User.create(obj)
            .then(data => {
                let token = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET)
                res.status(201).json(token)
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        let dataEmail = null
        let dataId = null
        User.findOne({ where: { email: email } })
            .then(data => {
                if(data){
                    dataEmail = data.email
                    dataId = data.id
                    return bcrypt.compare(password, data.password)
                } else {
                    throw {
                        src: "login",
                        status: 404
                    }               
                }
            })
            .then(function(result) {
                if (result) {
                    let token = jwt.sign({ id: dataId, email: dataEmail }, process.env.SECRET)
                    res.status(200).json(token)
                } else {
                    throw {
                        src: "login",
                        status: 404
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController