<script lang="ts">
	import TopBar from '$lib/components/TopBar.svelte';
	import SectionRail from '$lib/components/SectionRail.svelte';
	import RiftChatDemo from '$lib/components/RiftChatDemo.svelte';

	const navLinks = [
		{ href: '/', label: '← Back to résumé', primary: true },
		{ href: '#demo', label: 'Live demo ↓', external: false }
	];

	const pillars = [
		{
			n: '01',
			title: 'Live server sync',
			body: `Rift watches a local folder and mirrors every change to a remote game server over SSH — debounced, batched, atomic. Uploads land in a .rift-tmp sidecar and rename into place, so a running server never reads a half-written file. A three-way drift scanner shows local↔remote divergence before you sync.`,
			kv: [
				['Surface', 'Pure-Rust SSH/SFTP (russh)'],
				['Outcome', 'No more manual SCP']
			]
		},
		{
			n: '02',
			title: 'An AI assistant that can act',
			body: null,
			html: `The built-in assistant isn't a chat box bolted on — it drives a real <code>claude</code> session over a streaming JSON protocol and exposes its own tools through an <code>MCP server</code>. It can read your workspace, run git, and propose edits, with multi-tab conversations, live streaming, and token/cost telemetry.`,
			kv: [
				['Surface', 'MCP server · stream-json'],
				['Outcome', 'Tool-using agent, in-app']
			]
		},
		{
			n: '03',
			title: 'It actually ships',
			body: `Rift installs from an NSIS installer and updates itself — I rebuilt the auto-updater on the raw GitHub Releases API after a signing-key loss bricked an earlier version. ~40 tagged releases in six weeks, each with a written changelog and a SHA-256 round-trip verify at publish.`,
			kv: [
				['Surface', 'NSIS + self-update'],
				['Outcome', 'Real distribution']
			]
		}
	];

	const corners = [
		{
			n: '01',
			title: 'I shipped an update that bricked every client',
			body: `A release lost its signing key, and the signed-updater plugin meant every installed copy was stranded — it would only accept updates signed by a key I no longer had. I tore the plugin out and rebuilt auto-update on the raw GitHub Releases API: poll the latest tag, semver-compare, stream the installer down with a progress bar, verify the hash, relaunch. No signing key in the critical path means that failure can't happen again.`,
			kv: [
				['Lesson', 'Own your update path'],
				['Outcome', 'Signing-key-free updater']
			]
		},
		{
			n: '02',
			title: 'My AI can run git — so I attacked it first',
			body: null,
			html: `Once the assistant could call <code>git_commit</code> and <code>git_push</code>, the tool inputs became an attack surface. So I threat-modeled it after the 2026 MCP-git argument-injection CVEs: never shell out (<code>Command::new("git").args</code>, never <code>sh -c</code>), strict-allowlist refs and branches so a <code>--upload-pack=</code> flag can't be injected, reject path traversal, cap message size, and refuse <code>force</code> outright. Trust is gated server-side AND in the tool allowlist — defense in depth.`,
			kv: [
				['Lesson', 'Trust the setting, distrust the params'],
				['Outcome', 'Hardened tool surface']
			]
		},
		{
			n: '03',
			title: 'Files were silently uploading as zero bytes',
			body: null,
			html: `Some uploads landed on the server as 0-byte files. The culprit was one line: the post-upload <code>SETSTAT</code> was built from <code>FileAttributes::default()</code>, and the default carries <code>size = 0</code> — so the server truncated the file the moment it arrived, and the atomic rename then promoted the zeroed copy. Switching to <code>::empty()</code> fixed it, and I wrote a regression test that runs against a real SSH server so it can never come back.`,
			kv: [
				['Lesson', 'Defaults aren’t neutral'],
				['Outcome', 'Live-server regression test']
			]
		},
		{
			n: '04',
			title: 'The UI hung for two minutes on a background task',
			body: null,
			html: `Ask the assistant to start a dev server and the whole UI froze in "streaming" for minutes. Turn-completion was gated on the <code>claude</code> process exiting — but a backgrounded child keeps it alive for its entire lifetime, so the wait never returned. The fix was to fire "done" the instant the result frame arrives (an <code>AtomicBool</code> flag), then kill only the parent PID with a grace period so the detached process survives. Tracing it meant understanding how child processes inherit and hold pipe handles.`,
			kv: [
				['Lesson', 'Process lifetime ≠ task lifetime'],
				['Outcome', 'Instant turn-end, bg survives']
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
			title: 'Test against the real thing earlier',
			body: `Mocks hid the zero-byte bug for weeks. Standing up a real SSH server to test against caught it and a class of others. I'd build that harness on day one next time.`
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
		content="Building Rift: a Rust + Tauri desktop dev cockpit with live SSH/SFTP server sync and an embedded, tool-using AI assistant."
	/>
	<meta property="og:title" content="Rift — Case study · Braison Swilling" />
	<meta
		property="og:description"
		content="Building Rift: a Rust + Tauri desktop dev cockpit with live SSH/SFTP server sync and an embedded, tool-using AI assistant."
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
			<span class="pill">v0.4.43 · ~40 releases</span>
		</div>

		<h1>A desktop cockpit with an AI assistant that <em>actually does the work.</em></h1>

		<p class="hero-sub">
			Rift is a desktop app for developers who run game servers. It keeps your local code and the
			live server in lockstep over SSH, and it ships with an AI assistant that doesn't just chat —
			it reads your workspace, runs git, and proposes edits through real tools.
		</p>
		<p class="hero-sub">
			It runs on a <strong>pure-Rust backend</strong> behind a Svelte 5 interface, installs and
			updates itself, and has grown to <strong>~56,000 lines</strong> across ~40 releases in six
			weeks — every one shipped behind a green compiler, type-checker, and test suite.
		</p>

		<div class="hero-actions stagger">
			<a class="btn primary" href="#demo">
				<span class="ico">↓</span> Try the assistant
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
				<div class="hero-meta-v">Desktop · sync + assistant</div>
			</div>
			<div class="hero-meta-cell">
				<div class="hero-meta-k">Status</div>
				<div class="hero-meta-v accent">Daily-driven · alpha</div>
			</div>
		</div>
	</section>

	<!-- 01 The problem -->
	<section class="block reveal">
		<SectionRail num="01 / 05" label="The problem" meta="Why this exists" />
		<h2>Editing a live game server means a hundred tiny file transfers a day.</h2>
		<p class="body">
			Game-server developers iterate against a remote machine: change a script locally, get it onto
			the server, restart the resource, check it in-game. The usual loop is a manual SCP or a
			drag-in-WinSCP every single time — slow, error-prone, and easy to forget a file. Worse, push a
			half-written file and the running server can read it mid-save and crash.
		</p>
		<p class="body">
			Rift collapses that loop. Point it at a folder, and it keeps the server in sync as you type —
			atomically, so the server only ever sees complete files — and it tells you the moment local and
			remote drift apart.
		</p>
	</section>

	<!-- 02 Inside Rift -->
	<section class="block reveal" id="demo">
		<SectionRail num="02 / 05" label="Inside Rift" meta="Three pillars" />
		<h2>Sync, an assistant that can act, and a build that actually ships.</h2>
		<p class="body">
			Three things make Rift more than a file-sync tool. Below the pillars, the real centerpiece — a
			recreation of the in-app AI assistant. It's running live in your browser: watch it work, then
			hit Replay.
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

		<h3 class="demo-lead">The assistant, live.</h3>
		<p class="body">
			This is a faithful recreation of a Rift assistant turn — a real question, the tool-calls it
			makes on a numbered status rail, and the answer streaming in. (The actual app drives a live
			Claude session; this runs entirely in your browser.)
		</p>
		<RiftChatDemo />

		<div class="stack-row">
			<span class="chip">Rust</span>
			<span class="chip">Tauri 2</span>
			<span class="chip">Svelte 5</span>
			<span class="chip">russh (SSH/SFTP)</span>
			<span class="chip">MCP server</span>
			<span class="chip">Tokio async</span>
			<span class="chip">NSIS installer</span>
		</div>
	</section>

	<!-- 03 The ugly corners -->
	<section class="block reveal">
		<SectionRail num="03 / 05" label="The ugly corners" meta="Where the work actually lived" />
		<h2>The pitch is three sentences. <em>These are the parts that made it real.</em></h2>
		<p class="body">
			A sync tool with a chat box is a weekend. Making it safe to run against a live server, hard to
			misuse, and able to update itself without my help took the other six weeks. Four of the corners
			the time actually went into:
		</p>

		<div class="challenges stagger">
			{#each corners as ch (ch.n)}
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
		<h2>I designed Rift. <em>I read every diff.</em></h2>
		<p class="body">
			I'm self-taught, and I work fast by pairing with AI — but I make the calls. My loop: decide the
			next piece, sketch the shape and the constraints, and hand it off. I read everything that comes
			back, push on anything that's off, and only keep what I understand. Every release ships behind a
			real verification gate — the Rust compiler clean, the type-checker clean, the test suite green.
		</p>
		<p class="body">
			That's why I can explain any decision in here: why the updater has no signing key, why the git
			tools never shell out, why uploads go through a temp-and-rename. The AI made me faster. I made
			the architecture.
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

	/* chips */
	.stack-row {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 28px 0 0;
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
