<script lang="ts">
	import { page } from '$app/state';
	import TopBar from '$lib/components/TopBar.svelte';

	const is404 = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{page.status} · Braison Swilling</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<TopBar
	variant="case-study"
	links={[{ href: '/', label: '← Back to résumé', primary: true }]}
/>

<main class="err page" id="main-content" tabindex="-1">
	<p class="err-code">Error {page.status}</p>
	<h1>{is404 ? "This page doesn't exist." : 'Something went sideways.'}</h1>
	<p class="err-sub">
		{is404
			? 'The link is dead or the page moved. No harm done — everything worth seeing is one click away.'
			: "That one's on me, not you. Head back and try again."}
	</p>
	<div class="err-actions">
		<a class="btn primary" href="/">← Back to résumé</a>
		<a class="btn" href="/rift">See the Rift case study</a>
	</div>
</main>

<style>
	.err {
		min-height: 72vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: 72px;
		padding-bottom: 96px;
	}
	.err-code {
		font-family: 'JetBrains Mono', ui-monospace, monospace;
		font-size: 13px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 18px;
	}
	.err h1 {
		font-family: 'Inter', system-ui, sans-serif;
		font-weight: 500;
		font-size: clamp(34px, 5vw, 60px);
		line-height: 1.06;
		letter-spacing: -0.026em;
		color: var(--text);
		max-width: 640px;
		text-wrap: balance;
	}
	.err-sub {
		margin-top: 20px;
		max-width: 520px;
		color: var(--text-2);
		font-family: 'Inter', system-ui, sans-serif;
		font-size: 17px;
		line-height: 1.6;
		text-wrap: pretty;
	}
	.err-actions {
		display: flex;
		gap: 12px;
		margin-top: 36px;
		flex-wrap: wrap;
	}
</style>
