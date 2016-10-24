import Vue from 'vue'
import App from './App'
import Hello from './components/Hello.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

/* eslint-disable no-new */
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{path: '/hello', component: Hello}
	]
})

new Vue({
	router,
	el: '#app',
	template: '<App/>',
	components: { App }
})
