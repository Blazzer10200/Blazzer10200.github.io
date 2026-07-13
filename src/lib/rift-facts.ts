// Last-known-good Rift version — used when the GitHub API is unreachable at build time.
export const RIFT_VERSION_FALLBACK = '0.104.0';

// Manual stats — re-derive from the rift-tauri repo before changing
// (grep #[test]/#[tokio::test] + vitest it()/test() counts).
export const RIFT_TESTS = 746;
export const RIFT_TESTS_DETAIL = '176 Rust + 570 vitest';

// One place for version display formatting: vFull "v0.104.0", vShort "v0.104".
export function riftVersionStrings(riftVersion: string) {
	const vFull = `v${riftVersion}`;
	return { vFull, vShort: vFull.replace(/\.\d+$/, '') };
}
