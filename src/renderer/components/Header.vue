<template>
	<div class="jumbotron rounded-0 d-flex pt-3 pb-2 mb-3">
		<h4>Magic Control</h4>
		<button v-if="$route.name == 'home'" class="close ml-auto mb-3" v-on:click="quitApp()" title="Quit app">
			&times;
		</button>
		<button v-else class="close ml-auto mb-3" v-on:click="$router.push({ name: 'home' })" title="Go back">
			<i class="material-icons">arrow_back</i>
		</button>
	</div>
</template>

<script>
	export default {
		methods: {
			quitApp() {
				this.$electron.remote.getCurrentWindow().close()
			}
		}
	}
</script>

<style type="scss">
	.close:focus {
		outline: 0;
	}
</style>
