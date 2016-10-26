import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewHome from './components/ViewHome'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{path: '/', component: ViewHome}
	]
})

export default router
