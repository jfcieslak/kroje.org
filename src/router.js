import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewHome from './components/ViewHome'
import ViewAbout from './components/ViewAbout'
import ViewFont from './components/ViewFont'

Vue.use(VueRouter)

const router = new VueRouter({
	// mode: 'history',
	routes: [
		{path: '/', redirect: '/pl'},
		{path: '/:lang/', name: 'home', component: ViewHome},
		{path: '/:lang/fonts/', name: 'fonts', component: ViewHome},
		{path: '/:lang/fonts/:font', name: 'font', component: ViewFont},
		{path: '/:lang/about/', name: 'about', component: ViewAbout},
		{path: '/:lang/resources/', name: 'resources', component: ViewAbout},
		{path: '/:lang/store/', name: 'store', component: ViewAbout}
	]
})

export default router
