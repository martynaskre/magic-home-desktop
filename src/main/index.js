import { app, BrowserWindow, Tray, Menu } from 'electron'
import Positioner from 'electron-positioner'
import os from 'os'

if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow = null,
    tray = null

const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`,
      platform = os.platform(),
      icons = {
          'win32': 'icon.icns',
          'darwin': '16x16.png'
      }

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 400,
        frame: false,
        resizable: false,
        skipTaskbar: true,
        show: false
    })

    if (platform == 'darwin' && process.env.NODE_ENV !== 'development') app.dock.hide()

    mainWindow.loadURL(winURL)

    mainWindow.on('close', (e) => {
        e.preventDefault()

        mainWindow.hide()
    })

    const positioner = new Positioner(mainWindow)

    if (platform == 'win32') {
        let position = positioner.calculate('trayBottomCenter', tray.getBounds())

        mainWindow.setPosition(position.x, position.y - 10)
    } else if (platform == 'darwin') {
        let position = positioner.calculate('trayCenter', tray.getBounds())

        mainWindow.setPosition(position.x, position.y + 10)
    }
}

app.on('ready', () => {
    tray = new Tray(require('path').join('build/icons/' + icons[platform]))

    let contextMenu = null

    if (platform == 'win32') {
        contextMenu = Menu.buildFromTemplate([
            { label: 'Quit', click: () => { app.quit() }}
        ])
    } else if (platform == 'darwin') {
        contextMenu = Menu.buildFromTemplate([
            { label: 'Preferences', click: () => { mainWindow.show() }},
            { label: 'Quit', click: () => { app.quit() }}
        ])
    }

    tray.setToolTip('This is my application.')
    tray.setContextMenu(contextMenu)

    createWindow()

    if (platform != 'darwin') {
        tray.on('click', () => {
            if (mainWindow.isVisible()) {
                mainWindow.hide()
            } else {
                mainWindow.show()
            }
        })
    }
})

app.on('browser-window-blur', () => {
    mainWindow.hide()
})
