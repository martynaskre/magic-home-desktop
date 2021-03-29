import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import PresetModel from 'main/models/PresetModel';

export default class GetPresetsChannel implements IpcChannelInterface {
  public getName() {
    return 'get-presets';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const presets = PresetModel.list;

    event.sender.send(request.responseChannel, presets);
  }
}
