import SettingInterface from 'main/utils/settings/SettingInterface';

import { app } from 'electron';

import AppModel from 'main/models/AppModel';

export default class OpenOnStartupSetting implements SettingInterface {
  public handle(value: boolean): boolean {
    AppModel.openOnStartup = value;

    app.setLoginItemSettings({
      openAtLogin: value,
    });

    return true;
  }
}
