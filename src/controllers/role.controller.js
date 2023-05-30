const RoleService = require('../services/role.service');

class RoleController {
    async getAllProjectRoles(req, res, next) {
        try {
            const projectId = req.params.id;
            const roles = await RoleService.getAllProjectRoles(projectId);
            res.json(roles);
        } catch (error) {
            next(error);
        }
    }

    async getRoleActions(req, res, next) {
        try {
            const { id } = req.params;
            const actions = await RoleService.getRoleActions(id);
            res.json(actions);
        } catch (error) {
            next(error);
        }
    }

    async createRole(req, res, next) {
        try {
            const { projectId, actions } = req.body;
            const newRole = await RoleService.createRole(projectId, actions);
            res.json(newRole);
        } catch (error) {
            next(error);
        }
    }

    async editRole(req, res, next) {
        try {
            const { actions } = req.body;
            const updatedRole = await RoleService.editRole(req.params.id, actions);
            res.json(updatedRole);
        } catch (error) {
            next(error);
        }
    }

    async deleteRole(req, res, next) {
        try {
            const deletedRole = await ProjectService.deleteRole(req.params.id);
            res.json(deletedRole);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RoleController();