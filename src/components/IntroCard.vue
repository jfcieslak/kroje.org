<template lang='jade'>
	#intro-card(v-html="msg")
</template>

<script>
export default {
	name: 'intro-card',
	props: {
		msg: String
	},
	mounted(){
		console.log(this.msg)
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#intro-card
	position: absolute
	left: 0
	right: 0
	top: 10vw
	display: block
	width: 24rem
	margin: 0 auto
	background-color: white
	padding: 2em
	font-size: 1rem
	text-align: center
	color: blue
	border: 4px solid blue
	box-shadow: 0 0 10px 0 rgba(blue, .7)
</style>

<style lang='stylus'>
// This is stupid, but we have to use unscoped style for v-html (unescaped html)
@import '../styles/component'
#intro-card
	p
		font-size: 1rem
		line-height: 1.8em
		margin: 1em 0
	a
		&:link, &:visited
			text-decoration: underline
			color: inherit
</style>
