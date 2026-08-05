<script lang="ts">
	import {
		buildOptions,
		stageOptions,
		priorityOptions,
		recommendProjectFit,
		type BuildOption,
		type PriorityOption,
		type StageOption
	} from '$lib/content/project-fit';

	let build = $state<BuildOption>('not-sure');
	let stage = $state<StageOption>('idea');
	let priority = $state<PriorityOption>('testable-prototype');
	let recommendation = $derived(recommendProjectFit({ build, stage, priority }));
	let startHref = $derived(
		`/start?type=${encodeURIComponent(build)}&stage=${encodeURIComponent(stage)}&goal=${encodeURIComponent(priority)}`
	);
</script>

<div class="fit-builder">
	<form aria-describedby="fit-disclaimer">
		<fieldset>
			<legend><span>01</span> What are you trying to build?</legend>
			<div class="choice-grid">
				{#each buildOptions as option}
					<label>
						<input type="radio" name="fit-build" value={option.value} bind:group={build} />
						<span>{option.label}</span>
					</label>
				{/each}
			</div>
		</fieldset>

		<fieldset>
			<legend><span>02</span> What stage are you at?</legend>
			<div class="choice-grid">
				{#each stageOptions as option}
					<label>
						<input type="radio" name="fit-stage" value={option.value} bind:group={stage} />
						<span>{option.label}</span>
					</label>
				{/each}
			</div>
		</fieldset>

		<fieldset>
			<legend><span>03</span> What matters most?</legend>
			<div class="choice-grid">
				{#each priorityOptions as option}
					<label>
						<input type="radio" name="fit-priority" value={option.value} bind:group={priority} />
						<span>{option.label}</span>
					</label>
				{/each}
			</div>
		</fieldset>
	</form>

	<aside class="fit-result" aria-live="polite">
		<p class="eyebrow">Working recommendation</p>
		<h3>{recommendation.title}</h3>
		<p>{recommendation.explanation}</p>
		<div class="next-step">
			<span>Suggested next step</span>
			<p>{recommendation.nextStep}</p>
		</div>
		<a class="button button-primary" href={startHref}
			>Continue to Contact Form <span aria-hidden="true">→</span></a
		>
		<small id="fit-disclaimer">This is guidance, not a price or a final statement of scope.</small>
	</aside>
</div>

<style>
	.fit-builder {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
		gap: var(--space-5);
		align-items: start;
	}
	form {
		display: grid;
		gap: var(--space-4);
	}
	fieldset {
		padding: var(--space-5);
		border: 1px solid var(--border);
		background: var(--background-raised);
	}
	legend {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding-inline: 0.3rem;
		color: var(--text-primary);
		font-size: 0.95rem;
		font-weight: 650;
	}
	legend span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.choice-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.55rem;
		margin-top: var(--space-3);
	}
	label {
		position: relative;
	}
	label input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
	label span {
		display: flex;
		min-height: 46px;
		align-items: center;
		padding: 0.65rem 0.75rem;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-secondary);
		font-size: var(--text-small);
		cursor: pointer;
		transition:
			border-color var(--motion-fast) var(--ease-out),
			background var(--motion-fast) var(--ease-out),
			color var(--motion-fast) var(--ease-out);
	}
	label input:focus-visible + span {
		outline: 2px solid var(--focus-ring);
		outline-offset: 2px;
	}
	label input:checked + span {
		border-color: color-mix(in srgb, var(--accent) 65%, var(--border));
		background: var(--accent-soft);
		color: var(--text-primary);
	}
	.fit-result {
		position: sticky;
		top: 100px;
		padding: var(--space-6);
		border: 1px solid var(--border-strong);
		background:
			linear-gradient(135deg, color-mix(in srgb, var(--accent) 8%, transparent), transparent 46%),
			var(--surface);
		box-shadow: var(--shadow-standard);
	}
	.fit-result h3 {
		margin-block: var(--space-3) var(--space-4);
	}
	.fit-result > p:not(.eyebrow) {
		color: var(--text-secondary);
	}
	.next-step {
		margin-block: var(--space-5);
		padding: var(--space-4);
		border-left: 2px solid var(--accent);
		background: var(--background-raised);
	}
	.next-step span {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.next-step p {
		margin-top: 0.4rem;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.fit-result .button {
		width: 100%;
	}
	.fit-result small {
		display: block;
		margin-top: var(--space-3);
		color: var(--text-muted);
		font-size: var(--text-metadata);
		line-height: 1.5;
	}
	@media (max-width: 900px) {
		.fit-builder {
			grid-template-columns: 1fr;
		}
		.fit-result {
			position: static;
		}
	}
	@media (max-width: 560px) {
		.choice-grid {
			grid-template-columns: 1fr;
		}
		fieldset {
			padding: var(--space-4);
		}
	}
</style>
