import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import DeviceModel from 'main/models/DeviceModel';
import config from 'main/config';

export default class DiscoverDevicesChannel implements IpcChannelInterface {
  public getName() {
    return 'discover-devices';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const devices = DeviceModel.list;

    const { controllers } = config;

    await Promise.all(controllers.map((controller) =>
      controller.discover().then((controllerDevices) =>
        Promise.all(controllerDevices.map((device) =>
          (devices.findIndex((searchDevice) => searchDevice.address === device.address) === -1) ? devices.push(device) : undefined
        ))
      )
    ));

    DeviceModel.list = devices;

    event.sender.send(request.responseChannel, true);
  }
}
