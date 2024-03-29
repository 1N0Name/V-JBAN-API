const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Role = sequelize.define(
    'role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        project_id: {
            type: DataTypes.INTEGER,
        },
        role_name: {
            type: DataTypes.STRING(255),
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Role;