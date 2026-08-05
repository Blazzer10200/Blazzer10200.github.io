<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import SiteFooter from '$lib/components/layout/SiteFooter.svelte';
	import SiteHeader from '$lib/components/layout/SiteHeader.svelte';
	import '../app.css';

	let { children } = $props();
	let resumeOnly = $derived(page.url.pathname === '/ats');

	$effect(() => {
		if (browser) document.documentElement.dataset.hydrated = 'true';
	});
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="{base}/favicon.svg" />
</svelte:head>

<a href="#main-content" class="skip-link">Skip to content</a>
<div class="site-shell">
	{#if !resumeOnly}<SiteHeader />{/if}
	{@render children()}
	{#if !resumeOnly}<SiteFooter />{/if}
</div>
