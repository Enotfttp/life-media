const Router = require('express').Router();
const router = new Router()
const userController = require('../../controllers/user/user.controller');

router.post('/user', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/user/:id', userController.getUser)
router.put('/user', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.post('/login', userController.loginUser)
router.post('/registration', userController.registrationUser)
// router.post('/logout', userController.logoutUser)


module.exports = router