<template lang='pug'>
	#intro-card(:class="{in: isIn, out: isOut}", @click="goTo('#font-list')")
		slot
</template>

<script>
export default {
	name: 'intro-card',
	data() {
		return {
			isIn: false,
			isOut: false
		}
	},
	methods: {
		onScroll() {
			if (window.pageYOffset > 50) {
				this.isOut = true
				this.isIn = false
			} else {
				if (this.msg !== ''){
					this.isOut = false
					this.isIn = true
				}
			}
		},
		goTo(selector) {
			document.querySelector(selector).scrollIntoView({behavior: 'smooth'})
		}
	},
	watch: {
		msg(content) {this.isIn = content !== ''}
	},
	mounted() {
		this.onScroll()
		window.addEventListener('scroll', this.onScroll)
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#intro-card
	visibility: hidden
	&.in
		visibility: hidden
		animation: slideInUp ease .5s .5s 1 forwards
	&.out
		visibility: hidden
		animation: slideOutDown ease .5s 1 forwards
	cursor: pointer
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
	+below(620px, true, null, null, true)
		top: 20vw
</style>

<style lang='stylus'>
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
