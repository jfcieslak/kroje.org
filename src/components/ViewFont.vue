<template lang='pug'>
#font-page
	.font-cover
		.cover-slide(:style="coverStyle(pageData.font.covers[0].color)")
			.cover-slide-text(:style="slideStyle(pageData.font.covers[0].link)")
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
				h4.section-title {{labels[lang].tester}}
				font-tester(:font="pageData.font.name", :styles="pageData.font.styles")
			section.download
				a.button.download-font(:href="pageData.font.download", :title="pageData.font.name") {{labels[lang].download}}
</template>

<script>
import fm from 'front-matter'
import FontTester from './FontTester'

export default {
	name: 'font-page',
	components: {FontTester},
	props: {
		lang: String
	},
	data() {
		return {
			labels: {
				pl: {
					info: 'szczegóły',
					author: 'Projektant',
					desc: 'opis',
					tester: 'WYPRÓBUJ:',
					sets: 'zestaw znaków:',
					styles: 'dostępne odmiany:',
					download: 'pobierz font'
				},
				en: {
					info: 'info',
					author: 'Designer',
					desc: 'about',
					tester: 'TRY IT OUT:',
					sets: 'character set:',
					styles: 'available style variations:',
					download: 'download font'
				}
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
	methods: {
		getPageData() {
			let font = this.$route.params.font
			let lang = this.lang
			this.$http.get(`static/data/fonts/${font}/${lang}.md`)
			.then(
				res => {
					this.pageData = fm(res.body).attributes
					this.body = fm(res.body).body
				}
			).bind(this)
		},
		coverStyle(color) {
			return { backgroundColor: color }
		},
		slideStyle(link) {
			return { backgroundImage: `url('${link}')` }
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

<style scoped lang='stylus'>
@import '../styles/component'

#font-page
	padding-top: 5.5rem
.font-cover
	display: block
	width: 100%
	.cover-slide
		position: relative
		width: 100%
		height: 40vw
		background-color: pink
		.cover-slide-text
			position: absolute
			top: 15%
			left: 15%
			height: 70%
			width: 70%
			background: no-repeat center center
			background-size: contain



.section-title
	display: block
	letter-spacing: 0.01em
	font-size: 1.2rem
	font-family: $M2
	margin: 1rem 0
.font-article
	lost-center: 100% 0 flex
	padding-bottom: 4rem
	.article-sidebar
		lost-column: 1/3 2 $gutter*2 flex
		padding-left: $gutter
		padding-top: 6rem
	.article-main
		lost-column: 2/3 2 $gutter*2 flex
		padding-right: $gutter
		padding-top: 6.5rem
		margin-bottom: 10rem

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

	section.download
		padding-top: 3rem
		.download-font
			display: block
			width: 100%
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
	section.desc
		font-weight: 200
		line-height: 1.9em
		max-width: 56rem

	section.tester
		width: 100%
		max-width: 50rem
		margin-top: 10rem
		#font-tester
			margin-top: 2rem
			border-top: 1px solid black
			padding-top: 2rem
</style>
