<template lang='jade'>
	#app
		img(src="./assets/logo.png")
		router-view
</template>

<script>
export default {
	name: 'app'
}
</script>


<style lang='stylus'>
@import '/assets/styles/global'
#app
	font-family: $SF
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: center
	color: #2c3e50
	margin-top: 60px
	clearfix()
</style>
