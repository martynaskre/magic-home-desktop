<template>
	<div class="pb-3 pr-3 pl-3" id="picker">
		<h5>Changing color for {{ led.model }}</h5>
		<hr>
		<div class="form-group">
			<label>Select color:</label>
			<color-picker :width="368" :defaultColor="color" @onSelection="colorSelection"></color-picker>
		</div>
		<div class="form-group">
			<label for="brightness">Brightness:</label>
			<input type="range" class="custom-range" id="brightness" min="1" max="100" v-model="brightness">
		</div>
		<div class="d-flex">
			<div class="preview" v-bind:style="{ 'background-color': color, 'opacity': brightness / 100 }">Preview</div>
			<button class="btn btn-sm btn-secondary" v-on:click="submit">Change color</button>
		</div>
	</div>
</template>

<script>
	import VueColorPickerBoard from 'vue-color-picker-board'

	export default {
		components: {
			'color-picker': VueColorPickerBoard
		},
		data() {
			return {
				led: this.$store.state.Leds.leds[this.$route.params.ledKey],
				color: '#ddd',
				brightness: 100
			}
		},
		created() {
			if (!this.led) {
				this.$router.push({ name: 'home' })
			}
		},
		methods: {
			colorSelection(color) {
				this.color = color
			},
			submit() {
				let html = document.getElementById('picker')

				const hexToRgb = hex =>
						hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
						    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
						.substring(1).match(/.{2}/g)
						.map(x => parseInt(x, 16))

				html.style.opacity = '.5'
				html.style['pointer-events'] = 'none'

				this.$store.dispatch('changeColor', { address: this.led.address, color: hexToRgb(this.color), brightness: this.brightness }).then(response => {
					html.style.opacity = '1'
					html.style['pointer-events'] = 'auto'
				})
			},
		}
	}
</script>

<style type="scss">
	.preview {
		width: calc(100% - 111px);
		margin-right: 10px;
		height: 31px;
		border-radius: 3px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		color: rgba(255, 255, 255, .8);
	}
</style>
