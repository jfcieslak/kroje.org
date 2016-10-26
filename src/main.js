import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

/* eslint-disable no-new */
Vue.use(VueResource)
Vue.use(VueRouter)

new Vue({
	router,
	el: '#app',
	template: '<App/>',
	components: { App }
})
