<script lang="ts">
	import CaseStudy from '$lib/components/projects/CaseStudy.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<CaseStudy project={data.project} />
