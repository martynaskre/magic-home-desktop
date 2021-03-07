import Store from 'electron-store';

export default class Storage {
  private static store = new Store({
    name: 'magic-control',
  });

  public static getItem(item: string) {
    return this.store.get(item);
  }

  public static setItem(item: string, value: any) {
    return this.store.set(item, value);
  }

  public static deleteItem(item: string) {
    return this.store.delete(item);
  }
}
