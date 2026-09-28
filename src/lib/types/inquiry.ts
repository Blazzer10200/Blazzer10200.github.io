import type { PriorityOption } from '$lib/content/project-fit';

export type InquiryValues = {
	name: string;
	email: string;
	businessName: string;
	websiteUrl: string;
	projectType: string;
	stage: string;
	projectGoal: PriorityOption | '';
	description: string;
	desiredFeatures: string;
	deadline: string;
	budget: string;
	referral: string;
	referenceLinks: string;
	consent: boolean;
};

export type InquiryField = keyof InquiryValues | 'turnstile' | 'form';
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export type InquiryActionData = {
	success?: boolean;
	development?: boolean;
	failure?: boolean;
	errors?: InquiryErrors;
	values?: InquiryValues;
};

export type InquiryPrefill = {
	projectType: string;
	stage: string;
	projectGoal: PriorityOption | '';
};
