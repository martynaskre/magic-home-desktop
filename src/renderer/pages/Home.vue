<template>
	<div>
		<div class="d-flex mx-2">
			<h5>Devices</h5>
			<button class="btn btn-sm btn-info ml-auto" v-on:click="discoverDevices()" :disabled="scanning">Device discovery</button>
		</div>
		<hr>
		<div class="devices">
			<device v-for="(led, key) in this.$store.state.Leds.leds" v-bind:led="led" v-bind:ledKey="key" :id="'device-' + key" />
		</div>
	</div>
</template>

<script>
	import Device from '@/components/Device'

	export default {
		components: {
    		'device': Device
  		},
		data() {
			return {
				scanning: false
			}
		},
		methods: {
			discoverDevices() {
				this.scanning = true

				this.$store.dispatch('discoverLeds').then(response => {
					this.scanning = false
        		})
			}
		}
	}
</script>
