const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("windowControls", {
    initialize: async (browserWindowId) => await ipcRenderer.invoke("window-controls/initialize", browserWindowId),
    setMaximumize: (browserWindowId) => ipcRenderer.send("window-controls/maximumize/set", browserWindowId),
    setMinimumize: (browserWindowId) => ipcRenderer.send("window-controls/minimumize/set", browserWindowId),
    changeMaximumize: (onMaximimizeStateChange) => ipcRenderer.on("window-controls/maximunize/change", onMaximimizeStateChange),
    changeMinimumize: (onMaximimizeStateChange) => ipcRenderer.removeListener("window-controls/minimumize/change", onMaximimizeStateChange),
    close: (browserWindowId) => ipcRenderer.send("window-controls/close", browserWindowId)
})

contextBridge.exposeInMainWorld("api", {
    invoice: {
        findAll: async ({ options }) => await ipcRenderer.invoke("findAll:invoices", { options }),
        findByPk: async ({ id }) => await ipcRenderer.invoke("findByPk:invoices", { id }),
        findOne: async ({ options }) => await ipcRenderer.invoke("findOne:invoices", { options }),
        create: async ({ body }) => await ipcRenderer.invoke("create:invoices", { body }),
        update: async ({ body, options }) => await ipcRenderer.invoke("update:invoices", { body, options }),
        destroy: async ({ options }) => await ipcRenderer.invoke("destroy:invoices", { options }),
    },
    room: {
        findAll: async ({ options }) => await ipcRenderer.invoke("findAll:rooms", { options }),
        findByPk: async ({ id }) => await ipcRenderer.invoke("findByPk:rooms", { id }),
        findOne: async ({ options }) => await ipcRenderer.invoke("findOne:rooms", { options }),
        create: async ({ body }) => await ipcRenderer.invoke("create:rooms", { body }),
        update: async ({ body, options }) => await ipcRenderer.invoke("update:rooms", { body, options }),
        destroy: async ({ options }) => await ipcRenderer.invoke("destroy:rooms", { options }),
    },
    unit: {
        findAll: async ({ options }) => await ipcRenderer.invoke("findAll:units", { options }),
        findByPk: async ({ id }) => await ipcRenderer.invoke("findByPk:units", { id }),
        findOne: async ({ options }) => await ipcRenderer.invoke("findOne:units", { options }),
        create: async ({ body }) => await ipcRenderer.invoke("create:units", { body }),
        update: async ({ body, options }) => await ipcRenderer.invoke("update:units", { body, options }),
        destroy: async ({ options }) => await ipcRenderer.invoke("destroy:units", { options }),
    },
})