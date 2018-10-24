<template lang='pug'>
	ul#font-list
		li.font-list-item(v-for="item in items")
			router-link.font-item(:to="$localePath + 'fonts/' + item.slug + '/'", :title="item.name")
				img.font-cover(
					:src="`/images/fonts/wk_${item.slug}.svg`",
					:alt="`Warszawskie Kroje – ${item.name}`")
				.font-details
					p.font-author {{item.author}}
					p.font-specs
						span.font-styles {{item.styles}}
						span.font-sets {{item.sets}}
</template>

<script>
export default {
	name: 'font-list',
	props: {
		items: Array
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
ul#font-list
	text-align: center
	list-style-type: none
	padding-left: 0
	margin: 0
	li.font-list-item
		display: block
		width: 100%
		padding: 4rem 0
		.font-item
			display: block
			margin: 0 auto
			text-align: center
			img.font-cover
				height: 9rem
				width: auto
			.font-details
				margin-top: 1rem
				font-size: .9rem
				font-weight: 200
				text-transform: uppercase
				p
					margin-bottom: 0
					font-size: inherit
				span.font-styles
					&:after
						content: '•'
						display: inline-block
						margin: 0 .6rem
</style>
