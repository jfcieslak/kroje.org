<template lang="pug">
#home-page
	top-menu
	#front-cover
		intro-card#intro-card
			Content
		a.intro-link.miastodwa(href="https://miastodwa.org")
		a.intro-link.douslug(href="http://douslug.org/")
	
	section
		.module#font-list
			h4.module-header {{$page.frontmatter.fontlistTitle}}
			font-list(:items="$page.frontmatter.fonts")

	section
		.module#more
			h4.module-header {{$page.frontmatter.moreTitle}}
			Excerpts(:items="$page.frontmatter.more")

	section
		.module#partner
			h5.module-label {{$page.frontmatter.adTitle}}
			a.partner(href="https://balaganstudio.com/?ref=kroje.org" target="_blank")
				img(src="/images/logos/balagan.svg")

	section
		.module.full#about-slides
			picture
				source(media="(min-width:1081px)"
					srcset="../assets/images/other/cover-about-1-1400.jpg 1x, ../assets/images/other/cover-about-1-1400@2.jpg 2x")
				source(media="(min-width:781px)"
					srcset="../assets/images/other/cover-about-1-1080.jpg 1x, ../assets/images/other/cover-about-1-1080@2.jpg 2x")
				source(media="(max-width:780px)"
					srcset="../assets/images/other/cover-about-1-780.jpg 1x, ../assets/images/other/cover-about-1-780@2.jpg 2x")
				img(alt="Warszawskie Kroje"
					src="../assets/images/other/cover-about-1-1080.jpg")

	section
		.module#links
			h4.module-header.no-border {{$page.frontmatter.linksTitle}}
			.link-icons
				a.fb(:href="$page.frontmatter.links.fb.href", :title="$page.frontmatter.links.fb.name", target="_blank")
				a.gh(:href="$page.frontmatter.links.gh.href", :title="$page.frontmatter.links.gh.name" target="_blank")

	page-footer

</template>

<script>
import TopMenu from '../components/TopMenu'
import IntroCard from '../components/IntroCard'
import FontList from '../components/FontList'
import Excerpts from '../components/Excerpts'
import PageFooter from '../components/PageFooter'

export default {
	name: 'view-home',

	components: {
		TopMenu, IntroCard, FontList, Excerpts, PageFooter
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
		&.no-border
			border: none

	.module-label
		font-weight: 200
		font-size: .8rem
		text-transform: uppercase
		line-height: 1.2em
		letter-spacing: .02em
		margin 1rem 0

	#partner
		text-align center
		background-color rgba(black .05)
		padding-bottom 3rem
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

		+below(620px, true, null, null, true)
			background-image: $img-cover-780vx2, $img-cover-ph
			height: 60vh

		+below(400px, true, null, null, true)
			background-image: $img-cover-780v, $img-cover-ph
			height: 70vh

	#about-slides
		margin-top 0
		picture
			img
				width: 100%
	.link-icons
		text-align: center
		a
			display: inline-block
			width: 4rem
			height: 4rem
			margin: 1rem
			&.fb
				background: center center no-repeat url('../assets/images/ui/fb.svg')
				background-size: 100% auto
			&.gh
				background: center center no-repeat $img-gh
				background-size: 100% auto
	.intro-link
		display: block
		position: absolute
		z-index: 1
		width: 4.5rem
		height: 4.5rem
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
