import Vue from 'vue';

import App from 'renderer/App.vue';

import router from 'renderer/router';
import store from 'renderer/store';

declare global {
  interface Window {
    api: {
      platform: string;
      ipcRequest(channel: string, request?: any): void;
    };
  }
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
