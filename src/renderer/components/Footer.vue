<template>
	<div class="magic-footer jumbotron rounded-0 py-2 d-flex mb-0">
		<div>
			<label>Open at login?</label>
			<input type="checkbox" v-model="openAtLogin">
		</div>
		<div class="ml-auto cursor-pointer" v-on:click="openGithub()">
			martynasS &copy;
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			openAtLogin: {
			    get () {
			      	return this.$store.state.Settings.openAtLogin
			    },
			    set (value) {
			      	this.$store.commit('setOpenAtLogin', value)
			    }
		  	}
		},
		methods: {
			openGithub() {
				this.$electron.shell.openExternal('https://github.com/martynasS')
			}
		}
	}
</script>

<style type="scss">
	.magic-footer {
		position: fixed;
		width: 100%;
		bottom: 0;
	}

	.cursor-pointer {
		cursor: pointer;
	}
</style>
