<template lang='jade'>
	#view-about
		.soon {{wip[lang]}}
</template>

<script>
export default {
	name: 'view-about',
	props: {
		lang: String
	},
	data() {
		return {
			wip: {
				en: 'This page will be available very soon!',
				pl: 'Ta strona będzie dostępna wkrótce!'
			}
		}
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
