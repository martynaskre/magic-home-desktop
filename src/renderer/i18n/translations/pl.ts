import TranslationInterface from 'renderer/i18n/translations/TranslationInterface';

const locale: TranslationInterface = {
  languageName: 'Polski',
  devices: {
    title: 'Urządzenia',
    discoverButton: 'Odkryj urządzenia',
    discoveringSlogan: 'Robię trochę magii...',
  },
  settings: {
    title: 'Ustawienia',
    theme: {
      heading: 'Włącz jasny motyw',
      description: 'Ten tryb zmniejsza Twoją produktywność.',
    },
    startup: {
      heading: 'Otwórz przy starcie systemu',
      description: 'Oszczędź sobie kilku kliknięć i pozwól magii zadziałać.',
    },
  },
  colorChanger: {
    title: 'Zmiana koloru dla {device}',
    brightness: 'Jasność:',
    presets: 'Presety:',
  },
  keybindChanger: {
    title: 'Zmiana skrótu klawiszowego dla {device}',
    record: {
      default: 'Nagraj skrót',
      stop: 'Zatrzymaj nagrywanie',
      save: 'Zapisz skrót',
      cancel: 'Anuluj',
      inputPlaceholder: 'Nadaj nazwę!',
    },
    select: {
      default: 'Użyj istniejącego skrótu',
      save: 'Zapisz skrót',
      create: 'Utwórz skrót',
    },
    current: 'Aktualny skrót klawiszowy',
  },
};

export default locale;
