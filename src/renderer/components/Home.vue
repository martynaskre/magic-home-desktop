<template>
	<div>
		<button v-on:click="quitApp()">Quit</button>
		<h1>Magic Control</h1>
		<hr>
		<h4>Devices</h4>
		<button v-on:click="discoverDevices()" :disabled="scanning">Device discovery</button>
		<hr>
		<div v-for="led in this.$store.state.Leds.leds">
			<div>{{ led.model }}</div>
			<button v-on:click="changePowerState(led.address)">Change power state</button>
			<color-picker v-bind:address="led.address" @input="changeColor" />
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
					console.log(this.$store.state.Leds.leds)
					this.scanning = false
        		})
			},
			changePowerState(address) {
				this.$store.dispatch('changePowerState', address)
			},
			changeColor({ address, color }) {
				this.$store.dispatch('changeColor', { address, color })
			}
		}
	}
</script>
