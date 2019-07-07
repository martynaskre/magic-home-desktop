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
			console.log('wtf')

			strip.setColor(data.color[0], data.color[1], data.color[2], (err, success) => {
				console.log('sw')
				if (err) reject(err)
				if (success) resolve(success)
			})
		})
	}
}

export default {
  	state,
  	mutations,
  	actions
}
