import Model from 'main/models/Model';

import { Keybind } from 'shared/types/Keybind';

export interface IModelData {
  list: Keybind[];
}

export default class KeybindModel extends Model {
  public readonly storagePrefix: string = 'keybinds';

  private static fillable: IModelData = {
    list: [],
  };

  public static init<T extends typeof KeybindModel>(this: T) {
    return new this(this.fillable) as InstanceType<T> & typeof this.fillable;
  }
}
