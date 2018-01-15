<template lang='pug'>
	#excerpts
		.more-item(
			v-for="(item, key) in items",
			:class="[ {wip: item.wip}, $route.params.lang ]")
			router-link.more-item-link(:to="item.wip ? '':getItemUrl(key)") {{item.title}}
			p.more-item-text {{item.text}}
</template>

<script>
export default {
	name: 'excerpts',
	props: {
		items: Object
	},
	methods: {
		getItemUrl(slug){ return `${this.$route.params.lang}/${slug}` }
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#excerpts
	margin-top: 2rem
	clearfix()
	+above(600px, true)
		lost-center: 100% 0 flex
	+below(600px, true)
		padding: 3rem 0
	.more-item
		position: relative
		clearfix()
		+above(600px, true)
			lost-column: 1/3 3 $gutter flex
		+below(600px, true)
			display: block
			text-align: center
			width: 100%
			max-width: 260px
			margin: 0 auto
		&.wip:after
			content: 'SOON!'
			display: block
			position: absolute
			top: -1rem
			left: 2rem
			size: 6rem
			box-sizing: border-box
			background-color: rgba($wk-yellow, .9)
			border-radius: 50%
			font-size: 1rem
			line-height: 1em
			text-align: center
			padding: 2.5rem 0
			transform: rotate(-25deg)
			+below(600px)
				left: 4rem
				right: 0
				margin: 0 auto
		&.wip.en:after
			content: 'SOON!'
		&.wip.pl:after
			content: 'WKRÓTCE'
		.more-item-link
			width: 40%
			float: left
			padding-right: 5%
			font-weight: 200
			font-size: 1.6rem
			text-decoration: underline
			&:hover
				color: blue
			+below(780px)
				width: 100%
			+below(600px)
				padding: 0
		.more-item-text
			width: 55%
			float: left
			font-size: 1rem
			line-height: 1.7em
			+below(780px)
				width: 80%
				margin-top: 1.6rem
			+below(600px)
				width: 100%
</style>
