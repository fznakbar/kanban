const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    let token = req.headers.access_token
    try{
        let data = jwt.verify(token, process.env.SECRET)
        req.userData = data
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = authentication