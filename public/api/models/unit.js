const { DataTypes } = require("sequelize");
const db = require('../config/db')

const Unit = db.define("units", {
    id: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    eUnit: DataTypes.TEXT,
    wUnit: DataTypes.TEXT,
}, {
    timestamps: true,

    // I don't want createdAt
    createdAt: true,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp',
    deletedAt: 'destroyTime'
})

module.exports = Unit;