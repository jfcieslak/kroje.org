<template lang='jade'>
	#font-tester
		.settings
			.settings-section.styles
				select.setting-list#choose-style(v-model="settings.fontFamily")
					option(v-for="style in styles", :value="style.font") {{font}} {{style.name}}
				select.setting-list#choose-size(v-model="settings.fontSize")
					option(v-for="size in sizes", :value="size+'pt'") {{size}} pt
			.settings-section.reset
				a.setting-link#reset-text(@click="resetText") RESET TEXT
			.settings-section.cases
				a.setting-button#choose-uppercase(@click="chooseCase('uppercase')")
				a.setting-button#choose-none(@click="chooseCase('none')")
			.settings-section.align
				a.setting-button#choose-left(@click="chooseAlign('left')")
				a.setting-button#choose-center(@click="chooseAlign('center')")
				a.setting-button#choose-right(@click="chooseAlign('right')")
		textarea.test-area#test-area(v-model="text", :style="settings", focus)
</template>

<script>
export default {
	name: 'font-tester',
	props: {
		styles: Array,
		font: String
	},
	data() {
		return {
			sizes: [9,10,11,12,13,14,20,24,36,48,64,72,96,144],
			initText: 'Dość gróźb fuzją, klnę, pych i małżeństw. Filmuj rzeź żądań, pość, gnęb chłystków!',
			text: '',
			settings: {
				fontSize: '24pt',
				fontFamily: '',
				textTransform: 'none',
				textAlign: 'left'
			}
		}
	},
	methods: {
		chooseCase(value) { this.settings.textTransform = value },
		chooseAlign(value) { this.settings.textAlign = value },
		resetText() {this.text = this.initText},
		resetSettings(){ this.settings.fontFamily = this.styles[0].font }
	},
	watch: {
		$route() {
			this.resetText()
		},
		styles() {
			this.resetSettings()
		}
	},
	created() {
		this.resetSettings()
		this.resetText()
	}
}
</script>

<style lang='stylus'>
@import '../styles/component'
#font-tester
	.settings
		display: flex
		flex-flow: row nowrap
		justify-content: space-between
		.settings-section
			display: block
			clearfix()
		.setting-list
			float: left
			margin-right: 2rem
		.setting-link
			font-size: 1rem
			font-weight: 200
			line-height: 1rem
			padding: .5em 0
			display: block
			text-decoration: underline
			cursor: pointer
		.setting-button
			display: inline-block
			size: 2rem
			margin-left: 1rem
			cursor: pointer
			background: center center no-repeat
			background-size: 1.5rem
			border-radius: 3px
		#choose-uppercase
			background-image: $img-case-upper
		#choose-none
			background-image: $img-case-none
		#choose-left
			background-image: $img-align-left
		#choose-center
			background-image: $img-align-center
		#choose-right
			background-image: $img-align-right
	.test-area
		font-variant-ligatures: contextual
		font-feature-settings: "kern" on, "liga" on, "calt" on
		border: none
		line-height: 1.4em
		margin-top: 2rem
</style>
