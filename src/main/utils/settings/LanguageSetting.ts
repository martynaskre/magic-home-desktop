import SettingInterface from 'main/utils/settings/SettingInterface';

import AppModel from 'main/models/AppModel';

export default class LanguageSetting implements SettingInterface {
  public handle(locale: string): boolean {
    AppModel.language = locale;

    return true;
  }
}
