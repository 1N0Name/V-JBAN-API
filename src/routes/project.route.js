const express = require('express');
const { AccessController } = require('../middleware/access_controller.middleware');
const ProjectController = require('../controllers/project.controller');

const router = express.Router();

router.get('/user', ProjectController.getAllUserProjects);
router.post('/', AccessController(), ProjectController.createProject);
router.put('/:id', AccessController(), ProjectController.editProject);
router.delete('/:id', AccessController(), ProjectController.deleteProject);

router.post('/invite', ProjectController.createInvite);

module.exports = router;