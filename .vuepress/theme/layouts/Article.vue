<template lang='pug'>
#about-page
    top-menu
    .article-view
        #page-content
            Content
    page-footer
</template>

<script>
import TopMenu from '../components/TopMenu'
import PageFooter from '../components/PageFooter'

export default {
    name: 'view-article',
    components: { TopMenu, PageFooter }
}
</script>

<style scoped lang='stylus'>
@import '../styles/component'
#page-content
    margin 0 auto
</style>
