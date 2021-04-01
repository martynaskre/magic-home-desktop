import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from 'renderer/store';

import { Settings } from 'shared/types/Settings';

export interface AppState {
  controllerBusy: boolean;
  darkMode: boolean;
  openOnStartup: boolean;
  language: string;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  controllerBusy = false;
  darkMode = false;
  openOnStartup = false;
  language = 'en';

  @Mutation
  SET_CONTROLLER_BUSY_STATE(state: boolean) {
    this.controllerBusy = state;
  }

  @Mutation
  SET_SETTINGS(settings: Settings) {
    this.darkMode = settings.darkMode;
    this.openOnStartup = settings.openOnStartup;
    this.language = settings.language;
  }

  @Action({ commit: 'SET_CONTROLLER_STATE' })
  setControllerBusyState(state: boolean) {
    return state;
  }

  @Action({ commit: 'SET_SETTINGS' })
  async getSettings() {
    return await window.api.ipcRequest('get-settings');
  }

  @Action
  changeSetting({ name, value }: any) {
    window.api.ipcRequest('set-setting', {
      name,
      value,
    });
  }
}

export const AppModule = getModule(App);
