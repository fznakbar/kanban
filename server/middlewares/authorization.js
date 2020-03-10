const {Task} = require('../models')
function authorization(req, res, next){
    let userId = req.userData.id
    let taskId = req.params.id
    Task.findOne({where : {
        UserId : userId,
        id : taskId
    }})
    .then(data=>{
        if(data){
            next()
        } else {
            next({
                msg : 'Not Authorized',
                status : 401
            })
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = authorization