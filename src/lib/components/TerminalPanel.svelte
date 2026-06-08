<script lang="ts">
	import { onMount } from 'svelte';

	type LogLine = {
		ts: string;
		text: string;
		variant?: 'default' | 'ok' | 'warn' | 'info';
		dimTs?: boolean;
	};

	type Props = {
		title: string;
		lines: LogLine[];
		showLive?: boolean;
		showPrompt?: boolean;
	};

	let { title, lines, showLive = true, showPrompt = true }: Props = $props();

	let panel: HTMLDivElement;

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const lineEls = panel.querySelectorAll<HTMLDivElement>('.log-line');
		const promptEl = panel.querySelector<HTMLDivElement>('.log-prompt');

		if (reduced) {
			lineEls.forEach((el) => el.classList.add('show'));
			promptEl?.classList.add('show');
			return;
		}

		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (!e.isIntersecting) return;
					io.unobserve(e.target);
					lineEls.forEach((ln, i) => {
						setTimeout(() => ln.classList.add('show'), 250 + i * 280);
					});
					if (promptEl) {
						setTimeout(
							() => promptEl.classList.add('show'),
							250 + lineEls.length * 280 + 120
						);
					}
				});
			},
			{ threshold: 0.25 }
		);
		io.observe(panel);

		return () => io.disconnect();
	});
</script>

<div class="panel" bind:this={panel}>
	<div class="panel-head">
		<span>{title}</span>
		{#if showLive}
			<span class="live">
				<span class="status-dot"></span>
				live
			</span>
		{/if}
	</div>
	<div class="panel-body">
		{#each lines as line (line.text)}
			<div class="log-line {line.variant ?? ''}">
				<span class="ts" style={line.dimTs ? 'color: inherit; opacity: .55' : ''}
					>{line.ts}</span
				>
				{line.text}
			</div>
		{/each}
		{#if showPrompt}
			<div class="log-prompt" style="margin-top: 14px; color: var(--text);">
				$ <span class="cursor"></span>
			</div>
		{/if}
	</div>
</div>

<style>
	.panel {
		border: 1px solid var(--line-2);
		background: var(--panel);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.03) inset,
			0 24px 48px -24px rgba(0, 0, 0, 0.6);
	}
	.panel-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 11px 16px;
		border-bottom: 1px solid var(--line);
		color: var(--dim);
		font-size: 12px;
	}
	.panel-head .live {
		color: var(--accent);
		display: inline-flex;
		gap: 8px;
		align-items: center;
	}
	.panel-body {
		padding: 18px 18px 20px;
		font-size: 12.5px;
		line-height: 1.75;
		color: var(--text-2);
	}
	.panel-body :global(.ts) {
		color: var(--dim);
	}
	.panel-body :global(.ok) {
		color: var(--accent);
	}
	.panel-body :global(.warn) {
		color: var(--warn);
	}
	.panel-body :global(.info) {
		color: var(--teal);
	}
	.panel-body :global(.log-line) {
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}
	.panel-body :global(.log-line.show) {
		opacity: 1;
		transform: none;
	}
	.panel-body :global(.log-prompt) {
		opacity: 0;
		transition: opacity 0.3s ease;
	}
	.panel-body :global(.log-prompt.show) {
		opacity: 1;
	}
	@media (prefers-reduced-motion: reduce) {
		.panel-body :global(.log-line),
		.panel-body :global(.log-prompt) {
			opacity: 1 !important;
			transform: none !important;
		}
	}
	.panel-body :global(.cursor) {
		display: inline-block;
		width: 7px;
		height: 14px;
		vertical-align: -2px;
		background: var(--text);
		margin-left: 4px;
		animation: blink 1.1s step-end infinite;
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
</style>
