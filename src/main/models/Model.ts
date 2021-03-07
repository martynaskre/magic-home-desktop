import Storage from 'main/services/storage';

export default abstract class Model {
  abstract readonly storagePrefix: string;

  constructor(properties: any = {}) {
    Object.keys(properties).forEach((property) => {
      Object.defineProperty(this, property, {
        get: () => Storage.getItem(`${this.storagePrefix}.${property}`),
        set: (value: any) => Storage.setItem(`${this.storagePrefix}.${property}`, value),
      });
    });
  }
}
