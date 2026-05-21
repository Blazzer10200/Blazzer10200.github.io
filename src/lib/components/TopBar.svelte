<script lang="ts">
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
