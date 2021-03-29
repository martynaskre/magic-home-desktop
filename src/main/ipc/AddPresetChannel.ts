import IpcChannelInterface from 'main/ipc/IpcChannelInterface';

import { IpcMainEvent } from 'electron';
import IpcRequest from 'shared/types/IpcRequest';

import { Color } from 'shared/types/Color';
import { Preset } from 'shared/types/Preset';

import PresetModel from 'main/models/PresetModel';

export default class AddPresetChannel implements IpcChannelInterface {
  public getName() {
    return 'add-preset';
  }

  public async handle(event: IpcMainEvent, request: IpcRequest) {
    if (!request.responseChannel) {
      request.responseChannel = `${this.getName()}_response`;
    }

    let preset: Preset | null = null;

    const color = request.params.color as Color;
    const brightness = request.params.brightness as number;

    const presets = PresetModel.list;

    const presetExists = presets.findIndex((preset) => {
      return (preset.color.r == color.r && preset.color.g == color.g && preset.color.b == color.b && preset.brightness == brightness)
    })

    if (presetExists === -1) {
      preset = {
        brightness,
        color,
      };

      presets.push(preset);
    }

    PresetModel.list = presets;

    event.sender.send(request.responseChannel, preset);
  }
}
