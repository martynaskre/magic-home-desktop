import Model from 'main/models/Model';

import { Preset } from 'shared/types/Preset';

export interface IModelData {
  list: Preset[];
}

export default class PresetModel extends Model {
  public readonly storagePrefix: string = 'presets';

  private static fillable: IModelData = {
    list: [],
  };

  public static init<T extends typeof PresetModel>(this: T) {
    return new this(this.fillable) as InstanceType<T> & typeof this.fillable;
  }
}
