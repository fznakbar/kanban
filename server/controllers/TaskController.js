const Model = require('../models')
const Task = Model.Task

class TaskController {
    static findAll(req, res, next){
        let id = req.userData.id
        Task.findAll({where : {UserId : id}})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static addTask(req, res, next){
        let obj = {
            title : req.body.title,
            category : req.body.category,
            UserId : req.userData.id
        }
        Task.create(obj)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static edit(req, res, next){
        let id = req.params.id
        let obj = {
            title : req.body.title,
            category : req.body.category,
        }
        Task.update(obj, {where : {id:id}})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static delete(req, res, next){
        let id = req.params.id
        Task.destroy({where : {id:id}})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = TaskController