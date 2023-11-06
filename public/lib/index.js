const { ipcMain } = require("electron");
const { close } = require('./window-controls/close')
const { initialize } = require('./window-controls/initialize')
const { setMaximumize } = require('./window-controls/setMaximumize')
const { setMinimumize } = require('./window-controls/setMinimumize')

exports.setupLib = () => {

    ipcMain.handle("window-controls/initialize", (event, browserWindowId) => initialize(event, browserWindowId))
    ipcMain.on("window-controls/maximumize/set", (event, browserWindowId) => setMaximumize(event, browserWindowId))
    ipcMain.on("window-controls/minimumize/set", (event, browserWindowId) => setMinimumize(event, browserWindowId))
    ipcMain.on("window-controls/close", (event, browserWindowId) => close(event, browserWindowId))
};