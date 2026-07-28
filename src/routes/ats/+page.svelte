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
		<p class="role">Software Developer</p>
		<p class="contact-row">
			Little Rock / Pine Bluff, AR · Open to relocation or remote (US) · 870-267-3299 ·
			braison.swilling@outlook.com · github.com/Blazzer10200
		</p>
		<p class="portfolio-row">
			Full case studies, source code, and a short demo at blazzer10200.github.io
		</p>
	</header>

	<section>
		<h2>Professional Summary</h2>
		<p>
			Software developer who designs and ships production desktop and web applications end to end.
			Creator of Rift, an open-source Windows desktop app for AI-assisted coding built in Rust and
			TypeScript, currently {vFull} with {RIFT_TESTS} automated tests and a public auto-updating
			installer. Works AI-native: scopes the build, designs the guardrails the AI operates within,
			and reviews every change before it ships. All source is public and verifiable. Seeking a role
			in software engineering, developer tools, or AI-focused product.
		</p>
	</section>

	<section>
		<h2>Skills</h2>
		<p>
			<strong>AI-assisted development:</strong> Claude Code, AI coding agents, prompt engineering,
			agent tooling and guardrail design, spec-driven development, code review of AI-generated code
		</p>
		<p>
			<strong>Languages and frameworks:</strong> Rust, C#, TypeScript, JavaScript, Python, Lua, SQL,
			HTML, CSS, .NET 8, Tauri 2, SvelteKit, Svelte 5, Vite, FastAPI, Node.js, MySQL
		</p>
		<p>
			<strong>Tools and practices:</strong> Git, GitHub Actions, CI/CD, automated testing (vitest,
			cargo test, Playwright), REST APIs, application security, Windows and Linux administration
		</p>
	</section>

	<section>
		<h2>Projects</h2>

		<div class="job">
			<h3>Rift, desktop app for AI-assisted coding</h3>
			<p class="company">Open source (MIT) · Rust, Tauri 2, Svelte 5, TypeScript</p>
			<p class="dates">2025 to Present · github.com/Blazzer10200/rift-tauri</p>
			<ul>
				<li>
					Designed and directed the full build: workspace-scoped AI tooling, local git integration,
					a docked browser, live streaming interface, and on-device voice input.
				</li>
				<li>
					Ships as a public auto-updating Windows installer, currently {vFull}, backed by
					{RIFT_TESTS} automated tests. Each release is built and published by a single command
					through GitHub Actions.
				</li>
				<li>
					Threat-modeled and hardened the AI's access before release: confined file operations to
					the project folder behind two independent path checks, exposed five selectable permission
					modes with an approval prompt, and defaulted git access to read-only.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>EXFIL, Windows display and hardware utility</h3>
			<p class="company">Open source (MIT) · C# / .NET 8 / WPF (v1), Rust and Tauri 2 (v2)</p>
			<p class="dates">2025 to 2026 · github.com/Blazzer10200/exfil</p>
			<ul>
				<li>
					Built a Windows tray application that retunes display color per running application,
					including HDR, and reports live frame rate and hardware statistics.
				</li>
				<li>
					Shipped v1 in C# and .NET 8, then rewrote it in Rust and Tauri 2. Both versions are
					public and MIT-licensed, and the rewrite ships a signed installer with an update channel.
				</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Experience</h2>

		<div class="job">
			<h3>Independent Software Developer</h3>
			<p class="company">Self-employed</p>
			<p class="dates">2025 to Present</p>
			<ul>
				<li>
					Design, build, and ship desktop and full-stack applications end to end (see Projects
					above). Direct AI coding agents against a written spec, design the guardrails they
					operate within, and review every change before it ships.
				</li>
				<li>
					Built the first year of this work nights and weekends around a full-time factory job, and
					have worked on it full-time since January 2026.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Production / Assembly</h3>
			<p class="company">Strong Manufacturing</p>
			<p class="dates">July 2025 to January 2026</p>
			<ul>
				<li>
					Promoted from yard and facility work to the assembly line. Role ended in a company-wide
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
					Paper Mill) for two years with a clean safety record.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Game Server Operator (FiveM and RedM)</h3>
			<p class="company">Self-employed</p>
			<p class="dates">High school to early 2025</p>
			<ul>
				<li>
					Built and operated live multiplayer game servers for active player communities: server
					resource configuration, Lua scripting, MySQL database administration, and Windows and
					Linux system administration. First hands-on technical work, under live user load.
				</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<p>High school diploma, 2023.</p>
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
			font-size: 8.4pt;
			line-height: 1.24;
		}
		/* Decorative marker glyph lands in the PDF text layer as a stray character
		   before every bullet. Native disc keeps list semantics without the noise. */
		li::marker {
			content: '• ';
			color: inherit;
		}
		.back {
			display: none;
		}
		header {
			padding-bottom: 6pt;
		}
		h1 {
			font-size: 19pt;
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
			margin-top: 5pt;
		}
		h2 {
			font-size: 10.5pt;
			margin-top: 0;
			margin-bottom: 4pt;
		}
		/* The `//` mark is on-screen branding only. In the PDF it lands in the text
		   layer, so an ATS reads "// EXPERIENCE" and can't match the standard
		   section heading it's looking for. Strip it from print. */
		h2::before {
			content: none;
		}
		/* Collapse "Company" + "Dates" onto one line — standard resume layout, and
		   it reclaims a line per entry across six entries to hold one page. */
		.company,
		.dates {
			display: inline;
			font-size: 8.5pt;
		}
		.dates::before {
			/* NBSP — a plain leading space collapses at the inline boundary and the
			   PDF text layer renders "TypeScript· 2025". */
			content: '\00a0·\00a0';
		}
		.job {
			break-inside: avoid;
		}
		.job + .job {
			margin-top: 4pt;
		}
		li + li {
			margin-top: 2pt;
		}
	}
</style>
