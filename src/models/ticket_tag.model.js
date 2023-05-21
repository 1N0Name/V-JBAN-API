const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const TicketTag = sequelize.define(
    'ticket_tag',
    {
        ticket_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = TicketTag;