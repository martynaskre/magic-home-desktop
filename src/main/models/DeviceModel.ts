import Model, { initModel, IBaseModelData } from 'main/models/Model';

import { Device } from 'shared/types/Device';

interface IModelData extends IBaseModelData {
  list: Device[];
}

class DeviceModel extends Model {
  public readonly storagePrefix: string = 'devices';
  public readonly fillable: IModelData = {
    list: [],
  };
}

export default initModel(DeviceModel, new DeviceModel().fillable);
