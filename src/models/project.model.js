const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const Project = sequelize.define('project', {
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
    owner_id: {
        type: DataTypes.INTEGER
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Project;
