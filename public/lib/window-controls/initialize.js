const { BrowserWindow } = require("electron");

const setupEventListener = (browserWindow, sender) => {
    browserWindow.addListener("maximize", () => {
      sender.send("window-controls/maximunize/change", true, browserWindow.id);
    });
    browserWindow.addListener("unmaximize", () => {
      sender.send("window-controls/maximunize/change", false, browserWindow.id);
    });
  };

exports.initialize = (event, browserWindowId) => {
    const browserWindow = browserWindowId
        ? BrowserWindow.fromId(browserWindowId)
        : BrowserWindow.fromWebContents(event.sender);

    if (browserWindow) {
        setupEventListener(browserWindow, event.sender);
        return browserWindow.id;
    }
    return undefined;
}