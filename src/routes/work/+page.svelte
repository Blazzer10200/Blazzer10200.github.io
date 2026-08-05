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
		<h1>Products you can download, inspect, and use.</h1>
		<p class="lead">
			Each case study explains the problem, the product experience, and the decisions behind the
			build. Technical details are included for anyone who wants to inspect the architecture,
			testing, permissions, and release work.
		</p>
	</section>

	<section class="work-list container-wide" aria-label="Project case studies">
		{#each projects as project}<ProjectCard {project} featured />{/each}
	</section>

	<section class="evidence-note container section">
		<div>
			<p class="eyebrow">Evidence policy</p>
			<h2>I only publish claims I can support.</h2>
		</div>
		<p>
			The projects shown here are backed by public repositories, releases, and real product media. I
			do not add client names, usage numbers, testimonials, or performance claims without a source I
			can verify.
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
