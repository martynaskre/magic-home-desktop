import { Discovery, Control } from 'magic-home'

const state = {
	leds: {}
}

const mutations = {
	setLeds(state, leds) {
		state.leds = leds
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
			});
        })
	},
	changePowerState({ commit }, address) {
		let light = new Control(address);

		light.queryState().then(data => {
			const stateToChange = (data.on) ? false : true

			light.setPower(stateToChange)
		})
	}
}

export default {
  	state,
  	mutations,
  	actions
}
