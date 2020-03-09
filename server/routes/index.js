const express = require('express')
const router = express.Router()
const Kanban = require('../controllers/KanbanController')

router.get('/', Kanban.helloWorld)

module.exports = router