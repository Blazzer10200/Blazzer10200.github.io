import {
	budgetOptions,
	deadlineOptions,
	inquiryProjectTypes,
	inquiryStages,
	referralOptions
} from '$lib/content/inquiry-options';
import { priorityOptions, type PriorityOption } from '$lib/content/project-fit';
import type { InquiryErrors, InquiryValues } from '$lib/types/inquiry';

export const FIELD_LIMITS = {
	name: 100,
	email: 254,
	businessName: 160,
	websiteUrl: 500,
	description: 2500,
	desiredFeatures: 1500,
	referenceLinks: 1500,
	honeypot: 200,
	turnstile: 2048
} as const;

function normalize(value: FormDataEntryValue | null) {
	if (typeof value !== 'string') return '';
	return value
		.replace(/\r\n?/g, '\n')
		.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
		.trim();
}

function allowed(options: readonly { value: string }[], value: string) {
	return options.some((option) => option.value === value);
}

function validHttpUrl(value: string) {
	try {
		const parsed = new URL(value);
		return parsed.protocol === 'http:' || parsed.protocol === 'https:';
	} catch {
		return false;
	}
}

function validateLength(
	errors: InquiryErrors,
	field: keyof InquiryValues,
	value: string,
	maximum: number,
	label: string
) {
	if (value.length > maximum) errors[field] = `${label} must be ${maximum} characters or fewer.`;
}

export function validateInquiry(formData: FormData) {
	const values: InquiryValues = {
		name: normalize(formData.get('name')),
		email: normalize(formData.get('email')).toLowerCase(),
		businessName: normalize(formData.get('businessName')),
		websiteUrl: normalize(formData.get('websiteUrl')),
		projectType: normalize(formData.get('projectType')),
		stage: normalize(formData.get('stage')),
		projectGoal: normalize(formData.get('projectGoal')) as PriorityOption | '',
		description: normalize(formData.get('description')),
		desiredFeatures: normalize(formData.get('desiredFeatures')),
		deadline: normalize(formData.get('deadline')),
		budget: normalize(formData.get('budget')),
		referral: normalize(formData.get('referral')),
		referenceLinks: normalize(formData.get('referenceLinks')),
		consent: normalize(formData.get('consent')) === 'yes'
	};
	const honeypot = normalize(formData.get('companyWebsite'));
	const turnstileToken = normalize(formData.get('cf-turnstile-response'));
	const errors: InquiryErrors = {};

	if (!values.name) errors.name = 'Enter your name.';
	validateLength(errors, 'name', values.name, FIELD_LIMITS.name, 'Name');

	if (!values.email) errors.email = 'Enter your email address.';
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		errors.email = 'Enter a valid email address.';
	validateLength(errors, 'email', values.email, FIELD_LIMITS.email, 'Email');

	validateLength(
		errors,
		'businessName',
		values.businessName,
		FIELD_LIMITS.businessName,
		'Business or project name'
	);
	validateLength(
		errors,
		'websiteUrl',
		values.websiteUrl,
		FIELD_LIMITS.websiteUrl,
		'Existing website URL'
	);
	if (values.websiteUrl && !validHttpUrl(values.websiteUrl))
		errors.websiteUrl = 'Use a complete http:// or https:// URL.';

	if (!allowed(inquiryProjectTypes, values.projectType))
		errors.projectType = 'Choose a project type.';
	if (!allowed(inquiryStages, values.stage)) errors.stage = 'Choose the current project stage.';
	if (values.projectGoal && !allowed(priorityOptions, values.projectGoal))
		errors.projectGoal = 'Choose a valid project goal.';

	if (values.description.length < 30)
		errors.description = 'Describe the project in at least 30 characters.';
	validateLength(
		errors,
		'description',
		values.description,
		FIELD_LIMITS.description,
		'Project description'
	);
	validateLength(
		errors,
		'desiredFeatures',
		values.desiredFeatures,
		FIELD_LIMITS.desiredFeatures,
		'Desired features'
	);

	if (!allowed(deadlineOptions, values.deadline)) errors.deadline = 'Choose a desired timeline.';
	if (!allowed(budgetOptions, values.budget)) errors.budget = 'Choose an approximate budget range.';
	if (values.referral && !allowed(referralOptions, values.referral))
		errors.referral = 'Choose a valid referral source.';

	validateLength(
		errors,
		'referenceLinks',
		values.referenceLinks,
		FIELD_LIMITS.referenceLinks,
		'Reference links'
	);
	if (values.referenceLinks) {
		const links = values.referenceLinks.split('\n').filter(Boolean);
		if (links.length > 3) errors.referenceLinks = 'Include no more than three reference links.';
		else if (links.some((link) => !validHttpUrl(link)))
			errors.referenceLinks =
				'Each reference must be a complete http:// or https:// URL on its own line.';
	}

	if (!values.consent)
		errors.consent = 'Confirm that I may use this information to respond to your inquiry.';
	if (honeypot.length > FIELD_LIMITS.honeypot) errors.form = 'The request could not be accepted.';
	if (turnstileToken.length > FIELD_LIMITS.turnstile)
		errors.turnstile = 'Spam verification was invalid. Refresh the page and try again.';

	return { values, errors, honeypot, turnstileToken };
}
