const Router = require('express').Router();
const router = new Router()
const roleController = require('../../controllers/user/role.controller');

router.post('/role', roleController.createRole)
router.get('/role', roleController.getRoles)
router.get('/role/:id', roleController.getRole)
router.put('/role', roleController.updateRole)
router.delete('/role/:id', roleController.deleteRole)


module.exports = router