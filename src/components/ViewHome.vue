<template lang="pug">
	#home-page
		#front-cover
			intro-card#intro-card(:msg="md(this.body)")
			a.intro-link.miastodwa(href="https://www.facebook.com/miastodwa/")
			a.intro-link.douslug(href="http://douslug.org/")
		section
			.module#font-list
				h4.module-header {{pageData.fontlistTitle}}
				font-list(:items="pageData.fonts")

		section
			.module#more
				h4.module-header {{pageData.moreTitle}}
				excerpts(:items="pageData.more")

		section
			.module.full#about-slides
				picture
					source(media="(min-width:1081px)"
						srcset="/static/images/other/cover-about-1-1400.jpg 1x, /static/images/other/cover-about-1-1400@2.jpg 2x")
					source(media="(min-width:781px)"
						srcset="/static/images/other/cover-about-1-1080.jpg 1x, /static/images/other/cover-about-1-1080@2.jpg 2x")
					source(media="(max-width:780px)"
						srcset="/static/images/other/cover-about-1-780.jpg 1x, /static/images/other/cover-about-1-780@2.jpg 2x")
					img(alt="Warszawskie Kroje"
						src="/static/images/other/cover-about-1-1080.jpg")
</template>


<script>
import marked from 'marked'
marked.setOptions({breaks: true})

import IntroCard from './IntroCard'
import FontList from './FontList'
import Excerpts from './Excerpts'

export default {
	name: 'home-view',
	components: {IntroCard, FontList, Excerpts},
	props: {
		lang: String
	},
	data() {
		return {
			pageData: {
				intro: '',
				fontlistTitle: '',
				fonts: [],
				more: {}
			},
			body: ''
		}
	},
	methods: {
		md(content) {
			return marked(content)
		},
		getPageData() {
			this.$http.get(`/static/data/home/${this.lang}.json`)
			.then(
				res => {
					this.pageData = res.body.attributes
					this.body = res.body.body
				}
			).bind(this)
		}
	},
	watch: {
		$route() {
			this.getPageData()
		}
	},
	created() {
		this.getPageData()
	}
}
</script>


<style scoped lang="stylus">
	@import '../styles/component'

	.module
		width: 100%
		padding: $gutter

	.module.full
		width: 100%
		padding: 0
		margin-top: 3rem

	.module-header
		display: block
		width: 100%
		padding: 2rem 0
		border-bottom: 1px solid black
		text-align: center
		font-size: 1rem
		font-weight: 700
		font-family: $M2
		text-transform: uppercase
		letter-spacing: .07em

	#front-cover
		position: relative
		width: 100%
		height: 50vw
		margin-top: 5.5rem
		background-size: 120%
		background-position: center
		transition: background .3s ease
		+above(1080px)
			background-image: $img-cover-1400, $img-cover-ph

		+above(1080px, true, 'retina')
			background-image: $img-cover-1400x2, $img-cover-ph

		+below(1080px)
			background-image: $img-cover-1080, $img-cover-ph

		+below(1080px, true, 'retina')
			background-image: $img-cover-1080x2, $img-cover-ph

		+below(780px, true, null, 'landscape', true)
			background-image: $img-cover-780, $img-cover-ph

		+below(780px, true, 'retina', 'landscape', true)
			background-image: $img-cover-780x2, $img-cover-ph

		+below(780px, true, 'retina', 'portrait', true)
			background-image: $img-cover-780vx2, $img-cover-ph

		+below(400px, true, null, null, true)
			background-image: $img-cover-780v, $img-cover-ph

	#about-slides
		picture
			img
				width: 100%

	.intro-link
		display: block
		position: absolute
		z-index: 1
		size: 4.5rem
		bottom: -2rem
		background-repeat: no-repeat
		background-position: center
		background-size: contain
		&.miastodwa
			left: $gutter
			background-image: $img-logo-m102
		&.douslug
			right: $gutter
			background-image: $img-logo-wdu
</style>
