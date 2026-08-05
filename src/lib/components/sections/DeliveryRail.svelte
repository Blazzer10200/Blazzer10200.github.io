<script lang="ts">
	const stages = [
		{ label: 'Idea', output: 'Problem captured' },
		{ label: 'Plan', output: 'Scope defined' },
		{ label: 'Build', output: 'Working product' },
		{ label: 'Review', output: 'Decisions checked' },
		{ label: 'Ship', output: 'Release delivered' }
	];
</script>

<div
	class="delivery-rail"
	aria-label="Product development moves from idea through plan, build, review, and ship"
>
	<div class="rail-header">
		<span>Delivery pipeline</span>
		<span class="rail-status"><i></i> Operator responsible</span>
	</div>
	<ol>
		{#each stages as stage, index}
			<li style={`--stage: ${index}`}>
				<span class="stage-index">0{index + 1}</span>
				<strong>{stage.label}</strong>
				<small>{stage.output}</small>
				<i aria-hidden="true"></i>
			</li>
		{/each}
	</ol>
	<div class="product-output">
		<div>
			<span>Output</span>
			<strong>Tested product</strong>
		</div>
		<p>requirements · interface · code · checks · deployment</p>
		<span class="ship-mark">SHIP / 01</span>
	</div>
</div>

<style>
	.delivery-rail {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--border-strong);
		background:
			linear-gradient(var(--blueprint-line) 1px, transparent 1px),
			linear-gradient(90deg, var(--blueprint-line) 1px, transparent 1px), var(--background-raised);
		background-size: 32px 32px;
		box-shadow: var(--shadow-large);
	}
	.rail-header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 1rem;
		border-bottom: 1px solid var(--border);
		background: color-mix(in srgb, var(--surface) 88%, transparent);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.rail-status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--text-secondary);
	}
	.rail-status i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--positive);
		box-shadow: 0 0 12px color-mix(in srgb, var(--positive) 55%, transparent);
	}
	ol {
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		padding: 2.25rem 1.15rem 2rem;
		list-style: none;
	}
	ol::before {
		position: absolute;
		top: 5rem;
		right: 10%;
		left: 10%;
		height: 1px;
		background: var(--border-strong);
		content: '';
	}
	li {
		position: relative;
		display: grid;
		justify-items: center;
		gap: 0.55rem;
		min-width: 0;
		text-align: center;
	}
	li > i {
		position: absolute;
		top: 2.35rem;
		z-index: 1;
		width: 11px;
		height: 11px;
		border: 2px solid var(--background-raised);
		border-radius: 50%;
		background: var(--text-muted);
		animation: stage-pulse 7.5s var(--ease-standard) infinite;
		animation-delay: calc(var(--stage) * 1.5s);
	}
	.stage-index {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	li strong {
		margin-top: 1.35rem;
		font-size: 0.82rem;
		font-weight: 650;
		text-transform: uppercase;
	}
	li small {
		max-width: 10ch;
		color: var(--text-muted);
		font-size: 0.68rem;
		line-height: 1.35;
	}
	.product-output {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
		margin: 0 1.15rem 1.15rem;
		padding: 1rem;
		border: 1px solid var(--border);
		background: color-mix(in srgb, var(--surface) 94%, transparent);
	}
	.product-output div {
		display: grid;
		gap: 0.2rem;
	}
	.product-output span,
	.product-output p {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.64rem;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.product-output strong {
		font-size: 0.95rem;
	}
	.product-output p {
		grid-row: 2;
	}
	.ship-mark {
		grid-column: 2;
		grid-row: 1 / 3;
		padding: 0.6rem 0.7rem;
		border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--border));
		color: var(--accent) !important;
		transform: rotate(-2deg);
	}
	@keyframes stage-pulse {
		0%,
		16% {
			background: var(--accent);
			box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 13%, transparent);
		}
		20%,
		100% {
			background: var(--text-muted);
			box-shadow: none;
		}
	}
	@media (max-width: 620px) {
		.rail-header {
			align-items: flex-start;
			flex-direction: column;
		}
		ol {
			grid-template-columns: 1fr;
			gap: 0;
			padding: 1rem;
		}
		ol::before {
			top: 2rem;
			bottom: 2rem;
			left: 1.38rem;
			width: 1px;
			height: auto;
		}
		li {
			grid-template-columns: 1.5rem 3.75rem 1fr;
			justify-items: start;
			gap: 0.6rem;
			align-items: center;
			min-height: 54px;
			padding-left: 0.15rem;
			text-align: left;
		}
		li > i {
			top: auto;
			left: 0.02rem;
		}
		li strong {
			margin-top: 0;
		}
		li small {
			max-width: none;
		}
		.product-output {
			grid-template-columns: 1fr;
		}
		.product-output p {
			grid-row: auto;
		}
		.ship-mark {
			grid-column: auto;
			grid-row: auto;
			width: fit-content;
		}
	}
</style>
