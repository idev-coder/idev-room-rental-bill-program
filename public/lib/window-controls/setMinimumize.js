const { BrowserWindow } = require("electron");

exports.setMinimumize = (event, browserWindowId) => {
    const browserWindow = browserWindowId
        ? BrowserWindow.fromId(browserWindowId)
        : BrowserWindow.fromWebContents(event.sender);

    browserWindow?.minimize();
}