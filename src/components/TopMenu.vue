<template lang='pug'>
	#top-menu
		router-link#logo-link(:to="'/'+lang")
			h3 {{siteTitle.main}}
			h4 {{siteTitle.sub}}
		nav#main-menu(:class="{on: mobileMenu}")
			router-link.menu-link(v-for="item in items", :to="item.href") {{item.title}}
			router-link#lang-switch(:to="langSwitch.toPath") {{ langs[langSwitch.toLang] }}
		a#menu-switch(@click="toggleMenu()", :class="{on: mobileMenu}") menu
</template>

<script>
export default {
	name: 'top-menu',
	props: {
		lang: String,
		items: Array,
		langs: {
			type: Object,
			default(){ return {pl: 'Polski', en: 'English'} }
		},
		siteTitle: {
			type: Object,
			default(){ return {main: '', sub: ''} }
		}
	},
	data(){
		return {
			langSwitch: {toLang: 'en', toPath: '/en'},
			mobileMenu: false
		}
	},
	methods: {
		setLangSwitch(newRoute) {
			let newLang = newRoute.params.lang === 'pl' ? 'en' : 'pl'
			let newPath = newRoute.path.replace(this.lang, newLang)
			this.langSwitch = {toLang: newLang, toPath: newPath}
		},
		toggleMenu(force) {
			force !== undefined
			? this.mobileMenu = force
			: this.mobileMenu = !this.mobileMenu

			this.mobileMenu
			? document.body.classList.add('menu-on')
			: document.body.classList.remove('menu-on')
		}
	},
	watch: {
		$route(next, curr) {
			this.setLangSwitch(next)
			this.toggleMenu(false)
		}
	},
	created() {
		this.setLangSwitch(this.$route)
	}
}
</script>

<style lang="stylus">
body.menu-on
	height: 100%
	overflow: hidden
	.page-view, #page-footer
		animation: blurIn ease .2s 1
		filter: blur(10px)

.page-view, #page-footer
	animation: blurOut ease .2s 1
	filter: blur(0px)
</style>

<style scoped lang='stylus'>
@import '../styles/component'
#top-menu
	position: fixed
	top: 0
	z-index: 9
	width: 100%
	background-color: white
#logo-link
	font-family: $M2
	display: block
	float: left
	padding: 1rem 2rem
	font-size: 1rem
	h3
		font-size: 1.3em
		letter-spacing: .06em
		margin-bottom: .4em
	h4
		font-size: .8em
		font-weight: 400
		text-transform: uppercase
		letter-spacing: .1em
#menu-switch
	padding: .8rem 2rem
	margin: 1rem
	float: right
	text-align: center
	color: blue
	display: none
	font-size: 1.2rem
	text-transform: uppercase
	border-bottom: 1px solid blue
	border-top: 1px solid blue
	cursor: pointer
	&.on
		background-color: blue
		color: white
	+below(780px)
		display: block
#main-menu
	font-size: .8rem
	font-weight: 700
	font-family: $M2
	letter-spacing: .07em
	float: right
	padding: 1.5rem 2rem 1rem 2rem
	transition: all .5s ease
	a
		margin-left: 4em
	+below(780px)
		&.on
			display: block
		display: none
		background-color: rgba(white, .7)
		position: fixed
		top: 5.5rem
		left: 0
		size: 100%
		font-size: 2rem
		text-align: center
		padding: 3rem 0 0 0
		a
			display: block
			padding: 1em 2em
			margin: 0
			color: blue
			&:hover
				text-decoration: underline
	#lang-switch
		text-transform: lowercase
</style>
