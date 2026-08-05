export const processStages = [
	{
		number: '01',
		title: 'Understand',
		happens: 'I learn the business problem, the people affected, and what is already being tried.',
		receive: 'Problem brief and open-question list',
		decision: 'Whether custom work is the right answer'
	},
	{
		number: '02',
		title: 'Define',
		happens: 'We choose the first release, its boundaries, and how success will be recognized.',
		receive: 'Scope, requirements, and milestone plan',
		decision: 'What belongs now, later, or not at all'
	},
	{
		number: '03',
		title: 'Design',
		happens:
			'I map the workflow and design the interface around the decisions users actually make.',
		receive: 'Flows, visual direction, and working UI previews',
		decision: 'How the product should behave before deep implementation'
	},
	{
		number: '04',
		title: 'Build',
		happens:
			'I implement the product in focused slices so the important path becomes testable early.',
		receive: 'Regular working builds and progress notes',
		decision: 'Which technical approach best fits the proven workflow'
	},
	{
		number: '05',
		title: 'Review',
		happens:
			'You use the current build. I compare feedback against the agreed purpose and constraints.',
		receive: 'Review build and decision log',
		decision: 'What needs correction before more scope is added'
	},
	{
		number: '06',
		title: 'Test',
		happens:
			'I test the main path, edge cases, permissions, accessibility, and likely failure states.',
		receive: 'Test results and resolved issue list',
		decision: 'Whether the release is reliable enough to ship'
	},
	{
		number: '07',
		title: 'Deploy',
		happens:
			'I configure the production environment, release path, monitoring boundaries, and rollback plan.',
		receive: 'Live product, source, and deployment documentation',
		decision: 'When traffic or users can move to the new release'
	},
	{
		number: '08',
		title: 'Support',
		happens: 'I fix launch issues, document ownership, and plan the next iteration from real use.',
		receive: 'Handoff, maintenance notes, and next-step options',
		decision: 'What deserves ongoing investment after launch'
	}
] as const;
