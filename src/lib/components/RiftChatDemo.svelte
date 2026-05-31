<script lang="ts">
	// Self-contained recreation of Rift's in-app AI assistant turn.
	// No backend — a scripted playback that streams a believable agent turn:
	// numbered tool-calls on a status rail, then a streamed answer. Loops on Replay.

	type Run = { t: string; k?: 'code' | 'bold' };
	type Tool = { label: string; detail: string; kind: 'read' | 'git' | 'search' | 'edit'; dur: string };

	const userPrompt = 'A few resources upload to the server as 0-byte files. Can you find why?';

	const tools: Tool[] = [
		{ label: 'Read', detail: 'src-tauri/src/sftp/transfer.rs', kind: 'read', dur: '0.4s' },
		{ label: 'git_diff', detail: 'HEAD~6 — transfer.rs', kind: 'git', dur: '0.3s' },
		{ label: 'Grep', detail: 'SETSTAT · 4 matches', kind: 'search', dur: '0.2s' },
		{ label: 'Edit', detail: 'transfer.rs:214 — apply fix', kind: 'edit', dur: '0.5s' }
	];

	// The streamed answer, as styled runs (plain / code / bold).
	const answer: Run[] = [
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
	];

	const totalChars = answer.reduce((n, r) => n + r.t.length, 0);

	// ── playback state ──
	let phase = $state<'idle' | 'thinking' | 'tools' | 'streaming' | 'done'>('idle');
	let toolsShown = $state(0); // how many tool rows are visible
	let toolsDone = $state(0); // how many have flipped to "done"
	let streamed = $state(0); // chars of answer revealed
	let runId = 0;

	const reduceMotion =
		typeof window !== 'undefined' &&
		window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

	function reset() {
		phase = 'idle';
		toolsShown = 0;
		toolsDone = 0;
		streamed = 0;
	}

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	async function play() {
		const my = ++runId;
		const alive = () => my === runId;
		reset();

		if (reduceMotion) {
			toolsShown = tools.length;
			toolsDone = tools.length;
			streamed = totalChars;
			phase = 'done';
			return;
		}

		await sleep(450);
		if (!alive()) return;
		phase = 'thinking';
		await sleep(900);
		if (!alive()) return;

		phase = 'tools';
		for (let i = 0; i < tools.length - 1; i++) {
			toolsShown = i + 1;
			await sleep(parseFloat(tools[i].dur) * 700 + 250);
			if (!alive()) return;
			toolsDone = i + 1;
			await sleep(160);
			if (!alive()) return;
		}

		// stream the answer
		phase = 'streaming';
		while (streamed < totalChars) {
			streamed = Math.min(totalChars, streamed + 2);
			await sleep(14);
			if (!alive()) return;
		}

		// the fix-it Edit tool lands after the explanation
		toolsShown = tools.length;
		await sleep(500);
		if (!alive()) return;
		toolsDone = tools.length;
		await sleep(200);
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
		for (let i = 0; i < idx; i++) offset += answer[i].t.length;
		return answer[idx].t.slice(0, Math.max(0, streamed - offset));
	}

	const toolIcon = { read: '◇', git: '⎇', search: '⌕', edit: '✎' } as const;
</script>

<div class="chat">
	<div class="chat-chrome">
		<span class="dots"><span></span><span></span><span></span></span>
		<span class="chat-name">rift — assistant</span>
		<span class="model-pill"><span class="model-dot"></span> opus 4.8</span>
	</div>

	<div class="chat-body">
		<!-- user message -->
		<div class="msg user">
			<div class="bubble">{userPrompt}</div>
		</div>

		<!-- assistant turn -->
		<div class="msg bot">
			{#if phase === 'thinking'}
				<div class="thinking">
					<span class="td"></span><span class="td"></span><span class="td"></span>
					<span class="tk">tracing the upload path…</span>
				</div>
			{/if}

			{#if toolsShown > 0}
				<div class="rail">
					{#each tools.slice(0, toolsShown) as tool, i (tool.label + i)}
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

			{#if phase === 'streaming' || phase === 'done'}
				<div class="answer">
					{#each answer as run, i (i)}<span
							class:code={run.k === 'code'}
							class:bold={run.k === 'bold'}>{shown(i)}</span
						>{/each}{#if phase === 'streaming'}<span class="caret"></span>{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="chat-foot">
		{#if phase === 'done'}
			<span class="telem">4 tools · 1.2k tokens · $0.04 · 8.1s</span>
		{:else}
			<span class="telem live"><span class="lp"></span> working…</span>
		{/if}
		<button class="replay" onclick={() => play()} disabled={phase !== 'done'}>
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
		.step {
			animation: none;
		}
	}
</style>
