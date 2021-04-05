import Model, { initModel, IBaseModelData } from 'main/models/Model';

interface IModelData extends IBaseModelData {
  darkMode: boolean;
  openOnStartup: boolean;
  language: string;
}

class AppModel extends Model {
  public readonly storagePrefix: string = 'app';
  public readonly fillable: IModelData = {
    darkMode: true,
    openOnStartup: false,
    language: 'en',
  };
}

export default initModel(AppModel, new AppModel().fillable);
