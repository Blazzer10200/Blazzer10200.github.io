<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import '../app.css';
	import BgFx from '$lib/components/BgFx.svelte';

	let { children } = $props();
	let io: IntersectionObserver | undefined;

	function observeAll() {
		if (!io) return;
		document.querySelectorAll('.reveal, .stagger').forEach((el) => {
			if (!el.classList.contains('in')) io!.observe(el);
		});
	}

	onMount(() => {
		io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add('in');
						io?.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
		);
		observeAll();
		return () => io?.disconnect();
	});

	afterNavigate(() => observeAll());
</script>

<svelte:head>
	<link rel="icon" type="image/svg+xml" href="{base}/favicon.svg" />
</svelte:head>

<BgFx />
{@render children()}
