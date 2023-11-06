const { ipcMain } = require("electron");

const invoices = require('../controllers/invoices')
const rooms = require('../controllers/rooms')

exports.setup = () => {

    ipcMain.handle("findAll:invoices", (event, { options }) => invoices.findAll(options))
    ipcMain.handle("findByPk:invoices", (event, { id }) => invoices.findByPk(id))
    ipcMain.handle("findOne:invoices", (event, { options }) => invoices.findOne(options))
    ipcMain.handle("create:invoices", (event, { body }) => invoices.create(body))
    ipcMain.handle("update:invoices", (event, { body, options }) => invoices.update(body, options))
    ipcMain.handle("destroy:invoices", (event, { options }) => invoices.destroy(options))

    ipcMain.handle("findAll:rooms", (event, { options }) => rooms.findAll(options))
    ipcMain.handle("findByPk:rooms", (event, { id }) => rooms.findByPk(id))
    ipcMain.handle("findOne:rooms", (event, { options }) => rooms.findOne(options))
    ipcMain.handle("create:rooms", (event, { body }) => rooms.create(body))
    ipcMain.handle("update:rooms", (event, { body, options }) => rooms.update(body, options))
    ipcMain.handle("destroy:rooms", (event, { options }) => rooms.destroy(options))

    
};