import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import { getControllerByDevice } from 'main/utils';

export default class ToggleDeviceStateChannel implements IpcChannelInterface {
  public getName() {
    return 'toggle-device-state';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const address = request.params.address as string;

    let state = false;

    const controller = getControllerByDevice(address);

    if (controller) {
      state = await controller.toggleState(address);
    }

    event.sender.send(request.responseChannel, state);
  }
}
