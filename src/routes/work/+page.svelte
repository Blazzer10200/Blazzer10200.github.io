<script lang="ts">
	import CtaBand from '$lib/components/ui/CtaBand.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { projects } from '$lib/content/projects';
	import { site } from '$lib/content/site';
</script>

<Seo
	title={`Selected product work · ${site.name}`}
	description="Verified case studies covering product decisions, user experience, architecture, testing, security, releases, and what each shipped application demonstrates."
	path="/work"
/>

<main id="main-content" tabindex="-1">
	<section class="page-hero container-wide">
		<p class="eyebrow">Selected work</p>
		<h1>Real products. Public evidence. Honest status.</h1>
		<p class="lead">
			These case studies show both levels of the work: the problem and experience a client cares
			about, plus the architecture, testing, permissions, and difficult implementation decisions a
			technical reviewer may want to inspect.
		</p>
	</section>

	<section class="work-list container-wide" aria-label="Project case studies">
		{#each projects as project}<ProjectCard {project} featured />{/each}
	</section>

	<section class="evidence-note container section">
		<div>
			<p class="eyebrow">Evidence policy</p>
			<h2>If I cannot verify a claim, it does not become marketing copy.</h2>
		</div>
		<p>
			No invented clients, usage numbers, performance wins, testimonials, awards, or production
			scale. Public repositories and releases support the work shown here. Missing media becomes an
			asset requirement, not a generated stand-in pretending to be a client product.
		</p>
	</section>
	<CtaBand />
</main>

<style>
	.work-list {
		border-top: 1px solid var(--border-strong);
	}
	.evidence-note {
		display: grid;
		grid-template-columns: minmax(280px, 0.8fr) minmax(0, 1fr);
		gap: var(--space-10);
		align-items: end;
	}
	.evidence-note h2 {
		margin-top: var(--space-3);
	}
	.evidence-note > p {
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	@media (max-width: 760px) {
		.evidence-note {
			grid-template-columns: 1fr;
		}
	}
</style>
