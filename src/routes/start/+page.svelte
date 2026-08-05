<script lang="ts">
	import InquiryForm from '$lib/components/forms/InquiryForm.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { site } from '$lib/content/site';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
</script>

<Seo
	title={`Start a project · ${site.name}`}
	description="Share a website, software, desktop application, or AI-product idea. The inquiry form keeps your answers after validation errors and sends production submissions through server-side validation."
	path="/start"
/>

<main id="main-content" tabindex="-1">
	<section class="start-hero container-wide">
		<div>
			<p class="eyebrow">Start a project</p>
			<h1>Tell me about the project.</h1>
			<p>
				It is fine if you do not have every detail figured out. Describe the problem, who it
				affects, what exists today, and what you would like to improve.
			</p>
		</div>
		<aside>
			<span>What happens next</span>
			<ol>
				<li>I review the problem and current stage.</li>
				<li>I confirm whether the project fits my work.</li>
				<li>If it fits, I suggest the next useful conversation or discovery step.</li>
			</ol>
			<p>No project is accepted automatically from a budget selection.</p>
		</aside>
	</section>
	<section class="inquiry-layout container-wide section-tight">
		<div class="inquiry-intro">
			<p class="eyebrow">Project inquiry</p>
			<h2>A few details to get started.</h2>
			<p>
				Fields marked with an asterisk are required. Choose “Not sure yet” when you do not have an
				answer.
			</p>
			<a href={`mailto:${site.email}`}>Form trouble? Email {site.email}</a>
		</div>
		<InquiryForm {form} turnstileSiteKey={data.turnstileSiteKey} prefill={data.prefill} />
	</section>
</main>

<style>
	.start-hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(320px, 0.55fr);
		gap: var(--space-10);
		align-items: end;
		padding-block: clamp(4rem, 9vw, 8rem);
	}
	.start-hero h1 {
		max-width: 12ch;
		margin-block: var(--space-3) var(--space-5);
	}
	.start-hero > div > p:last-child {
		max-width: 48rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.start-hero aside {
		padding: var(--space-5);
		border: 1px solid var(--border-strong);
		background: var(--background-raised);
	}
	.start-hero aside > span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.start-hero ol {
		display: grid;
		gap: 0.75rem;
		margin-block: var(--space-4);
		padding-left: 1.2rem;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.start-hero aside > p {
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-size: var(--text-metadata);
	}
	.inquiry-layout {
		display: grid;
		grid-template-columns: minmax(240px, 0.45fr) minmax(0, 1fr);
		gap: var(--space-10);
		border-top: 1px solid var(--border-strong);
	}
	.inquiry-intro {
		position: sticky;
		top: 110px;
		align-self: start;
	}
	.inquiry-intro h2 {
		margin-block: var(--space-3) var(--space-4);
	}
	.inquiry-intro p {
		color: var(--text-secondary);
	}
	.inquiry-intro a {
		display: block;
		margin-top: var(--space-5);
		color: var(--accent);
		font-size: var(--text-small);
	}
	@media (max-width: 850px) {
		.start-hero,
		.inquiry-layout {
			grid-template-columns: 1fr;
		}
		.inquiry-intro {
			position: static;
		}
	}
</style>
