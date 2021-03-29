import Storage from 'main/services/storage';

export interface IBaseModelData {
  [index: string]: any;
}

export default abstract class Model {
  abstract readonly storagePrefix: string;
  abstract readonly fillable: IBaseModelData;

  public constructor(properties: any = {}) {
    Object.keys(properties).forEach((property) => {
      Object.defineProperty(this, property, {
        get: () => {
          const storage = Storage.getItem(`${this.storagePrefix}.${property}`);

          return (storage === undefined) ? this.fillable[property] : storage;
        },
        set: (value: any) => Storage.setItem(`${this.storagePrefix}.${property}`, value),
      });
    });
  }
}

export function initModel<T extends {new (...args: any[]): Model}, D extends IBaseModelData>(cls: T, fillable: D) {
  return new cls(fillable) as InstanceType<T> & typeof fillable;
}
