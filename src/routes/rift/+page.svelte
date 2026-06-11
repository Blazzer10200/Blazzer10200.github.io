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
			title: 'A real agent, native on the desktop',
			body: null,
			html: `The assistant isn't a chat box bolted on — it drives a live <code>claude</code> session over a streaming JSON protocol and hands it workspace-scoped tools through Rift's own <code>MCP server</code>: read, grep, list, and the full local-git surface. Multi-tab conversations, mid-turn steering, five permission modes with live Allow/Deny prompts, and per-turn token/cost telemetry.`,
			kv: [
				['Surface', 'Claude CLI · stream-json · MCP'],
				['Outcome', 'Tool-using agent, in-app']
			]
		},
		{
			n: '02',
			title: 'An app the assistant can drive',
			body: null,
			html: `Rift is self-aware. Over a loopback bridge — NDJSON on <code>127.0.0.1</code>, one token per launch — the model can pop an interactive question card in the chat, open a dev-server preview in the docked browser, or toast the corner of the window when long work finishes. Every turn carries an environment snapshot: what the dock is showing, how hot your plan usage is running.`,
			kv: [
				['Surface', 'Loopback bridge · NDJSON'],
				['Outcome', 'The model sees & drives the UI']
			]
		},
		{
			n: '03',
			title: 'It ships itself',
			body: `Push a version tag and CI builds, packs, and publishes to a public releases repo; installed copies pick it up with Velopack — check on launch, download with progress, swap and relaunch. 138 versions have gone out — through this pipeline and the updaters before it — each behind a green compiler, type-checker, and test suite.`,
			kv: [
				['Surface', 'Velopack · tag-driven CI'],
				['Outcome', 'Real distribution']
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
				['Lesson', 'Sunk cost is not strategy'],
				['Outcome', 'One product, one job']
			]
		},
		{
			n: '02',
			title: 'I shipped an update that bricked every client',
			lead: `Lost the signing key — so I rebuilt auto-update with no key in the critical path.`,
			body: `A release lost its signing key, and the signed-updater plugin meant every installed copy was stranded — it would only accept updates signed by a key I no longer had. I tore the plugin out, rebuilt on the raw GitHub Releases API, then moved to Velopack with no mandatory key. The subtle part: the swap silently no-ops if any child process still holds the install dir, so the apply step reaps the per-turn MCP children before it exits. That failure mode can't strand anyone again.`,
			kv: [
				['Lesson', 'Own your update path'],
				['Outcome', 'Velopack · key-free updates']
			]
		},
		{
			n: '03',
			title: 'My AI can run git — so I attacked it first',
			lead: `The assistant can run git, so I threat-modeled its tool inputs like a CVE before it shipped.`,
			body: null,
			html: `Once the assistant could call <code>git_commit</code> and <code>git_push</code>, the tool inputs became an attack surface. So I threat-modeled it after the 2026 MCP-git argument-injection CVEs: never shell out (<code>Command::new("git").args</code>, never <code>sh -c</code>), strict-allowlist refs and branches so a <code>--upload-pack=</code> flag can't be injected, reject path traversal, cap message size, and refuse <code>force</code> outright. Trust is gated server-side AND in the tool allowlist — defense in depth.`,
			kv: [
				['Lesson', 'Trust the setting, distrust the params'],
				['Outcome', 'Hardened tool surface']
			]
		},
		{
			n: '04',
			title: 'The model was being told to use a tool that didn’t exist',
			lead: `A steering message pointed the AI at ask_user — a tool the big deletion had silently unregistered.`,
			body: null,
			html: `While auditing the tool surface I found a ghost: the deny-handler steered the model toward <code>ask_user</code>, the allowlist included it, the entire frontend card UI for it sat dormant — but the bridge that registered it had died in the sync deletion. The model was being coached to call a tool that wasn't there. I rebuilt the bridge minimal: NDJSON over loopback, a single per-launch token, and graceful degradation — if the bridge is down the tools unlist instead of erroring.`,
			kv: [
				['Lesson', 'Audit what you tell the model'],
				['Outcome', 'ask_user · open_browser · notify, live']
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
</script>

<svelte:head>
	<title>Rift — Case study · Braison Swilling</title>
	<meta
		name="description"
		content="Building Rift: a Rust + Tauri desktop cockpit for coding with AI — a tool-using assistant with workspace and git tools, an in-app browser, and a self-updating ship pipeline."
	/>
	<meta property="og:title" content="Rift — Case study · Braison Swilling" />
	<meta
		property="og:description"
		content="Building Rift: a Rust + Tauri desktop cockpit for coding with AI — a tool-using assistant with workspace and git tools, an in-app browser, and a self-updating ship pipeline."
	/>
	<meta property="og:url" content="https://blazzer10200.github.io/rift" />
	<meta name="twitter:title" content="Rift — Case study · Braison Swilling" />
</svelte:head>

<TopBar variant="case-study" brandRole="Rift · Case study" links={navLinks} />

<main class="page">
	<!-- Hero -->
	<section class="hero reveal">
		<div class="hero-eyebrow">
			<span>Case study</span>
			<span class="pill">v0.8.21 · 138 versions shipped</span>
		</div>

		<h1>A desktop cockpit with an AI assistant that <em>actually does the work.</em></h1>

		<p class="hero-sub">
			Rift is a desktop app for coding with AI. A real tool-using Claude session runs against your
			local workspace — it reads files, greps, runs git, and proposes diffs you review — inside a
			native app with multi-tab chats, a docked browser, and live cost telemetry.
		</p>
		<p class="hero-sub">
			It runs on a <strong>pure-Rust backend</strong> behind a Svelte 5 interface, drives its own
			UI through a loopback bridge, and installs and updates itself — every release shipped behind
			a green compiler, type-checker, and test suite.
		</p>

		<div class="hero-actions stagger">
			<a class="btn primary" href="#film">
				<span class="ico">↓</span> Watch the film
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
				<div class="hero-meta-v accent">Daily-driven</div>
			</div>
		</div>
	</section>

	<!-- Stats band -->
	<section class="stats reveal" aria-label="Rift at a glance">
		<div class="stat">
			<div class="stat-n">~43k</div>
			<div class="stat-l">lines of Rust &amp; TypeScript, live today</div>
		</div>
		<div class="stat">
			<div class="stat-n">138</div>
			<div class="stat-l">versions shipped</div>
		</div>
		<div class="stat">
			<div class="stat-n">219</div>
			<div class="stat-l">tests · 97 Rust + 122 vitest</div>
		</div>
		<div class="stat">
			<div class="stat-n">1</div>
			<div class="stat-l">developer — designed, built, shipped</div>
		</div>
	</section>

	<!-- 01 The film -->
	<section class="block reveal" id="film">
		<SectionRail num="01 / 06" label="The film" meta="36 seconds" />
		<h2>See it move.</h2>
		<p class="body">
			Five beats — sharpen the prompt, run a real agent, ship real changes, see every token, make
			it yours. Thirty-six seconds, no narration needed.
		</p>

		<figure class="film-wrap stagger">
			<video
				class="film"
				controls
				preload="metadata"
				playsinline
				poster="{base}/videos/rift-film-poster.jpg"
			>
				<source src="{base}/videos/rift-film.mp4" type="video/mp4" />
				Your browser doesn't play MP4 — the case study below covers everything in the film.
			</video>
			<figcaption>The film itself is code — composed and rendered programmatically with Remotion.</figcaption>
		</figure>
	</section>

	<!-- 02 The problem -->
	<section class="block reveal">
		<SectionRail num="02 / 06" label="The problem" meta="Why this exists" />
		<h2>The best coding agent lives in a terminal. I wanted a cockpit.</h2>
		<p class="body">
			The agent I code with every day is a CLI — powerful, and a thin place to live. No tabs, no
			diff-review surface, no browser for the thing you just built, no sense of what a turn costs
			until the bill lands. The desktop options mostly wrap a web page around a chat box and call
			it an app.
		</p>
		<p class="body">
			Rift is the native version of that loop. Point it at a workspace and the assistant works with
			the same tools you would — read, grep, git — while you review every diff it proposes. The preview opens in
			a browser docked beside the chat, cost and plan usage sit on the rail, and your voice works
			as well as your keyboard.
		</p>
	</section>

	<!-- 03 Inside Rift -->
	<section class="block reveal">
		<SectionRail num="03 / 06" label="Inside Rift" meta="Three pillars" />
		<h2>An agent that acts, an app it can drive, and a build that ships itself.</h2>
		<p class="body">
			Three things make Rift more than a chat window — the film above shows all three moving.
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
			<span class="chip">MCP server</span>
			<span class="chip">Tokio async</span>
			<span class="chip">Velopack</span>
			<span class="chip">Whisper FFI</span>
		</div>

		<h3 class="demo-lead">And a lot more under the hood.</h3>
		<div class="surface stagger">
			<div class="feat">
				<div class="feat-t">In-app browser dock</div>
				<p>A native child webview docked beside the assistant — real scroll, clicks, and address bar. The model can open pages in it.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Cost cockpit</div>
				<p>Per-turn token and dollar telemetry, budget insights, and live plan-usage gauges — it knows how hot your 5-hour window runs.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Voice input</div>
				<p>On-device speech-to-text through a Whisper FFI binding — no audio leaves the machine.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Five permission modes</div>
				<p>Live Allow/Deny tool prompts, answered mid-turn over the agent control protocol.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Edit swarm</div>
				<p>Parallel sub-agent edit batching with worktree isolation, behind its own safety layer.</p>
			</div>
			<div class="feat">
				<div class="feat-t">Prompt enhancer</div>
				<p>A one-shot model pass that sharpens a rough draft into a clear instruction, streamed live.</p>
			</div>
		</div>
	</section>

	<!-- 04 The ugly corners -->
	<section class="block reveal">
		<SectionRail num="04 / 06" label="The ugly corners" meta="Where the work actually lived" />
		<h2>The pitch is three sentences. <em>These are the parts that made it real.</em></h2>
		<p class="body">
			A chat box in a webview is a weekend. An agent that's safe to hand real tools, an app the
			model can drive but not hijack, and an updater that can't strand anyone — that's where the
			months went. Four of the corners the time actually went into:
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

	<!-- 05 How I built it -->
	<section class="block reveal">
		<SectionRail num="05 / 06" label="How I built it" meta="AI-assisted, not AI-written" />
		<h2>I designed Rift. <em>I read every diff.</em></h2>
		<p class="body">
			I'm self-taught, and I work fast by pairing with AI — but I make the calls. My loop: decide the
			next piece, sketch the shape and the constraints, and hand it off. I read everything that comes
			back, push on anything that's off, and only keep what I understand. Every release ships behind a
			real verification gate — the Rust compiler clean, the type-checker clean, the test suite green.
		</p>
		<p class="body">
			That's why I can explain any decision in here: why the updater has no signing key, why the git
			tools never shell out, why the bridge trusts a per-launch token and not a port number. The AI
			made me faster. I made the architecture.
		</p>

		<div class="skills">
			<span class="skills-lead">What this demonstrates</span>
			<div class="skills-row">
				<span class="chip">Rust</span>
				<span class="chip">Tokio async</span>
				<span class="chip">Process orchestration</span>
				<span class="chip">Systems security</span>
				<span class="chip">Agent &amp; tool protocols</span>
				<span class="chip">Windows distribution</span>
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

	/* the film */
	.film-wrap {
		margin: 36px 0 8px;
	}
	.film {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 9;
		background: #000;
		border: 1px solid var(--line-2);
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
