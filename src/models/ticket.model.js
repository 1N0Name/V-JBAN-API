const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Ticket = sequelize.define('ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255)
    },
    descr: {
        type: DataTypes.TEXT
    },
    category_id: {
        type: DataTypes.INTEGER
    },
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
    project_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Ticket;
