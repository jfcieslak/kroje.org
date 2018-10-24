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