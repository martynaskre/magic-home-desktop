import config from 'main/config';
import DeviceModel from 'main/models/DeviceModel';
import KeybindModel from 'main/models/KeybindModel';
import { globalShortcut } from 'electron';
import { Keybind } from 'shared/types/Keybind';

export function findController(type: string) {
  const { controllers } = config;

  return controllers.find((controller) => controller.type === type);
}

export function getControllerByDevice(address: string) {
  const devices = DeviceModel.list;

  const device = devices.find((searchDevice) => searchDevice.address === address);

  if (device) {
    const controller = findController(device.type);

    if (controller) {
      return controller;
    }
  }

  return null;
}

export function findKeybind(name: string): Keybind|undefined {
  return KeybindModel.list.find((keybind) => keybind.name === name);
}

export function registerKeybind(keybind: Keybind) {
  const keys = keybind.keys.join('+');

  globalShortcut.register(keys, () => {
    const keybindInstance = findKeybind(keybind.name); // fetching newest data in case new devices were added

    if (keybindInstance) {
      keybindInstance.devices.forEach((address) => {
        const controller = getControllerByDevice(address);

        if (controller) {
          controller.toggleState(address);
        }
      });
    }
  });
}

export function unregisterKeybind(keybind: Keybind) {
  const keys = keybind.keys.join('+');

  globalShortcut.unregister(keys);
}
