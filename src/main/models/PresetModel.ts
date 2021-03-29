import Model, { initModel, IBaseModelData } from 'main/models/Model';

import { Preset } from 'shared/types/Preset';

interface IModelData extends IBaseModelData {
  list: Preset[];
}

class PresetModel extends Model {
  public readonly storagePrefix: string = 'presets';
  public readonly fillable: IModelData = {
    list: [],
  };
}

export default initModel(PresetModel, new PresetModel().fillable);
