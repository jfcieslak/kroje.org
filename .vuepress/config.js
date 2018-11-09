const themeConfig = require('./themeConfig')

module.exports = {
	title: 'Warszawskie Kroje',
	
	description: 'Nowe kroje dla Warszawy',
	
	themeConfig: themeConfig,

	locales: {
		'/': {
			lang: 'pl-PL'
		},
		'/en/': {
			lang: 'en-US',
			title: 'Warsaw Types',
			description: 'New typefaces for Warsaw'
		}
	},

	head: [
		['script', {async: true, src: 'https://www.googletagmanager.com/gtag/js?id=UA-87426844-1'}],
		['script', {src: '/js/ga.js'}],
		['meta', { name: 'google-site-verification', content: 'gHY6y9T0nYLaIqJn6P4_oY9RKYL_JfLmqPu-ZaI4W3k' }],
		['meta', { name: 'image', content: 'https://kroje.org/assets/img/warszawskie-kroje-00.7790f955.jpg' }],
		['meta', { name: 'og:image', content: 'https://kroje.org/assets/img/warszawskie-kroje-00.7790f955.jpg'}],
	],

	postcss: {
		plugins: [
			require('postcss-preset-env')({}),
			require('lost')
		]
	},

	markdown: {
		extendMarkdown: md => {
			md.set({
				breaks: true
			})
		}
	},

	plugins: {
		'sitemap': {
			hostname: 'https://kroje.org'
		}
	}
}