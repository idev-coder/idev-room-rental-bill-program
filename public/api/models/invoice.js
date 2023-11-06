const { DataTypes } = require("sequelize");
const db = require('../config/db')

const Invoice = db.define("invoices", {
    id: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    date: DataTypes.TEXT,
    table: DataTypes.TEXT,
    room: DataTypes.TEXT,
    total: DataTypes.TEXT
}, {
    timestamps: true,

    // I don't want createdAt
    createdAt: true,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp',
    deletedAt: 'destroyTime'
})

module.exports = Invoice;