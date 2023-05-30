const {
    Role,
    Action,
    RoleAction,
} = require('../models/connections.model');

class RoleService {
    async getAllProjectRoles(projectId) {
        const roles = await Role.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: RoleAction,
                    include: [{ model: Action }]
                }
            ]
        });

        // Переформатируем каждую роль
        return roles.map(role => {
            const formattedActions = role.role_actions.map(roleAction => {
                return {
                    id: roleAction.action.id,
                    name: roleAction.action.name,
                    description: roleAction.action.description
                };
            });

            return {
                id: role.id,
                role_name: role.role_name,
                role_actions: formattedActions
            };
        });
    }

    async getRoleActions(roleId) {
        const role = await Role.findByPk(roleId, {
            include: [
                {
                    model: RoleAction,
                    include: [{ model: Action }]
                }
            ]
        });

        if (!role)
            throw new Error('Role not found');

        return role.role_actions.map(roleAction => {
            return {
                id: roleAction.action.id,
                name: roleAction.action.name,
                description: roleAction.action.description
            };
        });
    }

    async createRole(projectId, actions) {
        const newRole = await Role.create({ project_id: projectId });

        const existingActions = await Action.findAll({
            where: { name: actions }
        });

        const roleActionsToCreate = existingActions.map(action => ({
            role_id: newRole.id,
            action_id: action.id
        }));

        await RoleAction.bulkCreate(roleActionsToCreate);

        return newRole;
    }

    async editRole(roleId, actions) {
        const updatedRole = await Role.findByPk(roleId);

        if (!updatedRole) throw new Error('Role not found');

        await RoleAction.destroy({ where: { role_id: roleId } });

        const existingActions = await Action.findAll({
            where: { name: actions }
        });

        const roleActionsToCreate = existingActions.map(action => ({
            role_id: roleId,
            action_id: action.id
        }));

        await RoleAction.bulkCreate(roleActionsToCreate);

        return updatedRole;
    }

    async deleteRole(roleId) {
        const transaction = await sequelize.transaction();

        try {
            await Role.destroy({ where: { id: roleId } }, { transaction });
            await RoleAction.destroy({ where: { role_id: roleId } }, { transaction });

            await transaction.commit();
            return true;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = new RoleService();