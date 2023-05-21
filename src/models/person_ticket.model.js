const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const PersonTicket = sequelize.define(
    'person_ticket',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        person_id: {
            type: DataTypes.INTEGER,
        },
        ticket_id: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = PersonTicket;
