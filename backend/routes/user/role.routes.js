const express = require('express');
const router = express.Router();

const roleController = require('../../controllers/user/role.controller');
const roleInstance = new roleController()

router.post('/role', roleInstance.createRole)
router.get('/role', roleInstance.getRoles)
router.get('/role/:id', roleInstance.getRole)
router.put('/role', roleInstance.updateRole)
router.delete('/role/:id', roleInstance.deleteRole)


module.exports = router