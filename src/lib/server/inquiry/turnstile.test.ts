import { afterEach, describe, expect, it, vi } from 'vitest';
import { verifyTurnstile } from './turnstile';

afterEach(() => vi.unstubAllGlobals());

describe('verifyTurnstile', () => {
	it('skips verification only for an unconfigured local preview', async () => {
		await expect(
			verifyTurnstile('', undefined, { secret: '', development: true })
		).resolves.toEqual({ valid: true, skipped: true });
	});

	it('rejects a token issued for another hostname', async () => {
		vi.stubGlobal(
			'fetch',
			vi
				.fn()
				.mockResolvedValue(
					Response.json({ success: true, hostname: 'wrong.example', action: 'project-inquiry' })
				)
		);
		const result = await verifyTurnstile('token', undefined, {
			secret: 'secret',
			expectedHostname: 'site.example',
			development: false
		});
		expect(result.valid).toBe(false);
	});

	it('accepts a matching hostname and action', async () => {
		vi.stubGlobal(
			'fetch',
			vi
				.fn()
				.mockResolvedValue(
					Response.json({ success: true, hostname: 'site.example', action: 'project-inquiry' })
				)
		);
		const result = await verifyTurnstile('token', '127.0.0.1', {
			secret: 'secret',
			expectedHostname: 'site.example',
			development: false
		});
		expect(result.valid).toBe(true);
	});

	it('fails closed when verification times out', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(
				(_url, init: RequestInit) =>
					new Promise((_resolve, reject) => {
						init.signal?.addEventListener('abort', () => reject(init.signal?.reason));
					})
			)
		);
		const result = await verifyTurnstile('token', undefined, {
			secret: 'secret',
			development: false,
			timeoutMs: 5
		});
		expect(result.valid).toBe(false);
	});
});
