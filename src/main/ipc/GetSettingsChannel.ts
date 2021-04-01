import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import AppModel from 'main/models/AppModel';

export default class GetSettingsChannel implements IpcChannelInterface {
  public getName() {
    return 'get-settings';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const settings = {
      darkMode: AppModel.darkMode,
      openOnStartup: AppModel.openOnStartup,
      language: AppModel.language,
    };

    event.sender.send(request.responseChannel, settings);
  }
}
