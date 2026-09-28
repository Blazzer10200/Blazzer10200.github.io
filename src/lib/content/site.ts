export const siteUrl = (
	import.meta.env.PUBLIC_SITE_URL || 'https://blazzer10200.github.io'
).replace(/\/$/, '');

export const site = {
	name: 'Braison Swilling',
	role: 'Website and software developer',
	email: 'braison.swilling@outlook.com',
	github: 'https://github.com/Blazzer10200',
	location: 'Central Arkansas · available remotely across the US'
} as const;

export const navigation = [
	{ href: '/', label: 'Home', primary: false },
	{
		href: '/services',
		label: 'Services',
		primary: false,
		children: [
			{ href: '/services', label: 'Services overview', description: 'Compare every service' },
			{
				href: '/services#websites',
				label: 'Custom websites',
				description: 'Clear, responsive business sites'
			},
			{
				href: '/services#software',
				label: 'Windows tools',
				description: 'Utilities, scripts, and desktop software'
			},
			{
				href: '/services#ai',
				label: 'Integrations',
				description: 'Connected systems and careful automation'
			}
		]
	},
	{
		href: '/work',
		label: 'My Work',
		primary: false,
		children: [
			{ href: '/work', label: 'All case studies', description: 'See the complete project work' },
			{ href: '/work/rift', label: 'Rift', description: 'AI-assisted Windows development' },
			{ href: '/work/exfil', label: 'EXFIL', description: 'Windows display automation' }
		]
	},
	{ href: '/about', label: 'About Me', primary: false },
	{ href: '/start', label: 'Contact Me', primary: true }
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
