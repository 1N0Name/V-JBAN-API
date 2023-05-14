const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255)
    },
    project_id: {
        type: DataTypes.INTEGER
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Category;
