import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';

import store from 'renderer/store';

import { Device } from 'shared/types/Device';

import { rgbToHex } from 'shared/utils';

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

  @Mutation
  SET_DEVICE_COLOR({ address, color, brightness }: any) {
    this.list.forEach((device, index) => {
      if (device.address === address) {
        this.list[index].data.brightness = brightness

        this.list[index].data.color.r = color.r
        this.list[index].data.color.g = color.g
        this.list[index].data.color.b = color.b
        this.list[index].data.color.hex = rgbToHex(color.r, color.g, color.b)
      }
    })
  }

  @Mutation
  REMOVE_DEVICE(address: string) {
    this.list = this.list.filter((device) => device.address !== address);
  }

  @Action
  findDeviceByAddress(address: string) {
    return this.list.find((device) => device.address === address);
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

  @Action({ commit: 'SET_DEVICE_COLOR' })
  async changeDeviceColor({ address, color, brightness }: any) {
    await window.api.ipcRequest('change-device-color', { address, color, brightness });

    return {
      address,
      color,
      brightness,
    }
  }

  @Action
  async removeDevice(address: string) {
    const success = await window.api.ipcRequest('remove-device', { address });

    if (success) {
      this.context.commit('REMOVE_DEVICE', address);
    }
  }
}

export const DevicesModule = getModule(Devices);
