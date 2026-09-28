type TurnstileResponse = {
	success: boolean;
	hostname?: string;
	action?: string;
	'error-codes'?: string[];
};

export type TurnstileConfig = {
	secret: string;
	expectedHostname?: string;
	development: boolean;
	timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 8_000;

export async function verifyTurnstile(
	token: string,
	remoteIp: string | undefined,
	config: TurnstileConfig
) {
	if (config.development && !config.secret) return { valid: true, skipped: true };
	if (!config.secret || !token) return { valid: false, skipped: false };

	const body = new FormData();
	body.set('secret', config.secret);
	body.set('response', token);
	body.set('idempotency_key', crypto.randomUUID());
	if (remoteIp) body.set('remoteip', remoteIp);

	try {
		const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			signal: AbortSignal.timeout(config.timeoutMs ?? DEFAULT_TIMEOUT_MS),
			body
		});
		if (!response.ok) return { valid: false, skipped: false };
		const result = (await response.json()) as TurnstileResponse;
		const hostnameMatches = !config.expectedHostname || result.hostname === config.expectedHostname;
		const actionMatches = !result.action || result.action === 'project-inquiry';
		return { valid: result.success && hostnameMatches && actionMatches, skipped: false };
	} catch {
		return { valid: false, skipped: false };
	}
}
