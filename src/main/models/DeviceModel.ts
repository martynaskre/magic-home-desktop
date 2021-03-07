import Model from 'main/models/Model';

import { Device } from 'shared/types/Device';

export interface IModelData {
  list: Device[];
}

export default class DeviceModel extends Model {
  public readonly storagePrefix: string = 'devices';

  private static fillable: IModelData = {
    list: [],
  };

  public static init<T extends typeof DeviceModel>(this: T) {
    return new this(this.fillable) as InstanceType<T> & typeof this.fillable;
  }
}
