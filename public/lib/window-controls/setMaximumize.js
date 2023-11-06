const { BrowserWindow } = require("electron");

exports.setMaximumize = (event, browserWindowId) => {
    const browserWindow = browserWindowId
        ? BrowserWindow.fromId(browserWindowId)
        : BrowserWindow.fromWebContents(event.sender);

    if (browserWindow?.isMaximizable()) {
        if (browserWindow.isMaximized()) {
            browserWindow.unmaximize();
        } else {
            browserWindow.maximize();
        }
    }
}