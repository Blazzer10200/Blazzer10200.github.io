<script lang="ts">
	import { onMount } from 'svelte';

	type NavLink = {
		href: string;
		label: string;
		external?: boolean;
		primary?: boolean;
	};

	type Props = {
		variant?: 'resume' | 'case-study';
		brandRole?: string;
		links?: NavLink[];
		showStatus?: boolean;
	};

	let {
		variant = 'resume',
		brandRole = 'Software Developer',
		links = [
			{ href: '#featured', label: 'Work' },
			{ href: '#experience', label: 'Experience' },
			{ href: '#toolkit', label: 'Toolkit' },
			{ href: '#contact', label: 'Contact' }
		],
		showStatus = false
	}: Props = $props();

	let activeHash = $state('');

	onMount(() => {
		// scroll-spy: highlight the nav link for the section currently in view
		const hashLinks = links.filter((l) => l.href.startsWith('#'));
		const targets = hashLinks
			.map((l) => document.getElementById(l.href.slice(1)))
			.filter((el): el is HTMLElement => !!el);

		let spy: IntersectionObserver | undefined;
		if (targets.length) {
			const visible = new Set<string>();
			spy = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						const id = '#' + e.target.id;
						if (e.isIntersecting) visible.add(id);
						else visible.delete(id);
					});
					// pick the first hash link (top-to-bottom) that is currently visible
					const next = hashLinks.find((l) => visible.has(l.href));
					if (next) activeHash = next.href;
				},
				{ rootMargin: '-45% 0px -50% 0px' }
			);
			targets.forEach((t) => spy!.observe(t));
		}

		return () => {
			spy?.disconnect();
		};
	});
</script>

<header class="topbar">
	<div class="topbar-inner">
		<a class="brand" href={variant === 'case-study' ? '/' : '#'}>
			<span class="brand-mark">B</span>
			<span class="brand-name">Braison Swilling</span>
			<span class="brand-sep">/</span>
			<span class="brand-role">{brandRole}</span>
		</a>
		<nav class="nav">
			{#each links as link (link.href + link.label)}
				<a
					href={link.href}
					class:back={link.primary}
					class:active={activeHash === link.href}
					target={link.external ? '_blank' : null}
					rel={link.external ? 'noopener' : null}
				>
					{link.label}
				</a>
			{/each}
			{#if showStatus}
				<span class="status">
					<span class="status-dot"></span>
					Available
				</span>
			{/if}
		</nav>
	</div>
</header>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(10, 11, 15, 0.78);
		backdrop-filter: saturate(140%) blur(10px);
		-webkit-backdrop-filter: saturate(140%) blur(10px);
		border-bottom: 1px solid var(--line);
	}
	.topbar-inner {
		max-width: 1240px;
		margin: 0 auto;
		padding: 14px 56px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
	}
	@media (max-width: 720px) {
		.topbar-inner {
			padding: 12px 20px;
		}
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		color: var(--text);
	}
	.brand-mark {
		width: 24px;
		height: 24px;
		border: 1px solid var(--accent);
		color: var(--accent);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 12px;
		background: var(--accent-soft);
	}
	.brand-name {
		font-weight: 500;
		letter-spacing: 0.02em;
	}
	.brand-sep {
		color: var(--dim);
	}
	.brand-role {
		color: var(--text-2);
	}
	@media (max-width: 720px) {
		.brand-sep,
		.brand-role {
			display: none;
		}
	}

	.nav {
		display: flex;
		gap: 28px;
		align-items: center;
		color: var(--text-2);
	}
	.nav :global(a) {
		transition: color 0.15s ease;
	}
	.nav :global(a:hover) {
		color: var(--text);
	}
	.nav :global(a:not(.back)) {
		position: relative;
	}
	.nav :global(a:not(.back))::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -6px;
		height: 1px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: 0 50%;
		transition: transform 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
	}
	.nav :global(a.active) {
		color: var(--text);
	}
	.nav :global(a.active)::after {
		transform: scaleX(1);
	}
	.status {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--accent);
		padding-left: 28px;
		margin-left: 4px;
		border-left: 1px solid var(--line);
	}
	@media (max-width: 880px) {
		.nav :global(a:not(.status):not(.back)) {
			display: none;
		}
		.status {
			padding-left: 0;
			margin-left: 0;
			border-left: 0;
		}
	}
</style>
