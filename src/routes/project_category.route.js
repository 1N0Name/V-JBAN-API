const express = require('express');
const ProjectCategoryController = require('../controllers/project_category.controller');
// const { AccessController } = require('../middleware/access_controller.middleware');

const router = express.Router();

router.get('/project/:projectId', ProjectCategoryController.getAllProjectCategories);
router.post('/', ProjectCategoryController.createProjectCategory);
router.put('/:id', ProjectCategoryController.editProjectCategory);
router.delete('/:id', ProjectCategoryController.deleteProjectCategory);

module.exports = router;