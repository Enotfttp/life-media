const express = require('express');
const router = express.Router();

const roleController = require('../../controllers/user/role.controller');
const roleInstance = new roleController()

router.post('/role/create', roleInstance.createRole)
router.get('/role/list', roleInstance.getRoles)
router.get('/role/:id', roleInstance.getRole)
router.put('/role/update', roleInstance.updateRole)
router.delete('/role/delete/:id', roleInstance.deleteRole)

module.exports = router