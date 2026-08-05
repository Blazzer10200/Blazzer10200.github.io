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
		lead: 'I plan your website around what customers need to understand and the action you want them to take.',
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
			'This works well when your business needs a stronger online presence or a simpler path from visit to inquiry.',
		boundary:
			'I keep the first version focused on the customer journey. I add a full CMS only when regular content editing makes it useful.'
	},
	{
		id: 'software',
		number: '02',
		title: 'Custom Software',
		shortTitle: 'Business tools and product development',
		lead: 'I build software for repeated workflows, new product ideas, and jobs that have outgrown spreadsheets or disconnected tools.',
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
			'This works well when your process is specific to the business and off-the-shelf software keeps forcing compromises.',
		boundary:
			'I start with the core workflow. Accounts, billing, and complex administration come later when the product actually needs them.'
	},
	{
		id: 'ai',
		number: '03',
		title: 'AI Integrations',
		shortTitle: 'Carefully bounded AI features',
		lead: 'I add AI when it improves a specific task. Permissions, cost, evaluation, and human review are part of the design from the start.',
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
			'This works well when the task is clearly defined and your team can explain what a good result looks like.',
		boundary:
			'I do not add AI just for the label. If a simpler workflow is more reliable and easier to maintain, I will recommend it.'
	}
] as const;

export function getService(id: ServiceId) {
	return services.find((service) => service.id === id)!;
}
