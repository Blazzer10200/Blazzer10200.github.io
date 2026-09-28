import { afterEach, describe, expect, it, vi } from 'vitest';
import type { InquiryValues } from '$lib/types/inquiry';
import { createInquiryProvider } from './provider';

const values: InquiryValues = {
	name: 'Avery Client',
	email: 'avery@example.com',
	businessName: '',
	websiteUrl: '',
	projectType: 'business-website',
	stage: 'idea',
	projectGoal: '',
	description:
		'A clearer website is needed so customers can understand the service and make contact.',
	desiredFeatures: '',
	deadline: 'one-to-three-months',
	budget: '2500-5000',
	referral: '',
	referenceLinks: '',
	consent: true
};

const productionConfig = {
	provider: 'resend',
	apiKey: 'test-key',
	destination: 'projects@example.com',
	sender: 'Projects <sender@example.com>',
	development: false
};

afterEach(() => vi.unstubAllGlobals());

describe('createInquiryProvider', () => {
	it('uses a non-delivering provider for an unconfigured local preview', async () => {
		const provider = createInquiryProvider({
			provider: 'resend',
			apiKey: '',
			destination: '',
			sender: '',
			development: true
		});
		await expect(provider.deliver(values)).resolves.toEqual({
			delivered: false,
			development: true
		});
	});

	it('fails closed when production delivery is incomplete', () => {
		expect(() => createInquiryProvider({ ...productionConfig, apiKey: '' })).toThrow(
			'Inquiry delivery is not configured'
		);
	});

	it('reports a successful provider response', async () => {
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 202 })));
		const provider = createInquiryProvider(productionConfig);
		await expect(provider.deliver(values)).resolves.toEqual({
			delivered: true,
			development: false
		});
	});

	it('aborts a stalled provider request', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(
				(_url, init: RequestInit) =>
					new Promise((_resolve, reject) => {
						init.signal?.addEventListener('abort', () => reject(init.signal?.reason));
					})
			)
		);
		const provider = createInquiryProvider({ ...productionConfig, timeoutMs: 5 });
		await expect(provider.deliver(values)).rejects.toBeDefined();
	});
});
