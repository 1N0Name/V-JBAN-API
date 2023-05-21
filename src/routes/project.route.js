const express = require('express');
const { AccessController } = require('../middleware/access_controller.middleware');
const ProjectController = require('../controllers/project.controller');

const router = express.Router();

router.get('/user', ProjectController.getAllUserProjects);

module.exports = router;