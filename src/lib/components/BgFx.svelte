<script lang="ts">
	import { onMount } from 'svelte';

	let host: HTMLDivElement;

	onMount(() => {
		const aurora = document.createElement('div');
		aurora.className = 'hy-aurora';
		const grid = document.createElement('div');
		grid.className = 'hy-grid';
		host.classList.add('on', 'bg-hybrid');
		host.append(aurora, grid);
	});
</script>

<div class="bg-fx" bind:this={host} aria-hidden="true"></div>

<style>
	.bg-fx {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.6s ease;
	}
	.bg-fx:global(.on) {
		opacity: 1;
	}
	.bg-fx :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* hybrid — aurora + grid */
	:global(.bg-hybrid) {
		overflow: hidden;
	}
	:global(.bg-hybrid .hy-aurora),
	:global(.bg-hybrid .hy-grid) {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}
	:global(.bg-hybrid .hy-aurora) {
		background:
			radial-gradient(620px 440px at 18% 28%, rgba(120, 196, 255, 0.22), transparent 62%),
			radial-gradient(540px 400px at 82% 72%, rgba(154, 209, 199, 0.14), transparent 62%),
			radial-gradient(720px 520px at 62% 14%, rgba(120, 196, 255, 0.12), transparent 66%),
			radial-gradient(480px 360px at 30% 88%, rgba(120, 196, 255, 0.10), transparent 60%);
		filter: blur(36px);
		animation: hyAurora 32s ease-in-out infinite alternate;
		will-change: transform;
	}
	:global(.bg-hybrid .hy-grid) {
		background-image:
			linear-gradient(rgba(120, 196, 255, 0.07) 1px, transparent 1px),
			linear-gradient(90deg, rgba(120, 196, 255, 0.06) 1px, transparent 1px);
		background-size:
			56px 56px,
			56px 56px;
		mask-image: radial-gradient(
			ellipse 75% 65% at 50% 45%,
			#000 25%,
			rgba(0, 0, 0, 0.55) 60%,
			transparent 100%
		);
		-webkit-mask-image: radial-gradient(
			ellipse 75% 65% at 50% 45%,
			#000 25%,
			rgba(0, 0, 0, 0.55) 60%,
			transparent 100%
		);
		mix-blend-mode: screen;
	}
	@keyframes hyAurora {
		0% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(-3%, 2%, 0) scale(1.08);
		}
		100% {
			transform: translate3d(2%, -2%, 0) scale(1.04);
		}
	}

	@media print {
		.bg-fx {
			display: none !important;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		:global(.bg-hybrid .hy-aurora) {
			animation: none;
		}
	}
</style>
