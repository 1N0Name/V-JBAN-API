const sequelize = require('../../config/db.config');
const {
    Person,
    Role,
    Action,
    Project,
    PersonRole,
    RoleAction,
    Ticket,
} = require('../models/connections.model');

function AccessController() {
    return async function (req, res, next) {
        const actionName = req.method.toLowerCase();
        const userId = req.user.id;

        const baseUrlSplits = req.baseUrl.split('/');
        const resourceType = baseUrlSplits[2]; // Assume /api/resourceType/...

        const routePathSplits = req.route.path.split('/');
        const idType = routePathSplits[1] === 'project' ? 'project' : resourceType;

        const Model = { 
            'person': Person,
            'project': Project,
            'ticket': Ticket,
            'role': Role
        }[resourceType];
        const resourceId = req.params.id;

        let resource = null;
        if (idType !== 'project') {
            resource = await Model.findByPk(resourceId);
            if (!resource) {
                return res.status(404).send({ message: 'Resource not found' });
            }
        }

        const projectId = actionName === 'post' ? req.body.project_id : resource ? resource.project_id : resourceId;
        const project = await Project.findByPk(projectId, {
            include: {
                model: Role,
                include: {
                    model: PersonRole,
                    where: { person_id: userId }
                },
            }
        });
        if (!project) {
            return res.status(404).send({ message: 'Project not found' });
        }

        if (project.owner_id === userId) {
            return next();
        }

        if (resourceType === 'ticket' && actionName === 'put' && await isAssignedToTicket(userId, projectId)) {
            return next();
        }

        if (await hasPermission(userId, projectId, `${actionName}_${resourceType}`)) {
            return next();
        }

        return res.status(403).send({ message: 'Access denied' });
    };

    async function isAssignedToTicket(userId, projectId) {
        const ticketAssignment = await PersonTicket.findOne({
            where: { person_id: userId, ticket_id: projectId },
        });

        return !!ticketAssignment;
    }

    async function hasPermission(userId, projectId, actionName) {
        const personRole = await PersonRole.findOne({
            where: { person_id: userId },
            include: {
                model: Role,
                where: { project_id: projectId },
                include: {
                    model: RoleAction,
                    include: { model: Action, where: { name: actionName } },
                },
            },
        });

        return !!personRole;
    }
}

module.exports = {
    AccessController,
}