import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import DeviceModel from 'main/models/DeviceModel';
import KeybindModel from 'main/models/KeybindModel';

import { unregisterKeybind } from 'main/utils';

export default class RemoveDeviceChannel implements IpcChannelInterface {
  public getName() {
    return 'remove-device';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const address = request.params.address as string;

    let devices = DeviceModel.list;

    devices = devices.filter((device) => device.address !== address);

    DeviceModel.list = devices;

    // unbinding keybinds
    let keybinds = KeybindModel.list;

    for (let i = 0; i < keybinds.length; i++) {
      const keybind = keybinds[i];

      if (keybind.devices.includes(address)) {
        if (keybind.devices.length === 1) {
          keybinds = keybinds.filter((address, index) => index !== i);

          i--;

          unregisterKeybind(keybind);
        } else {
          keybinds[i].devices = keybinds[i].devices.filter((value) => value !== address);
        }
      }
    }

    KeybindModel.list = keybinds;

    event.sender.send(request.responseChannel, true);
  }
}
