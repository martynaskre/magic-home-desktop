import { LocaleMessageObject } from 'vue-i18n';

export default interface Translation extends LocaleMessageObject {
  devices: {
    title: string,
    discoverButton: string,
    discoveringSlogan: string,
  },
  settings: {
    title: string,
    theme: {
      heading: string,
      description: string,
    },
    startup: {
      heading: string,
      description: string,
    }
  },
  colorChanger: {
    title: string,
    brightness: string,
    presets: string,
  },
  keybindChanger: {
    title: string,
    record: {
      default: string,
      stop: string,
      save: string,
      cancel: string,
      inputPlaceholder: string,
    },
    select: {
      default: string,
      save: string,
      create: string,
    },
    current: string,
  },
}
