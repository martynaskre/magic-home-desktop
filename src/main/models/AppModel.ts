import Model, { initModel, IBaseModelData } from 'main/models/Model';

interface IModelData extends IBaseModelData {
  darkMode: boolean;
  openAtStartup: boolean;
}

class AppModel extends Model {
  public readonly storagePrefix: string = 'app';
  public readonly fillable: IModelData = {
    darkMode: true,
    openAtStartup: true,
  };
}

export default initModel(AppModel, new AppModel().fillable);
