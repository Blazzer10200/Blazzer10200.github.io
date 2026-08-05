<script lang="ts">
	import { processStages } from '$lib/content/process';
</script>

<ol class="process-list">
	{#each processStages as stage}
		<li>
			<div class="stage-heading">
				<span>{stage.number}</span>
				<h3>{stage.title}</h3>
			</div>
			<p>{stage.happens}</p>
			<dl>
				<div>
					<dt>You receive</dt>
					<dd>{stage.receive}</dd>
				</div>
				<div>
					<dt>Decision</dt>
					<dd>{stage.decision}</dd>
				</div>
			</dl>
		</li>
	{/each}
</ol>

<style>
	.process-list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--border-strong);
		border-left: 1px solid var(--border);
		list-style: none;
	}
	li {
		position: relative;
		min-height: 330px;
		padding: var(--space-5);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background: var(--background-raised);
		transition: background var(--motion-standard) var(--ease-out);
	}
	li:hover {
		background: var(--surface);
	}
	.stage-heading {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: var(--space-4);
	}
	.stage-heading span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	h3 {
		font-size: 1.2rem;
	}
	li > p {
		min-height: 7rem;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	dl {
		display: grid;
		gap: 0.75rem;
		margin-top: var(--space-4);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
	}
	dt {
		margin-bottom: 0.2rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	dd {
		color: var(--text-primary);
		font-size: 0.76rem;
		line-height: 1.45;
	}
	@media (max-width: 980px) {
		.process-list {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 560px) {
		.process-list {
			grid-template-columns: 1fr;
		}
		li {
			min-height: 0;
		}
		li > p {
			min-height: 0;
		}
	}
</style>
