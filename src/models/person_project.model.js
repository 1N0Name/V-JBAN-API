const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const PersonProject = sequelize.define(
    'person_project',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        person_id: {
            type: DataTypes.INTEGER,
        },
        project_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = PersonProject;