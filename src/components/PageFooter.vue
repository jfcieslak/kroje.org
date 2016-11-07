<template lang='jade'>
	#page-footer
		#footer-left
			h2#contact-header {{texts.contact.header}}
			#contact-details(v-html="md(texts.contact.text)")
		#footer-right
			#partners-row
				h4.partners-label {{texts.partners}}:
				a.partner(v-for="item in partners", :title="item.name", :href="item.link")
					img(:src="item.logo")
			#media-row
				h4.partners-label {{texts.media}}:
				a.partner(v-for="item in media", :title="item.name", :href="item.link")
					img(:src="item.logo", :alt="item.name")
			#organizers-row
				a.footer-logo(v-for="item in organizers", :title="item.name", :href="item.link")
					img(:src="item.logo", :alt="item.name")
				.orgs-info
					.footnote#orgs-note(v-html="md(texts.organizers)")
					.footnote#copy-note(v-html="md(texts.copy)")

</template>

<script>
import marked from 'marked'
marked.setOptions({breaks: true})
export default {
	name: 'page-footer',
	props: {
	// Seems like you don't have to define default Arrays, just Objects
		texts: {
			default() {
				return {
					contact: {header: '', text: ''},
					copy: '',
					organizers: '',
					partners: '',
					media: ''
				}
			}
		},
		social: Array,
		partners: Array,
		media: Array,
		organizers: Array
	},
	methods: {
		md(content){ return marked(content) }
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
	lost-column: 1/3 3 $gutter flex
	#contact-header
		font-size: 1rem
		font-weight: 700
		font-family: $M2
		text-transform: uppercase
		letter-spacing: 0.07em
		margin-bottom: 2rem
#footer-right
	lost-column: 2/3 3 $gutter flex
	#partners-row, #media-row
		display: flex
		width: 100%
		flex-flow: row nowrap
		align-items: center
		margin-bottom: 3rem
	.partners-label
		lost-column: 1.5/12 12 $gutter flex
		font-weight: 200
		font-size: .8rem
		text-transform: uppercase
		line-height: 1.2em
		letter-spacing: .02em
	.partner
		display: block
		margin-right: 3rem
	#organizers-row
		display: flex
		margin-top: 4rem
	.footer-logo
		lost-column: 1.5/12 2 $gutter flex
		img
			max-width: 4rem
	.orgs-info
		lost-column: 6/12 3 $gutter flex
		font-size: .9rem
		line-height: 1.6em

</style>

<style lang="stylus">
	#contact-details
		font-size: .9rem
		line-height: 1.6em
		a:link
			text-decoration: underline
</style>
