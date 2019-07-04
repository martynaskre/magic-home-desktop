<template>
	<div>
		<h1>Magic Control</h1>
		<hr>
		<h4>Devices</h4>
		<button v-on:click="discoverDevices()">Device discovery</button>
	</div>
</template>

<script>
	import { Discovery } from 'magic-home'
	import Store from 'electron-store'

	export default {
		data() {
			return {
				scanning: false
			}
		},
		methods: {
			discoverDevices() {
				const store = new Store({
					name: 'leds_config',
					schema: {
						devices: {
							type: 'array',

						}
					}
				});
				this.scanning = true

				let discovery = new Discovery();
				discovery.scan(1000).then(devices => {
					store.set('devices', devices)

					this.scanning = false
				});
			}
		}
	}
</script>
