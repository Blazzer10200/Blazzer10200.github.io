<script lang="ts">
	import { base } from '$app/paths';
	import TopBar from '$lib/components/TopBar.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';

	const navLinks = [
		{ href: '/', label: '← Back to résumé', primary: true },
		{
			href: 'https://github.com/Blazzer10200/exfil-v1',
			label: 'GitHub ↗',
			external: true
		}
	];

	const challenges = [
		{
			n: '01',
			title: 'Per-app profile matching',
			body: `EXFIL listens for foreground-window events, resolves the owning process to its executable path, and looks that path up against the profile list. Not by window title (users rename them), and not by polling (burns battery). Unknown apps fall back to the default instantly.`,
			kv: [
				['Surface', 'SetWinEventHook · process path'],
				['Outcome', 'Unlimited app profiles']
			]
		},
		{
			n: '02',
			title: 'Talking to the GPU',
			body: `Digital vibrance isn't exposed in Windows — it's an NVIDIA driver feature. There's no .NET wrapper I trusted, so I wrote P/Invoke bindings against NVAPI directly. One native library, one function call, a lot of reading stale header files. Now I know how NVAPI actually behaves.`,
			kv: [
				['Surface', 'NVAPI P/Invoke'],
				['Outcome', 'Clean, testable wrapper']
			]
		},
		{
			n: '03',
			title: 'HDR changes the rules',
			body: null,
			html: `When a display is in HDR mode, the vibrance pipeline behaves differently — applying the wrong profile can look worse than doing nothing. So EXFIL asks Windows via <code>QueryDisplayConfig</code> whether HDR is active per output, and gates its behavior on that. No assumptions about the user's setup.`,
			kv: [
				['Surface', 'QueryDisplayConfig'],
				['Outcome', 'Per-output HDR awareness']
			]
		},
		{
			n: '04',
			title: 'Monitors get unplugged mid-session',
			body: null,
			html: `People unplug monitors. People dock and undock laptops. Displays sleep and wake up looking different. EXFIL hooks <code>WM_DISPLAYCHANGE</code>, re-enumerates outputs, and re-applies whatever profile should be active — instead of sitting there with stale display handles.`,
			kv: [
				['Surface', 'Win32 message pump'],
				['Outcome', 'Hotplug-safe']
			]
		},
		{
			n: '05',
			title: 'Settings that survive an upgrade',
			body: `Every time I change how a setting is stored, I break everyone's config. So the settings file is schema-versioned: each version has a migration step, load-time validation is strict, and partial-failure on a migration rolls back cleanly. The config you saved six months ago still loads on the next build.`,
			kv: [
				['Pattern', 'Versioned schema + migrations'],
				['Outcome', 'Upgrade-safe']
			]
		},
		{
			n: '06',
			title: 'If I crash, your desktop is fine',
			body: `The worst failure mode is the process dying with a high-vibrance profile applied — now the desktop looks oversaturated until the user figures out why. So there's a sentinel: on boot, EXFIL notices if the last session ended badly and restores the default profile before doing anything else. You never get stuck.`,
			kv: [
				['Pattern', 'Crash-recovery sentinel'],
				['Outcome', 'Safe by default']
			]
		}
	];

	const screenshots = [
		{
			src: 'exfil-dashboard.png',
			name: 'exfil — dashboard',
			alt: 'EXFIL dashboard with tray status, OSD preview, game library, and live system telemetry',
			capTitle: 'Dashboard.',
			cap: 'Live tray status, OSD preview, game library, and a system panel pulling real GPU / CPU temps and load straight from the hardware monitor.'
		},
		{
			src: 'exfil-presets.png',
			name: 'exfil — presets',
			alt: 'EXFIL preset editor with vibrance, gamma, brightness, and contrast curves',
			capTitle: 'Presets.',
			cap: 'Per-app vibrance, gamma, brightness, and contrast curves. Bind a preset to a game and EXFIL applies it the instant focus changes.'
		},
		{
			src: 'exfil-osd.png',
			name: 'exfil — osd designer',
			alt: 'EXFIL OSD designer with overlay layout, content, and style controls',
			capTitle: 'OSD designer.',
			cap: `Drag the overlay where it fits, pick a layout, and tune what's shown. FPS, GPU / CPU load, and temps render in-game with no injection.`
		},
		{
			src: 'exfil-about.png',
			name: 'exfil — about',
			alt: 'EXFIL about page with build info, NVAPI status, and install notes',
			capTitle: 'About.',
			cap: 'Build, runtime, and NVAPI status all in one view. Bug-report copy, changelog, and source links live here too.'
		}
	];

	const lessons = [
		{
			n: '01',
			title: 'Start with the crash path',
			body: `The sentinel was added late. I'd design the "what happens if this dies at a bad moment" story on day one, not after I shipped and got nervous about it.`
		},
		{
			n: '02',
			title: 'Write the settings schema first',
			body: `I evolved the config organically, then had to retrofit versioning. Next time I'd commit to a schema and migration pattern before writing any UI.`
		},
		{
			n: '03',
			title: 'Test on a laptop earlier',
			body: `Mixed-DPI, HDR, external monitors, docking — all the ugly display-config edge cases live on laptops. Testing on a desktop too long let bugs pile up.`
		}
	];
</script>

<svelte:head>
	<title>EXFIL — Case study · Braison Swilling</title>
	<meta
		name="description"
		content="Building EXFIL: a Windows tray tool that swaps display vibrance per app and overlays live FPS, GPU/CPU/RAM load, and core temps."
	/>
	<meta property="og:title" content="EXFIL — Case study · Braison Swilling" />
	<meta
		property="og:description"
		content="Building EXFIL: a Windows tray tool that swaps display vibrance per app and overlays live FPS, GPU/CPU/RAM load, and core temps."
	/>
	<meta property="og:url" content="https://blazzer10200.github.io/exfil" />
	<meta name="twitter:title" content="EXFIL — Case study · Braison Swilling" />
	<meta
		name="twitter:description"
		content="Building EXFIL: a Windows tray tool that swaps display vibrance per app and overlays live FPS, GPU/CPU/RAM load, and core temps."
	/>
</svelte:head>

<TopBar variant="case-study" brandRole="EXFIL · Case study" links={navLinks} />

<main class="page">
	<!-- Hero -->
	<section class="hero reveal">
		<div class="hero-eyebrow">
			<span>Case study</span>
			<span class="pill">Shipped · v1.0.0</span>
		</div>

		<h1>The right app takes focus, the display <em>retunes itself.</em></h1>

		<p class="hero-sub">
			EXFIL is a Windows tray utility. Bind a display-vibrance profile to any app, and the tool
			swaps profiles automatically as window focus changes. Tarkov is washed out and dark, so I
			crank vibrance for it; my desktop and editing apps stay neutral; movies sit somewhere in the
			middle. Point it at an executable, pick a profile, and stop thinking about it.
		</p>
		<p class="hero-sub">
			Since it's already running, it doubles as a slim overlay with live <strong
				>FPS, GPU / CPU / RAM load, and core temps</strong
			> — so I can see what the rig is doing without a second tool open.
		</p>

		<div class="hero-actions stagger">
			<a
				class="btn primary"
				href="https://github.com/Blazzer10200/exfil-v1"
				target="_blank"
				rel="noopener"
			>
				<span class="ico">↗</span> View on GitHub
			</a>
			<a
				class="btn"
				href="https://github.com/Blazzer10200/exfil-v1#readme"
				target="_blank"
				rel="noopener"
			>
				<span class="ico">↗</span> Read the README
			</a>
			<a class="btn" href="/">
				<span class="ico">←</span> Back to résumé
			</a>
		</div>

		<div class="hero-meta stagger">
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Role</div>
				<div class="hero-meta-v">Designer &amp; builder</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Stack</div>
				<div class="hero-meta-v">C# · .NET 8 · WinForms</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Surface</div>
				<div class="hero-meta-v">Tray + settings + overlay</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Status</div>
				<div class="hero-meta-v accent">Public on GitHub</div>
			</div>
		</div>
	</section>

	<!-- 01 The problem -->
	<section class="block reveal">
		<SectionRail num="01 / 05" label="The problem" meta="Why this exists" />
		<h2>One display setting doesn't fit everything you do on the same machine.</h2>
		<p class="body">
			It started with Tarkov. The game is dark and low-contrast, so I crank NVIDIA's digital
			vibrance to make targets stand out. But the same setting makes my desktop, photos, and
			movies look radioactive. The usual workaround is to toggle vibrance by hand every launch.
			Nobody actually does that.
		</p>
		<p class="body">
			Once the Tarkov case worked, the rest fell out for free. EXFIL stores an unlimited list of
			<strong>per-application profiles</strong>. Bind a profile to an executable and the tool
			swaps it the instant that app takes focus — no hotkeys, no manual switching.
		</p>
	</section>

	<!-- 02 What it looks like -->
	<section class="block reveal">
		<SectionRail num="02 / 05" label="Inside EXFIL" meta="v1.0.0 · Windows 11" />
		<h2>A tray icon, a settings window, and a slim overlay. Then you forget it exists.</h2>
		<p class="body">
			Three surfaces. The tray icon handles fast profile switching. The settings window is where
			you manage per-app profiles, the OSD overlay, and system info. The overlay floats over your
			active app showing FPS and hardware stats. That's the whole UI.
		</p>

		<div class="screens stagger">
			<div class="screens-grid">
				{#each screenshots as shot (shot.src)}
					<div class="shot">
						<div class="shot-chrome">
							<span class="dots"><span></span><span></span><span></span></span>
							<span class="shot-name">{shot.name}</span>
						</div>
						<img
							src="{base}/screenshots/{shot.src}"
							alt={shot.alt}
							loading="lazy"
						/>
						<div class="shot-cap">
							<strong>{shot.capTitle}</strong>
							{shot.cap}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="stack-row">
			<span class="chip">C#</span>
			<span class="chip">.NET 8</span>
			<span class="chip">WinForms</span>
			<span class="chip">NVAPI P/Invoke</span>
			<span class="chip">Win32 API</span>
			<span class="chip">HDR</span>
			<span class="chip">DPI-aware</span>
		</div>
	</section>

	<!-- 03 The ugly corners -->
	<section class="block reveal">
		<SectionRail
			num="03 / 05"
			label="The ugly corners"
			meta="Where the work actually lived"
		/>
		<h2>The pitch is one sentence. <em>These are the parts that made it real.</em></h2>
		<p class="body">
			Shipping this on my own rig took a weekend. Shipping it so it doesn't break on someone
			else's laptop — weird external monitor, HDR half-enabled, docked at a coffee shop — took a
			lot longer. Here's where the time actually went.
		</p>

		<div class="challenges stagger">
			{#each challenges as ch (ch.n)}
				<article class="ch">
					<div class="ch-head">
						<span class="ch-num">{ch.n}</span>
						<span class="ch-title">{ch.title}</span>
					</div>
					{#if ch.html}
						<p>{@html ch.html}</p>
					{:else}
						<p>{ch.body}</p>
					{/if}
					<dl class="kv">
						{#each ch.kv as [k, v] (k)}
							<dt>{k}</dt>
							<dd>{v}</dd>
						{/each}
					</dl>
				</article>
			{/each}
		</div>
	</section>

	<!-- 04 How I built it -->
	<section class="block reveal">
		<SectionRail num="04 / 05" label="How I built it" meta="AI-assisted, not AI-written" />
		<h2>I designed EXFIL. <em>Claude Code did the typing.</em></h2>
		<p class="body">
			I'm self-taught, and I read code fluently — that's the part I'm not giving up. My loop on
			EXFIL went like this: I'd decide on the next piece ("hotplug needs to re-enumerate and
			re-apply"), sketch the shape I wanted, and hand it to Claude Code. It produces a candidate.
			I read every diff, push back when something is off, and only accept what I understand.
		</p>
		<p class="body">
			That means I know what each part does and I can explain every design choice — why the
			sentinel lives where it does, why the settings file is versioned, why HDR gates the apply.
			The model made me faster. <strong>It didn't make the decisions.</strong>
		</p>
	</section>

	<!-- 05 What I'd do differently -->
	<section class="block reveal">
		<SectionRail num="05 / 05" label="What I'd do differently" meta="Honest retro" />
		<h2>Three things I'd change if I started over.</h2>

		<div class="lessons stagger">
			{#each lessons as les (les.n)}
				<div class="les">
					<div class="les-n">{les.n}</div>
					<div class="les-t">{les.title}</div>
					<p>{les.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- CTA -->
	<section class="cta reveal">
		<h3>
			If a developer who designs his own software, ships it, and reads every line
			<em>sounds useful — let's talk.</em>
		</h3>
		<div class="cta-actions stagger">
			<a class="btn primary" href="mailto:braison.swilling@outlook.com?subject=Hello%20Braison">
				<span class="ico">→</span> Email me
			</a>
			<a class="btn" href="/">
				<span class="ico">←</span> Back to résumé
			</a>
		</div>
	</section>
</main>

<footer class="footer">© 2026 Braison Swilling · Built by hand</footer>

<style>
	/* ── footer (overrides app.css default — full-width on case study) ── */
	.footer {
		padding: 32px 56px 28px;
		margin-top: 64px;
	}
	@media (max-width: 720px) {
		.footer {
			padding: 28px 20px 24px;
		}
	}

	/* ── code (chip-style, used in challenges) ── */
	:global(.ch p code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.92em;
		color: var(--text);
		background: var(--panel);
		padding: 1px 6px;
		border: 1px solid var(--line-2);
		border-radius: 3px;
	}

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
	.hero-sub {
		margin-top: 28px;
		max-width: 700px;
		color: var(--text-2);
		font-size: 17px;
		line-height: 1.65;
		text-wrap: pretty;
		font-family: 'Inter', system-ui, sans-serif;
	}
	.hero-sub + .hero-sub {
		margin-top: 16px;
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
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
	}
	.hero-meta-v.accent {
		color: var(--accent);
	}

	/* ── content blocks ── */
	.block {
		padding: 64px 0 24px;
	}
	.block + .block {
		padding-top: 24px;
	}
	.block :global(.rail) {
		margin-bottom: 36px;
	}
	.block h2 {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: clamp(28px, 3.6vw, 40px);
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--text);
		margin-bottom: 24px;
		text-wrap: balance;
		max-width: 880px;
	}
	.block :global(p.body) {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 16px;
		line-height: 1.65;
		color: var(--text-2);
		max-width: 720px;
		text-wrap: pretty;
	}
	.block :global(p.body + p.body) {
		margin-top: 16px;
	}

	/* ── screens gallery ── */
	.screens {
		margin-top: 40px;
	}
	.screens-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px;
	}
	@media (max-width: 880px) {
		.screens-grid {
			grid-template-columns: 1fr;
		}
	}
	.shot {
		position: relative;
		border: 1px solid var(--line-2);
		background: var(--panel);
		overflow: hidden;
		transition:
			border-color 0.15s ease,
			transform 0.2s ease;
	}
	.shot:hover {
		border-color: rgba(120, 196, 255, 0.35);
		transform: translateY(-2px);
	}
	.shot-chrome {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 14px;
		border-bottom: 1px solid var(--line);
		background: var(--panel-2);
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--dim);
	}
	.dots {
		display: inline-flex;
		gap: 5px;
	}
	.dots :global(span) {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--line-2);
	}
	.dots :global(span:nth-child(1)) {
		background: #e87a7a;
	}
	.dots :global(span:nth-child(2)) {
		background: #e6b26a;
	}
	.dots :global(span:nth-child(3)) {
		background: #7ad19a;
	}
	.shot-name {
		color: var(--text-2);
	}
	.shot :global(img) {
		display: block;
		width: 100%;
		height: auto;
		background: #0a0b0f;
	}
	.shot-cap {
		padding: 14px 16px 16px;
		border-top: 1px solid var(--line);
		color: var(--text-2);
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 13px;
		line-height: 1.55;
	}

	/* ── chips ── */
	.stack-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 28px 0 0;
	}

	/* ── challenges ── */
	.challenges {
		margin-top: 36px;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px;
	}
	@media (max-width: 880px) {
		.challenges {
			grid-template-columns: 1fr;
		}
	}
	.ch {
		border: 1px solid var(--line-2);
		background: var(--panel);
		padding: 24px 26px;
		transition:
			border-color 0.15s,
			transform 0.15s;
	}
	.ch:hover {
		border-color: rgba(120, 196, 255, 0.35);
	}
	.ch :global(.ch-head) {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin-bottom: 12px;
	}
	.ch :global(.ch-num) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--accent);
		font-weight: 600;
		letter-spacing: 0.04em;
	}
	.ch :global(.ch-title) {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 17px;
		font-weight: 500;
		color: var(--text);
		letter-spacing: -0.01em;
	}
	.ch :global(p) {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14.5px;
		color: var(--text-2);
		line-height: 1.6;
	}
	.ch :global(.kv) {
		margin-top: 14px;
		display: grid;
		grid-template-columns: 92px 1fr;
		gap: 6px 14px;
		font-size: 12px;
		border-top: 1px solid var(--line);
		padding-top: 12px;
	}
	.ch :global(.kv dt) {
		color: var(--dim);
		font-family: 'JetBrains Mono', monospace;
		letter-spacing: 0.06em;
	}
	.ch :global(.kv dd) {
		color: var(--text);
		font-family: 'Inter', system-ui, sans-serif;
	}

	/* ── lessons ── */
	.lessons {
		margin-top: 32px;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 18px;
	}
	@media (max-width: 880px) {
		.lessons {
			grid-template-columns: 1fr;
		}
	}
	.les {
		padding: 24px 26px;
		border: 1px solid var(--line-2);
		background: var(--panel);
		transition: border-color 0.15s;
	}
	.les:hover {
		border-color: rgba(120, 196, 255, 0.35);
	}
	.les-n {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 12px;
		font-family: 'JetBrains Mono', monospace;
	}
	.les-t {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 16px;
		font-weight: 500;
		color: var(--text);
		margin-bottom: 10px;
		letter-spacing: -0.01em;
	}
	.les :global(p) {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14px;
		color: var(--text-2);
		line-height: 1.6;
	}

	/* ── cta ── */
	.cta {
		margin-top: 96px;
		padding: 44px 48px;
		border: 1px solid var(--line-2);
		background: var(--panel);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 32px;
		flex-wrap: wrap;
	}
	.cta h3 {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: clamp(22px, 2.6vw, 28px);
		font-weight: 500;
		color: var(--text);
		margin: 0;
		text-wrap: balance;
		max-width: 640px;
		letter-spacing: -0.015em;
		line-height: 1.2;
	}
	.cta-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
</style>
