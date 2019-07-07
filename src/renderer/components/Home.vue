<template>
	<div>
		<button v-on:click="quitApp()">Quit</button>
		<h1>Magic Control</h1>
		<hr>
		<h4>Devices</h4>
		<button v-on:click="discoverDevices()" :disabled="scanning">Device discovery</button>
		<hr>
		<div v-for="(led, key) in this.$store.state.Leds.leds" :id="'device-' + key">
			<div>{{ led.model }}</div>
			<button v-on:click="changePowerState(key, led.address)">Change power state</button>
			<color-picker v-bind:address="led.address" v-bind:ledKey="key" @input="changeColor" />
		</div>
	</div>
</template>

<script>
	import ColorPicker from '@/components/ColorPicker'

	export default {
		components: {
    		'color-picker': ColorPicker
  		},
		data() {
			return {
				scanning: false,
				colors: '#fff'
			}
		},
		methods: {
			quitApp() {
				this.$electron.remote.getCurrentWindow().close()
			},
			discoverDevices() {
				this.scanning = true

				this.$store.dispatch('discoverLeds').then(response => {
					this.scanning = false
        		})
			},
			changePowerState(key, address) {
				let html = document.getElementById('device-' + key)

				html.style.opacity = '.5'
				html.style['pointer-events'] = 'none'

				this.$store.dispatch('changePowerState', address).then(response => {
					html.style.opacity = '1'
					html.style['pointer-events'] = 'auto'
				})
			},
			changeColor({ key, address, color }) {
				let html = document.getElementById('device-' + key)

				html.style.opacity = '.5'
				html.style['pointer-events'] = 'none'

				this.$store.dispatch('changeColor', { address, color }).then(response => {
					console.log('sw')
					html.style.opacity = '1'
					html.style['pointer-events'] = 'auto'
				}).catch(e => {
					console.log(e)
				})
			}
		}
	}
</script>
