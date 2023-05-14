const ProjectService = require('../services/project.service');

class ProjectController {
    async getAllUserProjects(req, res) {
        try {
            const userId = req.user.id;
            const projects = await ProjectService.getAllUserProjects(userId);
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProjectController();