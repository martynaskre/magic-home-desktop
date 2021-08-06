import TranslationInterface from 'renderer/i18n/translations/TranslationInterface';

const locale: TranslationInterface = {
  languageName: 'Português',
  devices: {
    title: 'Dispositivos',
    discoverButton: 'Descobrir dispositivos',
    discoveringSlogan: 'Fazendo uma Mágica...',
  },
  settings: {
    title: 'Configurações',
    theme: {
      heading: 'Ativar modo claro',
      description: 'Essa ação diminui instantaneamente sua produtividade em uma grande margem.',
    },
    startup: {
      heading: 'Abrir ao iniciar',
      description: 'Livre-se de alguns cliques e deixe a Mágica acontecer.',
    }
  },
  colorChanger: {
    title: 'Alterando a cor de {device}',
    brightness: 'Brilho:',
    presets: 'Presets:',
  },
  keybindChanger: {
    title: 'Alterando as teclas de atalho para {device}',
    record: {
      default: 'Gravar keybind',
      stop: 'Parar gravação',
      save: 'Salvar keybind',
      cancel: 'Parar',
      inputPlaceholder: 'Dê um nome para o keybind!',
    },
    select: {
      default: 'Usar keybind existente',
      save: 'Salvar keybind',
      create: 'Criar keybind',
    },
    current: 'Keybind atual',
  },
};

export default locale;

