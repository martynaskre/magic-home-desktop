<template>
  	<div id="app">
		<magic-header></magic-header>
    	<router-view></router-view>
    	<magic-footer></magic-footer>
  	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Footer from '@/components/Footer'

  	export default {
    	name: 'Magic-Control',
		components: {
    		'magic-header': Header,
    		'magic-footer': Footer
  		},
  	}
</script>

<style type="scss">
	@import '../../static/icons/material-icons.css';
</style>
