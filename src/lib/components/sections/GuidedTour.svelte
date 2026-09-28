<script lang="ts">
	import { browser } from '$app/environment';
	import { tick } from 'svelte';

	let { compact = false }: { compact?: boolean } = $props();

	const chapters = [
		{
			number: '01',
			eyebrow: 'Start with the strongest service',
			title: 'A custom website should make your business easier to understand.',
			body: 'I plan the message, design the interface, build the pages, connect the useful parts, and make the next step clear for your customers.',
			points: [
				'Strategy and page structure',
				'Custom responsive design',
				'Forms and useful integrations'
			],
			href: '/services#websites',
			linkLabel: 'Explore website work'
		},
		{
			number: '02',
			eyebrow: 'Build around the real workflow',
			title: 'Small Windows tools can remove a surprising amount of repeated work.',
			body: 'I build focused Windows 10 and 11 utilities, scripts, desktop applications, and internal tools when ordinary software does not fit the job.',
			points: ['Windows utilities and scripts', 'Desktop applications', 'Workflow automation'],
			href: '/services#software',
			linkLabel: 'Explore Windows tools'
		},
		{
			number: '03',
			eyebrow: 'Connect the pieces',
			title: 'Your website, software, data, and services should work together.',
			body: 'I connect systems around a clear task. That can include APIs, business services, databases, Discord, automation, or a carefully bounded AI feature.',
			points: [
				'Service and API connections',
				'Data and workflow automation',
				'Responsible AI features'
			],
			href: '/services#ai',
			linkLabel: 'Explore integrations'
		},
		{
			number: '04',
			eyebrow: 'Inspect the proof',
			title: 'Working products matter more than polished promises.',
			body: 'Rift and EXFIL are real Windows applications with working interfaces, public releases, and source code available for inspection.',
			points: ['Downloadable releases', 'Public source code', 'Documented decisions and testing'],
			href: '/work',
			linkLabel: 'View shipped work'
		}
	] as const;

	let dialog = $state<HTMLDialogElement>();
	let chapterIndex = $state(0);
	let tourOpen = $state(false);
	let chapter = $derived(chapters[chapterIndex]);

	function openTour() {
		chapterIndex = 0;
		tourOpen = true;
		void tick().then(() => dialog?.showModal());
	}

	function closeTour() {
		dialog?.close();
	}

	function nextChapter() {
		if (chapterIndex === chapters.length - 1) {
			closeTour();
			return;
		}
		chapterIndex += 1;
	}

	$effect(() => {
		if (!browser || !tourOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	});
</script>

<button class:compact class="tour-trigger" type="button" onclick={openTour}>
	Take the guided tour <span aria-hidden="true">▶</span>
</button>

<dialog
	class="tour-dialog"
	bind:this={dialog}
	aria-labelledby="tour-title"
	onclose={() => (tourOpen = false)}
	oncancel={() => (tourOpen = false)}
>
	<div class="tour-shell">
		<header class="tour-header">
			<div>
				<span class="brand-dot" aria-hidden="true"></span>
				<strong>Guided tour</strong>
				<span>{chapterIndex + 1} of {chapters.length}</span>
			</div>
			<button type="button" class="tour-close" onclick={closeTour}>Exit tour</button>
		</header>

		<div class="tour-progress" aria-label={`Chapter ${chapterIndex + 1} of ${chapters.length}`}>
			{#each chapters as item, index}
				<span
					class:active={index <= chapterIndex}
					aria-label={`Chapter ${item.number}: ${item.eyebrow}`}
					aria-current={index === chapterIndex ? 'step' : undefined}
				></span>
			{/each}
		</div>

		{#key chapter.number}
			<div class="tour-stage">
				<div class="tour-marker" aria-hidden="true">
					<span>{chapter.number}</span>
					<small>Chapter</small>
				</div>
				<div class="tour-copy">
					<p class="eyebrow">{chapter.eyebrow}</p>
					<h2 id="tour-title">{chapter.title}</h2>
					<p>{chapter.body}</p>
					<ul>
						{#each chapter.points as point}<li>{point}</li>{/each}
					</ul>
				</div>
			</div>
		{/key}

		<footer class="tour-footer">
			<a class="tour-link" href={chapter.href} onclick={closeTour}
				>{chapter.linkLabel} <span aria-hidden="true">→</span></a
			>
			<div>
				<button
					type="button"
					class="button button-secondary"
					disabled={chapterIndex === 0}
					onclick={() => (chapterIndex -= 1)}>Back</button
				>
				<button type="button" class="button button-primary" onclick={nextChapter}>
					{chapterIndex === chapters.length - 1 ? 'Finish Tour' : 'Next'}
					<span aria-hidden="true">→</span>
				</button>
			</div>
		</footer>
	</div>
</dialog>

<style>
	.tour-trigger {
		display: inline-flex;
		gap: 0.65rem;
		align-items: center;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--text-primary);
		font-size: var(--text-small);
		font-weight: 650;
		text-decoration: underline;
		text-decoration-color: color-mix(in srgb, var(--accent) 65%, transparent);
		text-underline-offset: 0.22em;
	}
	.tour-trigger:hover {
		color: var(--accent);
	}
	.tour-trigger:not(.compact) {
		min-height: 48px;
		padding: 0.78rem 1.05rem;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		text-decoration: none;
	}
	.tour-trigger span {
		color: var(--accent);
		font-size: 0.72rem;
	}
	.tour-dialog {
		width: min(100% - 2rem, 1040px);
		height: min(760px, calc(100dvh - 2rem));
		max-width: none;
		max-height: none;
		padding: 0;
		overflow: hidden;
		border: 1px solid var(--border-strong);
		background: var(--background);
		color: var(--text-primary);
		box-shadow: var(--shadow-large);
	}
	.tour-dialog::backdrop {
		background: rgba(3, 5, 8, 0.82);
		backdrop-filter: blur(10px);
	}
	.tour-shell {
		position: relative;
		display: grid;
		height: 100%;
		min-height: 0;
		grid-template-rows: auto auto 1fr auto;
		overflow: hidden;
		background:
			radial-gradient(circle at 82% 18%, rgba(103, 212, 255, 0.12), transparent 24rem),
			linear-gradient(rgba(103, 212, 255, 0.035) 1px, transparent 1px),
			linear-gradient(90deg, rgba(103, 212, 255, 0.035) 1px, transparent 1px), var(--background);
		background-size:
			auto,
			56px 56px,
			56px 56px,
			auto;
	}
	.tour-header,
	.tour-footer {
		position: relative;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-5) var(--space-6);
	}
	.tour-header {
		border-bottom: 1px solid var(--border);
	}
	.tour-header > div {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}
	.tour-header strong,
	.tour-header span,
	.tour-close {
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.tour-header span,
	.tour-close {
		color: var(--text-muted);
	}
	.brand-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--positive);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--positive) 12%, transparent);
	}
	.tour-close {
		min-height: 44px;
		padding-inline: var(--space-3);
		border: 0;
		background: transparent;
	}
	.tour-close:hover {
		color: var(--text-primary);
	}
	.tour-progress {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 4px;
		padding: 0 var(--space-6);
	}
	.tour-progress span {
		height: 2px;
		background: var(--border-strong);
	}
	.tour-progress span.active {
		background: var(--accent);
	}
	.tour-stage {
		position: relative;
		display: grid;
		grid-template-columns: minmax(180px, 0.55fr) minmax(0, 1.45fr);
		gap: var(--space-8);
		align-items: center;
		min-height: 0;
		padding: clamp(2.5rem, 7vw, 6rem);
		overflow-y: auto;
		animation: chapter-in var(--motion-section) var(--ease-out) both;
	}
	.tour-marker {
		display: grid;
		place-items: center;
		aspect-ratio: 1;
		border: 1px solid color-mix(in srgb, var(--accent) 48%, var(--border));
		background: color-mix(in srgb, var(--accent) 5%, var(--background-raised));
		box-shadow: inset 0 0 0 12px var(--background);
	}
	.tour-marker span {
		font-family: var(--font-mono);
		font-size: clamp(3.5rem, 8vw, 7rem);
		font-weight: 650;
		line-height: 0.8;
		color: var(--accent);
	}
	.tour-marker small {
		margin-top: -35%;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.tour-copy h2 {
		max-width: 14ch;
		margin-block: var(--space-3) var(--space-5);
		font-size: clamp(2rem, 4.4vw, 4.4rem);
	}
	.tour-copy > p:last-of-type {
		max-width: 44rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.tour-copy ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: var(--space-5);
		padding: 0;
		list-style: none;
	}
	.tour-copy li {
		padding: 0.45rem 0.65rem;
		border: 1px solid var(--border);
		background: var(--background-raised);
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.tour-footer {
		border-top: 1px solid var(--border);
		background: color-mix(in srgb, var(--background-raised) 90%, transparent);
	}
	.tour-footer > div {
		display: flex;
		gap: var(--space-3);
	}
	.tour-link {
		color: var(--accent);
		font-weight: 620;
	}
	button:disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}
	@keyframes chapter-in {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
	}
	@media (max-width: 700px) {
		.tour-dialog {
			width: 100%;
			height: 100dvh;
			max-height: 100dvh;
			margin: 0;
			border-inline: 0;
		}
		.tour-shell {
			height: 100%;
		}
		.tour-stage {
			grid-template-columns: 1fr;
			gap: var(--space-5);
			align-content: center;
			padding: var(--space-6) var(--space-5);
		}
		.tour-marker {
			width: 110px;
		}
		.tour-marker span {
			font-size: 3.2rem;
		}
		.tour-copy h2 {
			font-size: clamp(2rem, 10vw, 3.2rem);
		}
		.tour-footer {
			align-items: stretch;
			padding: var(--space-4) var(--space-5);
		}
		.tour-footer,
		.tour-footer > div {
			flex-direction: column;
		}
		.tour-footer .button {
			width: 100%;
		}
		.tour-link {
			text-align: center;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.tour-stage {
			animation: none;
		}
	}
</style>
