const { BrowserWindow } = require("electron");

exports.close = (event, browserWindowId) => {
    const browserWindow = browserWindowId
        ? BrowserWindow.fromId(browserWindowId)
        : BrowserWindow.fromWebContents(event.sender);

    browserWindow?.close();
}