import { env } from '$env/dynamic/private';
import { RIFT_VERSION_FALLBACK } from '$lib/rift-facts';
import type { LayoutServerLoad } from './$types';

// Surfaces in the GitHub Actions run UI as a warning annotation, not just a log line.
function warn(msg: string) {
	console.warn(`[rift-facts] ${msg}`);
	if (env.GITHUB_ACTIONS) console.log(`::warning::[rift-facts] ${msg}`);
}

async function fetchRiftVersion(fetchFn: typeof fetch): Promise<string> {
	try {
		const res = await fetchFn(
			'https://api.github.com/repos/Blazzer10200/rift-tauri/releases/latest',
			{
				headers: {
					accept: 'application/vnd.github+json',
					...(env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {})
				}
			}
		);
		if (res.ok) {
			const tag: unknown = (await res.json()).tag_name;
			// Rift releases are always plain vX.Y.Z (tag-driven CI) — anything else is unexpected.
			const m = typeof tag === 'string' ? /^v(\d+\.\d+\.\d+)$/.exec(tag) : null;
			if (m) return m[1];
			warn(`unexpected tag ${JSON.stringify(tag)} — falling back to v${RIFT_VERSION_FALLBACK}`);
		} else {
			warn(`GitHub API returned ${res.status} — falling back to v${RIFT_VERSION_FALLBACK}`);
		}
	} catch (err) {
		warn(`GitHub API unreachable — falling back to v${RIFT_VERSION_FALLBACK} (${err})`);
	}
	return RIFT_VERSION_FALLBACK;
}

// Memoized: the prerender crawl runs this load once per page, but the version
// can't change mid-build — fetch once, share the promise.
let cached: Promise<string> | undefined;

// Runs at build time (full prerender) — the fetched version is baked into the static HTML.
export const load: LayoutServerLoad = async ({ fetch }) => {
	cached ??= fetchRiftVersion(fetch);
	return { riftVersion: await cached };
};
