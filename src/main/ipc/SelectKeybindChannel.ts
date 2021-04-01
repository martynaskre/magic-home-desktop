import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import { Keybind } from 'shared/types/Keybind';

import KeybindModel from 'main/models/KeybindModel';

import { globalShortcut } from 'electron';
import { registerKeybind, unregisterKeybind } from 'main/utils';

export default class SelectKeybindChannel implements IpcChannelInterface {
  public getName() {
    return 'select-keybind';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    let keybinds = KeybindModel.list;

    const name = request.params.name as string;
    const keys = request.params.keys as string[];
    const address = request.params.address as string;

    if (keys) {
      if (this.validateKeybind(keybinds, { name, keys}) && !globalShortcut.isRegistered(keys.join('+'))) {
        keybinds = this.removeExistingKeybind(keybinds, address);

        const keybind: Keybind = {
          name,
          keys,
          devices: [
            address,
          ],
        };

        registerKeybind(keybind);

        keybinds.push(keybind);
      }
    } else {
      keybinds = this.removeExistingKeybind(keybinds, address);

      for (let i = 0; i < keybinds.length; i++) {
        const keybind = keybinds[i];

        if (keybind.name === name) {
          keybinds[i].devices.push(address);
        }
      }
    }

    KeybindModel.list = keybinds;

    event.sender.send(request.responseChannel, keybinds);
  }

  private validateKeybind(keybinds: Keybind[], { name, keys }: any) {
    for (const keybind of keybinds) {
      if (keybind.name === name || keybind.keys.toString() === keys.toString()) {
        return false;
      }
    }

    return true;
  }

  private removeExistingKeybind(keybinds: Keybind[], address: string) {
    for (let i = 0; i < keybinds.length; i++) {
      const keybind = keybinds[i];

      if (keybind.devices.includes(address)) {
        if (keybind.devices.length === 1) {
          keybinds = keybinds.filter((value, index) => index !== i);

          i--;

          unregisterKeybind(keybind);
        } else {
          keybinds[i].devices = keybinds[i].devices.filter((value) => address !== value);
        }
      }
    }

    return keybinds;
  }
}
