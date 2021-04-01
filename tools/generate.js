const { generateTemplateFiles, StringUtility } = require('generate-template-files');
const fs = require('fs');

const config = require('../package.json');

generateTemplateFiles([
  {
    option: 'App translation',
    entry: {
      folderPath: './src/renderer/i18n/translations/en.ts',
    },
    stringReplacers: [
      {
        question: `Locale`,
        slot: '__locale__'
      },
    ],
    output: {
      path: './src/renderer/i18n/translations/__locale__.ts',
      pathAndFileNameDefaultCase: '(kebabCase)',
      overwrite: false,
    },
  },
  {
    option: 'Main Process Ipc Channel',
    entry: {
      folderPath: './tools/templates/IpcChannel.template',
    },
    stringReplacers: [
      {
        question: `Ipc channel name`,
        slot: '__class_name__'
      },
    ],
    output: {
      path: './src/main/ipc/__class_name__.ts',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
    onComplete: (results) => {
      const path = results.output.path;
      const name = results.stringReplacers[0].slotValue.replace('Channel', '');

      fs.readFile(path, 'utf8', (error, data) => {
        if (error) return;

        const result = data.replace('__channel_name__', StringUtility.toSentence(name, '-'));

        fs.writeFile(path, result, () => {});
      });
    },
  },
  {
    option: 'Main Process LED Controller',
    entry: {
      folderPath: './tools/templates/Controller.template',
    },
    stringReplacers: [
      {
        question: `Controller name`,
        slot: '__class_name__'
      },
    ],
    output: {
      path: './src/main/services/controllers/__class_name__.ts',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
  },
  {
    option: 'Main Process Data Model',
    entry: {
      folderPath: './tools/templates/Model.template',
    },
    stringReplacers: [
      {
        question: `Model name`,
        slot: '__class_name__'
      },
      {
        question: 'Storaga prefix',
        slot: '__storage_prefix__'
      }
    ],
    output: {
      path: './src/main/models/__class_name__.ts',
      pathAndFileNameDefaultCase: '(pascalCase)',
      overwrite: false,
    },
  },
]);
