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
			title: 'An AI with real tools, not just chat',
			body: null,
			html: `This isn't a chat box with a fancy name. The AI actually does the work. It reads your files and searches your code, and it can run git for you (the tool that saves and tracks code changes). Everything it touches is fenced to the one folder you point it at. You can keep several conversations going, jump in and redirect it mid-task, set exactly what it's allowed to touch, and watch what each turn is costing you as it goes.`,
			kv: [
				['What it does', 'Reads and searches your code, runs git'],
				['Your part', 'You stay in control and review the work']
			]
		},
		{
			n: '02',
			title: 'An app the AI can drive',
			body: null,
			html: `Most AI tools can only talk back at you. Rift's AI can actually act on the app. When it needs a decision, a question pops up right in the chat. It can open a live preview of whatever you're building in the browser that's built in. When a long job finishes, it nudges the corner of the window so you know. It also keeps track of where things stand, like what's on your screen and how much of your usage you've spent.`,
			kv: [
				['What it does', 'Asks you, shows previews, sends a nudge'],
				['What it tracks', "What's on screen and how much is left"]
			]
		},
		{
			n: '03',
			title: 'It ships itself',
			body: `One command starts a release. It builds the app, packages it up, and publishes it, and every copy already out in the world updates itself the next time someone opens it. The current build is public right now, a one-click Windows installer, v0.26.1. And nothing ever goes out the door unless the compiler, the type-checker, and the full test suite all pass first.`,
			kv: [
				['What it does', 'Builds, packages, and publishes itself'],
				['Right now', 'Public download, v0.26.1']
			]
		}
	];

	const corners = [
		{
			n: '01',
			title: 'I deleted the feature the app was named for',
			lead: `Rift started as a tool for syncing files to game servers. I cut the entire sync half, about a quarter of the code, once the AI part became the real product.`,
			body: `Rift began as a control panel for game-server developers. It watched your files and pushed them to a remote server safely. Then the AI side outgrew all of that. I noticed I was opening Rift to write code, not to sync anything. So I tore out the half the app was literally named after: the remote connection, the file watcher, all of it. That was around 13,000 lines, deleted on purpose. What's left does one job, and every line of it earns its place.`,
			kv: [
				['What I cut', 'About 13,000 lines, on purpose'],
				['The result', 'One product that does one job']
			]
		},
		{
			n: '02',
			title: 'I shipped an update that broke every copy out there',
			lead: `One lost key locked everyone out. So I rebuilt updates so that no key can ever do that again.`,
			body: `My old update system signed each release with a secret key. When I lost that key, every installed copy was stuck and could never accept another update again. I rebuilt the whole thing so there's no key left to lose in the first place. The tricky part was that an update quietly fails if the app is still busy in the background, so the new system shuts those jobs down cleanly before it swaps itself out. Nobody gets stranded like that again.`,
			kv: [
				['The fix', 'No key left to lose'],
				['The result', "Updates that can't lock anyone out"]
			]
		},
		{
			n: '03',
			title: 'My AI can run git, so I attacked it first',
			lead: `The AI can save and push code on its own. Before it shipped, I tried to break it on purpose.`,
			body: `The moment an AI can run real commands on your machine, those commands become a door someone could sneak through. Real security holes had just turned up in tools a lot like mine, so I assumed mine had them too. I locked down everything it accepts. It can only touch the project folder, it can only run a short list of safe operations, it can't be tricked into reaching outside the project, and it flatly refuses anything dangerous. Two separate checks both have to agree before it's allowed to act, so if one of them is ever wrong, the other still holds the line.`,
			kv: [
				['My approach', 'Two checks, and both have to agree'],
				['The result', 'Locked down before it ever shipped']
			]
		},
		{
			n: '04',
			title: "The AI was being told to use a tool that didn't exist",
			lead: `It was being pointed at a feature an earlier cleanup had quietly deleted.`,
			body: `While I was going through what the AI could do, I found a ghost. Whenever it got stuck, the app would tell it to go ask me a question. But the feature that actually showed me that question had been deleted weeks earlier in a big cleanup. The AI was being told to use something that wasn't there anymore. I rebuilt it properly and made it fail gracefully. Now, if that part is ever down, the AI just isn't offered those tools at all, instead of trying and hitting an error.`,
			kv: [
				['The fix', 'Rebuilt it, and it fails gracefully now'],
				['The result', 'Asking, previews, and nudges all work']
			]
		}
	];

	const lessons = [
		{
			n: '01',
			title: 'Write the security plan before the feature',
			body: `The git lockdown got designed up front, written out before a single line shipped. That's the order I want for anything that touches the internet or runs a command. Figure out how it could go wrong first, don't bolt safety on after it already works.`
		},
		{
			n: '02',
			title: 'Delete faster',
			body: `I knew the AI was the real product weeks before I actually cut the sync half. I held onto dead weight because I'd already sunk time into it, and when I finally cut it, it left that ghost tool behind. Next time I'll make the call the same week the evidence is in front of me.`
		},
		{
			n: '03',
			title: 'Keep files small enough to hold in your head',
			body: `A couple of core files grew past 2,000 lines and got scary to touch. I've been breaking them into smaller, focused pieces. The work goes a lot easier when each piece fits in your head at once.`
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
	<title>Rift · Case study · Braison Swilling</title>
	<meta
		name="description"
		content="Building Rift, a desktop app for coding with AI. The AI reads your code and can run git for you, there's a web browser built in, and it updates itself. You stay in control. Free public download."
	/>
	<meta property="og:title" content="Rift · Case study · Braison Swilling" />
	<meta
		property="og:description"
		content="Building Rift, a desktop app for coding with AI. The AI reads your code and can run git for you, there's a web browser built in, and it updates itself. You stay in control. Free public download."
	/>
	<meta property="og:url" content="https://blazzer10200.github.io/rift" />
	<meta name="twitter:title" content="Rift · Case study · Braison Swilling" />
	<link rel="canonical" href="https://blazzer10200.github.io/rift" />
</svelte:head>

<svelte:window onkeydown={onPlayerKeydown} />

<TopBar variant="case-study" brandRole="Rift · Case study" links={navLinks} />

<main class="page">
	<!-- Hero -->
	<section class="hero reveal">
		<div class="hero-eyebrow">
			<span>Case study</span>
			<span class="pill">v0.26.1 · early, but real</span>
		</div>

		<h1>A desktop app with an AI that actually does the work.</h1>

		<p class="hero-sub">
			Rift is a desktop app for coding with AI. The AI works inside your project. It reads your
			files, searches the code, and can run git for you, then proposes changes you approve. All of
			that lives in a real desktop app, with several chats open at once, a web browser built in, and
			a meter showing what each turn costs.
		</p>
		<p class="hero-sub">
			It runs on <strong>Rust</strong>, which keeps it fast and stable. The AI can act on the app
			itself, and the whole thing installs and updates without you lifting a finger. Nothing ever
			ships unless every test passes first. It's still early, but
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
			<div class="stat-n">v0.26</div>
			<div class="stat-l">the version you can download today</div>
		</div>
		<div class="stat">
			<div class="stat-n">56</div>
			<div class="stat-l">public releases so far, Rust and TypeScript</div>
		</div>
		<div class="stat">
			<div class="stat-n">286</div>
			<div class="stat-l">tests · 64 Rust + 222 vitest</div>
		</div>
		<div class="stat">
			<div class="stat-n">1</div>
			<div class="stat-l">person built it. Me, start to finish.</div>
		</div>
	</section>

	<!-- 01 The film -->
	<section class="block reveal" id="film">
		<SectionRail num="01 / 06" label="The film" meta="73 seconds" />
		<h2>Here's what it actually looks like.</h2>
		<p class="body">
			Tell it what you want and watch it happen. The AI plans the work, edits your code live, and
			checks its own work, and you steer the whole thing with a sentence here and there. You'll see
			two chats running side by side, an AI model running privately on the machine, and one click
			that restyles the entire app. No narration, just the real thing working.
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
					Your browser doesn't play MP4. The case study below covers everything in the film.
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
			<figcaption>Every frame here is the real app. This is the actual Rift, running a live session, captured start to finish.</figcaption>
		</figure>
	</section>

	<!-- 02 The problem -->
	<section class="block reveal">
		<SectionRail num="02 / 06" label="The problem" meta="Why this exists" />
		<h2>The best AI coding tool lives in a terminal window. I wanted a real app.</h2>
		<p class="body">
			The AI I code with every day runs in a plain terminal window. It's powerful, but it's a cramped
			place to work. There are no tabs. There's no clean way to look at its changes side by side, no
			browser for the thing you just built, and no sense of what a session is costing you until the
			bill shows up. Most of the desktop versions out there just wrap a web page around a chat box and
			call it an app.
		</p>
		<p class="body">
			Rift takes that same way of working and builds it into a proper desktop app. You point it at a
			project and the AI works the way you would. It reads the code, searches it, and runs git, while
			you approve every change before it lands. The preview opens in a browser docked right next to
			the chat, your cost and usage stay in view the whole time, and you can talk to it instead of
			typing.
		</p>
	</section>

	<!-- 03 Inside Rift -->
	<section class="block reveal">
		<SectionRail num="03 / 06" label="Inside Rift" meta="Three pillars" />
		<h2>Three things make it more than a chat window.</h2>
		<p class="body">
			There's an AI that actually does the work. There's an app it can reach out and act on. And the
			whole thing ships and updates itself. The film above shows all three of them in motion.
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
				<div class="feat-t">A browser built in</div>
				<p>A real web browser docked right next to the chat. You can scroll, click, and type an address, and the AI can open pages in it for you.</p>
			</div>
			<div class="feat">
				<div class="feat-t">See what it costs</div>
				<p>You can see exactly what every turn costs and how much of your usage is left. No surprise bill at the end of the month.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Talk to it</div>
				<p>Speak instead of typing. The part that turns your voice into text runs right on your computer, so no audio ever leaves it.</p>
			</div>
			<div class="feat">
				<div class="feat-t">You decide what it can touch</div>
				<p>Set it to ask you before every change, or let it run on its own. You choose how much freedom the AI gets, and you can change it any time.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Work on several things at once</div>
				<p>For a big job, it can split the work across several helpers running at the same time. Each one is kept walled off so they don't step on each other.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Clean up your wording</div>
				<p>Type a rough thought, hit one button, and it rewrites it into a clear, specific instruction before it sends.</p>
			</div>
		</div>
	</section>

	<!-- 04 The ugly corners -->
	<section class="block reveal">
		<SectionRail num="04 / 06" label="The ugly corners" meta="Where the work actually lived" />
		<h2>You could fake this in a weekend. The real version took months.</h2>
		<p class="body">
			Anyone can put a chat box in a window. The hard part is making an AI that's actually safe to
			hand real tools to. It's building an app the AI can drive without being able to hijack it. It's
			shipping updates that can't leave anyone stranded. That's where the months went. Here are four
			of those corners.
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
		<h2>I taught myself this, and I build by working alongside AI. But I make the calls.</h2>
		<p class="body">
			Here's how I actually work. I decide what to build next. I sketch out the shape I want and the
			limits it has to stay inside, and I hand that to the AI. Then I read back through everything it
			gives me, push back on whatever's wrong, and only keep code I genuinely understand. Nothing
			ships until it's clean. The Rust compiler, the type-checker, and the full test suite all have to
			pass first.
		</p>
		<p class="body">
			That's why I can walk you through any decision on this page. Why the update system can't lock
			anyone out. Why the AI's reach into your code is fenced off the way it is. Why the security
			still holds even if one check fails. The AI helped me move faster. The decisions were all mine.
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
			This is the kind of thing I build. If you're hiring, let's talk.
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
