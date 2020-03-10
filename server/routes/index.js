const express = require('express')
const router = express.Router()

const userRoute = require('../routes/userRoute')
const taskRoute = require('../routes/taskRoute')

router.use('/users', userRoute)
router.use('/tasks', taskRoute)

module.exports = router