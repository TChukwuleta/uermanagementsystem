const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Read all
router.get('/', userController.home)

router.post('/', userController.find)

router.get('/addtodo', userController.form)

router.post('/addtodo', userController.create)

router.post('/edittodo/:name', userController.update)

router.get('/edittodo/:name', userController.edit)

router.get('/deletetodo/:name', userController.deleter)

router.get('/viewtodo/:name', userController.viewer)
 
module.exports = router