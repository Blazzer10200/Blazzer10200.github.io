<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { tick } from 'svelte';
	import { navigation, site } from '$lib/content/site';

	let menuOpen = $state(false);
	let menuButton = $state<HTMLButtonElement>();
	let menuPanel = $state<HTMLDivElement>();
	let pathname = $derived(page.url.pathname);

	function isActive(href: string) {
		return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
	}

	function closeMenu(returnFocus = true) {
		menuOpen = false;
		if (returnFocus) void tick().then(() => menuButton?.focus());
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!menuOpen) return;
		if (event.key === 'Escape') {
			event.preventDefault();
			closeMenu();
			return;
		}

		if (event.key !== 'Tab' || !menuPanel) return;
		const focusable = Array.from(
			menuPanel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
		).filter((element) => !element.hasAttribute('hidden'));
		if (!focusable.length) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	$effect(() => {
		if (!browser || !menuOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		void tick().then(() => menuPanel?.querySelector<HTMLElement>('a[href]')?.focus());
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="site-header">
	<div class="header-inner container-wide">
		<a class="brand" href="/" aria-label={`${site.name}, home`}>
			<span class="brand-mark" aria-hidden="true"><span>B</span><i></i></span>
			<span class="brand-copy">
				<strong>{site.name}</strong>
				<small>{site.role}</small>
			</span>
		</a>

		<nav class="desktop-nav" aria-label="Main navigation">
			{#each navigation as item}
				<a
					href={item.href}
					class:primary={item.primary}
					aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a
				>
			{/each}
		</nav>

		<button
			class="menu-button"
			type="button"
			bind:this={menuButton}
			aria-expanded={menuOpen}
			aria-controls="mobile-navigation"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span></span><span></span>
		</button>
	</div>

	{#if menuOpen}
		<div
			class="mobile-panel"
			id="mobile-navigation"
			bind:this={menuPanel}
			role="dialog"
			aria-modal="true"
			aria-label="Main navigation"
		>
			<nav aria-label="Mobile navigation">
				{#each navigation as item, index}
					<a
						href={item.href}
						class:primary={item.primary}
						aria-current={isActive(item.href) ? 'page' : undefined}
						onclick={() => closeMenu(false)}
					>
						<span>0{index + 1}</span>{item.label}
					</a>
				{/each}
			</nav>
			<div class="mobile-contact">
				<span>Direct contact</span>
				<a href={`mailto:${site.email}`}>{site.email}</a>
			</div>
		</div>
	{/if}
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: var(--layer-header);
		border-bottom: 1px solid color-mix(in srgb, var(--border) 82%, transparent);
		background: color-mix(in srgb, var(--background) 88%, transparent);
		backdrop-filter: blur(18px) saturate(135%);
	}
	.header-inner {
		display: flex;
		min-height: 76px;
		align-items: center;
		justify-content: space-between;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		text-decoration: none;
	}
	.brand-mark {
		position: relative;
		display: grid;
		width: 34px;
		aspect-ratio: 1;
		place-items: center;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: 0.78rem;
	}
	.brand-mark i {
		position: absolute;
		right: -1px;
		bottom: -1px;
		width: 8px;
		height: 8px;
		border-top: 1px solid var(--accent);
		border-left: 1px solid var(--accent);
	}
	.brand-copy {
		display: grid;
		gap: 1px;
	}
	.brand-copy strong {
		color: var(--text-primary);
		font-size: 0.92rem;
		font-weight: 650;
		letter-spacing: -0.01em;
	}
	.brand-copy small {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		letter-spacing: 0.05em;
	}
	.desktop-nav {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.4vw, 2.25rem);
	}
	.desktop-nav a {
		position: relative;
		padding-block: 0.55rem;
		color: var(--text-secondary);
		font-size: 0.86rem;
		font-weight: 550;
		text-decoration: none;
	}
	.desktop-nav a::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		background: var(--accent);
		content: '';
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--motion-standard) var(--ease-out);
	}
	.desktop-nav a:hover,
	.desktop-nav a[aria-current='page'] {
		color: var(--text-primary);
	}
	.desktop-nav a:hover::after,
	.desktop-nav a[aria-current='page']::after {
		transform: scaleX(1);
	}
	.desktop-nav a.primary {
		padding: 0.72rem 1rem;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		color: var(--text-primary);
	}
	.menu-button {
		display: none;
		width: 44px;
		height: 44px;
		place-items: center;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-primary);
		cursor: pointer;
	}
	.menu-button span {
		position: absolute;
		width: 18px;
		height: 1px;
		background: currentColor;
		transition: transform var(--motion-fast) var(--ease-out);
	}
	.menu-button span:first-child {
		transform: translateY(-4px);
	}
	.menu-button span:last-child {
		transform: translateY(4px);
	}
	.menu-button[aria-expanded='true'] span:first-child {
		transform: rotate(45deg);
	}
	.menu-button[aria-expanded='true'] span:last-child {
		transform: rotate(-45deg);
	}
	.mobile-panel {
		position: fixed;
		inset: 76px 0 0;
		z-index: -1;
		display: grid;
		align-content: space-between;
		padding: 1rem var(--gutter) 2rem;
		background: color-mix(in srgb, var(--background-raised) 97%, transparent);
	}
	.mobile-panel nav {
		display: grid;
	}
	.mobile-panel nav a {
		display: grid;
		grid-template-columns: 2.4rem 1fr;
		align-items: center;
		min-height: 68px;
		border-bottom: 1px solid var(--border);
		color: var(--text-primary);
		font-size: clamp(1.25rem, 6vw, 2rem);
		font-weight: 620;
		letter-spacing: -0.03em;
		text-decoration: none;
	}
	.mobile-panel nav a span,
	.mobile-contact span {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.64rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.mobile-panel nav a.primary {
		color: var(--accent);
	}
	.mobile-contact {
		display: grid;
		gap: 0.45rem;
	}
	.mobile-contact a {
		color: var(--text-secondary);
		font-size: 0.88rem;
	}
	@media (max-width: 800px) {
		.desktop-nav {
			display: none;
		}
		.menu-button {
			display: grid;
		}
	}
	@media (max-width: 480px) {
		.brand-copy small {
			display: none;
		}
	}
</style>
