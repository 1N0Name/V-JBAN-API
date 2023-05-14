const express = require('express');
const ProjectController = require('../controllers/project.controller');

const router = express.Router();

router.get('/user', ProjectController.getAllUserProjects);

module.exports = router;