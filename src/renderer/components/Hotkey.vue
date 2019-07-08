<template>
	<div class="magic-hotkey">
		<div v-if="key" v-html="key"></div>
		<button v-on:click="recordKeys()" v-html="message"></button>
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
