<template lang='pug'>
	#cover-slider(:style="coverStyle")
		.cover-slide-text(:style="slideStyle")
</template>

<script>
export default {
	name: 'cover-slider',
	props: {
		covers: {
			type: Array,
			default() { return [{color: '', link: ''}] }
		}
	},
	data() {
		return {
			coverStyle: {backgroundColor: ''},
			slideStyle: {backgroundImage: ''}
		}
	},
	methods: {
		resetCover() {
			this.coverStyle = this.getCoverStyle(this.covers[0].color)
			this.slideStyle = this.getSlideStyle(this.covers[0].link)
		},
		getCoverStyle(color) {
			return { backgroundColor: color }
		},
		getSlideStyle(link) {
			return { backgroundImage: `url('${window.location.origin + link}')` }
		},
		slide(covers) {
			let current = 0
			window.slideInterval = window.setInterval( ()=> {
				current = (current + 1) % covers.length
				this.coverStyle = this.getCoverStyle(covers[current].color)
				this.slideStyle = this.getSlideStyle(covers[current].link)
			}, 3000)
		}
	},
	watch: {
		covers() {
			clearInterval(window.slideInterval)
			this.resetCover()
			this.slide(this.covers)
		}
	},
	mounted() {
		clearInterval(window.slideInterval)
		this.resetCover()
		this.slide(this.covers)
	},
	destroyed() {
		clearInterval(window.slideInterval)
	}
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#cover-slider
	position: relative
	width: 100%
	height: 40vw
	transition: all .2s ease
	.cover-slide-text
		position: absolute
		top: 15%
		left: 15%
		height: 70%
		width: 70%
		background: no-repeat center center
		background-size: contain
</style>
