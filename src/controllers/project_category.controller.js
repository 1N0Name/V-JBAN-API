const ProjectCategoryService = require('../services/project_category.service');

class ProjectCategoryController {
    async getAllProjectCategories(req, res, next) {
        try {
            const categories = await ProjectCategoryService.getAllProjectCategories(req.params.projectId);
            res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    async createProjectCategory(req, res, next) {
        try {
            const category = await ProjectCategoryService.createProjectCategory(req.body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async editProjectCategory(req, res, next) {
        try {
            const category = await ProjectCategoryService.editProjectCategory(req.params.id, req.body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async deleteProjectCategory(req, res, next) {
        try {
            await ProjectCategoryService.deleteProjectCategory(req.params.id);
            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProjectCategoryController();