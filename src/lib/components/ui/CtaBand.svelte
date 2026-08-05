<script lang="ts">
	let {
		eyebrow = 'Have a project in mind?',
		title = 'Bring the rough version. I will help make it concrete.',
		body = 'Tell me what is not working, what you have already tried, and what a useful result would change.',
		primaryHref = '/start',
		primaryLabel = 'Start a Project',
		secondaryHref = '/work',
		secondaryLabel = 'View My Work'
	} = $props();
</script>

<section class="cta-band container-wide" aria-labelledby="cta-band-title">
	<div class="cta-copy">
		<p class="eyebrow">{eyebrow}</p>
		<h2 id="cta-band-title">{title}</h2>
		<p>{body}</p>
	</div>
	<div class="cta-actions">
		<a class="button button-primary" href={primaryHref}
			>{primaryLabel}<span aria-hidden="true">→</span></a
		>
		<a class="button button-secondary" href={secondaryHref}>{secondaryLabel}</a>
	</div>
</section>

<style>
	.cta-band {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) auto;
		gap: var(--space-8);
		align-items: end;
		margin-block: var(--section-space);
		padding-block: clamp(2.5rem, 6vw, 5rem);
		border-block: 1px solid var(--border-strong);
	}
	.cta-band::before {
		position: absolute;
		top: -1px;
		left: var(--gutter);
		width: min(18rem, 35vw);
		height: 1px;
		background: linear-gradient(90deg, var(--accent), transparent);
		content: '';
	}
	.cta-copy {
		max-width: 54rem;
	}
	h2 {
		max-width: 17ch;
		margin-block: var(--space-3) var(--space-4);
	}
	.cta-copy > p:last-child {
		max-width: 45rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.cta-actions {
		display: grid;
		gap: 0.75rem;
		min-width: min(100%, 220px);
	}
	@media (max-width: 760px) {
		.cta-band {
			grid-template-columns: 1fr;
			align-items: start;
		}
		.cta-actions {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 520px) {
		.cta-actions {
			grid-template-columns: 1fr;
		}
	}
</style>
