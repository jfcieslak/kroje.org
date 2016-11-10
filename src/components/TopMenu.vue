<template lang='jade'>
	#top-menu
		router-link#logo-link(:to="'/'+lang")
			h3 {{siteTitle.main}}
			h4 {{siteTitle.sub}}
		nav#main-menu
			router-link.menu-link(v-for="item in items", :to="item.href") {{item.title}}
			router-link#lang-switch(:to="langSwitch.toPath") {{ langs[langSwitch.toLang] }}

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
			langSwitch: {toLang: 'en', toPath: '/en'}
		}
	},
	methods: {
		setLangSwitch(newRoute) {
			let newLang = newRoute.params.lang === 'pl' ? 'en' : 'pl'
			let newPath = newRoute.path.replace(this.lang, newLang)
			this.langSwitch = {toLang: newLang, toPath: newPath}
		}
	},
	watch: {
		$route(next, curr) {
			this.setLangSwitch(next)
		}
	},
	created() {
		this.setLangSwitch(this.$route)
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#logo-link
	font-family: $M2
	display: block
	float: left
	h3
		font-size: 1.3rem
		letter-spacing: .06em
		margin-bottom: .4em
	h4
		font-size: .8rem
		font-weight: 400
		text-transform: uppercase
		letter-spacing: .1em
#main-menu
	font-size: .8rem
	font-weight: 700
	font-family: $M2
	text-transform: uppercase
	letter-spacing: .07em
	float: right
	padding-top: .5rem
	a
		margin-left: 4em
	#lang-switch
		text-transform: lowercase
</style>
