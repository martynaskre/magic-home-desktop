import Vue from 'vue';
import Vuex from 'vuex';

import { AppState } from 'renderer/store/modules/App';
import { DevicesState } from 'renderer/store/modules/Devices';

Vue.use(Vuex);

export interface StoreState {
  app: AppState;
  devices: DevicesState;
}

export default new Vuex.Store<StoreState>({});
