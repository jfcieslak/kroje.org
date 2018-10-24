<template lang='pug'>
#font-page

	top-menu

	.font-cover
		cover-slider(:covers="$page.frontmatter.font.covers")
	article.font-article

		section.info
			h4.section-title {{$page.frontmatter.font.name}}
			.section-content
				p.def {{labels[$lang].styles}}
				ul.styles-list
					li(v-for="style in $page.frontmatter.font.styles") {{style.name}}
				p.def {{labels[$lang].sets}}
				p {{$page.frontmatter.font.sets}}
				p.def {{labels[$lang].license}}
				p
					a(:href="license.url", title="license.name") {{license.name}}

		section.desc
			.section-content(:lang="$lang")
				p {{$page.frontmatter.font.desc}}

		section.author
			.section-content
				.author-head
					.author-img
						img(:src="$page.frontmatter.author.photo")
					h4.section-title.author-name
						| {{labels[$lang].author}} —
						br
						| {{$page.frontmatter.author.name}}
				p.author-desc(:lang="$lang") {{$page.frontmatter.author.desc}}
				ul.author-links
					li(v-for="link in $page.frontmatter.author.links")
						a(:href="link.link", :title="link.title") {{link.title}}

		section.tester
			font-tester(:font="$page.frontmatter.font.name", :styles="$page.frontmatter.font.styles")

		section.download
			a.button.download-font(:title="$page.frontmatter.font.name", :href="fontZipLink", @click="gaDownload()", download) {{labels[$lang].download}}

	page-footer
</template>

<script>
import TopMenu from '../components/TopMenu'
import FontTester from '../components/FontTester'
import CoverSlider from '../components/CoverSlider'
import PageFooter from '../components/PageFooter'
import markdownIt from 'markdown-it'
const md = markdownIt({breaks: true})

export default {
	name: 'font-page',
	components: {TopMenu, CoverSlider, FontTester, PageFooter},
	data() {
		return {
			labels: {
				'pl-PL': {
					info: 'szczegóły',
					author: 'Projektant',
					desc: 'opis',
					tester: 'wypróbuj',
					sets: 'zestaw znaków:',
					styles: 'dostępne odmiany:',
					license: 'licencja:',
					download: 'pobierz font'
				},
				'en-US': {
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
		}
	},
	computed: {
		fontZipLink() {
			let slug = this.$page.frontmatter.font.slug
			let version = this.$page.frontmatter.font.version
			return `https://github.com/warszawskie-kroje/${slug}/releases/download/${version}/${slug}.zip`
		}
	},
	methods: {
		render(str){ return md.render(str) },

		gaDownload() {
			window.ga('send', {
				hitType: 'event',
				eventCategory: 'Font',
				eventAction: 'download',
				eventLabel: this.$page.frontmatter.font.name
			})
		}
	},
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
		margin-top: 2rem
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
		margin-top: 2rem
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
