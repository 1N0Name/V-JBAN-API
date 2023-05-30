const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Invite = sequelize.define(
    'invite',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Invite;