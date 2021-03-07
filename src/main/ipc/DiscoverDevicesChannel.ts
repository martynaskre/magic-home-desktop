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

    const model = DeviceModel.init();
    const devices = model.list;

    const { controllers } = config;

    /* eslint-disable */
    await Promise.all(controllers.map((controller) =>
      controller.discover().then((controllerDevices) =>
        Promise.all(controllerDevices.map((device) =>
          (devices.findIndex((searchDevice) => searchDevice.address === device.address) === -1) ? devices.push(device) : undefined
        ))
      )
    ));
    /* eslint-enable */

    model.list = devices;

    event.sender.send(request.responseChannel, true);
  }
}
