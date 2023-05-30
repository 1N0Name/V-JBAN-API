const express = require('express');
const { AccessController } = require('../middleware/access_controller.middleware');
const RoleController = require('../controllers/role.controller');

const router = express.Router();

router.get('/project/:id', AccessController(), RoleController.getAllProjectRoles);
router.get('/:id', AccessController(), RoleController.getRoleActions);
router.post('/', AccessController(), RoleController.createRole);
router.put('/:id', AccessController(), RoleController.editRole);
router.delete('/:id', AccessController(), RoleController.deleteRole);

module.exports = router;