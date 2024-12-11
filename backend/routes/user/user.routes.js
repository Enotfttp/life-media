const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user/user.controller');
const userInstance = new userController()

router.post('/user/create', userInstance.createUser)
router.get('/user/list', userInstance.getUsers)
router.get('/user/:id', userInstance.getUser)
router.put('/user/update', userInstance.updateUser)
router.delete('/user/delete/:id', userInstance.deleteUser)
router.post('/user/login', userInstance.loginUser)
router.post('/user/registration', userInstance.registrationUser)


module.exports = router