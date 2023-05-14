const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');

const TagCategory = sequelize.define('tag_category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = TagCategory;