const {
    ProjectCategory,
} = require('../models/connections.model');

class ProjectCategoryService {
    async getAllProjectCategories(projectId) {
        return await ProjectCategory.findAll({ where: { project_id: projectId } });
    }

    async createProjectCategory(data) {
        const { project_id, title, isFinal } = data;
        const category = await ProjectCategory.create({ title, project_id, isFinal });

        return category;
    }

    async editProjectCategory(id, data) {
        const category = await ProjectCategory.findByPk(id);
        if (!category)
            throw new Error('Категоряи не найдена');

        const { title, isFinal } = data;
        await category.update({ title, isFinal });

        if (!isFinal) {
            const finalCategories = await ProjectCategory.findAll({
                where: { project_id: category.project_id, isFinal: true },
            });
            if (finalCategories.length === 0) {
                throw new Error('В проекте должна быть как минимум одна финальная категория');
            }
        }

        return category;
    }

    async deleteProjectCategory(id) {
        const category = await ProjectCategory.findByPk(id);
        if (!category) throw new Error('Category not found');

        if (category.isFinal) {
            const finalCategories = await ProjectCategory.findAll({
                where: { project_id: category.project_id, isFinal: true },
            });
            if (finalCategories.length <= 1) {
                throw new Error('В проекте должна быть как минимум одна финальная категория');
            }
        }

        await category.destroy();
    }
}

module.exports = new ProjectCategoryService();