const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Token = sequelize.define('token', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    person_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(300),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Token;
