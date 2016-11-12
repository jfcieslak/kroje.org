<template lang='jade'>
	#view-about
		.soon {{pageData.wip}}
</template>

<script>
export default {
	name: 'view-about',
	props: {
		lang: String,
		siteTitle: String
	},
	data() {
		return {
			pageData: {
				wip: ''
			},
			body: ''
		}
	},
	methods: {
		getPageData() {
			this.$http.get(`/static/data/about/${this.lang}.json`)
			.then(
				res => {
					this.pageData = res.body.attributes
					this.body = res.body.body
					this.$emit('updateHead')
				}
			)
			.then(
				res => {
					document.dispatchEvent(new window.Event('render-ready'))
				}
			)
			.bind(this)
		}
	},
	created() {
		this.getPageData()
	}
}
</script>

<style lang='stylus'>
@import '../styles/component'
#view-about
.soon
	margin: 16rem auto
	text-align: center
</style>
