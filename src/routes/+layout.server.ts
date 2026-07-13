import { env } from '$env/dynamic/private';
import { RIFT_VERSION_FALLBACK } from '$lib/rift-facts';
import type { LayoutServerLoad } from './$types';

// Runs once at build time (full prerender) — the fetched version is baked into the static HTML.
export const load: LayoutServerLoad = async ({ fetch }) => {
	let riftVersion = RIFT_VERSION_FALLBACK;
	try {
		const res = await fetch('https://api.github.com/repos/Blazzer10200/rift-tauri/releases/latest', {
			headers: {
				accept: 'application/vnd.github+json',
				...(env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
			}
		});
		if (res.ok) {
			const tag: unknown = (await res.json()).tag_name;
			const m = typeof tag === 'string' ? /^v(\d+\.\d+\.\d+)$/.exec(tag) : null;
			if (m) riftVersion = m[1];
			else console.warn(`[rift-facts] unexpected tag ${JSON.stringify(tag)} — falling back to v${RIFT_VERSION_FALLBACK}`);
		} else {
			console.warn(`[rift-facts] GitHub API returned ${res.status} — falling back to v${RIFT_VERSION_FALLBACK}`);
		}
	} catch (err) {
		console.warn(`[rift-facts] GitHub API unreachable — falling back to v${RIFT_VERSION_FALLBACK}`, err);
	}
	return { riftVersion };
};
