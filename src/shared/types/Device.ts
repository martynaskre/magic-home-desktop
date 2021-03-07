import { Color } from 'shared/types/Color';

export interface DeviceData {
  on: boolean;
  brightness: number;
  color: Color;
}

export interface Device {
  name: string;
  address: string;
  model: string;
  id: string;
  type: string;
  data: DeviceData;
}
