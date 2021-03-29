import {
  app, protocol, BrowserWindow, Tray, globalShortcut, Menu, ipcMain,
} from 'electron';

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import Positioner from 'electron-positioner';
import path from 'path';

import config from 'main/config';

import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

declare const __static: string; // eslint-disable-line no-underscore-dangle

class Background {
  private isDevelopment: boolean = process.env.NODE_ENV !== 'production';
  private isTest: boolean = process.env.IS_TEST === 'true';
  private platform: string = process.platform;
  private window?: BrowserWindow;
  private tray?: Tray;
  private ipcChannels: IpcChannelInterface[] = [];
  private windowsTrayManager!: any;

  public constructor() {
    if (this.platform === 'win32') {
      this.windowsTrayManager = require('tray-window-state-manager'); // eslint-disable-line global-require
    }
  }

  public init(ipcChannels: IpcChannelInterface[] = []) {
    this.ipcChannels = ipcChannels;

    protocol.registerSchemesAsPrivileged([
      {
        scheme: 'app',
        privileges: {
          secure: true,
          standard: true,
        },
      },
    ]);

    app.on('ready', () => {
      this.onReady();
    });
    app.on('will-quit', () => {
      this.onWillQuit();
    });
    app.on('window-all-closed', () => {
      this.onWindowAllClosed();
    });

    this.registerIpcChannels();
  }

  private async onReady() {
    await this.createTray();

    if (this.isDevelopment && !this.isTest) {
      try {
        await installExtension(VUEJS_DEVTOOLS);
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }

    this.createWindow();
  }

  private onWillQuit() {
    globalShortcut.unregisterAll();
  }

  private onWindowAllClosed() {
    app.quit();
  }

  private async createWindow() {
    this.window = new BrowserWindow({
      height: 583,
      width: 420,
      frame: false,
      resizable: false,
      transparent: true,
      skipTaskbar: false,
      show: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__static, 'preload.js'),
      },
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      await this.window.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

      if (!this.isTest) this.window.webContents.openDevTools({
        mode: 'detach',
      });
    } else {
      createProtocol('app');

      this.window.loadURL('app://./index.html');
    }

    if (!this.isDevelopment && this.tray) {
      const positioner = new Positioner(this.window);

      if (this.platform === 'win32') {
        const position = positioner.calculate('trayBottomCenter', this.tray.getBounds());

        this.window.setPosition(position.x, position.y - 10);
      } else if (this.platform === 'darwin') {
        const position = positioner.calculate('trayCenter', this.tray.getBounds());

        this.window.setPosition(position.x, position.y + 10);
      }
    }

    /*
     * Workaround for window flickering on Windows 10
     * TODO test on mac
     */
    this.window.on('hide', () => {
      if (!this.isDevelopment && this.window) this.window.setOpacity(0);
    });

    this.window.on('closed', () => {
      this.window = undefined;
    });

    this.window.on('blur', () => {
      if (!this.isDevelopment && this.window) this.window.hide();
    });
  }

  private createTray() {
    this.tray = new Tray('src/renderer/assets/icons/icon.ico');

    this.tray.setContextMenu(
      Menu.buildFromTemplate([
        {
          label: 'Quit',
          type: 'normal',
          role: 'quit',
        },
      ]),
    );
    this.tray.setToolTip('Magic Control');

    this.tray.on('click', () => {
      this.toggleWindow();
    });
    this.tray.on('double-click', () => {
      this.toggleWindow();
    });
  }

  private toggleWindow() {
    if (this.window) {
      if (this.window.isVisible()) {
        this.window.hide();
      } else {
        if (this.platform === 'win32') {
          this.windowsTrayManager.hidePopup();
        }

        this.window.show();
        this.window.focus();

        /*
         * Workaround for window flickering on Windows 10
         * TODO test on mac
         */
        setTimeout(() => {
          if (this.window) this.window.setOpacity(1);
        }, 100);
      }
    }
  }

  private registerIpcChannels() {
    this.ipcChannels.forEach((channel) => {
      ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request));
    });
  }
}

new Background().init(config.ipcChannels);
