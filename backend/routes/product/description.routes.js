const express = require('express');
const userController = require('../../controllers/user/user.controller');

const router = express.Router();
const userInstance = new userController();

router.post('/description/create', userInstance.createUser)
router.get('/description/list', userInstance.getUsers)
router.get('/description/:id', userInstance.getUser)
router.put('/description/update', userInstance.updateUser)
router.delete('/description/delete/:id', userInstance.deleteUser)


module.exports = router