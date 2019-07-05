<template>
	<div class="magic-picker">
		<input type="color" v-model="color">
		<button v-on:click="submit">Change color</button>
	</div>
</template>

<script>
	export default {
		props: [
			'address'
		],
		data() {
			return {
				color: '#fff'
			}
		},
		methods: {
			submit() {
				const hexToRgb = hex =>
						hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
						    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
						.substring(1).match(/.{2}/g)
						.map(x => parseInt(x, 16))

				this.$emit('input', { address: this.address, color: hexToRgb(this.color) })
			}
		}
	}
</script>

<style type="scss">
	.magic-picker {
		background-color: #000;
	}
</style>
