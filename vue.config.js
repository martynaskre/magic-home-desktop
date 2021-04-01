const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'renderer': path.join(__dirname, './src/renderer'),
        'shared': path.join(__dirname, './src/shared')
      }
    },
  },
  pluginOptions: {
    electronBuilder: {
      removeElectronJunk: false,
      chainWebpackMainProcess: (config) => {
              config.resolve
                    .alias
                    .set('main', path.resolve(__dirname, './src/main'))
                    .set('shared', path.resolve(__dirname, './src/shared'))
            },
      mainProcessFile: 'src/main/Background.ts',
      mainProcessWatch: [
        'src/main/**/*'
      ],
      rendererProcessFile: 'src/renderer/main.ts',
      externals: [
        'tray-window-state-manager'
      ],
      builderOptions: {
        extraResources: [
          {
            from: 'src/assets',
            to: 'resources',
            filter: [
              '**/*'
            ]
          }
        ]
      }
    }
  }
}
