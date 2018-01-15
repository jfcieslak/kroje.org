<template lang='pug'>
#font-page
	.font-cover
		cover-slider(:covers="pageData.font.covers")
	article.font-article

		section.info
			h4.section-title {{pageData.font.name}}
			.section-content
				p.def {{labels[lang].styles}}
				ul.styles-list
					li(v-for="style in pageData.font.styles") {{style.name}}
				p.def {{labels[lang].sets}}
				p {{pageData.font.sets}}
				p.def {{labels[lang].license}}
				p
					a(:href="license.url", title="license.name") {{license.name}}

		section.desc
			.section-content(:lang="lang")
				p {{pageData.font.desc}}

		section.author
			.section-content
				.author-head
					.author-img
						img(:src="pageData.author.photo")
					h4.section-title.author-name
						| {{labels[lang].author}} —
						br
						| {{pageData.author.name}}
				p.author-desc(:lang="lang") {{pageData.author.desc}}
				ul.author-links
					li(v-for="link in pageData.author.links")
						a(:href="link.link", :title="link.title") {{link.title}}

		section.tester
			font-tester(:font="pageData.font.name", :styles="pageData.font.styles")

		section.download
			a.button.download-font(:title="pageData.font.name", :href="fontZipLink", @click="gaDownload()", download) {{labels[lang].download}}
</template>

<script>
import FontTester from './FontTester'
import CoverSlider from './CoverSlider'
import marked from 'marked'
marked.setOptions({breaks: true})

export default {
	name: 'font-page',
	components: {CoverSlider, FontTester},
	props: {
		lang: String,
		siteTitle: String
	},
	data() {
		return {
			labels: {
				pl: {
					info: 'szczegóły',
					author: 'Projektant',
					desc: 'opis',
					tester: 'wypróbuj',
					sets: 'zestaw znaków:',
					styles: 'dostępne odmiany:',
					license: 'licencja:',
					download: 'pobierz font'
				},
				en: {
					info: 'info',
					author: 'Designer',
					desc: 'about',
					tester: 'try it out',
					sets: 'character set:',
					license: 'licencja:',
					styles: 'available style variations:',
					download: 'download font'
				}
			},
			license: {
				name: 'SIL Open Font License',
				url: 'http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL_web'
			},
			pageData: {
				font: {
					slug: '',
					name: '',
					version: 'v1.0',
					sets: '',
					desc: '',
					styles: [{name: '', link: ''}],
					covers: [{color: '', link: ''}]
				},
				author: {
					name: '',
					photo: '',
					desc: '',
					links: [{title: '', link: ''}]
				}
			}
		}
	},
	computed: {
		fontZipLink() {
			let slug = this.pageData.font.slug
			let version = this.pageData.font.version
			return `https://github.com/warszawskie-kroje/${slug}/releases/download/${version}/${slug}.zip`
		}
	},
	head: {
		title() {
			return {
				inner: this.siteTitle, complement: this.pageData.font.name
			}
		},
		meta() {
			return [
				{name: 'description', content: this.pageData.font.desc.substring(0, 150)},
				// schema.org
				{itemprop: 'name', content: this.siteTitle},
				{itemprop: 'description', content: this.pageData.font.desc.substring(0, 150)},
				{itemprop: 'image', content: `http://kroje.org/static/images/font-covers/${this.pageData.font.name}.png`},
				// facebook
				{property: 'fb:app_id', content: '1827279940840195'},
				{property: 'og:type', content: 'website'},
				{property: 'og:url', content: `http://kroje.org${window.location.pathname}/`},
				{property: 'og:title', content: `${this.siteTitle} – "${this.pageData.font.name}"`},
				{property: 'og:image', content: `http://kroje.org/static/images/font-covers/${this.pageData.font.name}.png`},
				{property: 'og:image:width', content: '2500'},
				{property: 'og:image:height', content: '1313'},
				{property: 'og:description', content: this.pageData.font.desc},
				{property: 'og:site_name', content: this.siteTitle}
			]
		}
	},
	methods: {
		md(content) { return content ? marked(content) : ''},

		gaDownload() {
			window.ga('send', {
				hitType: 'event',
				eventCategory: 'Font',
				eventAction: 'download',
				eventLabel: this.pageData.font.name
			})
		},
		getPageData() {
			let font = this.$route.params.font
			let lang = this.lang
			this.$http.get(`/static/data/fonts/${font}/${lang}.json`)
			.then(
				res => {
					this.pageData = res.body.attributes
					this.body = res.body.body
					this.$emit('updateHead')
				},
				err => console.log(err)
			)
			.then(
				res => document.dispatchEvent(new window.Event('render-ready'))
			)
			.bind(this)
		},
		coverStyle(color) {
			return { backgroundColor: color }
		},
		slideStyle(link) {
			return { backgroundImage: `url('${window.location.origin + link}')` }
		}
	},
	watch: {
		$route() {
			this.getPageData()
			this.$emit('updateHead')
		}
	},
	created() {
		this.getPageData()
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'

#font-page
	padding-top: 5.5rem
.font-cover
	display: block
	width: 100%

.section-title
	display: block
	letter-spacing: 0.01em
	font-size: 1.2rem
	font-family: $M2
	margin: 1rem 0
.font-article
		lost-center: 100% 0 flex

	section.info
		+above(780px, true)
			lost-column: 1/3 2 $gutter*2 flex
		+below(780px, true)
			width: 100%
			text-align: center
			padding: 0
			margin-top: 2rem
		order: 1
		padding-left: $gutter
		margin-top: 5.4rem
		font-size: 1rem
		line-height: 1.4rem
		text-align: right
		.def
			letter-spacing: 0.01em
			margin-bottom: 0
		ul
			display: block
			list-style-type: none
			margin: 0
			padding: 0
			margin-bottom: 2rem
			text-transform: uppercase
			line-height: 1.6em
		a:link
			text-decoration: underline

	section.desc
		+above(780px, true)
			lost-column: 2/3 2 $gutter*2 flex
		+below(780px, true)
			width: 100%
			padding: 0 $gutter
			margin-top: 2rem
			margin-bottom: 4rem
		order: 2
		padding-right: $gutter
		margin-top: 6rem
		font-weight: 200
		line-height: 1.9em
		text-align: justify
		.section-content
			max-width: 56rem
			hyphens: auto
			+below(780px, true)
				margin: 0 auto

	section.author
		font-size: 1rem
		padding-left: $gutter
		margin-top: 8rem
		margin-bottom: 4rem
		text-align: justify
		+above(780px, true)
			order: 3
			lost-column: 1/3 2 $gutter*2 flex
		+below(780px, true)
			order: 4
			max-width: 30rem
			margin: 3rem auto
			padding: 0 $gutter
		.author-head
			+below(780px, true)
				text-align: center
		.author-img
			display: block
			max-width: 6rem
			margin-right: 2rem
			border-radius: 50%
			overflow: hidden
			+below(780px, true)
				margin: 0 auto
		.author-desc
			display: block
			width: 100%
			margin-top: 1rem
			max-width: 20rem
			line-height: 1.5
			font-size: 1rem
			hyphens: auto
			+below(780px, true)
				text-align-last: center
				max-width: 100%
		.author-links
			display: block
			width: 100%
			float: left
			+below(780px, true)
				text-align: center
		ul
			margin: 0
			padding: 0
			list-style-type: none
		a:link, a:visited
			color: blue
			display: inline-block
			padding: 0 .5em
			border: 1px solid blue
			&:hover
				color: white
				background-color: blue

	section.tester
		+above(780px, true)
			lost-column: 2/3 2 $gutter*2 flex
			order: 4
		+below(780px, true)
			order: 3
			width: 100%
			margin: 0 auto
			padding: 2rem $gutter
			border-top: 1px solid black
			border-bottom: 1px solid black
		padding-right: $gutter
		margin-top: 8rem
		#font-tester
			max-width: 56rem
			margin-top: 3rem
			+below(780px, true)
				margin: 3rem auto

section.download
	order: 5
	padding: 3rem 0
	width: 100%
	background-color: rgba(black, .05)
	+below(780px, true)
		padding: 0
	.download-font
		display: block
		width: 100%
		margin: 0 auto
		padding: 1rem
		max-width: 30rem
		text-align: center
		text-transform: uppercase
		font-size: 1rem
		letter-spacing: 0.025em
		color: blue
		border: 1px solid blue
		+below(780px, true)
			max-width: 100%
			border: none
		&:hover
			color: white
			background-color: blue
		&.disabled
			cursor: not-allowed
			opacity: .5

</style>
