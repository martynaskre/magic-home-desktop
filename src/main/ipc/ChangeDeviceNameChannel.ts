import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import DeviceModel from 'main/models/DeviceModel';

export default class ChangeDeviceNameChannel implements IpcChannelInterface {
  public getName() {
    return 'change-device-name';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const { address, name } = request.params;

    let state = false;

    let devices = DeviceModel.list;

    const deviceIndex = devices.findIndex((searchDevice) => searchDevice.address === address);

    if (deviceIndex > -1) {
      devices[deviceIndex].name = name;

      state = true;
    }

    DeviceModel.list = devices;

    event.sender.send(request.responseChannel, state);
  }
}
