import { Device, DeviceData } from 'shared/types/Device';
import { Color } from 'shared/types/Color';

export default interface ControllerInterface {
  type: string;

  discover(): Promise<Array<Device>>;
  queryData(address: string): Promise<DeviceData>;
  toggleState(address: string): Promise<boolean>;
  changeDeviceColor(address: string, color: Color, brightness: number): Promise<boolean>;
}
