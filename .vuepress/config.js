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
		['meta', { name: 'image', content: 'https://kroje.org/images/og-image.png' }],
		//  Facebook
		['meta', { name: 'og:title', content: 'Warszawskie Kroje' }],
		['meta', { name: 'og:description', content: 'Warszawskie Kroje to 12 nowych, darmowych krojów pism stworzonych specjalnie dla Warszawy, w oparciu o lokalne tradycje typograficzne.' }],
		['meta', { name: 'og:type', content: 'website' }],
		['meta', { name: 'og:url', content: 'https://kroje.org/' }],
		['meta', { name: 'og:image', content: 'https://kroje.org/images/og-image.png'}],
		// Twitter
		['meta', { name: 'twitter:title', content: 'Warszawskie Kroje' }],
		['meta', { name: 'twitter:description', content: 'Warszawskie Kroje to 12 nowych, darmowych krojów pism stworzonych specjalnie dla Warszawy, w oparciu o lokalne tradycje typograficzne.' }],
		['meta', { name: 'twitter:card', content: 'summary_large_image' }],
		['meta', { name: 'twitter:url', content: 'https://kroje.org/' }],
		['meta', { name: 'twitter:image', content: 'https://kroje.org/images/og-image.png'}],
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