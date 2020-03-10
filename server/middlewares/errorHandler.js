function errorHandler(err, req, res, next) {
    // console.log('masuk errHandler')
    // console.log(err)
    if (err.name === 'SequelizeValidationError') {
        res.status(400).json(err.errors)
    } else if (err.status === 404) {
        res.status(err.status).json(`Error from ${err.src}, not found`)
    } else if (err.name === 'JsonWebTokenError') {
        res.status(403).json(`You Have To Login First`)
    }else if (err.status===401) {
        res.status(401).json(`Not Authorized`)
    } else {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports = errorHandler