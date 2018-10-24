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

	ga: 'UA-87426844-1',

	head: [
		['meta', { name: 'google-site-verification', content: 'gHY6y9T0nYLaIqJn6P4_oY9RKYL_JfLmqPu-ZaI4W3k' }]
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
	}
}