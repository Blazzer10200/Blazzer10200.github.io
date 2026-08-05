import { buildOptions, stageOptions } from './project-fit';

export const inquiryProjectTypes = buildOptions;
export const inquiryStages = stageOptions;

export const deadlineOptions = [
	{ value: 'as-soon-as-practical', label: 'As soon as practical' },
	{ value: 'one-to-three-months', label: '1–3 months' },
	{ value: 'three-to-six-months', label: '3–6 months' },
	{ value: 'flexible', label: 'Flexible' },
	{ value: 'not-sure', label: 'Not sure yet' }
] as const;

export const budgetOptions = [
	{ value: 'under-1000', label: 'Under $1,000' },
	{ value: '1000-2500', label: '$1,000–$2,500' },
	{ value: '2500-5000', label: '$2,500–$5,000' },
	{ value: '5000-10000', label: '$5,000–$10,000' },
	{ value: '10000-plus', label: '$10,000+' },
	{ value: 'not-sure', label: 'Not sure yet' }
] as const;

export const referralOptions = [
	{ value: 'github', label: 'GitHub' },
	{ value: 'search', label: 'Search engine' },
	{ value: 'social', label: 'Social media or Discord' },
	{ value: 'referral', label: 'Referral' },
	{ value: 'other', label: 'Other' },
	{ value: 'prefer-not-to-say', label: 'Prefer not to say' }
] as const;
