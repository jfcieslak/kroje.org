/* eslint-disable*/
export default {
	init(){
		window.ga = window.ga || function(){
			(window.ga.q = window.ga.q || []).push(arguments)
		}
		window.ga.l = +new Date()
		window.ga('create', 'UA-87426844-1', 'auto')
		window.ga('send', 'pageview')
	}
}
