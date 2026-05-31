<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';
	import TerminalPanel from '$lib/components/TerminalPanel.svelte';
	import ExperienceItem from '$lib/components/ExperienceItem.svelte';

	const riftLog = [
		{ ts: '[boot ]', text: 'rift v0.4.44 · tauri 2 · russh' },
		{ ts: '[ssh  ]', text: 'connect endure-rp · key-auth ok', variant: 'ok' as const, dimTs: true },
		{ ts: '[watch]', text: 'fsw armed · 1,204 files mirrored' },
		{
			ts: '[sync ]',
			text: 'resources/core/main.lua → upload',
			variant: 'ok' as const,
			dimTs: true
		},
		{ ts: '[sync ]', text: 'atomic .rift-tmp → rename ok', variant: 'ok' as const, dimTs: true },
		{ ts: '[drift]', text: 'scan clean · 0 divergent', dimTs: true },
		{
			ts: '[ai   ]',
			text: 'assistant: git_status → 3 changed',
			variant: 'info' as const,
			dimTs: true
		},
		{
			ts: '[ai   ]',
			text: 'edit transfer.rs · awaiting review',
			variant: 'warn' as const,
			dimTs: true
		},
		{ ts: '[idle ]', text: 'watching · sentinel=green' }
	];
</script>

<svelte:head>
	<title>Braison Swilling — Systems &amp; Desktop Developer</title>
</svelte:head>

<TopBar />

<main class="page">
	<!-- Print-only header (resume PDF — name + contact at top) -->
	<header class="print-resume-header" aria-hidden="true">
		<div class="print-name">Braison Swilling</div>
		<div class="print-contact">
			Systems &amp; Desktop Developer · braison.swilling@outlook.com · github.com/Blazzer10200 · blazzer10200.github.io · United States · Remote
		</div>
	</header>

	<!-- Hero -->
	<section class="hero reveal">
		<div class="hero-eyebrow">
			<span>Systems &amp; desktop developer</span>
			<span class="pill">Open to work</span>
		</div>

		<h1>I design and ship <em>desktop software, end to end.</em></h1>

		<p class="hero-sub">
			Self-taught — I've been writing code since high school, from live game-server backends to
			finished desktop software. <strong>Rift</strong> — a Rust + Tauri desktop app with live
			server sync and a built-in AI assistant — is what I'm building now.
		</p>

		<div class="hero-actions stagger">
			<a class="btn primary" href="/rift">
				<span class="ico">→</span> Rift case study
			</a>
			<a class="btn" href="/exfil">
				<span class="ico">→</span> EXFIL case study
			</a>
			<a class="btn" href="#contact">
				<span class="ico">↓</span> Get in touch
			</a>
		</div>

		<div class="hero-meta stagger">
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Currently building</div>
				<div class="hero-meta-v accent">Rift v0.4.44</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Focus</div>
				<div class="hero-meta-v">Desktop apps &amp; tooling</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Core stack</div>
				<div class="hero-meta-v">Rust · TypeScript · C#</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Based</div>
				<div class="hero-meta-v">United States · Remote</div>
			</div>
		</div>
	</section>

	<!-- Featured -->
	<section class="featured reveal" id="featured">
		<SectionRail num="01 / 03" label="Featured project" meta="2026 — In active development" />

		<div class="featured-grid stagger">
			<div>
				<h2>Rift — a Rust desktop app I <em>design and ship.</em></h2>
				<p>
					A desktop cockpit for developers who run game servers. Rift keeps your local code and
					the live server in lockstep over SSH — watching, batching, and uploading
					<strong>atomically</strong> so the running server never reads a half-written file —
					and a three-way drift scanner flags divergence before you sync.
				</p>
				<p>
					It ships with an AI assistant that doesn't just chat: it drives a live
					<code>claude</code> session over a streaming protocol and exposes its own
					<code>git</code> tools through an MCP server. Pure-Rust SSH/SFTP, an NSIS installer,
					and a self-built auto-updater. ~56k lines, ~40 releases.
				</p>

				<div class="stack-row">
					<span class="chip">Rust</span>
					<span class="chip">Tauri 2</span>
					<span class="chip">Svelte 5</span>
					<span class="chip">russh (SSH/SFTP)</span>
					<span class="chip">MCP server</span>
					<span class="chip">Tokio</span>
					<span class="chip">NSIS</span>
				</div>

				<div class="featured-actions">
					<a class="link-quiet" href="/rift">Read the case study ↗</a>
				</div>
			</div>

			<TerminalPanel title="~/rift/logs/sync.log" lines={riftLog} />
		</div>

		<div class="screens stagger">
			<a class="screens-cta" href="/rift">
				<div class="screens-cta-body">
					<div class="screens-cta-eyebrow">— Case study</div>
					<div class="screens-cta-title">
						How I designed, hardened, and shipped Rift — <em>and a live AI assistant you can drive.</em>
					</div>
					<div class="screens-cta-stats">
						<span><strong>~56k</strong> lines</span>
						<span><strong>~40</strong> releases</span>
						<span><strong>154</strong> tests</span>
						<span><strong>6</strong> weeks</span>
					</div>
				</div>
				<span class="screens-cta-arrow" aria-hidden="true">→</span>
			</a>
		</div>
	</section>

	<!-- Experience -->
	<section class="experience reveal" id="experience">
		<SectionRail num="02 / 03" label="Experience" meta="Roles & education" />

		<div class="exp-wrap">
			<ExperienceItem
				years="2025 — Present"
				role="Independent software developer"
				org="Self-directed"
			>
				{#snippet summary()}
					<li>
						<strong>Building Rift</strong> — a Rust + Tauri desktop app with live SSH/SFTP
						server sync and an embedded, tool-using AI assistant. ~56k lines, ~40 releases.
						Designed and built end to end.
					</li>
					<li>
						<strong>Designed and shipped EXFIL</strong>, a Windows tray tool with per-app
						vibrance profiles and a live hardware-telemetry overlay. C# / .NET 8, NVAPI
						P/Invoke, Win32. Public on GitHub.
					</li>
					<li>
						Full-stack range — SvelteKit + TypeScript on the front, Python + FastAPI and Rust
						on the back, SSH / Linux for deploy.
					</li>
				{/snippet}
			</ExperienceItem>

			<ExperienceItem
				years="Jul 2025 — Jan 2026"
				role="Production / Assembly"
				org="Strong Manufacturing"
			>
				{#snippet summary()}
					<li>
						Started in yard work and facility cleaning, promoted to the assembly line within
						a few months.
					</li>
					<li>Laid off Jan 2026 (company-wide cuts).</li>
				{/snippet}
			</ExperienceItem>

			<ExperienceItem
				years="2023 — Mar 2025"
				role="Heavy equipment operator · Landfill operations"
				org="S&L Contracting LLC — Twin Rivers Paper Mill (now American Kraft)"
			>
				{#snippet summary()}
					<li>
						Operated heavy equipment and ran landfill ops on site at an active paper mill.
						Roughly two years of steady attendance and clean execution.
					</li>
					<li>Laid off March 2025 when the contract ended.</li>
				{/snippet}
				{#snippet more()}
					<li>
						Day-to-day responsibility for safe equipment operation in a live industrial site
						— not the kind of job you fake your way through.
					</li>
				{/snippet}
			</ExperienceItem>

			<ExperienceItem
				years="High school — 2025"
				role="FiveM & RedM server operator"
				org="Self-employed"
			>
				{#snippet summary()}
					<li>
						<strong>Where I started writing code.</strong> Built and ran live FiveM/RedM
						servers for real player communities — Lua scripting, MySQL, Windows + Linux admin,
						and shipping fixes to an audience that noticed when something broke.
					</li>
					<li>Wound down in early 2025 to focus on building software full-time.</li>
				{/snippet}
			</ExperienceItem>

			<ExperienceItem years="2023" role="High school diploma" org="Education">
				{#snippet summary()}
					<li>One intro programming class in 10th grade.</li>
				{/snippet}
			</ExperienceItem>
		</div>
	</section>

	<!-- Toolkit -->
	<section class="toolkit reveal" id="toolkit">
		<SectionRail num="03 / 03" label="Toolkit" meta="What I work with" />

		<div class="toolkit-grid stagger">
			<div class="tk">
				<div class="tk-head">Desktop &amp; systems</div>
				<ul>
					<li>Rust</li>
					<li>Tauri 2</li>
					<li>C# / .NET 8</li>
					<li>Win32 / NVAPI</li>
				</ul>
			</div>
			<div class="tk">
				<div class="tk-head">Web</div>
				<ul>
					<li>SvelteKit 5</li>
					<li>TypeScript</li>
					<li>Vite</li>
					<li>HTML / CSS</li>
				</ul>
			</div>
			<div class="tk">
				<div class="tk-head">Backend &amp; data</div>
				<ul>
					<li>Python</li>
					<li>FastAPI</li>
					<li>MySQL</li>
					<li>REST APIs</li>
				</ul>
			</div>
			<div class="tk">
				<div class="tk-head">Ops &amp; deploy</div>
				<ul>
					<li>Windows admin</li>
					<li>Linux VPS</li>
					<li>GitHub Actions</li>
					<li>Git &amp; GitHub</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Contact -->
	<section class="contact reveal" id="contact">
		<h3>If you're hiring, <em>I'd love to chat.</em></h3>

		<div class="contact-grid stagger">
			<a class="contact-cell" href="mailto:braison.swilling@outlook.com?subject=Hello%20Braison">
				<span class="contact-icon" aria-hidden="true">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="3" y="5" width="18" height="14" rx="1" />
						<path d="m3 7 9 6 9-6" />
					</svg>
				</span>
				<div class="contact-body">
					<div class="contact-k">Email</div>
					<div class="contact-v">braison.swilling@outlook.com</div>
				</div>
				<span class="contact-arrow">↗</span>
			</a>

			<a
				class="contact-cell"
				href="https://github.com/Blazzer10200"
				target="_blank"
				rel="noopener"
			>
				<span class="contact-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.52 9.52 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
						/>
					</svg>
				</span>
				<div class="contact-body">
					<div class="contact-k">GitHub</div>
					<div class="contact-v">github.com/Blazzer10200</div>
				</div>
				<span class="contact-arrow">↗</span>
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer">© 2026 Braison Swilling · Built by hand</footer>
</main>

<style>
	/* ── hero ── */
	.hero {
		padding: 96px 0 88px;
	}
	.hero-eyebrow {
		color: var(--dim);
		font-size: 12px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		margin-bottom: 28px;
		display: flex;
		gap: 14px;
		align-items: center;
		flex-wrap: wrap;
	}
	.hero-eyebrow .pill {
		color: var(--accent);
		border: 1px solid rgba(120, 196, 255, 0.35);
		padding: 4px 10px;
		background: var(--accent-soft);
		text-transform: none;
		letter-spacing: 0.04em;
	}
	.hero h1 {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: clamp(40px, 5.2vw, 72px);
		line-height: 1.04;
		letter-spacing: -0.028em;
		color: var(--text);
		max-width: 1000px;
		text-wrap: balance;
	}
	.hero h1 :global(em) {
		font-style: normal;
		color: var(--accent);
		position: relative;
	}
	.hero-sub {
		margin-top: 28px;
		max-width: 660px;
		color: var(--text-2);
		font-size: 17px;
		line-height: 1.65;
		text-wrap: pretty;
		font-family: 'Inter', system-ui, sans-serif;
	}
	.hero-sub :global(strong) {
		color: var(--text);
		font-weight: 500;
	}
	.hero-actions {
		display: flex;
		gap: 12px;
		margin-top: 40px;
		flex-wrap: wrap;
	}

	.hero-meta {
		margin-top: 72px;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		border-top: 1px solid var(--line);
		border-bottom: 1px solid var(--line);
	}
	@media (max-width: 860px) {
		.hero-meta {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 480px) {
		.hero-meta {
			grid-template-columns: 1fr;
		}
	}
	.hero-meta-cell {
		padding: 24px 28px;
		border-right: 1px solid var(--line);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		min-height: 96px;
	}
	.hero-meta-cell:first-child {
		padding-left: 0;
	}
	.hero-meta-cell:last-child {
		border-right: 0;
		padding-right: 0;
	}
	@media (max-width: 860px) {
		.hero-meta-cell {
			padding: 22px 24px;
		}
		.hero-meta-cell:nth-child(2n) {
			border-right: 0;
			padding-right: 0;
		}
		.hero-meta-cell:nth-child(2n + 1) {
			padding-left: 0;
		}
		.hero-meta-cell:nth-child(-n + 2) {
			border-bottom: 1px solid var(--line);
		}
	}
	@media (max-width: 480px) {
		.hero-meta-cell {
			border-right: 0;
			padding: 20px 0;
			min-height: 0;
			border-bottom: 1px solid var(--line);
		}
		.hero-meta-cell:last-child {
			border-bottom: 0;
		}
	}
	.hero-meta-k {
		color: var(--dim);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 10px;
		line-height: 1;
	}
	.hero-meta-v {
		color: var(--text);
		font-size: 15px;
		line-height: 1.5;
		text-wrap: balance;
	}
	.hero-meta-v.accent {
		color: var(--accent);
	}

	/* ── featured ── */
	.featured {
		padding: 56px 0 96px;
	}
	.featured-grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 56px;
		align-items: start;
		margin-top: 56px;
	}
	@media (max-width: 880px) {
		.featured-grid {
			grid-template-columns: 1fr;
			gap: 40px;
		}
	}
	.featured :global(h2) {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: clamp(32px, 3.6vw, 44px);
		line-height: 1.1;
		letter-spacing: -0.022em;
		color: var(--text);
		margin-bottom: 24px;
		text-wrap: balance;
	}
	.featured :global(h2 em) {
		font-style: normal;
		color: var(--accent);
	}
	.featured :global(p) {
		color: var(--text-2);
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 16px;
		line-height: 1.65;
		max-width: 580px;
		text-wrap: pretty;
		margin-bottom: 16px;
	}
	.featured :global(p:last-of-type) {
		margin-bottom: 0;
	}
	.featured :global(strong) {
		color: var(--text);
		font-weight: 500;
	}
	.featured :global(code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9em;
		color: var(--text);
	}
	.stack-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 28px 0 28px;
	}
	.featured-actions {
		display: flex;
		gap: 18px;
		align-items: center;
		margin-top: 16px;
		flex-wrap: wrap;
	}
	.link-quiet {
		color: var(--text-2);
		font-size: 13px;
		transition: color 0.15s;
	}
	.link-quiet:hover {
		color: var(--text);
	}

	/* ── case-study CTA card ── */
	.screens {
		margin-top: 56px;
	}
	.screens-cta {
		display: flex;
		align-items: center;
		gap: 32px;
		padding: 36px 40px;
		border: 1px solid rgba(120, 196, 255, 0.35);
		background: linear-gradient(180deg, rgba(120, 196, 255, 0.06), var(--panel));
		transition:
			border-color 0.2s,
			background 0.2s,
			transform 0.2s,
			box-shadow 0.2s;
		position: relative;
		overflow: hidden;
	}
	.screens-cta::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(600px 200px at 100% 50%, var(--accent-soft), transparent 70%);
		opacity: 0;
		transition: opacity 0.25s;
		pointer-events: none;
	}
	.screens-cta:hover {
		border-color: var(--accent);
		background: linear-gradient(180deg, rgba(120, 196, 255, 0.10), var(--panel-2));
		box-shadow: 0 24px 48px -28px rgba(120, 196, 255, 0.4);
	}
	.screens-cta:hover::before {
		opacity: 1;
	}
	.screens-cta-body {
		flex: 1;
		min-width: 0;
		position: relative;
	}
	.screens-cta-eyebrow {
		color: var(--accent);
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 14px;
	}
	.screens-cta-title {
		color: var(--text);
		font-family: 'Inter', system-ui, sans-serif;
		font-size: clamp(20px, 2.4vw, 26px);
		line-height: 1.3;
		font-weight: 500;
		letter-spacing: -0.018em;
		text-wrap: balance;
		max-width: 720px;
	}
	.screens-cta-title :global(em) {
		font-style: normal;
		color: var(--accent);
	}
	.screens-cta-stats {
		margin-top: 18px;
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		color: var(--dim);
		letter-spacing: 0.04em;
	}
	.screens-cta-stats strong {
		color: var(--accent);
		font-weight: 600;
		font-size: 14px;
	}
	.screens-cta-arrow {
		color: var(--accent);
		font-size: 28px;
		font-family: 'JetBrains Mono', monospace;
		transition: transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
		flex: 0 0 auto;
		position: relative;
	}
	.screens-cta:hover .screens-cta-arrow {
		transform: translateX(6px);
	}
	@media (max-width: 720px) {
		.screens-cta {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
			padding: 28px;
		}
		.screens-cta-arrow {
			align-self: flex-end;
		}
	}

	/* ── experience ── */
	.experience {
		padding: 24px 0 96px;
	}
	.exp-wrap {
		margin-top: 32px;
	}
	.exp-wrap :global(.exp:first-of-type) {
		border-top: 1px solid var(--line);
	}

	/* ── toolkit ── */
	.toolkit {
		padding: 24px 0 96px;
	}
	.toolkit-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
		margin-top: 32px;
	}
	@media (max-width: 880px) {
		.toolkit-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.tk {
		border: 1px solid var(--line-2);
		background: var(--panel);
		padding: 22px 22px 24px;
		transition:
			border-color 0.15s,
			transform 0.15s;
	}
	.tk:hover {
		border-color: rgba(120, 196, 255, 0.35);
	}
	.tk-head {
		color: var(--accent);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		padding-bottom: 12px;
		margin-bottom: 14px;
		border-bottom: 1px solid var(--line);
	}
	.tk ul {
		list-style: none;
	}
	.tk li {
		color: var(--text);
		font-size: 14px;
		padding: 9px 0;
		border-bottom: 1px dashed var(--line);
	}
	.tk li:last-child {
		border-bottom: 0;
		padding-bottom: 2px;
	}

	/* ── contact ── */
	.contact {
		padding: 88px 0 64px;
	}
	.contact h3 {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: clamp(32px, 4.4vw, 56px);
		line-height: 1.08;
		letter-spacing: -0.022em;
		color: var(--text);
		max-width: 920px;
		text-wrap: balance;
	}
	.contact h3 :global(em) {
		font-style: normal;
		color: var(--accent);
	}
	.contact-grid {
		margin-top: 56px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}
	@media (max-width: 880px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
	.contact-cell {
		display: grid;
		grid-template-columns: 44px 1fr auto;
		align-items: center;
		gap: 18px;
		padding: 22px 22px;
		border: 1px solid var(--line-2);
		background: var(--panel);
		transition:
			border-color 0.18s,
			background 0.18s,
			transform 0.18s;
		cursor: pointer;
	}
	.contact-cell:hover {
		border-color: var(--accent);
		background: var(--panel-2);
	}
	.contact-icon {
		width: 44px;
		height: 44px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--line-2);
		color: var(--text-2);
		background: var(--bg-2);
		transition:
			color 0.18s,
			border-color 0.18s,
			background 0.18s;
	}
	.contact-cell:hover .contact-icon {
		color: var(--accent);
		border-color: var(--accent);
		background: var(--accent-soft);
	}
	.contact-icon :global(svg) {
		width: 18px;
		height: 18px;
		display: block;
	}
	.contact-body {
		min-width: 0;
	}
	.contact-k {
		color: var(--dim);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		margin-bottom: 4px;
	}
	.contact-v {
		color: var(--text);
		font-size: 14px;
		line-height: 1.3;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 0.18s;
	}
	.contact-cell:hover .contact-v {
		color: var(--accent);
	}
	.contact-arrow {
		color: var(--dim);
		font-size: 14px;
		transition:
			transform 0.18s,
			color 0.18s;
	}
	.contact-cell:hover .contact-arrow {
		color: var(--accent);
		transform: translate(3px, -3px);
	}
</style>
