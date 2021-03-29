import IpcChannelInterface from 'main/ipc/IpcChannelInterface';
import ControllerInterface from 'main/services/controllers/ControllerInterface';

import DiscoverDevicesChannel from 'main/ipc/DiscoverDevicesChannel';
import GetDevicesChannel from 'main/ipc/GetDevicesChannel';
import ToggleDeviceStateChannel from 'main/ipc/ToggleDeviceStateChannel';
import ChangeDeviceNameChannel from 'main/ipc/ChangeDeviceNameChannel';
import ChangeDeviceColorChannel from 'main/ipc/ChangeDeviceColorChannel';
import GetPresetsChannel from 'main/ipc/GetPresetsChannel';
import AddPresetChannel from 'main/ipc/AddPresetChannel';
import RemovePresetChannel from 'main/ipc/RemovePresetChannel';
import GetKeybindsChannel from 'main/ipc/GetKeybindsChannel';
import SelectKeybindChannel from 'main/ipc/SelectKeybindChannel';

import MagicHomeController from 'main/services/controllers/MagicHomeController';

interface IConfig {
  ipcChannels: IpcChannelInterface[];
  controllers: ControllerInterface[];
}

const config: IConfig = {
  ipcChannels: [
    new DiscoverDevicesChannel(),
    new GetDevicesChannel(),
    new ToggleDeviceStateChannel(),
    new ChangeDeviceNameChannel(),
    new ChangeDeviceColorChannel(),
    new GetPresetsChannel(),
    new AddPresetChannel(),
    new RemovePresetChannel(),
    new GetKeybindsChannel(),
    new SelectKeybindChannel(),
  ],
  controllers: [
    new MagicHomeController(),
  ],
};

export default config;
