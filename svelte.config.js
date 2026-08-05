import cloudflare from '@sveltejs/adapter-cloudflare';
import staticAdapter from '@sveltejs/adapter-static';

const githubPagesBuild = process.env.DEPLOY_TARGET === 'github-pages';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: githubPagesBuild
			? staticAdapter({
					pages: 'build',
					assets: 'build',
					fallback: '404.html',
					precompress: false,
					strict: false
				})
			: cloudflare({
					platformProxy: {
						persist: true
					}
				}),
		paths: {
			base: process.env.BASE_PATH ?? ''
		},
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, message }) => {
				// The resume PDF is generated AFTER `vite build` (scripts/generate-pdf.mjs),
				// so its links dangle during prerender. Allow it through; every other
				// broken link stays a fatal build error.
				if (githubPagesBuild && path === '/Braison-Swilling-Resume.pdf') return;
				throw new Error(message);
			}
		}
	}
};

export default config;
