<template lang='pug'>
	.article-view#view-about
		#page-menu
		#page-content
			.content(v-if="body", :lang="lang", v-html="md(body)")
			.wip(v-else, :lang="lang", v-html="md(pageData.wip)")
</template>

<script>
import marked from 'marked'
marked.setOptions({breaks: true})

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
	head: {
		title() {
			return {
				inner: this.siteTitle, complement: this.pageData.title
			}
		},
		meta() {
			return [
				{name: 'description', content: this.pageData.title},
				// schema.org
				{itemprop: 'name', content: this.pageData.title},
				{itemprop: 'description', content: this.pageData.title},
				{itemprop: 'image', content: `http://kroje.org/static/images/wk-about/warszawskie-kroje-00.jpg`},
				// facebook
				{property: 'fb:app_id', content: '1827279940840195'},
				{property: 'og:type', content: 'website'},
				{property: 'og:url', content: `http://kroje.org${window.location.pathname}/`},
				{property: 'og:title', content: `${this.siteTitle} – "${this.pageData.title}"`},
				{property: 'og:image', content: `http://kroje.org/static/images/wk-about/warszawskie-kroje-00.jpg`},
				{property: 'og:image:width', content: '2500'},
				{property: 'og:image:height', content: '1313'},
				{property: 'og:description', content: this.pageData.title},
				{property: 'og:site_name', content: this.siteTitle}
			]
		}
	},
	methods: {
		md(content){ return content ? marked(content) : '' },
		getPageData() {
			this.$http.get(`/static/data/resources/${this.lang}.json`)
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

<style scoped lang='stylus'>
@import '../styles/component'
</style>
