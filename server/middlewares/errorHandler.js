function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({msg : `Please Fill All The Form`})
    } else if (err.status === 404) {
        res.status(err.status).json({msg : `Wrong Email / Password`})
    } else if (err.name === 'JsonWebTokenError') {
        res.status(403).json({msg : `You Have To Login First`})
    }else if (err.status===401) {
        res.status(401).json({msg : `Not Authorized`})
    } else if(err.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({msg : `Your Email Has Been Registered`})
    }else {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = errorHandler