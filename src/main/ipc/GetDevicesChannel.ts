import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import DeviceModel from 'main/models/DeviceModel';
import config from 'main/config';

export default class GetDevicesChannel implements IpcChannelInterface {
  public getName() {
    return 'get-devices';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const model = DeviceModel;
    const devices = model.list;

    const { controllers } = config;

    if (devices && devices.length > 0) {
      await Promise.all(devices.map((device, index) =>
        Promise.all(controllers.map((controller) =>
            (controller.type === device.type) ? controller.queryData(device.address).then((data) => {
              devices[index].data = data;
            }) : Promise.resolve()
          ),
        )
      ));

      model.list = devices;
    }

    event.sender.send(request.responseChannel, devices);
  }
}
