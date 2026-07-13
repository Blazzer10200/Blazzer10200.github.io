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

<main class="ats">
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
			I taught myself to code, and I ship working software. My main work is Rift, an open-source
			Windows desktop app for coding with AI — {vFull}, {RIFT_TESTS} automated tests, a public
			installer, and I built all of it myself. I work across the stack: Rust and C# on the desktop,
			TypeScript and SvelteKit on the web, Python behind the scenes, and Linux to put things
			online. I'm looking for a junior to mid-level role building systems, desktop software, or AI
			tools.
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
					I designed and built Rift, an open-source desktop app for coding with AI (Rust, Tauri 2,
					Svelte 5, TypeScript). The AI reads your code, proposes changes, and runs git — you
					approve everything before it lands. There's a browser built in, voice input, and a meter
					that shows what each turn costs. It has {RIFT_TESTS} automated tests, a public Windows
					installer that updates itself, and one command cuts a whole release through GitHub
					Actions. MIT licensed — anyone can read the code.
				</li>
				<li>
					Before Rift shipped, I locked down the AI's access myself. It can only touch the project
					folder, and two separate permission checks both have to agree before any command runs. I
					tried to break it before anyone else could.
				</li>
				<li>
					Before that I built EXFIL, a Windows tray app in C# and .NET 8. It retunes your screen's
					color for each app you open by talking straight to the graphics driver, and it shows your
					frame rate, hardware load, and temperatures in a game overlay. It handles HDR screens,
					monitors getting unplugged mid-session, settings that survive updates, and crash
					recovery.
				</li>
				<li>
					I also work full-stack: SvelteKit and TypeScript up front, Python, FastAPI, and Rust
					behind it, Linux for hosting. This resume comes off a site I built and deploy
					automatically through GitHub Actions.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Production / Assembly — Strong Manufacturing</h3>
			<p class="dates">July 2025 – January 2026</p>
			<ul>
				<li>
					I started in yard work and facility cleaning and got moved up to the assembly line
					within a few months. Company-wide cuts ended the role in January 2026.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Heavy Equipment Operator, Landfill Operations — S&amp;L Contracting LLC</h3>
			<p class="dates">2023 – March 2025</p>
			<ul>
				<li>
					I ran heavy equipment on a live industrial site at a working paper mill (Twin Rivers
					Paper, now American Kraft) for about two years. I showed up, did it right, and kept it
					safe until the contract ended in March 2025.
				</li>
			</ul>
		</div>

		<div class="job">
			<h3>Game Server Operator (FiveM and RedM) — Self-employed</h3>
			<p class="dates">High school – early 2025</p>
			<ul>
				<li>
					This is where I learned to code. I built and ran live multiplayer game servers for real
					player communities — Lua scripting, a MySQL database, and both Windows and Linux
					servers. People noticed the second anything broke, so I learned to ship fixes fast. I
					wound it down in 2025 to build software full-time.
				</li>
			</ul>
		</div>
	</section>

	<section>
		<h2>Education</h2>
		<p>High school diploma, 2023. Everything else I taught myself, and I'm still going.</p>
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
	.contact-row {
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
