<template lang='jade'>
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
	lost-center: 100% 0 flex
	margin-top: 2rem
	.more-item
		lost-column: 1/3 3 $gutter flex
		position: relative
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
		.more-item-text
			width: 55%
			float: left
			font-size: 1rem
			line-height: 1.7em

</style>
