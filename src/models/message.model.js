const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Message = sequelize.define(
    'message',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sender_id: {
            type: DataTypes.INTEGER,
        },
        chat_id: {
            type: DataTypes.INTEGER,
        },
        text: {
            type: DataTypes.TEXT,
        },
        timestamp: {
            type: DataTypes.DATE,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Message;