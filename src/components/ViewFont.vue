<template lang='pug'>
#font-page
	.font-cover
		cover-slider(:covers="pageData.font.covers")
	article.font-article
		aside.article-sidebar
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
			section.author
				.section-content
					.author-head
						.author-img
							img(:src="pageData.author.photo")
						h4.section-title.author-name
							| {{labels[lang].author}} —
							br
							| {{pageData.author.name}}
					p.author-desc {{pageData.author.desc}}
					ul.author-links
						li(v-for="link in pageData.author.links")
							a(:href="link.link" title="link.title") {{link.title}}
		.article-main
			section.desc
				.section-content
					p {{pageData.font.desc}}
			section.tester
				h4.section-title {{labels[lang].tester}}:
				font-tester(:font="pageData.font.name", :styles="pageData.font.styles")
		section.download
			a.button.download-font(:title="pageData.font.name", :href="fontZipLink") {{labels[lang].download}}
</template>

<script>
import FontTester from './FontTester'
import CoverSlider from './CoverSlider'

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
					download: '',
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
			return `https://github.com/warszawskie-kroje/${this.pageData.font.slug}/archive/v1.0.zip`
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
	.article-sidebar
		lost-column: 1/3 2 $gutter*2 flex
		padding-left: $gutter
		padding-top: 6rem
	.article-main
		lost-column: 2/3 2 $gutter*2 flex
		padding-right: $gutter
		padding-top: 6.5rem
		margin-bottom: 5rem

	section.info
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


	section.author
		font-size: 1rem
		padding-right: 3rem
		clearfix()
		.author-img
			display: block
			max-width: 6rem
			margin-right: 2rem
			border-radius: 50%
			overflow: hidden
		.author-desc
			display: block
			width: 100%
			margin-top: 1rem
			max-width: 20rem
			line-height: 1.5
		.author-links
			display: block
			width: 100%
			float: left
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

	section.desc
		font-weight: 200
		line-height: 1.9em
		max-width: 56rem

	section.tester
		width: 100%
		max-width: 50rem
		margin-top: 10rem
		#font-tester
			margin-top: 3rem

section.download
	padding: 3rem 0
	width: 100%
	background-color: rgba(black, .05)
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
		&:hover
			color: white
			background-color: blue
		&.disabled
			cursor: not-allowed
			opacity: .5

</style>
