import 'bootstrap-css-only/css/bootstrap.css'

import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

new Vue({
  	components: { App },
  	router,
  	store,
  	template: '<App/>',
  	created() {
  		let leds = this.$store.state.Leds.leds

  		for (var i = 0; i < leds.length; i++) {
  			let led = leds[i]

  			if (led.hotkey) {
  				this.$electron.remote.globalShortcut.register(led.hotkey, () => {
  					this.$store.dispatch('changePowerState', led.address)
				})
  			}
  		}

        const Settings = this.$store.state.Settings

        if (Settings.openAtLogin) {
            const exePath = this.$electron.remote.app.getPath('exe')

            this.$electron.remote.app.setLoginItemSettings({
                openAtLogin: true,
                path: exePath,
            })
        }
  	}
}).$mount('#app')
