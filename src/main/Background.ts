import {
  app, protocol, BrowserWindow, Tray, globalShortcut, Menu, ipcMain, nativeImage, MenuItemConstructorOptions, MenuItem
} from 'electron';

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import Positioner from 'electron-positioner';
import path from 'path';

import config from 'main/config';
import { fadeWindowOut, registerKeybind } from 'main/utils';

import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import KeybindModel from 'main/models/KeybindModel';

declare const __static: string;

const unhandled = require('electron-unhandled');

unhandled();

class Background {
  private isDevelopment: boolean = process.env.NODE_ENV !== 'production';
  private isTest: boolean = process.env.IS_TEST === 'true';
  private isWindows: boolean = process.platform === 'win32';
  private window?: BrowserWindow;
  private tray?: Tray;
  private ipcChannels: IpcChannelInterface[] = [];
  private windowsTrayManager!: any;

  public constructor() {
    if (this.isWindows) {
      this.windowsTrayManager = require('tray-window-state-manager');
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

    if (!this.isDevelopment && !this.isWindows) {
      app.dock.hide();
    }

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
    this.registerKeybinds();
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
      skipTaskbar: !this.isDevelopment,
      show: this.isDevelopment,
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

    /*
     * Workaround for window flickering on Windows 10
     */
    if (this.isWindows) {
      this.window.on('hide', () => {
        if (!this.isDevelopment && this.window) this.window.setOpacity(0);
      });
    }

    this.window.on('closed', () => {
      this.window = undefined;
    });

    this.window.on('blur', () => {
      if (!this.isDevelopment) this.hideWindow();
    });
  }

  private createTray() {
    const icons = {
      windows: 'icons/icon.png',
      mac: 'icons/iconTemplate.png',
    };

    const icon = nativeImage.createFromPath(path.join(__static, icons[(this.isWindows) ? 'windows' : 'mac']));

    this.tray = new Tray((this.isWindows) ? icon.resize({ width: 24, height: 24 }) : icon);

    const macTemplate: (MenuItemConstructorOptions | MenuItem)[] = (!this.isWindows) ? [
      {
        label: 'Bring to foreground',
        click: () => {
          this.showWindow();
        }
      },
      {
        type: 'separator'
      },
    ] : [];

    this.tray.setContextMenu(
      Menu.buildFromTemplate(macTemplate.concat([
        {
          label: 'Quit',
          type: 'normal',
          role: 'quit',
        },
      ])),
    );
    this.tray.setToolTip('Magic Control');

    if (this.isWindows) {
      this.tray.on('click', () => {
        this.toggleWindow();
      });

      this.tray.on('double-click', () => {
        this.toggleWindow();
      });
    }
  }

  private async hideWindow() {
    if (this.window) {
      if (this.window.isVisible()) {
        if (!this.isWindows) {
          await fadeWindowOut(this.window);

          // reseting window opacity
          this.window.setOpacity(1);
        }

        this.window.hide();
      }
    }
  }

  private showWindow() {
    if (this.window) {
      if (this.tray) {
        const positioner = new Positioner(this.window);

        if (this.isWindows) {
          const position = positioner.calculate('trayBottomCenter', this.tray.getBounds());

          this.window.setPosition(position.x, position.y - 10);
        } else {
          const position = positioner.calculate('trayCenter', this.tray.getBounds());

          this.window.setPosition(position.x + 10, position.y + 10);
        }
      }

      if (this.isWindows) {
        this.windowsTrayManager.hidePopup();
      }

      this.window.show();
      this.window.focus();

      /*
       * Workaround for window flickering on Windows 10
       */
      if (this.isWindows) {
        setTimeout(() => {
          if (this.window) this.window.setOpacity(1);
        }, 100);
      }
    }
  }

  private async toggleWindow() {
    if (this.window) {
      if (this.window.isVisible()) {
        await this.hideWindow();
      } else {
        this.showWindow();
      }
    }
  }

  private registerIpcChannels() {
    this.ipcChannels.forEach((channel) => {
      ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request));
    });
  }

  private registerKeybinds() {
    const keybinds = KeybindModel.list;

    keybinds.forEach((keybind) => {
      registerKeybind(keybind);
    });
  }
}

new Background().init(config.ipcChannels);
