<template>
	<div>
		<div class="jumbotron rounded-0 d-flex pt-3 pb-2 mb-3">
			<h4>Magic Control</h4>
			<button class="close ml-auto mb-3" v-on:click="quitApp()" title="Quit app">
          		&times;
        	</button>
		</div>
		<div class="d-flex mx-2">
			<h5>Devices</h5>
			<button class="btn btn-sm btn-info ml-auto" v-on:click="discoverDevices()" :disabled="scanning">Device discovery</button>
		</div>
		<hr>
		<device v-for="(led, key) in this.$store.state.Leds.leds" v-bind:led="led" v-bind:ledKey="key" :id="'device-' + key" />
		<magic-footer />
	</div>
</template>

<script>
	import Device from '@/components/Device'
	import Footer from '@/components/Footer'

	export default {
		components: {
    		'device': Device,
    		'magic-footer': Footer
  		},
		data() {
			return {
				scanning: false
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
			}
		}
	}
</script>
