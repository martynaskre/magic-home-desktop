<template>
	<div class="device px-2">
		<div class="d-flex">
			<div v-bind:class="{ title: $store.state.Leds.leds[ledKey].hotkey }">
				<b>{{ led.model }}</b>
				<div v-if="$store.state.Leds.leds[ledKey].hotkey" class="keybind">
					<small>Current keybind: <span v-html="$store.state.Leds.leds[ledKey].hotkey"></span></small>
				</div>
			</div>
			<div class="ml-auto">
				<button class="btn btn-sm btn-dark" v-on:click="changePowerState(ledKey, led.address)" title="Toggle power state"><i class="material-icons">power_settings_new</i></button>
				<button class="btn btn-sm btn-dark" v-on:click="$router.push({ name: 'picker', params: { ledKey: ledKey } })" title="Change color & brightness"><i class="material-icons">color_lens</i></button>
				<button class="btn btn-sm btn-dark" v-on:click="keybindChanger = !keybindChanger" title="Add keybind to toggle power state"><i class="material-icons">keyboard</i></button>
			</div>
		</div>
		<hotkey v-if="keybindChanger" v-bind:ledKey="ledKey" @input="addHotkey" />
		<hr>
	</div>
</template>

<script>
	import Hotkey from '@/components/Hotkey'

	export default {
		props: [
			'led',
			'ledKey'
		],
		components: {
    		'hotkey': Hotkey
  		},
  		data() {
  			return {
  				colorChanger: false,
  				keybindChanger: false
  			}
  		},
		methods: {
			changePowerState(key, address) {
				let html = document.getElementById('device-' + key)

				html.style.opacity = '.5'
				html.style['pointer-events'] = 'none'

				this.$store.dispatch('changePowerState', address).then(response => {
					html.style.opacity = '1'
					html.style['pointer-events'] = 'auto'
				})
			},
			changeColor({ key, address, color, brightness }) {
				let html = document.getElementById('device-' + key)

				html.style.opacity = '.5'
				html.style['pointer-events'] = 'none'

				this.$store.dispatch('changeColor', { address, color, brightness }).then(response => {
					html.style.opacity = '1'
					html.style['pointer-events'] = 'auto'
				})
			},
			addHotkey({ key, hotkey }) {
				const oldHotkey = this.$store.state.Leds.leds[key].hotkey

				this.$store.dispatch('addHotkey', { key, hotkey }).then(() => {
					const led = this.$store.state.Leds.leds[key]

					this.$electron.remote.globalShortcut.unregister(oldHotkey)

					this.$electron.remote.globalShortcut.register(led.hotkey, () => {
  						this.$store.dispatch('changePowerState', led.address)
					})
				})
			}
		}
	}
</script>

<style type="scss">
	.material-icons {
		font-size: 18px;
		position: relative;
		top: 2px;
	}

	.title {
		position: relative;
		top: -2px;
	}

	.keybind {
		position: relative;
		top: -9px;
		margin-bottom: -9px;
	}
</style>
