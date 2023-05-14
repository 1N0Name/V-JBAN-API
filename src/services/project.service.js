const {
    Project,
    PersonProject,
} = require('../models/connections.model');

class ProjectService {
    async getAllUserProjects(userId) {
        try {
            const personProjects = await PersonProject.findAll({
                where: { person_id: userId },
                include: Project
            });

            if (!personProjects || personProjects.length === 0) {
                throw new Error('No projects found for the person');
            }

            const projects = personProjects.map((personProject) => personProject.project);
            return projects;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to fetch projects');
        }
    }
}

module.exports = new ProjectService();