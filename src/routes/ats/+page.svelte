<script lang="ts">
	import { riftVersionStrings, RIFT_TESTS } from '$lib/rift-facts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	// svelte-ignore state_referenced_locally -- fully prerendered, data never changes
	const { vFull } = riftVersionStrings(data.riftVersion);
</script>

<svelte:head>
	<title>Braison Swilling · Resume (plain format)</title>
	<meta name="robots" content="noindex" />
	<meta
		name="description"
		content="Plain single-column resume formatted for applicant tracking systems."
	/>
</svelte:head>

<main class="ats" id="main-content" tabindex="-1">
	<p class="back"><a href="/">← Back to the full résumé</a></p>

	<header>
		<h1>Braison Swilling</h1>
		<p class="role">AI-Native Software Builder</p>
		<p class="contact-row">
			Little Rock, AR or Remote (US) · 870-267-3299 · braison.swilling@outlook.com ·
			github.com/Blazzer10200
		</p>
		<p class="portfolio-row">
			Full case studies, source code, and a short demo at blazzer10200.github.io
		</p>
	</header>

	<section>
		<h2>Professional Summary</h2>
		<p>
			Self-taught software builder who ships real software by directing AI. I decide what to build,
			set the limits, and review every change before it's kept. My main work is Rift, an
			open-source Windows desktop app for AI-assisted coding that I designed and directed end to
			end, now at {vFull} with {RIFT_TESTS} automated tests and a public installer. I work across
			the stack, from Rust and C# on the desktop to TypeScript and SvelteKit on the web, with Python
			back ends on Linux. Seeking a role in AI engineering, developer tools, or AI-focused product.
		</p>
	</section>

	<section>
		<h2>Skills</h2>
		<p>
			<strong>AI and workflow:</strong> Directing AI coding agents, prompt engineering, agent
			tooling and guardrail design, spec-driven development, reading and reviewing AI-written code
		</p>
		<p>
			<strong>Technologies I build with:</strong> Rust, C#, TypeScript, JavaScript, Python, Lua, SQL,
			HTML, CSS, .NET 8, Tauri 2, SvelteKit, Svelte 5, Vite, FastAPI, Node.js, MySQL, Git, GitHub
			Actions, Playwright
		</p>
		<p>
			<strong>Practices:</strong> AI integration, REST APIs, CI/CD, automated testing, application
			security, Windows and Linux administration
		</p>
	</section>

	<section>
		<h2>Experience</h2>

		<div class="job">
			<h3>Independent Software Developer</h3>
			<p class="company">Self-directed</p>
			<p class="dates">2025 to Present</p>
			<ul>
				<li>
					Designed and directed Rift end to end, an open-source (MIT) desktop app for AI-assisted
					coding in Rust, Tauri 2, Svelte 5, and TypeScript. I set the design and the AI's limits and
					reviewed every change, and I stay in control: every AI edit needs my approval before it runs.
					Full case study and demo at blazzer10200.github.io/rift.
				</li>
				<li>
					Shipped it as an auto-updating public Windows installer, now at {vFull}, backed by {RIFT_TESTS}
					automated tests, each release built and published by one command through GitHub Actions.
				</li>
				<li>
					Planned and tested its security before release: confined the AI to the project folder behind
					two independent permission checks, then tried to break it myself.
				</li>
				<li>
					Earlier, built EXFIL, a C# and .NET 8 Windows tray app for per-app display color (including
					HDR) and live frame rate and hardware stats while gaming.
				</li>
				<li>
					Build and deploy full-stack apps in SvelteKit, TypeScript, Python, FastAPI, and Rust,
					including this portfolio site.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Production / Assembly</h3>
			<p class="company">Strong Manufacturing</p>
			<p class="dates">July 2025 to January 2026</p>
			<ul>
				<li>
					Promoted from yard and facility work to the assembly line; role ended in a company-wide
					workforce reduction in January 2026.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Heavy Equipment Operator, Landfill Operations</h3>
			<p class="company">S&amp;L Contracting LLC</p>
			<p class="dates">2023 to March 2025</p>
			<ul>
				<li>
					Operated heavy equipment and ran landfill operations on a live industrial site (Twin Rivers
					Paper mill) for about two years, with a clean safety record.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Game Server Operator (FiveM and RedM)</h3>
			<p class="company">Self-employed</p>
			<p class="dates">High school to early 2025</p>
			<ul>
				<li>
					Built and ran live multiplayer game servers (FiveM and RedM) for active communities:
					resource configuration, Lua tweaks, a MySQL database, and Windows and Linux
					administration. My first hands-on tech work, under real user load.
				</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<p>High school diploma, 2023. Self-taught in software development.</p>
	</section>
</main>

<style>
	/* Branded-dev resume: single-column and parse-safe for ATS, but carrying the
	   site's DNA — Inter for readable body, JetBrains Mono for dates/labels, and
	   the accent blue on section rules. The `//` prefixes are CSS ::before marks
	   (decorative only — screeners read the DOM text, never the pseudo-content). */
	.ats {
		--mono: 'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
		max-width: 780px;
		margin: 0 auto;
		padding: 56px 24px 80px;
		font-family: 'Inter', system-ui, sans-serif;
		color: var(--text-2);
		font-size: 15px;
		line-height: 1.6;
	}
	.back {
		margin-bottom: 40px;
		font-family: var(--mono);
		font-size: 12.5px;
	}
	.back a {
		color: var(--dim);
	}
	.back a:hover {
		color: var(--accent);
	}

	header {
		border-bottom: 2px solid var(--accent);
		padding-bottom: 14px;
	}
	h1 {
		color: var(--text);
		font-size: 30px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
	.role {
		color: var(--text);
		font-weight: 500;
		margin-top: 2px;
	}
	.contact-row {
		color: var(--dim);
		font-family: var(--mono);
		font-size: 12.5px;
		margin-top: 8px;
	}
	.portfolio-row {
		color: var(--accent);
		font-family: var(--mono);
		font-size: 12.5px;
		margin-top: 5px;
	}

	section {
		margin-top: 26px;
	}
	h2 {
		display: flex;
		align-items: baseline;
		gap: 8px;
		color: var(--text);
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		border-bottom: 1px solid var(--line-2);
		padding-bottom: 6px;
		margin-bottom: 13px;
	}
	h2::before {
		content: '//';
		font-family: var(--mono);
		font-weight: 500;
		letter-spacing: 0;
		color: var(--accent);
	}

	h3 {
		color: var(--text);
		font-size: 15px;
		font-weight: 600;
	}
	.company {
		color: var(--text-2);
		font-weight: 500;
		margin-top: 1px;
	}
	.dates {
		color: var(--dim);
		font-family: var(--mono);
		font-size: 12.5px;
		margin: 2px 0 7px;
	}
	.job + .job {
		margin-top: 18px;
	}
	ul {
		padding-left: 20px;
	}
	/* Colour the native marker via ::marker — keeps every <li> in normal flow so
	   the PDF text stream stays in reading order (an absolutely/relatively
	   positioned bullet paints in a later pass and scrambles the ATS text layer). */
	li::marker {
		content: '▹  ';
		color: var(--accent);
		font-size: 0.85em;
	}
	li + li {
		margin-top: 6px;
	}
	section > p {
		margin-top: 4px;
	}
	strong {
		color: var(--text);
		font-family: var(--mono);
		font-size: 0.92em;
		font-weight: 600;
	}

	@media print {
		.ats {
			max-width: none;
			padding: 0;
			font-size: 8.9pt;
			line-height: 1.3;
		}
		.back {
			display: none;
		}
		header {
			padding-bottom: 7pt;
		}
		h1 {
			font-size: 21pt;
		}
		.contact-row {
			font-size: 8.5pt;
			margin-top: 5pt;
		}
		.portfolio-row {
			font-size: 8.5pt;
			margin-top: 3pt;
		}
		section {
			margin-top: 6pt;
		}
		h2 {
			font-size: 11pt;
			margin-top: 0;
			margin-bottom: 5pt;
		}
		.dates {
			font-size: 8.5pt;
		}
		.job {
			break-inside: avoid;
		}
		.job + .job {
			margin-top: 5pt;
		}
		li + li {
			margin-top: 2.5pt;
		}
	}
</style>
