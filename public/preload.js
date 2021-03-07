const { contextBridge, ipcRenderer } = require('electron')
const os = require('os')

contextBridge.exposeInMainWorld('api', {
  platform: os.platform(),
  ipcRequest: (channel, params) => {
    const request = {};

    request.params = params;

    if (!request.hasOwnProperty('responseChannel')) {
      request.responseChannel = `${channel}_response_${new Date().getTime()}`;
    }

    ipcRenderer.send(channel, request);

    return new Promise(resolve => {
      ipcRenderer.once(request.responseChannel, (event, response) => resolve(response));
    });
  },
});
