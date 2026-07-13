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

// Each job renders one route to one PDF. resume.pdf keeps the site's designed
// print view; Braison-Swilling-Resume.pdf is the plain single-column /ats view
// built for applicant tracking systems (Indeed, Workday, etc.).
const JOBS = [
	{ route: '/', out: 'resume.pdf' },
	{ route: '/ats', out: 'Braison-Swilling-Resume.pdf' }
];

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
				if ((await stat(file)).isDirectory()) {
					// A route can exist as BOTH `foo.html` (trailingSlash: 'never') and a
					// `foo/` dir holding only `__data.json` (server-load data) — prefer
					// dir/index.html, fall back to the sibling .html page.
					const idx = join(file, 'index.html');
					try {
						await stat(idx);
						file = idx;
					} catch {
						file = `${file}.html`;
					}
				}
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
		for (const job of JOBS) {
			const out = join(BUILD_DIR, job.out);
			const page = await browser.newPage();
			const res = await page.goto(new URL(job.route, url).href, { waitUntil: 'networkidle' });
			if (!res || !res.ok()) {
				// Fail loud: never render an error/404 page into a shipping PDF.
				throw new Error(`[pdf] ${job.route} responded ${res ? res.status() : 'nothing'} — aborting ${job.out}`);
			}
			// Use the site's print stylesheet, not the screen one.
			await page.emulateMedia({ media: 'print' });
			await page.pdf({
				path: out,
				format: 'Letter',
				printBackground: true,
				// Margins live in the site's `@page` rule; keep Chromium's at 0.
				margin: { top: '0', right: '0', bottom: '0', left: '0' }
			});
			await page.close();
			console.log(`[pdf] wrote ${out}`);
		}
	} finally {
		await browser.close();
		server.close();
	}
}

main().catch((err) => {
	console.error('[pdf] failed:', err);
	process.exit(1);
});
