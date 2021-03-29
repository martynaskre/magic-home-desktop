import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import KeybindModel from 'main/models/KeybindModel';

export default class GetKeybindsChannel implements IpcChannelInterface {
  public getName() {
    return 'get-keybinds';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    const keybinds = KeybindModel.list;

    event.sender.send(request.responseChannel, keybinds);
  }
}
