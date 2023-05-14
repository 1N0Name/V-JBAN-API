const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const TicketResponsible = sequelize.define('ticket_responsible', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ticket_id: {
        type: DataTypes.INTEGER
    },
    person_id: {
        type: DataTypes.INTEGER
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = TicketResponsible;
