import IpcChannelInterface from 'main/ipc/IpcChannelInterface';
import ControllerInterface from 'main/services/controllers/ControllerInterface';
import SettingInterface from 'main/utils/settings/SettingInterface';

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
import GetSettingsChannel from 'main/ipc/GetSettingsChannel';
import SetSettingChannel from 'main/ipc/SetSettingChannel';
import RemoveDeviceChannel from 'main/ipc/RemoveDeviceChannel';

import MagicHomeController from 'main/services/controllers/MagicHomeController';

import DarkModeSetting from 'main/utils/settings/DarkModeSetting';
import OpenOnStartupSetting from 'main/utils/settings/OpenOnStartupSetting';
import LanguageSetting from 'main/utils/settings/LanguageSetting';

interface IConfig {
  ipcChannels: IpcChannelInterface[];
  controllers: ControllerInterface[];
  settings: {
    [key: string]: SettingInterface;
  }
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
    new GetSettingsChannel(),
    new SetSettingChannel(),
    new RemoveDeviceChannel(),
  ],
  controllers: [
    new MagicHomeController(),
  ],
  settings: {
    'darkMode': new DarkModeSetting(),
    'openOnStartup': new OpenOnStartupSetting(),
    'language': new LanguageSetting(),
  }
};

export default config;
