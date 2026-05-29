<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import TopBar from '$lib/components/TopBar.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';
	import TerminalPanel from '$lib/components/TerminalPanel.svelte';
	import ExperienceItem from '$lib/components/ExperienceItem.svelte';

	let hero: HTMLElement;

	onMount(() => {
		// Pointer-follow spotlight — only on precise pointers, respects reduced-motion
		const fine = window.matchMedia('(pointer: fine)').matches;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!fine || reduced || !hero) return;

		const onMove = (e: PointerEvent) => {
			const r = hero.getBoundingClientRect();
			hero.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
			hero.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
		};
		const enter = () => hero.classList.add('spotlight-on');
		const leave = () => hero.classList.remove('spotlight-on');

		hero.addEventListener('pointermove', onMove);
		hero.addEventListener('pointerenter', enter);
		hero.addEventListener('pointerleave', leave);

		return () => {
			hero.removeEventListener('pointermove', onMove);
			hero.removeEventListener('pointerenter', enter);
			hero.removeEventListener('pointerleave', leave);
		};
	});

	const exfilLog = [
		{ ts: '[boot ]', text: 'exfil v1.0.0 · .NET 8 · PerMonitorV2' },
		{ ts: '[probe]', text: 'NVAPI present=true · QueryDisplayConfig ok' },
		{ ts: '[hook ]', text: 'WM_DISPLAYCHANGE registered', variant: 'info' as const, dimTs: true },
		{ ts: '[tray ]', text: 'idle · profile=desktop vibrance=50' },
		{
			ts: '[focus]',
			text: 'EscapeFromTarkov.exe → apply(tarkov)',
			variant: 'ok' as const,
			dimTs: true
		},
		{ ts: '[nvapi]', text: 'vibrance 50 → 78 ok', variant: 'ok' as const, dimTs: true },
		{
			ts: '[warn ]',
			text: 'display hotplug · re-enumerate',
			variant: 'warn' as const,
			dimTs: true
		},
		{
			ts: '[blur ]',
			text: 'focus lost → restore(desktop)',
			variant: 'info' as const,
			dimTs: true
		},
		{ ts: '[tray ]', text: 'idle · no leaks · sentinel=green' }
	];
</script>

<svelte:head>
	<title>Braison Swilling — Windows Software Developer</title>
</svelte:head>

<TopBar />

<main class="page">
	<!-- Print-only header (resume PDF — name + contact at top) -->
	<header class="print-resume-header" aria-hidden="true">
		<div class="print-name">Braison Swilling</div>
		<div class="print-contact">
			Windows Software Developer · braison.swilling@outlook.com · github.com/Blazzer10200 · blazzer10200.github.io · United States · Remote
		</div>
	</header>

	<!-- Hero -->
	<section class="hero reveal" bind:this={hero}>
		<div class="hero-glow" aria-hidden="true"></div>
		<div class="hero-eyebrow">
			<span>Software Developer</span>
			<span class="pill">Open to work</span>
		</div>

		<h1>I design and ship <em>native Windows software.</em></h1>

		<p class="hero-sub">
			Self-taught developer who ships finished software. <strong>EXFIL</strong> — a Windows
			tray utility public on GitHub — is the latest proof I finish what I start.
		</p>

		<div class="hero-actions stagger">
			<a class="btn primary" href="#contact">
				<span class="ico">→</span> Get in touch
			</a>
			<a class="btn" href="/exfil">
				<span class="ico">→</span> EXFIL case study
			</a>
			<a
				class="btn"
				href="https://github.com/Blazzer10200/exfil-v1"
				target="_blank"
				rel="noopener"
			>
				<span class="ico">↗</span> View EXFIL on GitHub
			</a>
		</div>

		<div class="hero-meta stagger">
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Currently shipping</div>
				<div class="hero-meta-v accent">EXFIL v1.0.0</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Focus</div>
				<div class="hero-meta-v">Native Windows tooling</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Core stack</div>
				<div class="hero-meta-v">C# · .NET 8 · TypeScript</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Based</div>
				<div class="hero-meta-v">United States · Remote</div>
			</div>
		</div>
	</section>

	<!-- Featured -->
	<section class="featured reveal" id="featured">
		<SectionRail num="01 / 03" label="Featured project" meta="2025 — Public on GitHub" />

		<div class="featured-grid stagger">
			<div>
				<h2>EXFIL — a Windows tray tool I <em>shipped end to end.</em></h2>
				<p>
					Bind a display-vibrance profile to any application. The tool swaps profiles
					automatically as window focus changes — so editing apps stay color-accurate, games
					look punchy, and the desktop sits at whatever you want. There's also a slim overlay
					with live <strong>FPS, GPU / CPU / RAM load, and core temps</strong>.
				</p>
				<p>
					Under the hood: NVAPI P/Invoke, <code>QueryDisplayConfig</code> for HDR awareness,
					<code>SetWinEventHook</code> for focus, PerMonitorV2 DPI, monitor hotplug handling,
					versioned settings migrations, and a sentinel that recovers cleanly from crashes.
					Designed, built, and shipped to GitHub.
				</p>

				<div class="stack-row">
					<span class="chip">C#</span>
					<span class="chip">.NET 8</span>
					<span class="chip">WinForms</span>
					<span class="chip">NVAPI P/Invoke</span>
					<span class="chip">Win32 API</span>
					<span class="chip">HDR</span>
					<span class="chip">DPI-aware</span>
				</div>

				<div class="featured-actions">
					<a
						class="link-quiet"
						href="https://github.com/Blazzer10200/exfil-v1"
						target="_blank"
						rel="noopener">View on GitHub ↗</a
					>
				</div>
			</div>

			<TerminalPanel title="~/exfil/logs/session.log" lines={exfilLog} />
		</div>

		<figure class="product-shot reveal">
			<img
				src="{base}/screenshots/exfil-osd.png"
				alt="EXFIL on-screen overlay showing live FPS, GPU/CPU/RAM load, and core temperatures rendered over a running game"
				loading="lazy"
				decoding="async"
			/>
			<figcaption>EXFIL overlay — live FPS &amp; hardware telemetry over an active game</figcaption>
		</figure>

		<div class="screens stagger">
			<a class="screens-cta" href="/exfil">
				<div class="screens-cta-body">
					<div class="screens-cta-eyebrow">— Case study</div>
					<div class="screens-cta-title">
						See the dashboard, presets, OSD designer, and <em>the full build story.</em>
					</div>
					<div class="screens-cta-meta">EXFIL · v1.0.0 · ~5 min read</div>
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
						<strong>Designed and shipped EXFIL</strong>, a Windows tray tool with per-app
						vibrance profiles and a live FPS / hardware-telemetry overlay. Public on GitHub.
					</li>
					<li>
						Owned EXFIL end to end — architecture, code, releases. C# / .NET 8, WinForms,
						NVAPI P/Invoke, Win32.
					</li>
					<li>
						Full-stack range alongside native Windows work — SvelteKit + TypeScript on the
						front, Python + FastAPI on the back, MySQL and Linux VPS for deploy.
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
						Ran live FiveM/RedM servers for player communities. Windows + Linux admin,
						MySQL, Lua.
					</li>
					<li>Wound down in early 2025 to focus on building software.</li>
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
				<div class="tk-head">Windows &amp; desktop</div>
				<ul>
					<li>C# / .NET 8</li>
					<li>WinForms</li>
					<li>Win32 / NVAPI</li>
					<li>PowerShell</li>
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
		position: relative;
		--mx: 50%;
		--my: 40%;
	}
	.hero > :global(*:not(.hero-glow)) {
		position: relative;
		z-index: 1;
	}
	.hero-glow {
		position: absolute;
		inset: -40px -40px 0;
		z-index: 0;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease;
		background: radial-gradient(
			340px 340px at var(--mx) var(--my),
			var(--accent-glow),
			transparent 70%
		);
	}
	.hero:global(.spotlight-on) .hero-glow {
		opacity: 1;
	}
	@media print {
		.hero-glow {
			display: none !important;
		}
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

	/* ── product screenshot ── */
	.product-shot {
		margin: 56px 0 0;
		border: 1px solid var(--line-2);
		background: var(--panel);
		padding: 14px 14px 12px;
	}
	.product-shot img {
		display: block;
		width: 100%;
		height: auto;
		max-width: 100%;
	}
	.product-shot figcaption {
		margin-top: 10px;
		color: var(--dim);
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-align: center;
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
	.screens-cta-meta {
		margin-top: 14px;
		color: var(--dim);
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.08em;
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
