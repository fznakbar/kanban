const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const TaskController = require('../controllers/TaskController')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TaskController.addTask)
router.get('/', TaskController.findAll)
router.put('/edit/:id', authorization, TaskController.edit)
router.delete('/delete/:id', authorization, TaskController.delete)

module.exports = router