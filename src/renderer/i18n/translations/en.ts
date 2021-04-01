import TranslationInterface from 'renderer/i18n/translations/TranslationInterface';

const locale: TranslationInterface = {
  languageName: 'English',
  devices: {
    title: 'Devices',
    discoverButton: 'Discover devices',
    discoveringSlogan: 'Doing some Magic...',
  },
  settings: {
    title: 'Settings',
    theme: {
      heading: 'Enable light theme',
      description: 'This action instantly descreases your productivity by a great margin.',
    },
    startup: {
      heading: 'Open on startup',
      description: 'Save yourself a few clicks and let the Magic happen.',
    }
  },
  colorChanger: {
    title: 'Changing color for {device}',
    brightness: 'Brightness:',
    presets: 'Presets:',
  },
  keybindChanger: {
    title: 'Changing keybind for {device}',
    record: {
      default: 'Record keybind',
      stop: 'Stop recording',
      save: 'Save keybind',
      cancel: 'Stop it',
      inputPlaceholder: 'Give it a name!',
    },
    select: {
      default: 'Use existing keybind',
      save: 'Save keybind',
      create: 'Create keybind',
    },
    current: 'Current keybind',
  },
};

export default locale;
