import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from 'renderer/store';

import { Preset } from 'shared/types/Preset';

export interface PresetsState {
  list: Array<Preset>;
}

@Module({ dynamic: true, store, name: 'presets' })
class Presets extends VuexModule implements PresetsState {
  list: Array<Preset> = [];

  @Mutation
  SET_PRESETS(presets: Preset[]) {
    this.list = presets;
  }

  @Mutation
  ADD_PRESET(preset: Preset) {
    this.list.push(preset);
  }

  @Mutation
  REMOVE_PRESET(presetIndex: number) {
    this.list = this.list.filter((value, index) => presetIndex !== index);
  }

  @Action({ commit: 'SET_PRESETS' })
  async getPresets() {
    const presets = await window.api.ipcRequest('get-presets');

    return presets;
  }

  @Action
  async addPreset({ color, brightness }: any) {
    const preset = await window.api.ipcRequest('add-preset', { color, brightness }) as Preset;

    if (preset) {
      this.context.commit('ADD_PRESET', preset);

      return true;
    }

    return false;
  }

  @Action
  async removePreset(presetIndex: number) {
    const success = await window.api.ipcRequest('remove-preset', { index: presetIndex }) as boolean;

    if (success) {
      this.context.commit('REMOVE_PRESET', presetIndex);
    }
  }
}

export const PresetsModule = getModule(Presets);
