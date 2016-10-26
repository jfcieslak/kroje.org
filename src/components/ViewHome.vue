<template lang="pug">
	#home-page
		front-cover.front-cover(
			base="/static/images/wk-cover"
			placeholder="@0,1x.jpg"
			small="@0,5x.jpg"
			v-bind:responsive='[{w:600, src:".jpg"},{w:1000, src:"@2x.jpg"}]'
		)
</template>


<script>
import FrontCover from './FrontCover'
export default {
	name: 'home-view',
	components: {FrontCover},
}
</script>


<style scoped lang="stylus">
	@import '../assets/styles/component'
	.front-cover
		width: 100%
		height: 50vw
		opacity: .8
		background-size: 120%
		background-position: center
		transition: background .3s ease
		background-image: url('/static/images/wk-cover@0,5x.jpg')
		+above(800px)
			background-image: url('/static/images/wk-cover.jpg')
		+above(1000px)
			background-image: url('/static/images/wk-cover@2x.jpg')
</style>
