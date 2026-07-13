import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.BASE_PATH ?? ''
		},
		prerender: {
			entries: ['/', '/rift', '/exfil', '/ats'],
			handleHttpError: ({ path, message }) => {
				// The resume PDFs are generated AFTER `vite build` (scripts/generate-pdf.mjs),
				// so their links dangle during prerender. Allow them through; every other
				// broken link stays a fatal build error.
				if (path === '/resume.pdf' || path === '/Braison-Swilling-Resume.pdf') return;
				throw new Error(message);
			}
		}
	}
};

export default config;
