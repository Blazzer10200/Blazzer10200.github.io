import type { ServiceId } from './services';

export const buildOptions = [
	{ value: 'business-website', label: 'Business website' },
	{ value: 'website-redesign', label: 'Website redesign' },
	{ value: 'internal-tool', label: 'Internal tool' },
	{ value: 'dashboard-portal', label: 'Dashboard or portal' },
	{ value: 'desktop-application', label: 'Desktop application' },
	{ value: 'ai-feature', label: 'AI-powered feature' },
	{ value: 'prototype-mvp', label: 'Working prototype or MVP' },
	{ value: 'not-sure', label: 'Not sure yet' }
] as const;

export const stageOptions = [
	{ value: 'idea', label: 'Only an idea' },
	{ value: 'notes', label: 'Requirements or notes exist' },
	{ value: 'designs', label: 'Designs exist' },
	{ value: 'improvement', label: 'An existing product needs improvement' },
	{ value: 'partial-build', label: 'A partially working build exists' },
	{ value: 'live-support', label: 'A live product needs ongoing help' }
] as const;

export const priorityOptions = [
	{ value: 'get-online', label: 'Getting online' },
	{ value: 'customer-inquiries', label: 'Improving customer inquiries' },
	{ value: 'manual-workflow', label: 'Replacing a manual workflow' },
	{ value: 'management-system', label: 'Creating an internal management system' },
	{ value: 'testable-prototype', label: 'Building a testable prototype' },
	{ value: 'responsible-ai', label: 'Adding AI responsibly' },
	{ value: 'interface', label: 'Improving an existing interface' },
	{ value: 'reliability', label: 'Fixing performance or reliability' }
] as const;

export type BuildOption = (typeof buildOptions)[number]['value'];
export type StageOption = (typeof stageOptions)[number]['value'];
export type PriorityOption = (typeof priorityOptions)[number]['value'];

export type ProjectFitInput = {
	build: BuildOption;
	stage: StageOption;
	priority: PriorityOption;
};

export type ProjectFitRecommendation = {
	service: ServiceId;
	title: string;
	explanation: string;
	nextStep: string;
};

const serviceByBuild: Record<BuildOption, ServiceId> = {
	'business-website': 'websites',
	'website-redesign': 'websites',
	'internal-tool': 'software',
	'dashboard-portal': 'software',
	'desktop-application': 'software',
	'ai-feature': 'ai',
	'prototype-mvp': 'software',
	'not-sure': 'software'
};

const stageGuidance: Record<StageOption, string> = {
	idea: 'The first useful step is a discovery pass that turns the idea into a small, testable release.',
	notes: 'Your existing notes can become a requirements map, scope, and milestone plan.',
	designs: 'The designs can be checked against the real workflow before implementation begins.',
	improvement:
		'The current product should be audited before deciding what to keep, repair, or replace.',
	'partial-build': 'The build needs a technical and product audit so working parts are preserved.',
	'live-support': 'A stability and ownership review should come before new feature work.'
};

const titleByService: Record<ServiceId, string> = {
	websites: 'A focused website project is the best place to start.',
	software: 'A custom software project is the best place to start.',
	ai: 'An AI integration could fit once the task and review process are clear.'
};

export function recommendProjectFit(input: ProjectFitInput): ProjectFitRecommendation {
	let service = serviceByBuild[input.build];

	if (input.priority === 'responsible-ai') service = 'ai';
	if (input.priority === 'customer-inquiries' || input.priority === 'get-online') {
		if (input.build === 'not-sure') service = 'websites';
	}

	const priorityExplanation: Record<PriorityOption, string> = {
		'get-online':
			'The plan should prioritize a credible launch path and the content needed to support it.',
		'customer-inquiries':
			'The plan should begin with the customer journey and the information required to make a useful inquiry.',
		'manual-workflow': 'The current process needs to be mapped before software replaces it.',
		'management-system':
			'The first release should centralize the smallest complete management workflow.',
		'testable-prototype':
			'The scope should prove the riskiest assumption before polishing secondary features.',
		'responsible-ai':
			'The task, acceptable output, permissions, cost, privacy, and human review step all need explicit boundaries.',
		interface:
			'The current experience should be observed before visual changes are separated from workflow problems.',
		reliability: 'Measurement and reproduction come before promises about performance or stability.'
	};

	return {
		service,
		title: titleByService[service],
		explanation: `${stageGuidance[input.stage]} ${priorityExplanation[input.priority]}`,
		nextStep:
			'Tell me what exists today and what you want to improve. I will review it, confirm whether the project fits my work, and suggest a practical next step.'
	};
}

export function optionLabel<T extends readonly { value: string; label: string }[]>(
	options: T,
	value: T[number]['value']
) {
	return options.find((option) => option.value === value)?.label ?? value;
}
