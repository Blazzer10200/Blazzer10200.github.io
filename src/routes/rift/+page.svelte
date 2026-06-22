<script lang="ts">
	import { base } from '$app/paths';
	import TopBar from '$lib/components/TopBar.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';

	const navLinks = [
		{ href: '/', label: '← Back to résumé', primary: true },
		{ href: '#film', label: 'The film ↓', external: false }
	];

	const pillars = [
		{
			n: '01',
			title: 'An assistant with real tools, not just chat',
			body: null,
			html: `The assistant isn't a chat box bolted on — it actually does the work. It reads your files, searches the codebase, and runs git, all scoped to the folder you point it at. You get multiple conversations at once, the ability to redirect it mid-task, control over what it's allowed to touch, and a running tally of what each turn costs.`,
			kv: [
				['Does', 'Reads, searches, runs git'],
				['You', 'Stay in control, review the work']
			]
		},
		{
			n: '02',
			title: 'An app the assistant can drive',
			body: null,
			html: `Most AI tools can only talk back. Rift's assistant can act on the app itself — it pops a question card right in the chat when it needs a decision, opens a live preview of whatever you're building in the built-in browser, or nudges the corner of the window when a long job is done. And it always knows the state of the app around it: what's on screen, how much of your usage you've used up.`,
			kv: [
				['Does', 'Asks, previews, notifies'],
				['Knows', 'What is on screen and what is left']
			]
		},
		{
			n: '03',
			title: 'It ships itself',
			body: `One command kicks off a release: it builds, packages, and publishes, and every copy already out there updates itself the next time it launches. The current build is public right now — a one-click Windows installer, v0.24.0 — and nothing ships unless the compiler, the type-checker, and the full test suite all pass first.`,
			kv: [
				['Does', 'Builds, packages, publishes'],
				['Now', 'Public download, v0.24.0']
			]
		}
	];

	const corners = [
		{
			n: '01',
			title: 'I deleted the feature the app was named for',
			lead: `Rift started as a game-server sync tool. I cut the entire sync half — a quarter of the codebase — when the assistant became the product.`,
			body: `Rift began as an SSH/SFTP cockpit for game-server developers: file watcher, atomic uploads, drift scanner. Then the assistant outgrew it — I was opening Rift to code, not to sync. So I ripped out the half the app was named for: the SSH stack, the watcher, the drift scanner, every remote code path. ~13k lines, deleted on purpose. What's left is a product with one job, and every line serves it.`,
			kv: [
				['Cut', '~13k lines, on purpose'],
				['Result', 'One product, one job']
			]
		},
		{
			n: '02',
			title: 'I shipped an update that bricked every client',
			lead: `One lost key locked everyone out — so I rebuilt updates so no key can ever do that again.`,
			body: `My old update system signed each release with a secret key — and when I lost that key, every installed copy was stranded, unable to accept a single update ever again. I rebuilt the whole thing so there's no key that can be lost. The tricky part: an update silently fails if the app is still running a background task, so the new system shuts those down cleanly before swapping itself out. Nobody can get stranded like that again.`,
			kv: [
				['Fix', 'No key left to lose'],
				['Result', 'Updates that can’t lock anyone out']
			]
		},
		{
			n: '03',
			title: 'My AI can run git — so I attacked it first',
			lead: `The assistant can commit and push code. Before it shipped, I tried to break it on purpose.`,
			body: `The moment an AI can run real commands, those commands become a way in for anything malicious. Real security holes had just been found in tools exactly like this, so I assumed mine had them too. I locked down every input it accepts: it can only touch the project folder, only run a fixed set of safe operations, can't be tricked into reaching outside the repo, and flatly refuses the dangerous stuff. Two independent layers have to agree before it's allowed to act — if one is wrong, the other still holds.`,
			kv: [
				['Approach', 'Two layers, both must agree'],
				['Result', 'Locked down before it shipped']
			]
		},
		{
			n: '04',
			title: 'The AI was being told to use a tool that didn’t exist',
			lead: `It was being pointed at a feature an earlier cleanup had quietly removed.`,
			body: `While auditing what the assistant could do, I found a ghost. When it hit a wall, the app would tell it to "go ask the user" — but the feature that actually showed the user that question had been deleted weeks earlier in a big cleanup. The AI was being coached to use something that wasn't there anymore. I rebuilt it properly, and made it fail gracefully: if that channel is ever down, the AI simply isn't offered those tools, instead of trying and erroring.`,
			kv: [
				['Fix', 'Rebuilt it, fails gracefully now'],
				['Result', 'Ask, preview, and notify — all live']
			]
		}
	];

	const lessons = [
		{
			n: '01',
			title: 'Write the security model before the feature',
			body: `The git-tool hardening was designed up front, in a brief, before a line shipped. That's the order I want for anything that touches a network or runs a command — not a retrofit after it works.`
		},
		{
			n: '02',
			title: 'Delete faster',
			body: `I knew the assistant was the product weeks before I cut the sync half. Sunk cost kept dead weight in the tree, and when the cut finally came, it left a ghost tool behind. Next time the call gets made the week the evidence lands.`
		},
		{
			n: '03',
			title: 'Keep files small enough to reason about',
			body: `A couple of core files grew past 2,000 lines and got brittle to change. I've been carving them into focused modules — the work is easier when each piece fits in your head.`
		}
	];

	/* ── custom film player ──────────────────────────────────────────── */
	let video: HTMLVideoElement = $state()!;
	let player: HTMLDivElement = $state()!;
	let started = $state(false); // has playback ever begun (hides poster overlay)
	let playing = $state(false);
	let muted = $state(false);
	let volume = $state(1);
	let current = $state(0);
	let duration = $state(0);
	let buffered = $state(0);
	let fullscreen = $state(false);
	let scrubbing = $state(false);
	let controlsVisible = $state(true);
	let idleTimer: ReturnType<typeof setTimeout> | undefined;

	const fmt = (s: number) => {
		if (!Number.isFinite(s)) return '0:00';
		const m = Math.floor(s / 60);
		const r = Math.floor(s % 60);
		return `${m}:${String(r).padStart(2, '0')}`;
	};
	const progress = $derived(duration ? (current / duration) * 100 : 0);
	const bufferedPct = $derived(duration ? (buffered / duration) * 100 : 0);

	function togglePlay() {
		if (!video) return;
		started = true;
		if (video.paused) video.play();
		else video.pause();
	}
	function onTimeUpdate() {
		current = video.currentTime;
		try {
			const b = video.buffered;
			if (b.length) buffered = b.end(b.length - 1);
		} catch {
			/* buffered may throw before metadata */
		}
	}
	function onLoaded() {
		duration = video.duration;
	}
	function seekTo(clientX: number, track: HTMLElement) {
		const r = track.getBoundingClientRect();
		const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
		video.currentTime = ratio * duration;
		current = video.currentTime;
	}
	function onTrackPointerDown(e: PointerEvent) {
		scrubbing = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		seekTo(e.clientX, e.currentTarget as HTMLElement);
	}
	function onTrackPointerMove(e: PointerEvent) {
		if (scrubbing) seekTo(e.clientX, e.currentTarget as HTMLElement);
	}
	function onTrackPointerUp(e: PointerEvent) {
		scrubbing = false;
		(e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
	}
	function toggleMute() {
		video.muted = !video.muted;
	}
	function onVolumeInput(e: Event) {
		const v = Number((e.currentTarget as HTMLInputElement).value);
		video.volume = v;
		video.muted = v === 0;
	}
	function skip(delta: number) {
		video.currentTime = Math.min(duration, Math.max(0, video.currentTime + delta));
	}
	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else player?.requestFullscreen?.();
	}
	function onPlayerKeydown(e: KeyboardEvent) {
		// only when the player (or something inside it) has focus
		if (!player?.contains(document.activeElement)) return;
		// don't hijack typing in the volume slider
		const tag = (e.target as HTMLElement)?.tagName;
		if (tag === 'INPUT') return;
		switch (e.key) {
			case ' ':
			case 'k':
				e.preventDefault();
				togglePlay();
				break;
			case 'ArrowRight':
				e.preventDefault();
				skip(5);
				break;
			case 'ArrowLeft':
				e.preventDefault();
				skip(-5);
				break;
			case 'm':
				e.preventDefault();
				toggleMute();
				break;
			case 'f':
				e.preventDefault();
				toggleFullscreen();
				break;
		}
	}
	function nudgeControls() {
		controlsVisible = true;
		clearTimeout(idleTimer);
		if (playing) idleTimer = setTimeout(() => (controlsVisible = false), 2600);
	}
</script>

<svelte:head>
	<title>Rift — Case study · Braison Swilling</title>
	<meta
		name="description"
		content="Building Rift: a Rust desktop app for coding with AI — an assistant that reads your code and runs git for you, a built-in browser, and updates that install themselves. Public download."
	/>
	<meta property="og:title" content="Rift — Case study · Braison Swilling" />
	<meta
		property="og:description"
		content="Building Rift: a Rust desktop app for coding with AI — an assistant that reads your code and runs git for you, a built-in browser, and updates that install themselves. Public download."
	/>
	<meta property="og:url" content="https://blazzer10200.github.io/rift" />
	<meta name="twitter:title" content="Rift — Case study · Braison Swilling" />
</svelte:head>

<svelte:window onkeydown={onPlayerKeydown} />

<TopBar variant="case-study" brandRole="Rift · Case study" links={navLinks} />

<main class="page">
	<!-- Hero -->
	<section class="hero reveal">
		<div class="hero-eyebrow">
			<span>Case study</span>
			<span class="pill">v0.24.0 · alpha, but real</span>
		</div>

		<h1>A desktop cockpit with an AI assistant that <em>actually does the work.</em></h1>

		<p class="hero-sub">
			Rift is a desktop app for coding with AI. The assistant works inside your project — it reads
			your files, searches the code, runs git, and proposes changes for you to approve — all inside a
			real desktop app with multiple chats at once, a built-in browser, and a running cost meter.
		</p>
		<p class="hero-sub">
			It's built on <strong>Rust</strong> for the speed and safety that matters in a desktop app,
			the assistant can act on the app itself, and it installs and updates without you lifting a
			finger — and nothing ships unless every test passes first. It's early, but
			<strong>you can download and run it right now.</strong>
		</p>

		<div class="hero-actions stagger">
			<a
				class="btn primary"
				href="https://github.com/Blazzer10200/rift/releases/latest"
				target="_blank"
				rel="noopener"
			>
				<span class="ico">↓</span> Download Rift
			</a>
			<a class="btn" href="#film">
				<span class="ico">▸</span> Watch the film
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
				<div class="hero-meta-v">Rust · Tauri 2 · Svelte 5</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Surface</div>
				<div class="hero-meta-v">Desktop · AI cockpit</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Status</div>
				<div class="hero-meta-v accent">Alpha · public download</div>
			</div>
		</div>
	</section>

	<!-- Stats band -->
	<section class="stats reveal" aria-label="Rift at a glance">
		<div class="stat">
			<div class="stat-n">v0.24</div>
			<div class="stat-l">the version you can download today</div>
		</div>
		<div class="stat">
			<div class="stat-n">~44k</div>
			<div class="stat-l">lines of Rust and TypeScript</div>
		</div>
		<div class="stat">
			<div class="stat-n">286</div>
			<div class="stat-l">tests · 64 Rust + 222 vitest</div>
		</div>
		<div class="stat">
			<div class="stat-n">1</div>
			<div class="stat-l">person — me, start to finish</div>
		</div>
	</section>

	<!-- 01 The film -->
	<section class="block reveal" id="film">
		<SectionRail num="01 / 06" label="The film" meta="73 seconds" />
		<h2>Here's what it actually looks like.</h2>
		<p class="body">
			Describe the work and watch it happen — the assistant plans and edits your code live, checks
			its own work, and you steer it with a sentence. Two chats side by side, a private local model,
			and a single preset that restyles the whole app. No narration needed.
		</p>

		<figure class="film-wrap stagger">
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<div
				class="player"
				class:idle={!controlsVisible && playing}
				bind:this={player}
				role="region"
				aria-label="Rift showcase film"
				tabindex="0"
				onpointermove={nudgeControls}
				onmouseleave={() => playing && (controlsVisible = false)}
				onfullscreenchange={() => (fullscreen = !!document.fullscreenElement)}
			>
				<video
					class="film"
					bind:this={video}
					preload="metadata"
					playsinline
					poster="{base}/videos/rift-film-poster.jpg"
					ontimeupdate={onTimeUpdate}
					onloadedmetadata={onLoaded}
					onplay={() => { playing = true; nudgeControls(); }}
					onpause={() => { playing = false; controlsVisible = true; }}
					onended={() => { playing = false; controlsVisible = true; }}
					onvolumechange={() => { muted = video.muted; volume = video.volume; }}
					onclick={togglePlay}
				>
					<source src="{base}/videos/rift-film.mp4" type="video/mp4" />
					Your browser doesn't play MP4 — the case study below covers everything in the film.
				</video>

				<!-- click-to-play surface (poster shows until first play) -->
				{#if !started}
					<button class="poster-overlay" onclick={togglePlay} aria-label="Play">
						<span class="play-cue">
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
						</span>
					</button>
				{/if}

				<!-- control bar -->
				<div class="controls" aria-hidden={!started}>
					<!-- scrub track -->
					<div
						class="track"
						role="slider"
						tabindex="-1"
						aria-label="Seek"
						aria-valuemin="0"
						aria-valuemax={Math.round(duration)}
						aria-valuenow={Math.round(current)}
						onpointerdown={onTrackPointerDown}
						onpointermove={onTrackPointerMove}
						onpointerup={onTrackPointerUp}
					>
						<div class="track-rail"></div>
						<div class="track-buffered" style:width="{bufferedPct}%"></div>
						<div class="track-fill" style:width="{progress}%"></div>
						<div class="track-knob" style:left="{progress}%"></div>
					</div>

					<div class="ctl-row">
						<button class="ctl" onclick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
							{#if playing}
								<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
							{:else}
								<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
							{/if}
						</button>

						<div class="vol">
							<button class="ctl" onclick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
								{#if muted || volume === 0}
									<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4zm12.5 3a4.5 4.5 0 00-2-3.7v1.6L17 12l-2.5 2.1v1.6a4.5 4.5 0 002-3.7z" opacity=".4"/><path d="M19 5l-2 2 5 5-5 5 2 2 5-5z" transform="translate(-3.5 0)"/></svg>
								{:else}
									<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 5V4L8 9H4zm11.5-2.5a6.5 6.5 0 010 11v-1.8a4.7 4.7 0 000-7.4zm-1.5 3a3 3 0 010 5V9.5z"/></svg>
								{/if}
							</button>
							<input
								class="vol-slider"
								type="range"
								min="0"
								max="1"
								step="0.05"
								value={muted ? 0 : volume}
								oninput={onVolumeInput}
								aria-label="Volume"
							/>
						</div>

						<span class="time">{fmt(current)} <span class="time-sep">/</span> {fmt(duration)}</span>

						<span class="ctl-spacer"></span>

						<button class="ctl" onclick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
							{#if fullscreen}
								<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg>
							{:else}
								<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 14H5v5h5v-2H7zm-2-4h2V7h3V5H5zm12 7h-3v2h5v-5h-2zM14 5v2h3v3h2V5z"/></svg>
							{/if}
						</button>
					</div>
				</div>
			</div>
			<figcaption>Every frame is the real app — the actual Rift interface, driven through a live session and captured start to finish.</figcaption>
		</figure>
	</section>

	<!-- 02 The problem -->
	<section class="block reveal">
		<SectionRail num="02 / 06" label="The problem" meta="Why this exists" />
		<h2>The best AI coding tool lives in a terminal window. I wanted a real app.</h2>
		<p class="body">
			The AI I code with every day runs in a plain terminal — powerful, but a cramped place to work.
			No tabs, no clean way to review its changes side by side, no browser for the thing you just
			built, no sense of what a session costs until the bill arrives. Most desktop alternatives just
			wrap a web page around a chat box and call it an app.
		</p>
		<p class="body">
			Rift is that workflow built as a proper desktop app. Point it at a project and the assistant
			works the same way you would — reading the code, searching it, running git — while you approve
			every change before it lands. The preview opens in a browser docked beside the chat, your cost
			and usage stay in view, and you can talk to it instead of typing.
		</p>
	</section>

	<!-- 03 Inside Rift -->
	<section class="block reveal">
		<SectionRail num="03 / 06" label="Inside Rift" meta="Three pillars" />
		<h2>Three things make it more than a chat window.</h2>
		<p class="body">
			An assistant that actually does the work, an app it can act on, and a build that ships and
			updates itself. The film above shows all three in motion.
		</p>

		<div class="challenges stagger">
			{#each pillars as p (p.n)}
				<article class="ch">
					<div class="ch-head">
						<span class="ch-num">{p.n}</span>
						<span class="ch-title">{p.title}</span>
					</div>
					{#if p.html}
						<p>{@html p.html}</p>
					{:else}
						<p>{p.body}</p>
					{/if}
					<dl class="kv">
						{#each p.kv as [k, v] (k)}
							<dt>{k}</dt>
							<dd>{v}</dd>
						{/each}
					</dl>
				</article>
			{/each}
		</div>

		<div class="stack-row">
			<span class="chip">Rust</span>
			<span class="chip">Tauri 2</span>
			<span class="chip">Svelte 5</span>
			<span class="chip">AI assistant</span>
			<span class="chip">Built-in browser</span>
			<span class="chip">Self-updating</span>
			<span class="chip">Voice input</span>
		</div>

		<h3 class="demo-lead">And a lot more under the hood.</h3>
		<div class="surface stagger">
			<div class="feat">
				<div class="feat-t">Built-in browser</div>
				<p>A real browser docked right beside the chat — scroll, click, type an address. The assistant can open pages in it for you.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Cost cockpit</div>
				<p>See exactly what every turn costs and how much of your usage is left — no surprise bill at the end of the month.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Voice input</div>
				<p>Talk to it instead of typing. The speech-to-text runs entirely on your machine — no audio ever leaves it.</p>
			</div>
			<div class="feat">
				<div class="feat-t">You decide what it can touch</div>
				<p>From "ask me before every change" to "go run on your own" — pick how much freedom the assistant gets, and change it any time.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Work in parallel</div>
				<p>For big jobs, it can split the work across several helpers at once — each kept safely isolated so they don't step on each other.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Prompt polish</div>
				<p>Type a rough thought, hit one button, and it rewrites it into a clear, specific instruction before sending.</p>
			</div>
		</div>
	</section>

	<!-- 04 The ugly corners -->
	<section class="block reveal">
		<SectionRail num="04 / 06" label="The ugly corners" meta="Where the work actually lived" />
		<h2>The easy version is a weekend. <em>The real one took months.</em></h2>
		<p class="body">
			Anyone can put a chat box in a window. The hard part is making an assistant that's safe to
			hand real tools, an app the AI can drive without being able to hijack it, and updates that
			can't leave anyone stranded. That's where the months went. Four of those corners:
		</p>

		<div class="challenges stagger">
			{#each corners as ch (ch.n)}
				<article class="ch ch-corner">
					<div class="ch-head">
						<span class="ch-num">{ch.n}</span>
						<span class="ch-title">{ch.title}</span>
					</div>
					{#if ch.lead}
						<p class="ch-lead">{ch.lead}</p>
					{/if}
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

	<!-- 05 How I built it -->
	<section class="block reveal">
		<SectionRail num="05 / 06" label="How I built it" meta="AI-assisted, not AI-written" />
		<h2>I'm self-taught, and I build by pairing with AI — but I make the calls.</h2>
		<p class="body">
			The way I work: I decide what to build next, sketch out the shape I want and the limits it has
			to respect, and hand that off to the AI. Then I go through what comes back, push back on
			anything that's wrong, and only keep code I actually understand. Nothing ships until it's
			clean — the Rust compiler, the type-checker, and the full test suite all have to pass.
		</p>
		<p class="body">
			That's why I can walk you through any decision in here: why the update system can't lock
			anyone out, why the assistant's access to your code is fenced off the way it is, why the
			security still holds even if one layer fails. The AI helped me move faster. The decisions
			were mine.
		</p>

		<div class="skills">
			<span class="skills-lead">What this demonstrates</span>
			<div class="skills-row">
				<span class="chip">Rust</span>
				<span class="chip">Desktop apps</span>
				<span class="chip">Concurrency</span>
				<span class="chip">Security</span>
				<span class="chip">AI integration</span>
				<span class="chip">Shipping &amp; updates</span>
			</div>
		</div>
	</section>

	<!-- 06 What I'd do differently -->
	<section class="block reveal">
		<SectionRail num="06 / 06" label="What I'd do differently" meta="Honest retro" />
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
			This is the kind of thing I build. <em>If you're hiring, let's talk.</em>
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
	.footer {
		padding: 32px 56px 28px;
		margin-top: 64px;
	}
	@media (max-width: 720px) {
		.footer {
			padding: 28px 20px 24px;
		}
	}

	:global(.ch p code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.92em;
		color: var(--text);
		background: var(--panel);
		padding: 1px 6px;
		border: 1px solid var(--line-2);
		border-radius: 3px;
	}

	/* hero */
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
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
	}
	.hero-meta-v.accent {
		color: var(--accent);
	}

	/* stats band */
	.stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
		margin-top: 8px;
	}
	@media (max-width: 720px) {
		.stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	.stat {
		background: var(--panel);
		padding: 26px 28px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.stat-n {
		font-family: 'JetBrains Mono', monospace;
		font-size: clamp(30px, 4vw, 40px);
		font-weight: 600;
		color: var(--accent);
		line-height: 1;
		letter-spacing: -0.01em;
	}
	.stat-l {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 13px;
		color: var(--text-2);
		line-height: 1.45;
	}

	/* content blocks */
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
	.block h2 :global(em) {
		font-style: normal;
		color: var(--accent);
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

	.demo-lead {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: clamp(20px, 2.4vw, 26px);
		letter-spacing: -0.018em;
		color: var(--text);
		margin: 56px 0 14px;
	}

	/* the film — custom player */
	.film-wrap {
		margin: 36px 0 8px;
	}
	.player {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: #000;
		border: 1px solid var(--line-2);
		border-radius: 10px;
		overflow: hidden;
		outline: none;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.04) inset,
			0 24px 60px -28px rgba(0, 0, 0, 0.9);
		transition: border-color 0.25s ease, box-shadow 0.25s ease;
	}
	.player:focus-visible {
		border-color: var(--accent);
		box-shadow:
			0 0 0 2px var(--accent-glow),
			0 24px 60px -28px rgba(0, 0, 0, 0.9);
	}
	.player.idle {
		cursor: none;
	}
	.film {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		background: #000;
		cursor: pointer;
	}

	/* click-to-play surface — minimal: poster carries the frame, a small play
	   cue appears on hover. No badge, no overlay copy. */
	.poster-overlay {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		border: 0;
		cursor: pointer;
		background: transparent;
		transition: background 0.25s ease;
	}
	.poster-overlay:hover {
		background: rgba(10, 11, 15, 0.18);
	}
	.play-cue {
		display: grid;
		place-items: center;
		width: 54px;
		height: 54px;
		border-radius: 50%;
		background: rgba(13, 15, 20, 0.55);
		backdrop-filter: blur(6px);
		opacity: 0;
		transform: scale(0.9);
		transition: opacity 0.2s ease, transform 0.2s ease, background 0.2s ease;
	}
	.play-cue svg {
		width: 22px;
		height: 22px;
		fill: #fff;
		margin-left: 3px;
	}
	.poster-overlay:hover .play-cue {
		opacity: 1;
		transform: scale(1);
		background: rgba(13, 15, 20, 0.7);
	}

	/* control bar */
	.controls {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 12px 10px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: linear-gradient(to top, rgba(7, 8, 11, 0.92), rgba(7, 8, 11, 0) 100%);
		opacity: 1;
		transform: translateY(0);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}
	.player.idle .controls {
		opacity: 0;
		transform: translateY(8px);
		pointer-events: none;
	}

	.track {
		position: relative;
		height: 16px;
		display: flex;
		align-items: center;
		cursor: pointer;
		touch-action: none;
	}
	.track-rail,
	.track-buffered,
	.track-fill {
		position: absolute;
		left: 0;
		height: 4px;
		border-radius: 2px;
		transition: height 0.12s ease;
	}
	.track-rail {
		width: 100%;
		background: rgba(255, 255, 255, 0.16);
	}
	.track-buffered {
		background: rgba(255, 255, 255, 0.28);
	}
	.track-fill {
		background: var(--accent);
		box-shadow: 0 0 8px var(--accent-glow);
	}
	.track-knob {
		position: absolute;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 4px var(--accent-glow);
		transform: translateX(-50%) scale(0);
		transition: transform 0.12s ease;
	}
	.track:hover .track-rail,
	.track:hover .track-buffered,
	.track:hover .track-fill {
		height: 6px;
	}
	.track:hover .track-knob {
		transform: translateX(-50%) scale(1);
	}

	.ctl-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.ctl {
		display: grid;
		place-items: center;
		width: 34px;
		height: 34px;
		border: 0;
		border-radius: 7px;
		background: transparent;
		color: #e8eaf0;
		cursor: pointer;
		transition: background 0.15s ease, color 0.15s ease;
	}
	.ctl svg {
		width: 20px;
		height: 20px;
		fill: currentColor;
	}
	.ctl:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--accent);
	}
	.ctl-spacer {
		flex: 1;
	}
	.vol {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	.vol-slider {
		width: 0;
		opacity: 0;
		height: 4px;
		accent-color: var(--accent);
		cursor: pointer;
		transition: width 0.2s ease, opacity 0.2s ease;
	}
	.vol:hover .vol-slider,
	.vol-slider:focus-visible {
		width: 72px;
		opacity: 1;
		margin-right: 4px;
	}
	.time {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 12px;
		color: var(--text-2);
		letter-spacing: 0.01em;
		white-space: nowrap;
	}
	.time-sep {
		opacity: 0.5;
	}

	@media (max-width: 560px) {
		.play-cue {
			width: 46px;
			height: 46px;
		}
		.vol-slider {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.player.idle .controls {
			opacity: 1;
			transform: none;
			pointer-events: auto;
		}
		.player.idle {
			cursor: default;
		}
		.poster-overlay:hover .play-cue,
		.track-knob,
		.track-fill {
			transition: none;
		}
	}

	.film-wrap figcaption {
		margin-top: 12px;
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 13px;
		color: var(--text-2);
		line-height: 1.5;
	}

	/* chips */
	.stack-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 28px 0 0;
	}

	/* under-the-hood feature grid — lighter than the pillars, so hierarchy holds */
	.surface {
		margin-top: 18px;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 14px;
	}
	@media (max-width: 880px) {
		.surface {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 560px) {
		.surface {
			grid-template-columns: 1fr;
		}
	}
	.feat {
		border: 1px solid var(--line);
		padding: 16px 18px;
		transition: border-color 0.15s;
	}
	.feat:hover {
		border-color: rgba(120, 196, 255, 0.3);
	}
	.feat-t {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: var(--text);
		margin-bottom: 6px;
		letter-spacing: -0.01em;
	}
	.surface :global(p) {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 13px;
		color: var(--text-2);
		line-height: 1.55;
	}
	.surface :global(p code) {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9em;
		color: var(--text);
		background: var(--panel);
		padding: 1px 5px;
		border: 1px solid var(--line-2);
		border-radius: 3px;
	}

	/* skills strip */
	.skills {
		margin-top: 30px;
	}
	.skills-lead {
		display: block;
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--dim);
		margin-bottom: 12px;
	}
	.skills-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	/* challenges / pillars */
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
	/* corner cards: bold takeaway carries the skim, detail recedes */
	.ch :global(p.ch-lead) {
		font-size: 15.5px;
		font-weight: 500;
		color: var(--text);
		line-height: 1.5;
		margin-bottom: 10px;
		padding-left: 12px;
		border-left: 2px solid var(--accent);
	}
	.ch-corner :global(p:not(.ch-lead)) {
		font-size: 14px;
		color: var(--dim);
	}
	.ch :global(.kv) {
		margin-top: 14px;
		display: grid;
		grid-template-columns: 120px 1fr;
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

	/* lessons */
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

	/* cta */
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
	.cta h3 :global(em) {
		font-style: normal;
		color: var(--accent);
	}
	.cta-actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
	}
</style>
