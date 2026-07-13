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
		<p class="role">Systems and Desktop Developer</p>
		<p class="contact-row">
			Little Rock, AR or Remote (US) · braison.swilling@outlook.com · github.com/Blazzer10200 ·
			blazzer10200.github.io
		</p>
	</header>

	<section>
		<h2>Professional Summary</h2>
		<p>
			Self-taught software developer specializing in systems and desktop applications, focused on
			shipping finished, dependable software rather than prototypes. Primary work is Rift, an
			open-source Windows desktop app for AI-assisted coding — {vFull}, {RIFT_TESTS} automated
			tests, and a public installer — designed and built end to end. Comfortable across the stack:
			Rust and C# on the desktop, TypeScript and SvelteKit on the web, Python for back-end services,
			and Linux for deployment. Seeking a junior to mid-level role in systems software, desktop
			applications, or AI tooling.
		</p>
	</section>

	<section>
		<h2>Skills</h2>
		<p><strong>Languages:</strong> Rust, C#, TypeScript, JavaScript, Python, Lua, SQL, HTML, CSS</p>
		<p>
			<strong>Frameworks and tools:</strong> .NET 8, Tauri 2, SvelteKit, Svelte 5, Vite, FastAPI,
			Node.js, MySQL, Git, GitHub Actions, Playwright
		</p>
		<p>
			<strong>Practices:</strong> Windows desktop applications, AI integration, REST APIs, CI/CD,
			automated testing, application security, Windows administration, Linux server administration
		</p>
	</section>

	<section>
		<h2>Experience</h2>

		<div class="job">
			<h3>Independent Software Developer — Self-directed</h3>
			<p class="dates">2025 – Present</p>
			<ul>
				<li>
					Designed and built Rift, an open-source (MIT) desktop app for AI-assisted coding, in Rust,
					Tauri 2, Svelte 5, and TypeScript — architected and implemented solo, end to end.
				</li>
				<li>
					Engineered the assistant to read the project and propose changes while keeping the
					developer in control: every file edit and command requires explicit approval before it runs.
				</li>
				<li>
					Backed the app with {RIFT_TESTS} automated tests and shipped it as an auto-updating public
					Windows installer, with full releases automated to a single command through GitHub Actions.
				</li>
				<li>
					Threat-modeled and sandboxed the assistant's access before release: confined it to the
					project directory behind two independent permission checks, then probed it for weaknesses first.
				</li>
				<li>
					Earlier, developed EXFIL, a Windows system-tray app in C# and .NET 8 that retunes
					per-application display color (including HDR) and overlays live frame rate, hardware load, and
					temperatures while gaming. Handled real-world edge cases: monitors disconnected mid-session,
					settings that persist across updates, and crash recovery.
				</li>
				<li>
					Work across the full stack — SvelteKit and TypeScript on the front end; Python, FastAPI, and
					Rust on the back end; Linux for hosting. Built and continuously deploy the portfolio site this
					resume comes from through GitHub Actions.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Production / Assembly — Strong Manufacturing</h3>
			<p class="dates">July 2025 – January 2026</p>
			<ul>
				<li>
					Promoted from yard and facility work to the assembly line within a few months. Role ended
					in a company-wide workforce reduction in January 2026.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Heavy Equipment Operator, Landfill Operations — S&amp;L Contracting LLC</h3>
			<p class="dates">2023 – March 2025</p>
			<ul>
				<li>
					Operated heavy equipment and ran landfill operations on a live industrial site at a working
					paper mill (Twin Rivers Paper, now American Kraft) for roughly two years, maintaining a clean
					safety record until the contract ended in March 2025.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Game Server Operator (FiveM and RedM) — Self-employed</h3>
			<p class="dates">High school – early 2025</p>
			<ul>
				<li>
					Built and operated live multiplayer game servers for active player communities — Lua
					scripting, a MySQL database, and both Windows and Linux administration. This was the first
					hands-on software work: diagnosed and shipped fixes quickly under real user load, then wound
					the operation down in 2025 to develop software full-time.
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
			font-size: 10pt;
			line-height: 1.42;
		}
		.back {
			display: none;
		}
		header {
			padding-bottom: 9pt;
		}
		h1 {
			font-size: 21pt;
		}
		.contact-row {
			font-size: 8.5pt;
			margin-top: 5pt;
		}
		section {
			margin-top: 13pt;
		}
		h2 {
			font-size: 11pt;
			margin-top: 0;
			margin-bottom: 8pt;
		}
		.dates {
			font-size: 8.5pt;
		}
		.job {
			break-inside: avoid;
		}
		.job + .job {
			margin-top: 12pt;
		}
	}
</style>
