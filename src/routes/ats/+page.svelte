<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	// svelte-ignore state_referenced_locally -- fully prerendered, data never changes
	const vFull = `v${data.riftVersion}`;
</script>

<svelte:head>
	<title>Braison Swilling · Resume (plain format)</title>
	<meta name="robots" content="noindex" />
	<meta
		name="description"
		content="Plain single-column resume formatted for applicant tracking systems."
	/>
</svelte:head>

<main class="ats">
	<p class="back"><a href="/">← Back to the full résumé</a></p>

	<header>
		<h1>Braison Swilling</h1>
		<p class="role">Systems and Desktop Developer</p>
		<p class="contact">
			Little Rock, AR or Remote (US) · braison.swilling@outlook.com · github.com/Blazzer10200 ·
			blazzer10200.github.io
		</p>
	</header>

	<section>
		<h2>Professional Summary</h2>
		<p>
			Self-taught systems and desktop developer who ships working software. Designed and built Rift,
			an open-source Windows desktop application for coding with AI ({vFull}, 746 automated tests,
			public installer), solo. Comfortable across the stack: Rust and C# desktop applications,
			TypeScript and SvelteKit frontends, Python backends, and Linux deployment. Looking for a
			junior to mid-level role building systems, desktop software, or AI tooling.
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
					Designed and built Rift, an open-source desktop app for coding with AI (Rust, Tauri 2,
					Svelte 5, TypeScript). The AI reads code, proposes changes for approval, and runs git;
					the app includes a built-in browser, voice input, and cost tracking. 746 automated tests
					(Rust and vitest), a self-updating public Windows installer, and a one-command release
					pipeline through GitHub Actions. MIT licensed, source public on GitHub.
				</li>
				<li>
					Security-focused design: the AI's file and git access is sandboxed to the project folder,
					with two independent permission checks before any command runs. Threat-modeled and locked
					down before the first public release.
				</li>
				<li>
					Built EXFIL, a Windows system-tray application in C# and .NET 8: per-application display
					color profiles through direct graphics-driver integration, plus an on-screen overlay
					showing frame rate, hardware load, and temperatures. Handles HDR displays, monitor
					hot-plugging, versioned settings migration, and crash recovery.
				</li>
				<li>
					Full-stack work: SvelteKit and TypeScript frontends, Python, FastAPI, and Rust services,
					Linux VPS deployment. Built and shipped this portfolio site with an automated CI/CD
					pipeline to GitHub Pages.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Production / Assembly — Strong Manufacturing</h3>
			<p class="dates">July 2025 – January 2026</p>
			<ul>
				<li>
					Started in yard work and facility cleaning, promoted to the assembly line within a few
					months. Role ended in company-wide cuts in January 2026.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Heavy Equipment Operator, Landfill Operations — S&amp;L Contracting LLC</h3>
			<p class="dates">2023 – March 2025</p>
			<ul>
				<li>
					Ran heavy equipment and handled landfill operations on site at a working paper mill
					(Twin Rivers Paper, now American Kraft) safely for about two years, until the contract
					ended.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Game Server Operator (FiveM and RedM) — Self-employed</h3>
			<p class="dates">High school – early 2025</p>
			<ul>
				<li>
					Built and operated live multiplayer game servers for real player communities: Lua
					scripting, MySQL database administration, and Windows and Linux server administration.
					Wound down in 2025 to build software full-time.
				</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<p>High school diploma, 2023. Self-taught in software development since high school.</p>
	</section>
</main>

<style>
	.ats {
		max-width: 760px;
		margin: 0 auto;
		padding: 56px 24px 80px;
		font-family: 'Inter', system-ui, sans-serif;
		color: var(--text-2);
		font-size: 15px;
		line-height: 1.6;
	}
	.back {
		margin-bottom: 40px;
		font-size: 13px;
	}
	.back a {
		color: var(--dim);
	}
	.back a:hover {
		color: var(--text);
	}
	h1 {
		color: var(--text);
		font-size: 28px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.role {
		color: var(--text);
		margin-top: 2px;
	}
	.contact {
		color: var(--dim);
		font-size: 13.5px;
		margin-top: 6px;
	}
	section {
		margin-top: 28px;
	}
	h2 {
		color: var(--text);
		font-size: 15px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border-bottom: 1px solid var(--line);
		padding-bottom: 6px;
		margin-bottom: 12px;
	}
	h3 {
		color: var(--text);
		font-size: 15px;
		font-weight: 600;
	}
	.dates {
		color: var(--dim);
		font-size: 13.5px;
		margin: 1px 0 6px;
	}
	.job + .job {
		margin-top: 18px;
	}
	ul {
		padding-left: 20px;
	}
	li + li {
		margin-top: 6px;
	}
	strong {
		color: var(--text);
		font-weight: 600;
	}

	@media print {
		.ats {
			max-width: none;
			padding: 0;
			font-size: 10pt;
			line-height: 1.45;
		}
		.back {
			display: none;
		}
		h1 {
			font-size: 20pt;
		}
		h2 {
			font-size: 11pt;
			margin-top: 0;
		}
		section {
			margin-top: 14pt;
		}
		.job {
			break-inside: avoid;
		}
	}
</style>
