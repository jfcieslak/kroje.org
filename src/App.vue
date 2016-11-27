<template lang='pug'>
#app
	#top-bar
		top-menu(
			:lang="lang",
			:langs="siteData.langs",
			:items="siteData.mainMenu[lang]",
			:siteTitle="siteData.siteTitle[lang]")
	router-view(:lang="lang", :siteTitle="siteData.siteTitle[lang].main")
	page-footer(
		:texts="siteData.footer.texts[lang]",
		:social="siteData.footer.social",
		:partners="siteData.footer.partners",
		:media="siteData.footer.media",
		:organizers="siteData.footer.organizers")
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()
import TopMenu from './components/TopMenu'
import PageFooter from './components/PageFooter'

export default {
	name: 'app',
	components: {TopMenu, PageFooter},
	data() {
		return {
			siteData: {
				langs: {},
				mainMenu: {},
				siteTitle: {
					pl: {main: 'Warszawskie Kroje', sub: 'Nowe kroje dla Warszawy'},
					en: {main: 'Warsaw Types', sub: 'New Types for Warsaw'}
				},
				footer: {
					texts: {},
					social: [],
					partners: [],
					media: [],
					organizers: []
				}
			},
			lang: this.$route.params.lang || 'pl'
		}
	},
	methods: {
		getSiteData() {
			this.$http.get('/static/data/index.json')
			.then(
				res => { this.siteData = (res.body).attributes },
				error => { console.log(error) }
			).bind(this)
		}
	},
	watch: {
		$route(next, curr) {
			this.lang = next.params.lang || 'pl'
			window.scroll({ top: 0, behavior: 'smooth' })
			this.$emit('updateHead')
		}
	},
	created() {
		this.getSiteData()
		console.log(window.location)
	}
}
</script>


<style lang='stylus'>
@import '/styles/global'
#top-bar
	position: fixed
	top: 0
	z-index: 9
	width: 100%
	background-color: white
	padding: 1rem 2rem
</style>
