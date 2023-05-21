const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const RoleAction = sequelize.define(
    'role_action',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
        action_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = RoleAction;
