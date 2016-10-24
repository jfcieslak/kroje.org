<template lang="pug">
	#hello
		h1 
		h3 
</template>


<script lang='coffee'>
	module.exports =
		name: 'hello'

		data: ->
			msg: 'Welcome'
		created: ->
			console.log this.msg

</script>


<style scoped lang="stylus">
	@import '../assets/styles/component'
	ul
		list-style-type: none
		padding: 0
	li
		display: inline-block
		margin: 0 10px
	a
		color: #42b983

</style>
