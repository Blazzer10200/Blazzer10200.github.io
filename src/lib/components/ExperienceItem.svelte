<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		years: string;
		role: string;
		org: string;
		summary: Snippet;
		more?: Snippet;
	};

	let { years, role, org, summary, more }: Props = $props();

	let open = $state(false);
</script>

<div class="exp" data-open={open}>
	<div class="exp-yr">{years}</div>
	<div>
		<div class="exp-role">{role}</div>
		<div class="exp-org">{org}</div>
		<ul class="exp-list">
			{@render summary()}
		</ul>
		{#if more}
			<div class="exp-more">
				<ul class="exp-list">
					{@render more()}
				</ul>
			</div>
			<button
				class="exp-toggle"
				type="button"
				aria-expanded={open}
				onclick={() => (open = !open)}
			>
				<span class="chev">›</span>
				{#if open}
					<span class="lbl-less">Hide details</span>
				{:else}
					<span class="lbl-more">Show details</span>
				{/if}
			</button>
		{/if}
	</div>
</div>

<style>
	.exp {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 32px;
		padding: 28px 0;
		border-bottom: 1px solid var(--line);
	}
	.exp-yr {
		color: var(--dim);
		font-size: 12px;
		letter-spacing: 0.06em;
		padding-top: 6px;
	}
	.exp-role {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: 18px;
		color: var(--text);
		margin-bottom: 6px;
	}
	.exp-org {
		color: var(--text-2);
		font-size: 13px;
		margin-bottom: 16px;
	}
	.exp-org :global(.at) {
		color: var(--dim);
		margin: 0 6px;
	}
	.exp-list {
		list-style: none;
	}
	.exp-list :global(li) {
		color: var(--text-2);
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 14px;
		line-height: 1.65;
		padding-left: 22px;
		position: relative;
		margin-bottom: 8px;
		max-width: 720px;
	}
	.exp-list :global(li::before) {
		content: '—';
		position: absolute;
		left: 0;
		color: var(--dim);
	}
	.exp-list :global(strong) {
		color: var(--text);
		font-weight: 500;
	}
	.exp-list :global(em) {
		font-style: italic;
		color: var(--text);
	}
	.exp-more {
		overflow: hidden;
		max-height: 0;
		opacity: 0;
		transition:
			max-height 0.35s cubic-bezier(0.2, 0.7, 0.2, 1),
			opacity 0.25s ease,
			margin-top 0.25s ease;
	}
	.exp[data-open='true'] .exp-more {
		max-height: 800px;
		opacity: 1;
		margin-top: 4px;
	}
	.exp-toggle {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 14px;
		background: transparent;
		border: 0;
		padding: 0;
		color: var(--dim);
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		cursor: pointer;
		transition: color 0.18s;
	}
	.exp-toggle:hover {
		color: var(--accent);
	}
	.exp-toggle .chev {
		display: inline-block;
		transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
		font-family: inherit;
		font-size: 13px;
		line-height: 1;
	}
	.exp[data-open='true'] .exp-toggle .chev {
		transform: rotate(90deg);
	}
	@media (max-width: 720px) {
		.exp {
			grid-template-columns: 1fr;
			gap: 12px;
		}
	}
</style>
