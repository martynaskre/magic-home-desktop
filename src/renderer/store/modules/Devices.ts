import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from 'renderer/store';

import { Device } from 'shared/types/Device';

export interface DevicesState {
  list: Array<Device>;
}

@Module({ dynamic: true, store, name: 'devices' })
class Devices extends VuexModule implements DevicesState {
  list: Array<Device> = [];

  @Mutation
  SET_DEVICES(devices: Array<Device>) {
    this.list = devices;
  }

  @Mutation
  SET_DEVICE_STATE({ address, state }: any) {
    this.list.forEach((device, index) => {
      if (device.address === address) {
        this.list[index].data.on = state;
      }
    });
  }

  @Mutation
  SET_DEVICE_NAME({ address, name }: any) {
    this.list.forEach((device, index) => {
      if (device.address === address) {
        this.list[index].name = name;
      }
    });
  }

  @Action
  findDeviceById(id: string) {
    return this.list.find((device) => device.id === id);
  }

  @Action
  async discoverDevices() {
    this.context.commit('SET_CONTROLLER_BUSY_STATE', true);

    await window.api.ipcRequest('discover-devices');

    this.context.commit('SET_CONTROLLER_BUSY_STATE', false);

    return [];
  }

  @Action({ commit: 'SET_DEVICES' })
  async getDevices() {
    this.context.commit('SET_CONTROLLER_BUSY_STATE', true);

    const devices = await window.api.ipcRequest('get-devices');

    this.context.commit('SET_CONTROLLER_BUSY_STATE', false);

    return devices;
  }

  @Action({ commit: 'SET_DEVICE_STATE' })
  async toggleDeviceState(address: string) {
    const state = await window.api.ipcRequest('toggle-device-state', { address });

    return {
      address,
      state,
    };
  }

  @Action({ commit: 'SET_DEVICE_NAME' })
  async changeDeviceName({ address, name }: any) {
    await window.api.ipcRequest('change-device-name', { address, name });

    return {
      address,
      name,
    };
  }
}

export const DevicesModule = getModule(Devices);
