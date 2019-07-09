<template>
	<div class="magic-picker mb-3">
		<div>
			<b>Color:</b>
			<input type="color" v-model="color">
			<input type="text" v-model="color">
		</div>
		<div>
			<b>Brightness:</b>
			<input type="range" v-model="brightness" min="1" max="100">
		</div>
		<button class="btn btn-sm btn-success" v-on:click="submit">Change color</button>
	</div>
</template>

<script>
	export default {
		props: [
			'address',
			'ledKey'
		],
		data() {
			return {
				color: '#ffffff',
				brightness: 100
			}
		},
		methods: {
			submit() {
				const hexToRgb = hex =>
						hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
						    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
						.substring(1).match(/.{2}/g)
						.map(x => parseInt(x, 16))

				this.$emit('input', {
					key: this.ledKey,
					address: this.address,
					color: hexToRgb(this.color),
					brightness: this.brightness
				})
			}
		}
	}
</script>

<style type="scss">
	.magic-picker {

	}
</style>
