const express = require('express');
const userController = require('../../controllers/user/user.controller');

const router = express.Router();
const userInstance = new userController();

router.post('/user/create', userInstance.createUser)
router.get('/user/list', userInstance.getUsers)
router.get('/user/:id', userInstance.getUser)
router.put('/user/update/:id', userInstance.updateUser)
router.delete('/user/delete/:id', userInstance.deleteUser)
router.post('/user/login', userInstance.loginUser)
// Данная запись нужна, чтобы не терять контекст при вызове
router.post('/user/registration', async (req, res) => await userInstance.registrationUser(req, res))


module.exports = router