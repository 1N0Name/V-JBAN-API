const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    person_id: {
        type: DataTypes.INTEGER
    },
    ticket_id: {
        type: DataTypes.INTEGER
    },
    project_id: {
        type: DataTypes.INTEGER
    },
    text: {
        type: DataTypes.TEXT
    },
    timestamp: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Message;
