const { Sequelize, DataTypes } = require("sequelize");
// const {Setting} = require('../models/setting')
const os = require("node:os");

const path = os.homedir().replaceAll("\\", "/");

const db = new Sequelize({
    dialect: "sqlite",
    storage: `${path}/.idev-room_rental_bill/database.db`,
});

// db.sync()

module.exports = db;