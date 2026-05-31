<script lang="ts">
	// Self-contained recreation of Rift's in-app AI assistant.
	// No backend — scripted playback. The visitor picks a question; that turn plays:
	// thinking → numbered tool-rail → streamed answer → the real one-line diff.
	// Each scenario maps to a genuine bug/decision from building Rift.

	type Run = { t: string; k?: 'code' | 'bold' };
	type Kind = 'read' | 'git' | 'search' | 'edit';
	type Tool = { label: string; detail: string; kind: Kind; dur: string };
	type DiffLine = { s: 'add' | 'del' | 'ctx'; t: string };
	type Scenario = {
		id: string;
		q: string; // short label on the picker
		prompt: string; // what shows in the user bubble
		thinking: string;
		tools: Tool[]; // last one is always the Edit
		answer: Run[];
		diff: { file: string; lines: DiffLine[] };
		telem: string;
	};

	const scenarios: Scenario[] = [
		{
			id: 'zerobyte',
			q: 'Why do uploads land as 0 bytes?',
			prompt: 'A few resources upload to the server as 0-byte files. Can you find why?',
			thinking: 'tracing the upload path…',
			tools: [
				{ label: 'Read', detail: 'src-tauri/src/sftp/transfer.rs', kind: 'read', dur: '0.4s' },
				{ label: 'git_diff', detail: 'HEAD~6 — transfer.rs', kind: 'git', dur: '0.3s' },
				{ label: 'Grep', detail: 'SETSTAT · 4 matches', kind: 'search', dur: '0.2s' },
				{ label: 'Edit', detail: 'transfer.rs:214 — apply fix', kind: 'edit', dur: '0.5s' }
			],
			answer: [
				{ t: 'Found it. Every upload finishes with a ' },
				{ t: 'SETSTAT', k: 'code' },
				{ t: ' call built from ' },
				{ t: 'FileAttributes::default()', k: 'code' },
				{ t: ' — and the default carries ' },
				{ t: 'size = 0', k: 'bold' },
				{ t: ', so the server truncates the file the instant it lands. The atomic ' },
				{ t: '.rift-tmp', k: 'code' },
				{ t: ' rename then promotes the zeroed copy over the good one.\n\nFix: use ' },
				{ t: 'FileAttributes::empty()', k: 'code' },
				{ t: ' so SETSTAT only sends the perms I actually set. Applied at ' },
				{ t: 'transfer.rs:214', k: 'code' },
				{ t: ' and added a live-server regression test so it can never come back.' }
			],
			diff: {
				file: 'src-tauri/src/sftp/transfer.rs',
				lines: [
					{ s: 'ctx', t: '// finalize perms after the atomic rename' },
					{ s: 'del', t: 'let attrs = FileAttributes::default();' },
					{ s: 'add', t: 'let attrs = FileAttributes::empty();' },
					{ s: 'ctx', t: 'attrs.set_permissions(mode);' }
				]
			},
			telem: '4 tools · 1.2k tokens · $0.04 · 8.1s'
		},
		{
			id: 'gitsafe',
			q: 'Is the git tool safe to expose?',
			prompt: 'The assistant can run git on my behalf. Is that safe to expose?',
			thinking: 'auditing the git tool surface…',
			tools: [
				{ label: 'Read', detail: 'src-tauri/src/assistant/git_local.rs', kind: 'read', dur: '0.5s' },
				{ label: 'Grep', detail: 'Command::new · 3 matches', kind: 'search', dur: '0.2s' },
				{ label: 'Read', detail: 'assistant/mcp_server.rs — trust gate', kind: 'read', dur: '0.3s' },
				{ label: 'Edit', detail: 'git_local.rs:40 — validate_ref', kind: 'edit', dur: '0.6s' }
			],
			answer: [
				{ t: 'Safe, and on purpose. The tools never shell out — every call is ' },
				{ t: 'Command::new("git").args', k: 'code' },
				{ t: ', never ' },
				{ t: 'sh -c', k: 'code' },
				{ t: ', so there is no string for an argument to break out of. Refs and branches go through a strict allowlist, so a ' },
				{ t: '--upload-pack=', k: 'code' },
				{ t: " flag can't be smuggled in; path traversal is rejected, message size is capped, and " },
				{ t: 'force', k: 'bold' },
				{ t: ' is refused outright. Trust is gated twice — server-side and in the tool allowlist. Defense in depth.' }
			],
			diff: {
				file: 'src-tauri/src/assistant/git_local.rs',
				lines: [
					{ s: 'ctx', t: '// refs/remotes/branches — strict allowlist, no leading dash' },
					{ s: 'del', t: 'Command::new("sh").arg("-c").arg(format!("git push {branch}"))' },
					{ s: 'add', t: 'let safe = validate_ref("branch", branch)?; // ^[A-Za-z0-9._/-]{1,200}$' },
					{ s: 'add', t: 'Command::new("git").args(["push", remote, &safe])' }
				]
			},
			telem: '4 tools · 1.4k tokens · $0.05 · 9.3s'
		},
		{
			id: 'uihang',
			q: 'Why did the UI hang for 2 min?',
			prompt: 'Starting a dev server freezes the UI in "streaming" for two minutes. Why?',
			thinking: 'following the turn-completion path…',
			tools: [
				{ label: 'Read', detail: 'src-tauri/src/assistant/mod.rs', kind: 'read', dur: '0.5s' },
				{ label: 'Grep', detail: 'child.wait · 2 matches', kind: 'search', dur: '0.2s' },
				{ label: 'git_diff', detail: 'HEAD~3 — mod.rs', kind: 'git', dur: '0.3s' },
				{ label: 'Edit', detail: 'mod.rs:2810 — result_seen flag', kind: 'edit', dur: '0.6s' }
			],
			answer: [
				{ t: 'The turn was waiting on the wrong thing. Completion was gated on the ' },
				{ t: 'claude', k: 'code' },
				{ t: ' process exiting — but a backgrounded child keeps it alive for its whole lifetime, so the wait never returned.\n\nFix: fire "done" the instant the result frame arrives with an ' },
				{ t: 'AtomicBool', k: 'code' },
				{ t: ', then kill only the parent PID with a grace period so the detached process ' },
				{ t: 'survives', k: 'bold' },
				{ t: '. Turn-end is instant now, and background tasks keep running.' }
			],
			diff: {
				file: 'src-tauri/src/assistant/mod.rs',
				lines: [
					{ s: 'ctx', t: '// done when the result frame lands — not when claude exits' },
					{ s: 'del', t: 'let status = child.wait().await?; // a bg child holds claude alive' },
					{ s: 'add', t: 'let result_seen = Arc::new(AtomicBool::new(false)); // set on result frame' },
					{ s: 'add', t: "// …then start_kill() only claude's PID; detached process survives" }
				]
			},
			telem: '4 tools · 1.3k tokens · $0.05 · 8.7s'
		}
	];

	const signOf = { add: '+', del: '-', ctx: ' ' } as const;

	// ── playback state ──
	let active = $state(0); // which scenario
	let phase = $state<'idle' | 'thinking' | 'tools' | 'streaming' | 'diff' | 'done'>('idle');
	let toolsShown = $state(0);
	let toolsDone = $state(0);
	let streamed = $state(0);
	let diffShown = $state(false);
	let runId = 0;

	const sc = $derived(scenarios[active]);

	const reduceMotion =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	function reset() {
		phase = 'idle';
		toolsShown = 0;
		toolsDone = 0;
		streamed = 0;
		diffShown = false;
	}

	function pick(i: number) {
		active = i;
		play();
	}

	async function play() {
		const my = ++runId;
		const alive = () => my === runId;
		const s = scenarios[active];
		const chars = s.answer.reduce((n, r) => n + r.t.length, 0);
		reset();

		if (reduceMotion) {
			toolsShown = s.tools.length;
			toolsDone = s.tools.length;
			streamed = chars;
			diffShown = true;
			phase = 'done';
			return;
		}

		await sleep(420);
		if (!alive()) return;
		phase = 'thinking';
		await sleep(850);
		if (!alive()) return;

		// run every tool except the trailing Edit
		phase = 'tools';
		for (let i = 0; i < s.tools.length - 1; i++) {
			toolsShown = i + 1;
			await sleep(parseFloat(s.tools[i].dur) * 700 + 230);
			if (!alive()) return;
			toolsDone = i + 1;
			await sleep(150);
			if (!alive()) return;
		}

		// stream the answer
		phase = 'streaming';
		while (streamed < chars) {
			streamed = Math.min(chars, streamed + 2);
			await sleep(14);
			if (!alive()) return;
		}

		// the fix-it Edit lands, then the diff reveals
		toolsShown = s.tools.length;
		await sleep(420);
		if (!alive()) return;
		toolsDone = s.tools.length;
		await sleep(260);
		if (!alive()) return;
		phase = 'diff';
		diffShown = true;
		await sleep(120);
		if (!alive()) return;
		phase = 'done';
	}

	$effect(() => {
		play();
		return () => {
			runId++;
		};
	});

	// chars of a given run to show, given the global streamed counter
	function shown(idx: number): string {
		let offset = 0;
		for (let i = 0; i < idx; i++) offset += sc.answer[i].t.length;
		return sc.answer[idx].t.slice(0, Math.max(0, streamed - offset));
	}

	const toolIcon = { read: '◇', git: '⎇', search: '⌕', edit: '✎' } as const;
	const playing = $derived(phase !== 'done' && phase !== 'idle');
</script>

<div class="chat">
	<div class="chat-chrome">
		<span class="dots"><span></span><span></span><span></span></span>
		<span class="chat-name">rift — assistant</span>
		<span class="model-pill"><span class="model-dot"></span> opus 4.8</span>
	</div>

	<div class="chat-body">
		<!-- prompt picker — the visitor drives it -->
		<div class="picker">
			<span class="picker-lead">Ask Rift's assistant:</span>
			<div class="picker-row">
				{#each scenarios as s, i (s.id)}
					<button class="pick" class:active={i === active} onclick={() => pick(i)}>
						<span class="pa">▸</span>{s.q}
					</button>
				{/each}
			</div>
		</div>

		<!-- user message -->
		<div class="msg user">
			<div class="bubble">{sc.prompt}</div>
		</div>

		<!-- assistant turn -->
		<div class="msg bot">
			{#if phase === 'thinking'}
				<div class="thinking">
					<span class="td"></span><span class="td"></span><span class="td"></span>
					<span class="tk">{sc.thinking}</span>
				</div>
			{/if}

			{#if toolsShown > 0}
				<div class="rail">
					{#each sc.tools.slice(0, toolsShown) as tool, i (tool.label + i)}
						{@const done = i < toolsDone}
						<div class="step" class:done class:pending={!done}>
							<span class="num">{done ? '✓' : i + 1}</span>
							<span class="chip chip-{tool.kind}">
								<span class="cg">{toolIcon[tool.kind]}</span>
								<span class="clabel">{tool.label}</span>
								<span class="cdetail">{tool.detail}</span>
							</span>
							{#if done}<span class="dur">{tool.dur}</span>{/if}
						</div>
					{/each}
				</div>
			{/if}

			{#if phase === 'streaming' || phase === 'diff' || phase === 'done'}
				<div class="answer">
					{#each sc.answer as run, i (i)}<span
							class:code={run.k === 'code'}
							class:bold={run.k === 'bold'}>{shown(i)}</span
						>{/each}{#if phase === 'streaming'}<span class="caret"></span>{/if}
				</div>
			{/if}

			{#if diffShown}
				<div class="diff">
					<div class="diff-file">{sc.diff.file}</div>
					{#each sc.diff.lines as ln, i (i)}
						<div class="dl dl-{ln.s}">
							<span class="dl-sign">{signOf[ln.s]}</span><span class="dl-t">{ln.t}</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<div class="chat-foot">
		{#if phase === 'done'}
			<span class="telem">{sc.telem}</span>
		{:else}
			<span class="telem live"><span class="lp"></span> working…</span>
		{/if}
		<button class="replay" onclick={() => play()} disabled={playing}>
			↻ Replay
		</button>
	</div>
</div>

<style>
	.chat {
		margin-top: 40px;
		border: 1px solid var(--line-2);
		background: var(--panel);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		min-height: 440px;
	}

	.chat-chrome {
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
	.dots span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--line-2);
	}
	.dots span:nth-child(1) {
		background: #e87a7a;
	}
	.dots span:nth-child(2) {
		background: #e6b26a;
	}
	.dots span:nth-child(3) {
		background: #7ad19a;
	}
	.chat-name {
		color: var(--text-2);
	}
	.model-pill {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--text-2);
		border: 1px solid var(--line-2);
		padding: 2px 9px;
		border-radius: 3px;
	}
	.model-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #a78bfa;
		box-shadow: 0 0 7px #a78bfa;
	}

	.chat-body {
		flex: 1;
		padding: 22px 22px 8px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		overflow: hidden;
	}

	/* prompt picker */
	.picker {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--line);
	}
	.picker-lead {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		letter-spacing: 0.04em;
		color: var(--dim);
	}
	.picker-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
	.pick {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 13px;
		color: var(--text-2);
		background: var(--panel-2);
		border: 1px solid var(--line-2);
		padding: 7px 13px;
		border-radius: 7px;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		gap: 7px;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s;
	}
	.pick:hover {
		color: var(--text);
		border-color: rgba(120, 196, 255, 0.5);
	}
	.pick.active {
		color: var(--accent);
		border-color: var(--accent);
		background: var(--accent-soft);
	}
	.pick .pa {
		color: var(--accent);
		font-size: 10px;
	}

	.msg.user {
		display: flex;
		justify-content: flex-end;
	}
	.msg.user .bubble {
		max-width: 80%;
		background: var(--accent-soft);
		border: 1px solid rgba(120, 196, 255, 0.3);
		color: var(--text);
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14px;
		line-height: 1.5;
		padding: 10px 14px;
		border-radius: 10px 10px 2px 10px;
	}

	.msg.bot {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	/* thinking */
	.thinking {
		display: flex;
		align-items: center;
		gap: 7px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		color: var(--dim);
	}
	.td {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		animation: bounce 1.1s infinite ease-in-out;
	}
	.td:nth-child(2) {
		animation-delay: 0.15s;
	}
	.td:nth-child(3) {
		animation-delay: 0.3s;
	}
	@keyframes bounce {
		0%, 80%, 100% {
			opacity: 0.3;
			transform: translateY(0);
		}
		40% {
			opacity: 1;
			transform: translateY(-3px);
		}
	}

	/* tool rail */
	.rail {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border-left: 1px solid var(--line);
		padding-left: 14px;
		margin-left: 4px;
	}
	.step {
		display: flex;
		align-items: center;
		gap: 10px;
		animation: rowin 0.22s ease;
	}
	@keyframes rowin {
		from {
			opacity: 0;
			transform: translateY(3px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	.num {
		flex: 0 0 auto;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--line-2);
		color: var(--dim);
	}
	.step.done .num {
		color: #7ad19a;
		border-color: rgba(122, 209, 154, 0.5);
		background: rgba(122, 209, 154, 0.1);
	}
	.step.pending .num {
		color: var(--accent);
		border-color: var(--accent);
		animation: pulse 1s infinite;
	}
	@keyframes pulse {
		50% {
			opacity: 0.4;
		}
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		border: 1px solid var(--line-2);
		background: var(--panel-2);
		padding: 4px 10px;
		border-radius: 4px;
		min-width: 0;
	}
	.cg {
		opacity: 0.8;
	}
	.chip-read .cg {
		color: #7ab8ff;
	}
	.chip-git .cg {
		color: #c79bff;
	}
	.chip-search .cg {
		color: #e6b26a;
	}
	.chip-edit .cg {
		color: #7ad19a;
	}
	.clabel {
		color: var(--text);
	}
	.cdetail {
		color: var(--dim);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.dur {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--dim);
		margin-left: auto;
	}

	/* streamed answer */
	.answer {
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14.5px;
		line-height: 1.62;
		color: var(--text-2);
		white-space: pre-wrap;
		max-width: 64ch;
	}
	.answer .code {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.9em;
		color: var(--text);
		background: var(--panel-2);
		border: 1px solid var(--line);
		border-radius: 3px;
		padding: 0 5px;
	}
	.answer .bold {
		color: var(--text);
		font-weight: 600;
	}
	.caret {
		display: inline-block;
		width: 7px;
		height: 1.05em;
		vertical-align: text-bottom;
		background: var(--accent);
		margin-left: 1px;
		animation: blink 0.9s step-end infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	/* diff reveal — the real one-line change */
	.diff {
		border: 1px solid var(--line);
		border-radius: 5px;
		overflow: hidden;
		font-family: 'JetBrains Mono', monospace;
		font-size: 12px;
		animation: diffin 0.32s ease;
	}
	.diff-file {
		padding: 6px 12px;
		background: var(--panel-2);
		border-bottom: 1px solid var(--line);
		color: var(--dim);
		font-size: 11px;
	}
	.dl {
		display: flex;
		gap: 8px;
		padding: 2px 12px;
		white-space: pre;
		overflow-x: auto;
	}
	.dl-sign {
		flex: 0 0 auto;
		width: 8px;
		color: var(--dim);
	}
	.dl-ctx {
		color: var(--dim);
	}
	.dl-add {
		background: rgba(122, 209, 154, 0.09);
	}
	.dl-add .dl-sign,
	.dl-add .dl-t {
		color: #7ad19a;
	}
	.dl-del {
		background: rgba(232, 122, 122, 0.09);
	}
	.dl-del .dl-sign,
	.dl-del .dl-t {
		color: #e08a8a;
	}
	@keyframes diffin {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	.chat-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 11px 16px;
		border-top: 1px solid var(--line);
		background: var(--panel);
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
	}
	.telem {
		color: var(--dim);
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.lp {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		animation: pulse 1s infinite;
	}
	.replay {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--text-2);
		background: var(--panel-2);
		border: 1px solid var(--line-2);
		padding: 5px 12px;
		border-radius: 4px;
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s,
			opacity 0.15s;
	}
	.replay:hover:not(:disabled) {
		color: var(--accent);
		border-color: var(--accent);
	}
	.replay:disabled {
		opacity: 0.4;
		cursor: default;
	}

	@media (prefers-reduced-motion: reduce) {
		.td,
		.step.pending .num,
		.caret,
		.lp,
		.step,
		.diff {
			animation: none;
		}
	}
</style>
