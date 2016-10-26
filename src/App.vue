<template lang='jade'>
	#app
		top-bar
		router-view
		page-footer
</template>

<script>
import topBar from './components/TopBar'
import pageFooter from './components/PageFooter'

export default {
	name: 'app',
	components: {topBar, pageFooter}
}
</script>


<style lang='stylus'>
@import '/assets/styles/global'
</style>
