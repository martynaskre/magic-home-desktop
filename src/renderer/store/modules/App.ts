import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from 'renderer/store';

export interface AppState {
  controllerBusy: boolean;
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements AppState {
  controllerBusy = false;

  @Mutation
  SET_CONTROLLER_BUSY_STATE(state: boolean) {
    this.controllerBusy = state;
  }

  @Action({ commit: 'SET_CONTROLLER_STATE' })
  setControllerBusyState(state: boolean) {
    return state;
  }
}

export const AppModule = getModule(App);
