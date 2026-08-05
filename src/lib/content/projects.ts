export type ProjectLink = {
	label: string;
	href: string;
	kind: 'primary' | 'secondary';
};

export type ProjectMedia = {
	src: string;
	webp?: string;
	alt: string;
	width: number;
	height: number;
	caption: string;
};

export type CaseSection = {
	title: string;
	body: readonly string[];
	points?: readonly string[];
};

export type Project = {
	slug: 'rift' | 'exfil';
	name: string;
	eyebrow: string;
	summary: string;
	problem: string;
	built: string;
	status: string;
	period: string;
	technologies: readonly string[];
	capabilities: readonly string[];
	links: readonly ProjectLink[];
	hero: ProjectMedia;
	gallery: readonly ProjectMedia[];
	productView: readonly CaseSection[];
	engineeringView: readonly CaseSection[];
	demonstrates: readonly string[];
};

export const projects: readonly Project[] = [
	{
		slug: 'rift',
		name: 'Rift',
		eyebrow: 'AI-assisted desktop product',
		summary:
			'A native Windows application for coding with AI, designed to make project context, permissions, previews, git work, and review visible in one place.',
		problem:
			'Powerful AI coding workflows often live in terminal windows and scattered tools. Rift brings the work into a purpose-built desktop interface without hiding what the AI can touch or what it is doing.',
		built:
			'A Tauri 2 desktop application with a Svelte 5 interface and Rust backend, public Windows releases, self-updates, local project tools, multiple conversations, and an integrated browser.',
		status: 'Active, open source, and available as a public Windows release.',
		period: '2025–present',
		technologies: ['Rust', 'Tauri 2', 'Svelte 5', 'TypeScript', 'Windows', 'GitHub Actions'],
		capabilities: [
			'Multiple AI work sessions',
			'Project-scoped file and git tools',
			'Integrated browser previews',
			'On-device voice input',
			'Usage visibility and notifications',
			'Automated Windows releases and updates'
		],
		links: [
			{
				label: 'Download the current release',
				href: 'https://github.com/Blazzer10200/rift-tauri/releases/latest',
				kind: 'primary'
			},
			{
				label: 'Inspect the source',
				href: 'https://github.com/Blazzer10200/rift-tauri',
				kind: 'secondary'
			}
		],
		hero: {
			src: '/videos/rift-tour-poster.jpg',
			webp: '/videos/rift-tour-poster.webp',
			alt: 'Rift desktop application showing an AI coding conversation beside project tools',
			width: 1920,
			height: 1080,
			caption: 'The current Rift interface. A 48.5-second product tour is available below.'
		},
		gallery: [],
		productView: [
			{
				title: 'The experience',
				body: [
					'Rift keeps the conversation, project, previews, permissions, and delivery work in one desktop application. The user can follow what is happening, redirect the work, and keep several tasks separate.',
					'The product is built around review: project changes stay visible, usage is surfaced, and the interface gives long-running work a clear place to finish.'
				]
			},
			{
				title: 'Product decisions',
				body: [
					'Rift began with game-server file synchronization. When the AI workflow became the real product, that older feature set was removed instead of forcing two unrelated products to coexist.',
					'Public source and a downloadable installer turn the case study into something a visitor can inspect rather than a claim they have to trust.'
				]
			},
			{
				title: 'Who it helps',
				body: [
					'Developers who want a Windows-native workspace for AI-assisted coding and need more visible context than a terminal-only workflow provides.'
				]
			}
		],
		engineeringView: [
			{
				title: 'Architecture',
				body: [
					'Tauri 2 packages a Svelte 5 interface with a Rust backend. The backend owns local project access, assistant processes, updates, and native Windows behavior; the interface owns conversation state and product interaction.'
				]
			},
			{
				title: 'Security and permissions',
				body: [
					'File operations are confined to the selected project through independent path checks. Git access is a typed, limited operation set rather than an unrestricted command box, and the product exposes multiple permission modes including an approval-prompt mode.'
				]
			},
			{
				title: 'Testing and release reliability',
				body: [
					'The release workflow gates publishing on Rust tests, Svelte checks, and Vitest. Releases are packaged for Windows and published with an update path for installed copies.'
				]
			},
			{
				title: 'Difficult engineering work',
				body: [
					'The hardest work sits at system boundaries: keeping assistant processes alive without losing state, constraining local tools, coordinating app-driven previews and questions, and replacing an update design that could strand installed copies.'
				]
			}
		],
		demonstrates: [
			'Planning and reshaping a product when evidence changes',
			'Building across desktop UI, native systems, and release infrastructure',
			'Treating AI permissions and review as product decisions',
			'Shipping software that can be downloaded and independently inspected'
		]
	},
	{
		slug: 'exfil',
		name: 'EXFIL',
		eyebrow: 'Windows utility · rebuild story',
		summary:
			'A Windows tray application that applies display-color profiles per application and shows live system information while staying out of the way.',
		problem:
			'One display setting does not fit a desktop, a dark game, editing tools, and video. Manually changing driver settings every time interrupts the work and is easy to forget.',
		built:
			'An original C#/.NET 8/WPF version followed by a Rust and Tauri 2 rewrite with per-application profiles, a tray workflow, hardware telemetry, an on-screen display, public source, and releases.',
		status:
			'Both implementations are public MIT projects; the Rust rewrite is the current release line.',
		period: '2025–2026',
		technologies: ['C#', '.NET 8', 'WPF', 'Rust', 'Tauri 2', 'Svelte', 'Windows APIs'],
		capabilities: [
			'Per-application display profiles',
			'NVIDIA driver-level color control',
			'Foreground application detection',
			'Live hardware telemetry',
			'Configurable on-screen display',
			'Crash recovery and self-updates'
		],
		links: [
			{
				label: 'View the Rust rewrite',
				href: 'https://github.com/Blazzer10200/exfil',
				kind: 'primary'
			},
			{
				label: 'View the original C# version',
				href: 'https://github.com/Blazzer10200/exfil-v1',
				kind: 'secondary'
			}
		],
		hero: {
			src: '/screenshots/exfil-dashboard.png',
			webp: '/screenshots/exfil-dashboard.webp',
			alt: 'EXFIL dashboard with tray status, on-screen display preview, game library, and live system telemetry',
			width: 1847,
			height: 1177,
			caption: 'EXFIL v2 dashboard and live system view.'
		},
		gallery: [
			{
				src: '/screenshots/exfil-presets.png',
				webp: '/screenshots/exfil-presets.webp',
				alt: 'EXFIL preset editor with vibrance, gamma, brightness, and contrast controls',
				width: 1844,
				height: 1170,
				caption: 'Per-application color preset editor.'
			},
			{
				src: '/screenshots/exfil-osd.png',
				webp: '/screenshots/exfil-osd.webp',
				alt: 'EXFIL on-screen display designer with layout, content, and style controls',
				width: 1668,
				height: 1089,
				caption: 'On-screen display layout and styling.'
			},
			{
				src: '/screenshots/exfil-about.png',
				webp: '/screenshots/exfil-about.webp',
				alt: 'EXFIL about page with build information, driver status, and install notes',
				width: 1849,
				height: 1174,
				caption: 'Build and graphics-driver status in one view.'
			}
		],
		productView: [
			{
				title: 'The experience',
				body: [
					'People assign a color profile to an application once. EXFIL detects the foreground program, applies the matching profile, and returns to the default when needed.',
					'The tray workflow keeps routine control quiet while the full interface handles profiles, telemetry, and the optional on-screen display.'
				]
			},
			{
				title: 'Why it was rebuilt',
				body: [
					'The first C#/.NET 8/WPF version proved the product. The Rust/Tauri rewrite became a chance to redesign configuration migration, crash recovery, display edge cases, and release maintenance with the lessons from the first version.'
				]
			},
			{
				title: 'Who it helps',
				body: [
					'Windows users who want different display tuning for different applications without changing driver settings by hand each time.'
				]
			}
		],
		engineeringView: [
			{
				title: 'Architecture',
				body: [
					'The current version uses a Tauri desktop shell with Rust for native Windows and driver interaction and a Svelte interface for settings, profiles, and telemetry presentation.'
				]
			},
			{
				title: 'System integration',
				body: [
					'EXFIL reacts to foreground-application events, identifies the real process, communicates with the graphics driver without injecting into games, and restores safe defaults when an application is unknown or the utility exits.'
				]
			},
			{
				title: 'Reliability work',
				body: [
					'The rewrite addresses configuration evolution, monitor changes, HDR and scaling differences, crash recovery, and the release/update path—problems that only become clear when a utility leaves its developer’s machine.'
				]
			},
			{
				title: 'What the two versions show',
				body: [
					'Keeping both implementations public makes the learning visible: the original product proves the idea and the rewrite shows how architecture changes after real constraints are understood.'
				]
			}
		],
		demonstrates: [
			'Turning a personal workflow problem into shipped desktop software',
			'Working safely at Windows and graphics-driver boundaries',
			'Rebuilding a proven concept when the foundation needs to change',
			'Learning from the first release instead of hiding it'
		]
	}
] as const;

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
