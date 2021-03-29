import SettingInterface from 'main/utils/settings/SettingInterface';

import AppModel from 'main/models/AppModel';

export default class DarkModeSetting implements SettingInterface {
  public handle(value: boolean): boolean {
    AppModel.darkMode = !value;

    return true;
  }
}
