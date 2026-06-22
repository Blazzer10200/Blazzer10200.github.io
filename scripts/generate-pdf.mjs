// Renders the built homepage to build/resume.pdf using the site's own
// @media print styles, so the downloadable resume is generated from the
// single source of truth (the page copy) and can never drift out of sync.
//
// Runs AFTER `vite build`: it serves the prerendered build/ output over a
// local http server, loads it in headless Chromium with print-media emulation,
// and writes the PDF back into build/ so it ships in the Pages artifact.
//
// Usage: node scripts/generate-pdf.mjs (or `npm run pdf`). Requires an existing
// build/ — run `npm run build:pdf` to build first, then generate.

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const BUILD_DIR = resolve(__dirname, '..', 'build');
const OUT = join(BUILD_DIR, 'resume.pdf');

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.woff2': 'font/woff2',
	'.ico': 'image/x-icon',
	'.txt': 'text/plain; charset=utf-8'
};

// Minimal static file server over build/. Falls back to 404.html (the SPA
// fallback) so client routing still works, mirroring GitHub Pages behaviour.
function serve(root) {
	return createServer(async (req, res) => {
		try {
			let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
			if (path.endsWith('/')) path += 'index.html';
			let file = join(root, path);
			try {
				if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
			} catch {
				// try directory-style route (/foo -> /foo.html), then fallback
				if (!extname(file)) {
					const html = `${file}.html`;
					try {
						await stat(html);
						file = html;
					} catch {
						file = join(root, '404.html');
					}
				} else {
					file = join(root, '404.html');
				}
			}
			const body = await readFile(file);
			res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
			res.end(body);
		} catch (err) {
			res.writeHead(500);
			res.end(String(err));
		}
	});
}

async function main() {
	// Sanity: the build must exist first.
	try {
		await stat(join(BUILD_DIR, 'index.html'));
	} catch {
		console.error('[pdf] build/index.html not found — run `vite build` first.');
		process.exit(1);
	}

	const server = serve(BUILD_DIR);
	await new Promise((r) => server.listen(0, '127.0.0.1', r));
	const { port } = server.address();
	const url = `http://127.0.0.1:${port}/`;
	console.log(`[pdf] serving build/ at ${url}`);

	const browser = await chromium.launch();
	try {
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle' });
		// Use the site's print stylesheet, not the screen one.
		await page.emulateMedia({ media: 'print' });
		await page.pdf({
			path: OUT,
			format: 'Letter',
			printBackground: true,
			// Margins live in the site's `@page` rule; keep Chromium's at 0.
			margin: { top: '0', right: '0', bottom: '0', left: '0' }
		});
		console.log(`[pdf] wrote ${OUT}`);
	} finally {
		await browser.close();
		server.close();
	}
}

main().catch((err) => {
	console.error('[pdf] failed:', err);
	process.exit(1);
});
