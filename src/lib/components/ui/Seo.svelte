<script lang="ts">
	import { site, siteUrl } from '$lib/content/site';

	type Schema = Record<string, unknown>;

	let {
		title,
		description,
		path = '/',
		image = '/og-image.png',
		imageAlt = `${site.name} website and software services`,
		noindex = false,
		schema = []
	}: {
		title: string;
		description: string;
		path?: string;
		image?: string;
		imageAlt?: string;
		noindex?: boolean;
		schema?: Schema | Schema[];
	} = $props();

	let canonical = $derived(`${siteUrl}${path === '/' ? '/' : path}`);
	let socialImage = $derived(image.startsWith('http') ? image : `${siteUrl}${image}`);
	let schemas = $derived(Array.isArray(schema) ? schema : [schema]);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	{#if noindex}<meta name="robots" content="noindex, nofollow" />{/if}

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={socialImage} />

	{#each schemas as block}
		<svelte:element this={"script"} type="application/ld+json"
			>{JSON.stringify(block)}</svelte:element
		>
	{/each}
</svelte:head>
