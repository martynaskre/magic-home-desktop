import config from 'main/config';
import DeviceModel from 'main/models/DeviceModel';

export function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((x) => {
      const hex = x.toString(16);

      return hex.length === 1 ? `0${hex}` : hex;
    })
    .join('')}`;
}

export function findController(type: string) {
  const { controllers } = config;

  return controllers.find((controller) => controller.type === type);
}

export function getControllerByDevice(address: string) {
  const devices = DeviceModel.init().list;

  const device = devices.find((searchDevice) => searchDevice.address === address);

  if (device) {
    const controller = findController(device.type);

    if (controller) {
      return controller;
    }
  }

  return null;
}
