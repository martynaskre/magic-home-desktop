const path = require('path');

const installerName = '${productName} Setup.${ext}';

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
        appId: 'com.martynasS.magic-control',
        productName: 'Magic Control',
        win: {
          icon: 'public/icons/icon.ico'
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: 'public/icons/installerIcon.ico',
          artifactName: installerName,
        },
        mac: {
          icon: 'public/icons/icon.icns',
          category: 'public.app-category.utilities',
        },
        dmg: {
          icon: 'public/icons/installerIcon.icns',
          artifactName: installerName,
        },
      }
    }
  }
}
