export type ServiceId = 'websites' | 'software' | 'ai';

export type Service = {
	id: ServiceId;
	number: string;
	title: string;
	shortTitle: string;
	lead: string;
	outcomes: readonly string[];
	deliverables: readonly string[];
	goodFit: string;
	boundary: string;
};

export const services: readonly Service[] = [
	{
		id: 'websites',
		number: '01',
		title: 'Custom Websites',
		shortTitle: 'Website strategy and development',
		lead: 'A website planned around the action your customers should take, not a pile of sections assembled around a theme.',
		outcomes: [
			'Present the business clearly and professionally',
			'Make mobile visits easier to use',
			'Improve quote, booking, or application intake',
			'Give the owner a maintainable foundation'
		],
		deliverables: [
			'Business websites and landing pages',
			'Redesigns and responsive interface work',
			'Quote, booking, and application flows',
			'Accessibility, performance, and deployment work'
		],
		goodFit:
			'Best when the business needs a stronger public presence or a clearer path from visitor to inquiry.',
		boundary:
			'The first release stays focused on the customer journey. A full CMS is added only when the editing workflow truly needs one.'
	},
	{
		id: 'software',
		number: '02',
		title: 'Custom Software',
		shortTitle: 'Business tools and product development',
		lead: 'Purpose-built software for a repeated workflow, a new product idea, or a job that has outgrown spreadsheets and scattered tools.',
		outcomes: [
			'Replace a fragile manual process',
			'Centralize the information people need',
			'Create a testable first version of an idea',
			'Build a foundation that can grow deliberately'
		],
		deliverables: [
			'Web applications and internal tools',
			'Administrative dashboards and portals',
			'Database-backed business systems',
			'Windows desktop applications and MVPs'
		],
		goodFit:
			'Best when the problem is specific to the way the business operates and off-the-shelf software keeps forcing a compromise.',
		boundary:
			'The first release proves the core workflow. Accounts, billing, and complex administration are added only when they support that workflow.'
	},
	{
		id: 'ai',
		number: '03',
		title: 'AI Integrations',
		shortTitle: 'Carefully bounded AI features',
		lead: 'AI where it improves a real task—with explicit permissions, cost awareness, evaluation, and a person still responsible for the result.',
		outcomes: [
			'Reduce repetitive review or data-entry work',
			'Find useful information across documents',
			'Add an assistant to an existing product',
			'Test an AI workflow before committing to it'
		],
		deliverables: [
			'AI assistants and document workflows',
			'Agent and tool integrations',
			'Local AI and privacy-conscious prototypes',
			'Prompting, evaluation, and human-approval systems'
		],
		goodFit:
			'Best when a defined task benefits from language or reasoning and the business can explain what a good result looks like.',
		boundary:
			'AI is not the default answer. I will recommend a simpler deterministic workflow when it is more reliable or easier to maintain.'
	}
] as const;

export function getService(id: ServiceId) {
	return services.find((service) => service.id === id)!;
}
