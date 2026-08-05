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
		value: 'Product planning through deployment'
	},
	{
		label: 'Built to hold up',
		value: 'Tests, review, security boundaries, docs'
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
		body: 'A rough idea, an uncertain MVP, or a process that should become software—turned into a plan people can use and test.',
		need: 'A path from uncertainty to a working product without pretending the scope is obvious on day one.'
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
		title: 'One person owns the whole product',
		body: 'I connect requirements, interface decisions, the underlying system, testing, and deployment instead of handing the gaps to someone else.'
	},
	{
		title: 'Unclear ideas become concrete decisions',
		body: 'I turn notes and rough problems into a scoped first release, working previews, and a record of what was decided and why.'
	},
	{
		title: 'AI-assisted work still gets reviewed',
		body: 'I set the constraints, inspect the changes, test behavior, reject weak output, and remain responsible for what ships.'
	},
	{
		title: 'Reliability is not just a software word',
		body: 'Industrial and equipment-operation work taught me to respect safety, repeatable processes, and finishing a job correctly.'
	}
] as const;
