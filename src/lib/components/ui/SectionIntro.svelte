<script lang="ts">
	let {
		eyebrow,
		title,
		body,
		align = 'left'
	}: { eyebrow: string; title: string; body?: string; align?: 'left' | 'split' } = $props();
</script>

<header class:split={align === 'split'} class="section-intro">
	<div>
		<p class="eyebrow">{eyebrow}</p>
		<h2>{title}</h2>
	</div>
	{#if body}<p class="section-copy">{body}</p>{/if}
</header>

<style>
	.section-intro {
		display: grid;
		gap: var(--space-5);
		max-width: var(--reading-width);
		margin-bottom: var(--space-8);
	}
	.section-intro.split {
		grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.65fr);
		align-items: end;
		max-width: none;
	}
	.eyebrow {
		margin-bottom: var(--space-3);
	}
	h2 {
		max-width: 18ch;
	}
	.section-copy {
		max-width: 42rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	@media (max-width: 760px) {
		.section-intro.split {
			grid-template-columns: 1fr;
		}
	}
</style>
