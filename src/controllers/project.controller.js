const ProjectService = require('../services/project.service');

class ProjectController {
    async getAllUserProjects(req, res) {
        try {
            const userId = req.user.id;
            const projects = await ProjectService.getAllUserProjects(userId);
            res.json(projects);
        } catch (error) {
            next(error);
        }
    }

    async createProject(req, res, next) {
        try {
            const newProject = await ProjectService.createProject(req.user.id, req.body);
            res.json(newProject);
        } catch (error) {
            next(error);
        }
    }

    async editProject(req, res, next) {
        try {
            const updatedProject = await ProjectService.editProject(req.params.id, req.body);
            res.json(updatedProject);
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req, res, next) {
        try {
            const deletedProject = await ProjectService.deleteProject(req.params.id);
            res.json(deletedProject);
        } catch (error) {
            next(error);
        }
    }

    async createInvite(req, res, next) {
        try {
            const { email, projectId } = req.body;

            const result = await ProjectService.createInvite(email, projectId);

            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProjectController();