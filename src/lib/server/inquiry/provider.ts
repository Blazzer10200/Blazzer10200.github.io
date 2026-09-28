import {
	budgetOptions,
	deadlineOptions,
	inquiryProjectTypes,
	inquiryStages,
	referralOptions
} from '$lib/content/inquiry-options';
import { optionLabel, priorityOptions } from '$lib/content/project-fit';
import type { InquiryValues } from '$lib/types/inquiry';

export type DeliveryResult = {
	delivered: boolean;
	development: boolean;
};

export type InquiryDeliveryProvider = {
	deliver(values: InquiryValues): Promise<DeliveryResult>;
};

export type ProviderConfig = {
	provider: string;
	apiKey: string;
	destination: string;
	sender: string;
	development: boolean;
	timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 8_000;

function label(options: readonly { value: string; label: string }[], value: string) {
	return options.find((option) => option.value === value)?.label ?? (value || 'Not provided');
}

export function formatInquiryText(values: InquiryValues) {
	return [
		'New project inquiry',
		'',
		`Name: ${values.name}`,
		`Email: ${values.email}`,
		`Business or project: ${values.businessName || 'Not provided'}`,
		`Existing URL: ${values.websiteUrl || 'Not provided'}`,
		`Project type: ${label(inquiryProjectTypes, values.projectType)}`,
		`Current stage: ${label(inquiryStages, values.stage)}`,
		`Project Fit goal: ${values.projectGoal ? optionLabel(priorityOptions, values.projectGoal) : 'Not provided'}`,
		`Timeline: ${label(deadlineOptions, values.deadline)}`,
		`Budget range: ${label(budgetOptions, values.budget)}`,
		`Found via: ${label(referralOptions, values.referral)}`,
		'',
		'Project description',
		values.description,
		'',
		'Desired features',
		values.desiredFeatures || 'Not provided',
		'',
		'Reference links',
		values.referenceLinks || 'Not provided'
	].join('\n');
}

class DevelopmentProvider implements InquiryDeliveryProvider {
	async deliver() {
		return { delivered: false, development: true };
	}
}

class ResendProvider implements InquiryDeliveryProvider {
	constructor(private config: ProviderConfig) {}

	async deliver(values: InquiryValues) {
		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			signal: AbortSignal.timeout(this.config.timeoutMs ?? DEFAULT_TIMEOUT_MS),
			headers: {
				authorization: `Bearer ${this.config.apiKey}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				from: this.config.sender,
				to: [this.config.destination],
				reply_to: values.email,
				subject: `Project inquiry: ${label(inquiryProjectTypes, values.projectType)}`,
				text: formatInquiryText(values)
			})
		});

		if (!response.ok) throw new Error(`Email provider returned status ${response.status}`);
		return { delivered: true, development: false };
	}
}

export function createInquiryProvider(config: ProviderConfig): InquiryDeliveryProvider {
	const complete = Boolean(config.apiKey && config.destination && config.sender);
	if (config.development && !complete) return new DevelopmentProvider();
	if (!complete) throw new Error('Inquiry delivery is not configured');
	if (config.provider.toLowerCase() !== 'resend') throw new Error('Unsupported inquiry provider');
	return new ResendProvider(config);
}
