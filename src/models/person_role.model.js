const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const PersonRole = sequelize.define(
    'person_role',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        person_id: {
            type: DataTypes.INTEGER,
        },
        role_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = PersonRole;
