const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Person = sequelize.define(
    'person',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: DataTypes.STRING(255),
        },
        last_name: {
            type: DataTypes.STRING(255),
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        pwd: {
            type: DataTypes.STRING(255),
        },
        gender: {
            type: DataTypes.INTEGER,
        },
        confirmation_code: {
            type: DataTypes.STRING(255),
        },
        reset_token: {
            type: DataTypes.STRING(255),
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

module.exports = Person;