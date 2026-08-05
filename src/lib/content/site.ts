export const siteUrl = (
	import.meta.env.PUBLIC_SITE_URL || 'https://blazzer10200.github.io'
).replace(/\/$/, '');

export const site = {
	name: 'Braison Swilling',
	role: 'Product developer',
	email: 'braison.swilling@outlook.com',
	phoneDisplay: '870-267-3299',
	phoneHref: 'tel:+18702673299',
	github: 'https://github.com/Blazzer10200',
	location: 'Central Arkansas · available remotely across the US'
} as const;

export const navigation = [
	{ href: '/services', label: 'Services', primary: false },
	{ href: '/work', label: 'Work', primary: false },
	{ href: '/about', label: 'About', primary: false },
	{ href: '/start', label: 'Start a Project', primary: true }
] as const;

export const proofItems = [
	{
		label: 'Publicly shipped',
		value: 'Windows applications with real releases'
	},
	{
		label: 'Open for inspection',
		value: 'MIT-licensed source repositories'
	},
	{
		label: 'End-to-end scope',
		value: 'Planning, design, development, and launch'
	},
	{
		label: 'Careful delivery',
		value: 'Testing, review, security, and documentation'
	}
] as const;

export const audiences = [
	{
		title: 'Small and local businesses',
		body: 'Professional websites, better inquiry flows, customer portals, and practical tools that replace scattered manual work.',
		need: 'Clear communication, reliable delivery, and a result that helps the business run better.'
	},
	{
		title: 'Founders and product owners',
		body: 'I can help shape a rough idea, an early MVP, or a process that needs to become software.',
		need: 'A practical first version with clear priorities and room to improve after real use.'
	},
	{
		title: 'Gaming communities',
		body: 'Community sites, application systems, dashboards, launchers, Discord-connected tools, and Windows utilities.',
		need: 'Someone who understands the environment but builds for maintainability beyond a single server.'
	},
	{
		title: 'Technical teams',
		body: 'A product-minded collaborator who can show architecture, code, testing, security decisions, and release discipline.',
		need: 'Evidence that the interface and the underlying system were considered together.'
	}
] as const;

export const capabilityGroups = [
	{
		label: 'Products and interfaces',
		items: [
			'Responsive websites',
			'SvelteKit applications',
			'Desktop software',
			'Dashboards',
			'Portals'
		]
	},
	{
		label: 'Systems and data',
		items: ['Rust', 'TypeScript', 'Python', 'FastAPI', 'Databases', 'Windows APIs']
	},
	{
		label: 'AI and automation',
		items: [
			'AI assistants',
			'Agent workflows',
			'Tool integrations',
			'Local AI',
			'Evaluation workflows'
		]
	},
	{
		label: 'Delivery and reliability',
		items: ['Git', 'Automated tests', 'Security review', 'Deployment', 'Documentation']
	}
] as const;

export const whyWorkWithMe = [
	{
		title: 'You work directly with me',
		body: 'I stay involved from the first planning conversation through design, development, testing, and launch.'
	},
	{
		title: 'Rough ideas get a clear first step',
		body: 'I help organize the problem, decide what belongs in the first release, and turn that plan into something you can review and use.'
	},
	{
		title: 'AI-assisted work still gets reviewed',
		body: 'I set the constraints, inspect the changes, test behavior, reject weak output, and remain responsible for what ships.'
	},
	{
		title: 'I take reliability seriously',
		body: 'My industrial and equipment background taught me the value of careful work, clear communication, and following through.'
	}
] as const;
