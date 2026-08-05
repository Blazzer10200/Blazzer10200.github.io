<script lang="ts">
	import { page } from '$app/state';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { site } from '$lib/content/site';

	let missing = $derived(page.status === 404);
</script>

<Seo
	title={`${page.status} · ${site.name}`}
	description={missing
		? 'The requested page could not be found.'
		: 'The site could not complete this request.'}
	path={page.url.pathname}
	noindex
/>

<main id="main-content" tabindex="-1" class="error-page container-wide">
	<div class="error-code" aria-hidden="true">{page.status}</div>
	<div>
		<p class="eyebrow">{missing ? 'Route not found' : 'Request failed'}</p>
		<h1>
			{missing ? 'This page is not part of the build.' : 'The request could not be completed.'}
		</h1>
		<p>
			{missing
				? 'The route may have moved, or the link may be old. The main services and case studies are still available below.'
				: 'Try the request again. If it keeps failing, use direct email so the problem does not block you.'}
		</p>
		<div class="page-actions">
			<a class="button button-primary" href="/">Back to Home</a><a
				class="button button-secondary"
				href="/work">View Work</a
			>
		</div>
	</div>
</main>

<style>
	.error-page {
		display: grid;
		grid-template-columns: minmax(220px, 0.55fr) minmax(0, 1fr);
		gap: var(--space-10);
		align-items: center;
		min-height: 70svh;
		padding-block: var(--section-space);
	}
	.error-code {
		color: transparent;
		font-size: clamp(8rem, 24vw, 22rem);
		font-weight: 750;
		line-height: 0.7;
		letter-spacing: -0.1em;
		-webkit-text-stroke: 1px var(--border-strong);
	}
	.error-page h1 {
		max-width: 13ch;
		margin-block: var(--space-3) var(--space-5);
	}
	.error-page p:not(.eyebrow) {
		max-width: 42rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	@media (max-width: 760px) {
		.error-page {
			grid-template-columns: 1fr;
			gap: var(--space-5);
		}
		.error-code {
			font-size: 8rem;
		}
	}
</style>
