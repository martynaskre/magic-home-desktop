import Vue from 'vue'
import { Discovery, Control } from 'magic-home'

const state = {
	leds: {}
}

const mutations = {
	setLeds(state, leds) {
		state.leds = leds
	},
	addHotkey(state, { key, hotkey }) {
		state.leds[key].hotkey = hotkey
	}
}

const actions = {
	discoverLeds({ commit }) {
		return new Promise((resolve, reject) => {
			let discovery = new Discovery();

			discovery.scan(1000).then(devices => {
				commit('setLeds', devices)

				resolve(devices)
			}).catch(error => {
				reject(error)
			})
        })
	},
	changePowerState({ commit }, address) {
		return new Promise((resolve, reject) => {
			let strip = new Control(address);

			strip.queryState().then(data => {
				const stateToChange = !data.on

				strip.setPower(stateToChange)
					 .then(data => resolve(data))
					 .catch(error => reject(error))
			}).catch(error => {
				reject(error)
			})
		})
	},
	changeColor({ commit }, data) {
		return new Promise((resolve, reject) => {
			let strip = new Control(data.address)

			strip.setColorWithBrightness(data.color[0], data.color[1], data.color[2], data.brightness)

			setTimeout(() => {
				resolve()
			}, 3000);
		})
	},
	addHotkey({ commit }, data) {
		return new Promise((resolve, reject) => {
			commit('addHotkey', data)

			resolve()
		})
	}
}

export default {
  	state,
  	mutations,
  	actions
}
