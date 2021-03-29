import Model, { initModel, IBaseModelData } from 'main/models/Model';

import { Keybind } from 'shared/types/Keybind';

interface IModelData extends IBaseModelData {
  list: Keybind[];
}

class KeybindModel extends Model {
  public readonly storagePrefix: string = 'keybinds';
  public readonly fillable: IModelData = {
    list: [],
  };
}

export default initModel(KeybindModel, new KeybindModel().fillable);
