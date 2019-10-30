<template>
	<div class="magic-hotkey pt-3 mt-2 d-flex">
		<button class="btn btn-sm btn-secondary" v-on:click="recordKeys()" v-html="message"></button>
		<b class="hotkey" v-if="key" v-html="key"></b>
	</div>
</template>

<script>
	export default {
		props: [
			'ledKey'
		],
		data() {
			return {
				key: null,
				message: 'Click to record keystroke',
				listener: false
			}
		},
		watch: {
			listener: function (val) {
				this.message = (val) ? 'Click to stop recording' : 'Click to record keystroke'
			}
		},
		methods: {
			recordKeys() {
				if (!this.listener) {
					this.key = null

					document.addEventListener('keydown', this.hotkeys)
				} else {
					document.removeEventListener('keydown', this.hotkeys)

					if (!this.$electron.remote.globalShortcut.isRegistered(this.key)) {
						this.$emit('input', {
							key: this.ledKey,
							hotkey: this.key
						})
					} else {
						this.key = null

						alert('This keybind is already registered!')
					}
				}

				this.listener = !this.listener
			},
			hotkeys(event) {
				event.preventDefault()

				const key = event.key

				if (this.key == null) {
					this.key = key
				} else {
					if (this.key.indexOf(key) == -1) {
						this.key += '+' + key
					}
				}
			}
		}
	}
</script>

<style type="scss">
	.magic-hotkey {
		border-top: 1px solid #ddd;
	}

	.hotkey {
		position: relative;
		top: 2px;
		left: 10px;
	}
</style>
