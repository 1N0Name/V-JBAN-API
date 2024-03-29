const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const ProjectCategory = sequelize.define(
    'project_category',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
        },
        project_id: {
            type: DataTypes.INTEGER,
        },
        isFinal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = ProjectCategory;