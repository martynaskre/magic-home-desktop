import config from 'main/config';
import DeviceModel from 'main/models/DeviceModel';

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
