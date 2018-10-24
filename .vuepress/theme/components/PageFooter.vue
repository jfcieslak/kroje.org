<template lang='pug'>
	#page-footer
		#footer-left
			h2#contact-header {{texts.header}}
			#contact-details(v-html="render(texts.text)")
		#footer-right
			.partners-row
				h4.partners-label {{texts.partners}}:
				a.partner(v-for="item in footer.partners", :title="item.name", :href="item.link")
					img(:src="item.logo")
			.media-row
				h4.partners-label {{texts.media}}:
				a.partner(v-for="item in footer.media", :title="item.name", :href="item.link")
					img(:src="item.logo", :alt="item.name")
			.organizers-row
				a.footer-logo(v-for="item in footer.organizers", :title="item.name", :href="item.link")
					img(:src="item.logo", :alt="item.name")
				.orgs-info
					.footnote#orgs-note(v-html="render(texts.organizers)")
					.footnote#copy-note(v-html="render(texts.copy)")
</template>

<script>
import markdownIt from 'markdown-it'
const md = markdownIt({breaks: true})

export default {
	name: 'page-footer',

	computed: {
		footer(){
			return this.$site.themeConfig.footer
		},
		texts(){
			const lang = this.$lang.substring(0, 2)
			return this.$site.themeConfig.footer.texts[lang]
		}
	},

	methods: {
		render(str){ return md.render(str) }
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#page-footer
	lost-center: 100% $gutter flex
	padding-top: 6rem
	padding-bottom: 4rem
	border-bottom: 10px solid black
	border-top: 1px solid rgba(black, .3)
#footer-left
	+above(600px, true)
		lost-column: 1/3 3 $gutter flex
	+below(600px, true)
		display: block
		width: 100%
		text-align: center
	#contact-header
		font-size: 1rem
		font-weight: 700
		font-family: $M2
		text-transform: uppercase
		letter-spacing: 0.07em
		margin-bottom: 2rem
#footer-right
	+above(600px, true)
		lost-column: 2/3 3 $gutter flex
	+below(600px, true)
		display: block
		width: 100%
	.partners-row, .media-row
		display: flex
		width: 100%
		flex-flow: row nowrap
		align-items: center
		margin-bottom: 3rem
		+below(780px, true)
			flex-flow: row wrap
		+below(600px, true)
			justify-content: center
			margin-top: 3rem
			border-top: 1px solid black
			padding-top: 2rem
	.partners-label
		font-weight: 200
		font-size: .8rem
		text-transform: uppercase
		line-height: 1.2em
		letter-spacing: .02em
		+above(780px, true)
			lost-column: 1.5/12 12 $gutter flex
		+below(780px, true)
			width: 100%
			margin-bottom: 2rem
		+below(600px, true)
			text-align: center
			margin-bottom: 1rem
	.partner
		display: block
		margin-right: 3rem
		+below(780px, true)
			margin-right: 2rem
			margin-bottom: 1rem
			img
				max-height: 2rem
				max-width: 5rem
		+below(600px, true)
			margin: .5rem .8rem
	.organizers-row
		display: flex
		margin-top: 4rem
	.footer-logo
		+above(780px, true)
			lost-column: 1.5/12 2 $gutter flex
		+below(780px, true)
			width: auto
			min-width: 3rem
			margin-right: $gutter
		img
			max-width: 4.5rem
	.orgs-info
		font-size: .9rem
		line-height: 1.6em
		+above(780px, true)
			lost-column: 6/12 3 $gutter flex
		+below(780px, true)
			width: auto

</style>

<style lang="stylus">
	#contact-details, #organizers-row
		font-size: .9rem
		line-height: 1.6em
		a:link
			text-decoration: underline
</style>
