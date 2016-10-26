<template lang='jade'>
	#front-cover(:style="coverStyle")
</template>

<script>
export default {
	name: 'front-cover',
	props: {
		base: {
			type: String,
			default() {return ''}
		},
		placeholder: {
			type: String,
			default() {return ''}
		},
		small: {
			type: String,
			default() {return ''}
		},
		responsive: {
			type: Array,
			required: false,
			deafult() { return {w: 0, src: this.small} }
		}
	},
	data(){
		return {
			bg: {
				breakpoint: 0,
				src: this.small
			},
			loading: false,
			loaded: false,
			coverStyle: {}
		}
	},
	computed: {
		breakpoints() {
			return this.responsive.map( (bg)=> {return parseInt(bg.w)} )
		}
	},
	methods:{
		chooseBg() {
			let src = this.bg.src
			let breakpoint = this.bg.breakpoint
			this.responsive.forEach(function(bg){
				if (bg.w <= window.innerWidth) {
					src = bg.src
					breakpoint = bg.w
				}
			})
			return {
				breakpoint: breakpoint,
				src: src
			}
		},
		setCoverStyle(url) {
			this.coverStyle = {backgroundImage: url}
		},
		setBackground(src) {
			this.loading = true, this.loaded = false,  this.$emit('loading')
			let placeholder = this.base + this.placeholder
			this.setCoverStyle(`url(${placeholder})`)
			this.$http.get(src)
			.then( ()=> {
				this.setCoverStyle(`url(${src}), url(${placeholder})`)
			},
			(error)=> { console.error(error) })
			.then( ()=> {
				this.loading = false, this.loaded = true, this.$emit('loaded')
			},
			(error)=> { console.error(error) })
			.bind(this)
		},
		updateOnResize() {
			let bg = this.chooseBg()
			if (parseInt(bg.breakpoint) > parseInt(this.bg.breakpoint)) this.bg = bg
		}
	},
	watch: {
		bg(newBg) { this.setBackground(this.base + newBg.src) }
	},
	created() {
		this.bg = this.chooseBg()
		console.log(document.styleSheets)
	},
	mounted() {
		window.addEventListener('resize', this.updateOnResize)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.updateOnResize)
	}
}
</script>
