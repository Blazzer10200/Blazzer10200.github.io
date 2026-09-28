export type ServiceId = 'websites' | 'software' | 'ai';

export type Service = {
	id: ServiceId;
	inquiryType: string;
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
		inquiryType: 'business-website',
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
		inquiryType: 'windows-tool-script',
		number: '02',
		title: 'Windows Tools & Custom Software',
		shortTitle: 'Windows utilities, scripts, and business tools',
		lead: 'I build focused Windows 10 and 11 tools, scripts, desktop applications, and custom software for work that has outgrown manual steps or disconnected programs.',
		outcomes: [
			'Replace a fragile manual process',
			'Centralize the information people need',
			'Automate a repeated Windows task',
			'Build a foundation that can grow deliberately'
		],
		deliverables: [
			'Windows utilities and workflow scripts',
			'Desktop applications and focused MVPs',
			'Web applications and internal tools',
			'Administrative dashboards and portals',
			'Database-backed business systems'
		],
		goodFit:
			'This works well when a repeated Windows task wastes time, a small utility could replace several steps, or off-the-shelf software keeps forcing compromises.',
		boundary:
			'I start with the core workflow. Accounts, billing, and complex administration come later when the product actually needs them.'
	},
	{
		id: 'ai',
		inquiryType: 'systems-integration',
		number: '03',
		title: 'Integrations & Automation',
		shortTitle: 'Connect services, data, workflows, and AI',
		lead: 'I connect websites, software, services, and data around a clear task. When AI is useful, permissions, cost, evaluation, and human review are part of the design.',
		outcomes: [
			'Remove repeated copying between systems',
			'Keep important information in sync',
			'Connect a website to the services behind it',
			'Add AI only where it improves a defined task'
		],
		deliverables: [
			'API and third-party service connections',
			'Business workflow and data automation',
			'Discord and tool integrations',
			'AI assistants and document workflows',
			'Local AI and privacy-conscious prototypes',
			'Evaluation and human-review systems'
		],
		goodFit:
			'This works well when people are moving information by hand, useful systems do not communicate, or a clearly defined task could benefit from careful automation.',
		boundary:
			'I do not automate a process until the inputs, expected result, failure cases, and person responsible for review are clear.'
	}
] as const;

export function getService(id: ServiceId) {
	return services.find((service) => service.id === id)!;
}
