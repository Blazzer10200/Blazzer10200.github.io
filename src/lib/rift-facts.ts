// Last-known-good Rift version — used when the GitHub API is unreachable at build time.
export const RIFT_VERSION_FALLBACK = '0.148.0';

// Manual stats — re-derive from the rift-tauri repo before changing
// (grep #[test]/#[tokio::test] + vitest it()/test() counts). Conservative floor:
// test.each expands to more cases at runtime, so the real suite runs higher.
export const RIFT_TESTS = 899;
export const RIFT_TESTS_DETAIL = '209 Rust + 690 vitest';

// One place for version display formatting: vFull "v0.146.0", vShort "v0.146".
export function riftVersionStrings(riftVersion: string) {
	const vFull = `v${riftVersion}`;
	return { vFull, vShort: vFull.replace(/\.\d+$/, '') };
}
