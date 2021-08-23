const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Read all
router.get('/', userController.home)

router.post('/', userController.find)

// Create
router.post('/adduser', userController.create)

// Update
router.post('/edituser/:name', userController.update)

router.get('/adduser', userController.form)
router.get('/edituser/:name', userController.edit)

router.get('/deleteuser/:name', userController.deleter)

router.get('/viewuser/:name', userController.viewer)

module.exports = router