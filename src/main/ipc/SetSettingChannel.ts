import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import config from 'main/config';

export default class SetSettingChannel implements IpcChannelInterface {
  public getName() {
    return 'set-setting';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    let state = false;

    const name = request.params.name as string;
    const value = request.params.value as boolean;

    if (config.settings.hasOwnProperty(name)) {
      state = config.settings[name].handle(value);
    }

    event.sender.send(request.responseChannel, state);
  }
}
