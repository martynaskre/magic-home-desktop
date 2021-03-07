import ControllerInteface from 'main/services/controllers/ControllerInterface';

import { Device, DeviceData } from 'shared/types/Device';
import { Color } from 'shared/types/Color';

import {
  Discovery,
  Control,
  Device as MagicDevice,
} from 'magic-home';

import { rgbToHex } from 'shared/utils';

export default class MagicHomeController implements ControllerInteface {
  public type: string = 'magic-home';
  private controller!: Control;

  private createController(address: string) {
    if (this.controller) {
      if (this.controller._address !== address) { // eslint-disable-line no-underscore-dangle
        this.controller = new Control(address);
      } else {
        this.controller._commandQueue = []; // eslint-disable-line no-underscore-dangle
      }
    } else {
      this.controller = new Control(address);
    }

    return this.controller;
  }

  public async discover(): Promise<Array<Device>> {
    const discovery = new Discovery();

    try {
      const magicDevices = await discovery.scan(2000);

      const devices: Array<Device> = [];

      magicDevices.forEach((device: MagicDevice) => {
        devices.push({
          name: device.model,
          address: device.address,
          model: device.model,
          id: device.id,
          type: this.type,
          data: {
            on: false,
            brightness: 100,
            color: {
              r: 0,
              g: 0,
              b: 0,
              hex: '#000000',
            },
          },
        });
      });

      return devices;
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Error while discovering devices: ${e}`);
      }
    }

    return [];
  }

  public async queryData(address: string): Promise<DeviceData> {
    const device = this.createController(address);

    try {
      const data = await device.queryState();

      return {
        on: data.on,
        brightness: 100,
        color: {
          r: data.color.red,
          g: data.color.green,
          b: data.color.blue,
          hex: rgbToHex(data.color.red, data.color.green, data.color.blue),
        },
      };
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Error while querying device data: ${e}`);
      }
    }

    return {
      on: false,
      brightness: 100,
      color: {
        r: 0,
        g: 0,
        b: 0,
        hex: '#000000',
      },
    };
  }

  public async toggleState(address: string): Promise<boolean> {
    const device = this.createController(address);

    try {
      const data = await device.queryState();

      const state = !data.on;

      await device.setPower(state);

      return state;
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Error while toggling device state: ${e}`);
      }
    }

    return false;
  }

  public async changeDeviceColor(address: string, color: Color, brightness: number): Promise<boolean> {
    const device = this.createController(address);

    try {
      await device.setColorWithBrightness(color.r, color.g, color.b, brightness);

      return true;
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`Error while changing device color: ${e}`);
      }
    }

    return false;
  }
}
