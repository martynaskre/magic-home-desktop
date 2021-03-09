import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from 'renderer/store';

import { Keybind } from 'shared/types/Keybind';

export interface KeybindsState {
  list: Keybind[];
}

@Module({ dynamic: true, store, name: 'keybinds' })
class Keybinds extends VuexModule implements KeybindsState {
  list: Keybind[] = [];

  @Mutation
  SET_KEYBINDS(keybinds: Keybind[]) {
    this.list = keybinds;
  }

  @Action({ commit: 'SET_KEYBINDS' })
  async getKeybinds() {
    const keybinds = await window.api.ipcRequest('get-keybinds');

    return keybinds;
  }

  @Action({ commit: 'SET_KEYBINDS' })
  async addKeybind({ name, keys, address }: any) {
    const keybinds = await window.api.ipcRequest('select-keybind', {
      name,
      keys,
      address,
    });

    return keybinds;
  }

  @Action({ commit: 'SET_KEYBINDS' })
  async selectKeybind({ name, address }: any) {
    const keybinds = await window.api.ipcRequest('select-keybind', {
      name,
      address,
    });

    return keybinds;
  }
}

export const KeybindsModule = getModule(Keybinds);
