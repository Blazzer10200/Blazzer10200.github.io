<script lang="ts">
	import CtaBand from '$lib/components/ui/CtaBand.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { services } from '$lib/content/services';
	import { site, siteUrl } from '$lib/content/site';

	const schema = services.map((service) => ({
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: service.title,
		description: service.lead,
		provider: { '@type': 'Person', name: site.name, url: siteUrl },
		areaServed: 'United States'
	}));
</script>

<Seo
	title={`Custom website, software, and AI services · ${site.name}`}
	description="Custom business websites, internal tools, portals, desktop applications, MVPs, and carefully bounded AI integrations—planned, built, tested, and deployed by one product developer."
	path="/services"
	{schema}
/>

<main id="main-content" tabindex="-1">
	<section class="page-hero container-wide">
		<p class="eyebrow">Services</p>
		<h1>Custom products for problems that do not fit a template.</h1>
		<p class="lead">
			I work across the whole product: discovery, requirements, interaction design, implementation,
			testing, deployment, and documentation. The engagement starts by finding the smallest complete
			result worth shipping.
		</p>
		<div class="page-actions">
			<a class="button button-primary" href="/start"
				>Start a Project <span aria-hidden="true">→</span></a
			><a class="button button-secondary" href="/work">See shipped work</a>
		</div>
	</section>

	<section class="service-detail container-wide" aria-label="Service details">
		{#each services as service}
			<article id={service.id}>
				<header>
					<span>{service.number}</span>
					<div>
						<p class="eyebrow">{service.shortTitle}</p>
						<h2>{service.title}</h2>
						<p>{service.lead}</p>
					</div>
				</header>
				<div class="service-body">
					<section>
						<h3>What this can include</h3>
						<ul>
							{#each service.deliverables as item}<li>{item}</li>{/each}
						</ul>
					</section>
					<section>
						<h3>What it should improve</h3>
						<ul>
							{#each service.outcomes as item}<li>{item}</li>{/each}
						</ul>
					</section>
					<aside>
						<div>
							<span>Good fit</span>
							<p>{service.goodFit}</p>
						</div>
						<div>
							<span>Boundary</span>
							<p>{service.boundary}</p>
						</div>
					</aside>
				</div>
				<a class="text-link" href={`/start?service=${service.id}`}
					>Discuss a {service.title.toLowerCase()} project <span aria-hidden="true">→</span></a
				>
			</article>
		{/each}
	</section>

	<section class="scope-note container section">
		<div>
			<p class="eyebrow">How scope is handled</p>
			<h2>No instant price. No mystery process either.</h2>
		</div>
		<div class="scope-steps">
			<p>
				<span>01</span><strong>Fit first.</strong> I confirm whether the project matches the work I do.
			</p>
			<p>
				<span>02</span><strong>Discovery next.</strong> We identify requirements, risks, existing assets,
				and the first release.
			</p>
			<p>
				<span>03</span><strong>Proposal after evidence.</strong> You receive scope, milestones, assumptions,
				and a price tied to the defined work.
			</p>
		</div>
	</section>

	<CtaBand
		title="Start with the business problem, not a feature shopping list."
		body="Share the current process, who is affected, what already exists, and what a useful result would change."
	/>
</main>

<style>
	.service-detail {
		border-top: 1px solid var(--border-strong);
	}
	.service-detail > article {
		scroll-margin-top: 100px;
		padding-block: var(--section-space);
		border-bottom: 1px solid var(--border-strong);
	}
	header {
		display: grid;
		grid-template-columns: 5rem 1fr;
		gap: var(--space-6);
		max-width: 65rem;
	}
	header > span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-label);
	}
	header h2 {
		margin-block: var(--space-3) var(--space-5);
	}
	header div > p:last-child {
		max-width: 48rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.service-body {
		display: grid;
		grid-template-columns: 1fr 1fr minmax(280px, 0.8fr);
		gap: var(--space-5);
		margin-block: var(--space-7);
		margin-left: 5rem;
	}
	.service-body > section,
	.service-body aside {
		padding: var(--space-5);
		border: 1px solid var(--border);
		background: var(--background-raised);
	}
	.service-body h3 {
		margin-bottom: var(--space-4);
		font-size: 1rem;
		letter-spacing: -0.01em;
	}
	.service-body ul {
		display: grid;
		gap: 0.65rem;
		padding-left: 1rem;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.service-body aside {
		display: grid;
		gap: var(--space-5);
		background: var(--surface);
	}
	.service-body aside div + div {
		padding-top: var(--space-5);
		border-top: 1px solid var(--border);
	}
	.service-body aside span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.service-body aside p {
		margin-top: 0.5rem;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.service-detail article > .text-link {
		margin-left: 5rem;
	}
	.scope-note {
		display: grid;
		grid-template-columns: minmax(280px, 0.7fr) minmax(0, 1fr);
		gap: var(--space-10);
	}
	.scope-note h2 {
		margin-top: var(--space-3);
	}
	.scope-steps {
		border-top: 1px solid var(--border-strong);
	}
	.scope-steps p {
		display: grid;
		grid-template-columns: 2rem 10rem 1fr;
		gap: 1rem;
		padding-block: var(--space-5);
		border-bottom: 1px solid var(--border);
		color: var(--text-secondary);
	}
	.scope-steps span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.scope-steps strong {
		color: var(--text-primary);
	}
	@media (max-width: 900px) {
		.service-body {
			grid-template-columns: 1fr 1fr;
		}
		.service-body aside {
			grid-column: 1 / -1;
		}
		.scope-note {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 680px) {
		header {
			grid-template-columns: 2rem 1fr;
		}
		.service-body {
			grid-template-columns: 1fr;
			margin-left: 0;
		}
		.service-body aside {
			grid-column: auto;
		}
		.service-detail article > .text-link {
			margin-left: 0;
		}
		.scope-steps p {
			grid-template-columns: 2rem 1fr;
		}
		.scope-steps p:not(span) {
			grid-column: 2;
		}
	}
</style>
