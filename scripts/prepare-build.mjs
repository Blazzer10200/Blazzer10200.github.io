// On Windows, Wrangler's platform proxy locks an existing assets directory during
// prerendering. Remove only generated Cloudflare output before that proxy starts.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

if (process.platform === 'win32' && process.env.DEPLOY_TARGET !== 'github-pages') {
	const script = fileURLToPath(new URL('./prepare-cloudflare.ps1', import.meta.url));
	const result = spawnSync('powershell.exe', ['-NoProfile', '-File', script], {
		stdio: 'inherit',
		windowsHide: true
	});
	if (result.error) throw result.error;
	if (result.status !== 0) process.exit(result.status ?? 1);
}
