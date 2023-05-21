const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Chat = sequelize.define(
    'chat',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Chat;