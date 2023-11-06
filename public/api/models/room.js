const { DataTypes } = require("sequelize");
const db = require('../config/db')

const Room = db.define("rooms", {
    id: {
        type: DataTypes.TEXT,
        primaryKey: true,

    },
    name: DataTypes.TEXT,
}, {
    timestamps: true,

    // I don't want createdAt
    createdAt: true,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp',
    deletedAt: 'destroyTime'
})

module.exports = Room;