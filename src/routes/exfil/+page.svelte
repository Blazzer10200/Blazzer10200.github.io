<script lang="ts">
	import { base } from '$app/paths';
	import TopBar from '$lib/components/TopBar.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';

	const navLinks = [
		{ href: '/', label: '← Back to résumé', primary: true },
		{
			href: 'https://github.com/Blazzer10200/exfil',
			label: 'GitHub ↗',
			external: true
		}
	];

	const challenges = [
		{
			n: '01',
			title: 'Knowing which app you just clicked into',
			body: `EXFIL watches for whichever app you've clicked into and figures out what it actually is. It matches on the real program, not the window's title, because titles change all the time. It does this without constantly checking in the background, which would drain your battery. Anything it doesn't recognize just quietly falls back to your normal look.`,
			kv: [
				['How', 'It spots the real program the moment you switch'],
				['Result', 'As many app profiles as you want']
			]
		},
		{
			n: '02',
			title: 'Talking to the graphics card',
			body: `The color setting EXFIL controls isn't something Windows lets you reach. It's buried deep inside NVIDIA's graphics driver, with no clean or reliable way in. So I wrote that connection myself, from scratch, talking straight to the driver's own low-level controls. It taught me a lot about how that layer really behaves.`,
			kv: [
				['How', 'It talks straight to the graphics driver'],
				['Result', 'Steady, reliable control of your screen']
			]
		},
		{
			n: '03',
			title: 'HDR screens change the rules',
			body: `When a screen is in HDR mode, the color works differently, and using the wrong settings can look worse than doing nothing at all. So before EXFIL touches anything, it asks Windows whether each display is actually in HDR, then adjusts to match. It never just assumes how your setup is put together.`,
			kv: [
				['How', 'It checks each screen before it acts'],
				['Result', 'Looks right on HDR and normal screens']
			]
		},
		{
			n: '04',
			title: 'Monitors get unplugged mid-session',
			body: `People unplug monitors. They dock and undock laptops. Screens go to sleep and wake up looking different. When any of that happens, EXFIL notices, takes stock of what's connected now, and re-applies the right settings. It doesn't just sit there confused, still pointed at a screen that isn't there anymore.`,
			kv: [
				['How', 'It re-checks whenever your screens change'],
				['Result', 'Handles unplugging and docking cleanly']
			]
		},
		{
			n: '05',
			title: 'Settings that survive an update',
			body: `Every time I change how settings get saved, I risk wiping out everyone's existing setup on the next update. So EXFIL knows how to read its older settings and quietly bring them up to date. If anything looks wrong while it's doing that, it backs out safely instead of corrupting your setup. The settings you saved six months ago still load just fine today.`,
			kv: [
				['How', 'It upgrades your old settings for you'],
				['Result', 'Updates never wipe out your setup']
			]
		},
		{
			n: '06',
			title: 'If it crashes, your desktop is still fine',
			body: `The worst case is EXFIL crashing while a punchy game profile is still on. That leaves your whole desktop looking blown out and oversaturated, with no obvious way to fix it. So every time it starts up, it checks whether the last session ended badly and resets you back to normal before it does anything else. You never get stuck staring at a wrong-looking screen.`,
			kv: [
				['How', 'It resets you to normal after a crash'],
				['Result', 'You never get left stuck']
			]
		}
	];

	const screenshots = [
		{
			src: 'exfil-dashboard.png',
			name: 'exfil · dashboard',
			alt: 'EXFIL dashboard with tray status, OSD preview, game library, and live system telemetry',
			capTitle: 'Dashboard.',
			cap: 'Live tray status, a preview of the on-screen overlay, your game library, and a panel pulling real graphics and processor temps and load straight from the hardware.'
		},
		{
			src: 'exfil-presets.png',
			name: 'exfil · presets',
			alt: 'EXFIL preset editor with vibrance, gamma, brightness, and contrast curves',
			capTitle: 'Presets.',
			cap: 'Set color, brightness, and contrast for each app. Tie a preset to a game and EXFIL applies it the instant you click in.'
		},
		{
			src: 'exfil-osd.png',
			name: 'exfil · overlay designer',
			alt: 'EXFIL OSD designer with overlay layout, content, and style controls',
			capTitle: 'Overlay designer.',
			cap: `Drag the overlay wherever it fits, pick a layout, and choose what it shows. Your frame rate, graphics and processor load, and temps all draw on top of the game without ever touching it.`
		},
		{
			src: 'exfil-about.png',
			name: 'exfil · about',
			alt: 'EXFIL about page with build info, driver status, and install notes',
			capTitle: 'About.',
			cap: 'Build, runtime, and graphics-driver status all in one view. Bug-report copy, changelog, and source links live here too.'
		}
	];

	const lessons = [
		{
			n: '01',
			title: 'Start with the crash path',
			body: `The crash-recovery safety net got added late. Next time I'd plan out the "what happens if this dies at a bad moment" story on day one, not after I'd already shipped and started getting nervous about it.`
		},
		{
			n: '02',
			title: 'Write the settings schema first',
			body: `I evolved the config organically, then had to retrofit versioning. Next time I'd commit to a schema and migration pattern before writing any UI.`
		},
		{
			n: '03',
			title: 'Test on a laptop earlier',
			body: `Mismatched screen sizes, HDR, external monitors, docking. All the ugly display edge cases live on laptops. I tested on a desktop too long, and the bugs piled up while I wasn't looking.`
		}
	];
</script>

<svelte:head>
	<title>EXFIL · Case study · Braison Swilling</title>
	<meta
		name="description"
		content="Building EXFIL, a small Windows app that retunes your screen's color for each app you open and shows live frame rate, graphics, processor and memory load, and core temps."
	/>
	<meta property="og:title" content="EXFIL · Case study · Braison Swilling" />
	<meta
		property="og:description"
		content="Building EXFIL, a small Windows app that retunes your screen's color for each app you open and shows live frame rate, graphics, processor and memory load, and core temps."
	/>
	<meta property="og:url" content="https://blazzer10200.github.io/exfil" />
	<meta name="twitter:title" content="EXFIL · Case study · Braison Swilling" />
	<link rel="canonical" href="https://blazzer10200.github.io/exfil" />
	<meta
		name="twitter:description"
		content="Building EXFIL, a small Windows app that retunes your screen's color for each app you open and shows live frame rate, graphics, processor and memory load, and core temps."
	/>
</svelte:head>

<TopBar variant="case-study" brandRole="EXFIL · Case study" links={navLinks} />

<main class="page">
	<!-- Hero -->
	<section class="hero reveal">
		<div class="hero-eyebrow">
			<span>Case study</span>
			<span class="pill">My first real project · 2025</span>
		</div>

		<h1>The right app takes focus, the display retunes itself.</h1>

		<p class="hero-sub">
			EXFIL is a small Windows app that lives down in your taskbar tray. You tie a color profile to
			any app, and EXFIL swaps to it the second you click into that app. Tarkov is washed out and
			dark, so I crank up the color for it. My desktop and editing apps stay normal. Movies sit
			somewhere in between. You point it at an app, pick a profile, and then stop thinking about it.
		</p>
		<p class="hero-sub">
			Since it's already running anyway, it doubles as a slim overlay that shows your live <strong
				>frame rate, your graphics card, processor and memory load, and your core temperatures</strong
			>. That way I can see what my PC is doing without opening a second tool.
		</p>
		<p class="hero-sub">
			This was the first tool I ever shipped. I built it early in 2025, and it's the project where I
			learned to take an idea all the way to finished, working software. I keep it on the site on
			purpose. Put it next to Rift and you can see how far the work came in a single year.
		</p>

		<div class="hero-actions stagger">
			<a
				class="btn primary"
				href="https://github.com/Blazzer10200/exfil"
				target="_blank"
				rel="noopener"
			>
				<span class="ico">↗</span> Read the code on GitHub
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
				<div class="hero-meta-v accent">Where I started</div>
			</div>
		</div>
	</section>

	<!-- 01 The problem -->
	<section class="block reveal">
		<SectionRail num="01 / 05" label="The problem" meta="Why this exists" />
		<h2>One screen setting can't cover everything you do on the same PC.</h2>
		<p class="body">
			It started with Tarkov. The game is dark and low on contrast, so I crank up the screen's color
			to make targets stand out. The problem is that same setting makes my desktop, my photos, and my
			movies look radioactive. The usual fix is to toggle it by hand every time you launch the game.
			Nobody actually does that.
		</p>
		<p class="body">
			Once I had Tarkov working, the rest came almost for free. EXFIL keeps an unlimited list of
			profiles, one for each app you care about. You tie a profile to an app, and EXFIL swaps to it
			the instant you click into that app. No hotkeys, no flipping settings by hand.
		</p>
	</section>

	<!-- 02 What it looks like -->
	<section class="block reveal">
		<SectionRail num="02 / 05" label="Inside EXFIL" meta="C# · Windows 11" />
		<h2>A tray icon, a settings window, and a slim overlay. Then you forget it's there.</h2>
		<p class="body">
			There are really only three parts. The little tray icon down by the clock handles quick profile
			switching. The settings window is where you set up your per-app profiles, the on-screen overlay,
			and the system info. And the overlay itself floats over whatever app you're in, showing your
			frame rate and PC stats. That's the entire app.
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
			<span class="chip">Graphics driver</span>
			<span class="chip">Windows APIs</span>
			<span class="chip">HDR-aware</span>
			<span class="chip">Multi-monitor</span>
		</div>
	</section>

	<!-- 03 The ugly corners -->
	<section class="block reveal">
		<SectionRail
			num="03 / 05"
			label="The ugly corners"
			meta="The part that took the months"
		/>
		<h2>Easy on my own PC. Hard on everyone else's.</h2>
		<p class="body">
			Getting this working on my own machine took a weekend. Getting it to not break on someone
			else's laptop took a lot longer. Think a strange external monitor, HDR turned half on, the thing
			docked at a coffee shop. That's where the real time went.
		</p>

		<div class="challenges stagger">
			{#each challenges as ch (ch.n)}
				<article class="ch">
					<div class="ch-head">
						<span class="ch-num">{ch.n}</span>
						<span class="ch-title">{ch.title}</span>
					</div>
					<p>{ch.body}</p>
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
		<h2>Built the way I build everything. I make the calls, the AI helps me move.</h2>
		<p class="body">
			I'd decide the next piece myself. Say, it needs to notice when a monitor gets unplugged and put
			the right profile back. I'd sketch out how I wanted it to work and hand that off. Then I'd read
			through what came back and keep only the parts I actually understood. That's why I can still
			explain every choice here. Why it recovers the way it does after a crash. Why your old settings
			survive an update. Why it checks for HDR first.
		</p>
	</section>

	<!-- 05 What I'd do differently -->
	<section class="block reveal">
		<SectionRail num="05 / 05" label="What I'd do differently" meta="Honest retro" />
		<h2>What the next build would get right from day one.</h2>

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
			This is where it started. See where it went.
		</h3>
		<div class="cta-actions stagger">
			<a class="btn primary" href="/rift">
				<span class="ico">→</span> The Rift case study
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
		background: var(--danger);
	}
	.dots :global(span:nth-child(2)) {
		background: var(--warn);
	}
	.dots :global(span:nth-child(3)) {
		background: var(--ok);
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
	.ch-head {
		display: flex;
		align-items: baseline;
		gap: 12px;
		margin-bottom: 12px;
	}
	.ch-num {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--accent);
		font-weight: 600;
		letter-spacing: 0.04em;
	}
	.ch-title {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 17px;
		font-weight: 500;
		color: var(--text);
		letter-spacing: -0.01em;
	}
	.ch p {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14.5px;
		color: var(--text-2);
		line-height: 1.6;
	}
	.kv {
		margin-top: 14px;
		display: grid;
		grid-template-columns: 92px 1fr;
		gap: 6px 14px;
		font-size: 12px;
		border-top: 1px solid var(--line);
		padding-top: 12px;
	}
	.kv dt {
		color: var(--dim);
		font-family: 'JetBrains Mono', monospace;
		letter-spacing: 0.06em;
	}
	.kv dd {
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
	.les p {
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
