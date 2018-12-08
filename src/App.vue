<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style>
	html, body {background:#e7e7e7; margin:0; padding:0; min-height:100%; min-width:100%; display:flex;}
	#app {width:100%; height:calc(100% - 60px); font-family:'Avenir', Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; color:#2c3e50;}
</style>
