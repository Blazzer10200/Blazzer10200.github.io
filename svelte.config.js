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
			entries: ['/', '/rift', '/exfil'],
			handleHttpError: ({ path, message }) => {
				// The resume PDF is dropped in manually (static/resume.pdf) and isn't
				// in the repo yet. Allow the link to dangle so the build still passes;
				// it 404s at runtime until the file lands. Every other broken link
				// stays a fatal build error.
				if (path === '/resume.pdf') return;
				throw new Error(message);
			}
		}
	}
};

export default config;
