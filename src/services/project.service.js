require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
    Role,
    Project,
    ProjectCategory,
    PersonProject,
    Ticket,
    Invite,
} = require('../models/connections.model');
const { inviteToken } = require('../../config/auth.config');
const TokenHelper = require('../utils/token.helper');
const { InformationEmail } = require('../utils/email.helper');

class ProjectService {
    async getAllUserProjects(userId) {
        try {
            const personProjects = await PersonProject.findAll({
                where: { person_id: userId },
                include: [
                    {
                        model: Project,
                        attributes: [
                            'id',
                            'title',
                            'descr',
                            'chat_id',
                            'owner_id',
                            [Sequelize.literal('(SELECT COUNT(*) FROM "ticket" WHERE "ticket"."project_id" = "project"."id")'), 'totalTickets'],
                            [Sequelize.literal('(SELECT COUNT(*) FROM "ticket" INNER JOIN "project_category" ON "ticket"."category_id" = "project_category"."id" AND "project_category"."isFinal" = true WHERE "ticket"."project_id" = "project"."id")'), 'finishedTickets'],
                        ],
                    }
                ],
            });

            if (!personProjects || personProjects.length === 0) {
                throw new Error('No projects found for the person');
            }

            const projects = personProjects.map((personProject) => personProject.project);
            return projects;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to fetch projects');
        }
    }

    async createProject(userId, projectData) {
        try {
            const project = await Project.create({ ...projectData, userId });
            await PersonProject.create({ person_id: userId, project_id: project.id });
            return project;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to create project');
        }
    }

    async editProject(projectId, projectData) {
        try {
            const [updated] = await Project.update(projectData, {
                where: { id: projectId },
            });
            if (!updated) {
                throw new Error('Failed to update project');
            }
            return updated;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to update project');
        }
    }

    async deleteProject(projectId) {
        try {
            const deleted = await Project.destroy({
                where: { id: projectId }
            });
            if (!deleted) {
                throw new Error('Failed to delete project');
            }
            return deleted;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to delete project');
        }
    }

    async createInvite(email, projectId) {
        const role = await Role.findOne({ where: { role_name: 'Пользователь', project_id: projectId } });

        console.log(role.id);

        const payload = {
            roleId: role.id
        };

        const token = TokenHelper.generateAccessToken(payload, inviteToken.salt, inviteToken.expired);
        const invitationLink = `${process.env.SERVER_HOST}/api/login?token=${token}`;

        const informationEmail = new InformationEmail();
        informationEmail.send(
            email,
            'Приглашение в проект',
            {
                mainText: 'Вы были приглашены в проект на нашем сайте. Пожалуйста, нажмите на кнопку ниже, чтобы принять приглашение.',
                btnText: 'Принять приглашение',
                targetLink: invitationLink,
                secondaryText: '<p>Если вы не ожидали это приглашение, просто проигнорируйте это письмо.</p>',
            }
        );

        const invite = Invite.build({ token: token });
        await invite.save();

        return { message: `Приглашение в проект ${projectId} создано и отправлено` };
    }
}

module.exports = new ProjectService();