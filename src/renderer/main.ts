import Vue from 'vue';

import App from 'renderer/App.vue';

import router from 'renderer/router';
import store from 'renderer/store';

import config from 'renderer/config';

declare global {
  interface Window {
    api: {
      platform: string;
      ipcRequest(channel: string, request?: any): any;
    };
  }
}

Vue.config.productionTip = false;
Vue.prototype.$config = config;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
