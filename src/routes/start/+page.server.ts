import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { fail } from '@sveltejs/kit';
import { priorityOptions } from '$lib/content/project-fit';
import { createInquiryProvider } from '$lib/server/inquiry/provider';
import { verifyTurnstile } from '$lib/server/inquiry/turnstile';
import { validateInquiry } from '$lib/server/inquiry/validation';
import type { InquiryPrefill } from '$lib/types/inquiry';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

function allowedPriority(value: string | null): InquiryPrefill['projectGoal'] {
	return value && priorityOptions.some((option) => option.value === value)
		? (value as InquiryPrefill['projectGoal'])
		: '';
}

export const load: PageServerLoad = ({ url }) => ({
	turnstileSiteKey: publicEnv.PUBLIC_TURNSTILE_SITE_KEY ?? '',
	prefill: {
		projectType: url.searchParams.get('type') ?? '',
		stage: url.searchParams.get('stage') ?? '',
		projectGoal: allowedPriority(url.searchParams.get('goal'))
	}
});

export const actions: Actions = {
	default: async ({ request, getClientAddress }) => {
		const formData = await request.formData();
		const { values, errors, honeypot, turnstileToken } = validateInquiry(formData);

		if (honeypot)
			return fail(400, {
				failure: true,
				errors: { form: 'The request could not be accepted.' },
				values
			});
		if (Object.keys(errors).length) return fail(400, { failure: true, errors, values });

		let remoteIp: string | undefined;
		try {
			remoteIp = getClientAddress();
		} catch {
			remoteIp = undefined;
		}

		const turnstile = await verifyTurnstile(turnstileToken, remoteIp, {
			secret: env.TURNSTILE_SECRET_KEY ?? '',
			expectedHostname: env.TURNSTILE_EXPECTED_HOSTNAME,
			development: dev
		});
		if (!turnstile.valid) {
			return fail(400, {
				failure: true,
				errors: { turnstile: 'Spam verification failed. Refresh the page and try again.' },
				values
			});
		}

		try {
			const provider = createInquiryProvider({
				provider: env.EMAIL_PROVIDER ?? 'resend',
				apiKey: env.EMAIL_PROVIDER_KEY ?? '',
				destination: env.DESTINATION_EMAIL ?? '',
				sender: env.SENDER_IDENTITY ?? '',
				development: dev
			});
			const result = await provider.deliver(values);
			console.info(`[inquiry] provider completed; delivered=${result.delivered}`);
			return { success: true, development: result.development };
		} catch (error) {
			const reason = error instanceof Error ? error.message : 'unknown provider failure';
			console.error(`[inquiry] delivery failed: ${reason}`);
			return fail(502, { failure: true, values });
		}
	}
};
