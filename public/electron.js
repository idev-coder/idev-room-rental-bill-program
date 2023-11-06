// Modules to control application life and create native browser window
// const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
const electron = require("electron");
const handler = require('serve-handler');
const http = require('http');
const os = require("node:os");
const { readdir, mkdir, copyFile } = require("node:fs/promises");
const installfont = require('installfont');



const path = require("path");
const isDev = require("electron-is-dev");
const { setupLib } = require("./lib");
const { setupApi } = require("./api");

const { app, BrowserWindow, session } = electron

function dbPath() {
    const path = os.homedir().replaceAll("\\", "/");
    return new Promise(async (resolve, reject) => {
        let homedir = await readdir(path, { withFileTypes: true });
        let homedirIsDirectory = homedir
            .filter((item) => item.isDirectory())
            .map((item) => item.name);

        if (!homedirIsDirectory.includes(".idev-room_rental_bill")) {
            let pathDotIDev = `${path}/.idev-room_rental_bill`;
            await mkdir(pathDotIDev);

            readdir(pathDotIDev, {
                withFileTypes: true,
            }, (err, files) => {
                if (err) reject(err);
                if (files.length > 0) {
                    files.map((file) => {
                        if (!file.isDirectory()) {
                            if (file.name !== "database.db") {
                                copyFile(`${__dirname}/api/config/database.db`, `${pathDotIDev}/database.db`, (res) => {
                                    console.log(res);
                                });
                            }
                        }
                    })
                }
            });

        } else {
            let pathDotIDev = `${path}/.idev-room_rental_bill`;
            readdir(pathDotIDev, {
                withFileTypes: true,
            }, (err, files) => {
                if (err) reject(err);
                if (files.length > 0) {
                    files.map((file) => {
                        if (!file.isDirectory()) {
                            if (file.name !== "database.db") {
                                copyFile(`${__dirname}/api/config/database.db`, `${pathDotIDev}/database.db`, (res) => {
                                    console.log(res);
                                });
                            }
                        }
                    })
                }
            });
        }
    })

}

async function installFont() {
    const path = os.homedir().replaceAll("\\", "/");
    let homeDirFonts = await readdir(`${path}/AppData/Local/Microsoft/Windows/Fonts`, { withFileTypes: true });
    let thisDirFonts = await readdir(`${__dirname}/build/fonts`, { withFileTypes: true });
    // console.log(homeDirFonts);
    thisDirFonts.map((file) => {
        // console.log(file.name);
        if (homeDirFonts.find(({ name }) => name === file.name)) {
            console.log(file.name);
        } else {
            // copyFile(`${__dirname}/fonts/${file.name}`, `${path}/AppData/Local/Microsoft/Windows/Fonts/${file.name}`, (res) => {
            //     console.log(res);
            // });
            installfont(`${__dirname}/fonts/${file.name}`, function(err) {
                if(err) console.log(err, err.stack);
                //handle callback tasks here
              });

        }
    })
}


if (!isDev) {
    const server = http.createServer((request, response) => {
        // You pass two more arguments for config and middleware
        // More details here: https://github.com/vercel/serve-handler#options
        return handler(request, response, {
            cleanUrls: true,
            public: path.join(__dirname)
        });
    });

    server.listen(3000, () => {
        console.log('Running at http://localhost:3000');
    });
}



const createWindow = () => {
    // Create the browser window.
    installFont()
    dbPath()
    const mainWindow = new BrowserWindow({

        width: 1440,
        height: 800,
        frame: false, // removes the frame from the BrowserWindow. It is advised that you either create a custom menu bar or remove this line
        minWidth: 1440,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
            // webSecurity: true,
            // contextIsolation: true,
            webviewTag: true,
            nativeWindowOpen: isDev,
            // nativeWindowOpen: true,
            // sandbox: true,
            // partition: 'persist:tmp',
            devTools: isDev, // toggles whether devtools are available. to use node write window.require('<node-name>')
            // devTools: true,
            nodeIntegration: true, // turn this off if you don't mean to use node
        },
    });

    // load the index.html of the app. (or localhost on port 3000 if you're in development)
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : "http://localhost:3000"
    );

    // Open the DevTools. will only work if webPreferences::devTools is true
    mainWindow.webContents.openDevTools({ mode: 'detach' });

    setupLib();
    setupApi();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", () => {
    createWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// to access anything in here use window.require('electron').remote