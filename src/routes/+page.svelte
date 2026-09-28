<script lang="ts">
	import CtaBand from '$lib/components/ui/CtaBand.svelte';
	import DeliveryRail from '$lib/components/sections/DeliveryRail.svelte';
	import GuidedTour from '$lib/components/sections/GuidedTour.svelte';
	import ProjectFitBuilder from '$lib/components/sections/ProjectFitBuilder.svelte';
	import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
	import SectionIntro from '$lib/components/ui/SectionIntro.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { projects } from '$lib/content/projects';
	import { services } from '$lib/content/services';
	import { proofItems, site, siteUrl, whyWorkWithMe } from '$lib/content/site';

	const schema = [
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: site.name,
			jobTitle: site.role,
			url: siteUrl,
			email: `mailto:${site.email}`,
			sameAs: [site.github],
			knowsAbout: [
				'Custom websites',
				'Business software',
				'Desktop applications',
				'AI product integration',
				'SvelteKit',
				'Rust',
				'TypeScript',
				'Python'
			]
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: `${site.name} · Product Development`,
			url: siteUrl,
			description:
				'Custom websites, Windows tools, connected systems, and carefully scoped automation for businesses and founders.'
		},
		...services.map((service) => ({
			'@context': 'https://schema.org',
			'@type': 'Service',
			name: service.title,
			description: service.lead,
			provider: { '@type': 'Person', name: site.name, url: siteUrl },
			areaServed: 'United States'
		}))
	];
</script>

<Seo
	title="Braison Swilling · Custom websites, Windows tools, and integrations"
	description="I design custom websites, build practical Windows tools and scripts, and connect software, services, data, and carefully bounded AI features."
	{schema}
/>

<main id="main-content" tabindex="-1">
	<section class="home-hero container-wide">
		<div class="hero-copy">
			<p class="eyebrow">Website and software developer · Central Arkansas / Remote</p>
			<h1>Custom websites, Windows tools, and connected systems.</h1>
			<p class="hero-lead">
				I design websites, build practical tools and scripts for Windows 10 and 11, and connect
				software and services that need to work together.
			</p>
			<div class="page-actions">
				<a class="button button-primary" href="#choose-path"
					>Explore Services <span aria-hidden="true">↓</span></a
				>
				<a class="button button-secondary" href="/work">View My Work</a>
			</div>
			<div class="hero-tour"><span>Prefer a walkthrough?</span><GuidedTour compact /></div>
			<div class="hero-note">
				<span>My responsibility</span>
				<p>
					Requirements, architecture, interface decisions, review, testing, deployment, and final
					quality.
				</p>
			</div>
		</div>
		<div class="hero-visual">
			<DeliveryRail />
			<div class="hero-receipt">
				<span>Built and shipped</span>
				<strong>Rift + EXFIL</strong>
				<a href="/work">Inspect the evidence ↗</a>
			</div>
		</div>
	</section>

	<section
		class="path-section container-wide section-tight"
		id="choose-path"
		aria-labelledby="path-title"
	>
		<div class="path-heading">
			<p class="eyebrow">Choose a direction</p>
			<h2 id="path-title">What would you like to improve?</h2>
			<p>
				Choose the closest starting point. Each service page explains the deliverables, boundaries,
				and next step in plain language.
			</p>
		</div>
		<nav class="path-grid" aria-label="Choose a project direction">
			<a href="/services#websites">
				<span>01</span>
				<strong>A custom website</strong>
				<p>Design, content structure, development, forms, and launch.</p>
				<small>Explore websites →</small>
			</a>
			<a href="/services#software">
				<span>02</span>
				<strong>A Windows tool or script</strong>
				<p>Focused utilities, desktop applications, and repeated-task automation.</p>
				<small>Explore Windows tools →</small>
			</a>
			<a href="/services#ai">
				<span>03</span>
				<strong>Systems that need connecting</strong>
				<p>APIs, services, data, Discord, workflows, and useful AI features.</p>
				<small>Explore integrations →</small>
			</a>
		</nav>
	</section>

	<section class="proof-strip" aria-label="Verified capability proof">
		<div class="container-wide">
			{#each proofItems as proof}
				<div><span>{proof.label}</span><strong>{proof.value}</strong></div>
			{/each}
		</div>
	</section>

	<section class="services-section section" id="services">
		<div class="container-wide">
			<SectionIntro
				eyebrow="Core services"
				title="Three ways I can help."
				body="Every project starts with the same basics: understand the problem, agree on the first useful release, build it carefully, and leave it maintainable."
				align="split"
			/>
		</div>
		<div class="service-rows">
			{#each services as service}
				<article class="container-wide">
					<div class="service-number">{service.number}</div>
					<div class="service-heading">
						<h3>{service.title}</h3>
						<p>{service.lead}</p>
					</div>
					<ul>
						{#each service.deliverables.slice(0, 4) as item}<li>{item}</li>{/each}
					</ul>
					<a class="text-link" href={`/services#${service.id}`}
						>Explore this service <span aria-hidden="true">→</span></a
					>
				</article>
			{/each}
		</div>
	</section>

	<section
		class="work-section container-wide section"
		id="featured-work"
		aria-labelledby="featured-work-title"
	>
		<SectionIntro
			eyebrow="Featured work"
			title="A closer look at what I have shipped."
			body="Rift and EXFIL are public applications with real releases, working interfaces, and source code you can inspect."
			align="split"
		/>
		<div class="project-list">
			{#each projects as project}<ProjectCard {project} featured />{/each}
		</div>
	</section>

	<section class="fit-section section" aria-labelledby="fit-title">
		<div class="container-wide">
			<SectionIntro
				eyebrow="Project Fit Builder"
				title="Not sure where to start? Use the Project Fit tool."
				body="Choose the answers closest to your situation. You will get a suggested service and a sensible next step, and your choices will carry into the inquiry form."
				align="split"
			/>
			<ProjectFitBuilder />
		</div>
	</section>

	<section class="why-section section">
		<div class="container-wide why-grid">
			<div class="why-heading">
				<p class="eyebrow">Why work with me</p>
				<h2>You work directly with the person building it.</h2>
				<p>
					I stay involved in the planning, product decisions, development, testing, and launch.
					There is no handoff to a separate delivery team.
				</p>
			</div>
			<div class="why-list">
				{#each whyWorkWithMe as item, index}
					<article>
						<span>0{index + 1}</span>
						<div>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<section class="about-preview container-wide section">
		<div class="about-stamp">
			<span>Background</span><strong>My approach is practical and hands-on.</strong>
		</div>
		<div>
			<p class="eyebrow">About me</p>
			<h2>
				I came into software through game servers, industrial work, and problems I wanted fixed.
			</h2>
			<p>
				I learned responsibility while working around live equipment, and I learned software by
				building products people could use. Both experiences taught me to understand the full
				system, plan for failure, and follow through.
			</p>
			<a class="text-link" href="/about">Read my story <span aria-hidden="true">→</span></a>
		</div>
	</section>

	<CtaBand />
</main>

<style>
	.home-hero {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(430px, 0.8fr);
		gap: clamp(3rem, 7vw, 7rem);
		align-items: center;
		min-height: calc(100svh - 76px);
		padding-block: clamp(4rem, 9vw, 8rem);
	}
	.home-hero > * {
		animation: page-enter var(--motion-section) var(--ease-out) both;
	}
	.home-hero > :last-child {
		animation-delay: 90ms;
	}
	@keyframes page-enter {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}
	.hero-copy h1 {
		max-width: 12ch;
		margin-block: var(--space-4) var(--space-5);
		font-size: clamp(3.25rem, 5.6vw, 6rem);
	}
	.hero-lead {
		max-width: 46rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.hero-tour {
		display: flex;
		gap: 0.6rem;
		align-items: center;
		margin-top: var(--space-4);
		color: var(--text-muted);
		font-size: var(--text-small);
	}
	.hero-note {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		max-width: 46rem;
		margin-top: var(--space-6);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
	}
	.hero-note span {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.hero-note p {
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.hero-visual {
		position: relative;
	}
	.path-section {
		scroll-margin-top: 90px;
		border-top: 1px solid var(--border-strong);
	}
	.path-heading {
		display: grid;
		grid-template-columns: minmax(260px, 0.8fr) minmax(0, 1.2fr);
		gap: var(--space-8);
		align-items: end;
		margin-bottom: var(--space-7);
	}
	.path-heading h2 {
		max-width: 12ch;
		margin-top: var(--space-3);
	}
	.path-heading > p:last-child {
		max-width: 43rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.path-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		border-top: 1px solid var(--border-strong);
		border-left: 1px solid var(--border-strong);
	}
	.path-grid a {
		display: grid;
		min-height: 300px;
		align-content: start;
		padding: var(--space-5);
		border-right: 1px solid var(--border-strong);
		border-bottom: 1px solid var(--border-strong);
		background: var(--background-raised);
		text-decoration: none;
		transition:
			background var(--motion-standard) var(--ease-out),
			transform var(--motion-standard) var(--ease-out);
	}
	.path-grid a:hover {
		z-index: 1;
		background: var(--surface);
		transform: translateY(-4px);
	}
	.path-grid span,
	.path-grid small {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.path-grid strong {
		margin-block: auto var(--space-3);
		font-size: clamp(1.25rem, 2vw, 1.75rem);
		line-height: 1.08;
		letter-spacing: -0.03em;
	}
	.path-grid p {
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.path-grid small {
		margin-top: var(--space-5);
	}
	.hero-receipt {
		position: relative;
		z-index: 2;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.2rem 1rem;
		width: min(80%, 360px);
		margin: -1rem 1.5rem 0 auto;
		padding: 0.9rem 1rem;
		border: 1px solid var(--border-strong);
		background: var(--surface);
		box-shadow: var(--shadow-standard);
	}
	.hero-receipt span,
	.hero-receipt a {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.hero-receipt strong {
		grid-row: 2;
	}
	.hero-receipt a {
		grid-column: 2;
		grid-row: 1 / 3;
		align-self: center;
		color: var(--accent);
	}
	.proof-strip {
		position: relative;
		z-index: 1;
		border-block: 1px solid var(--border);
		background: var(--background-raised);
	}
	.proof-strip > div {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}
	.proof-strip > div > div {
		display: grid;
		gap: 0.35rem;
		min-height: 110px;
		align-content: center;
		padding: var(--space-4);
		border-left: 1px solid var(--border);
	}
	.proof-strip > div > div:last-child {
		border-right: 1px solid var(--border);
	}
	.proof-strip span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.proof-strip strong {
		color: var(--text-secondary);
		font-size: var(--text-small);
		font-weight: 520;
	}
	.service-number {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.services-section {
		background: var(--background-raised);
	}
	.service-rows {
		margin-top: var(--space-7);
		border-top: 1px solid var(--border-strong);
	}
	.service-rows article {
		display: grid;
		grid-template-columns: 3rem minmax(300px, 0.9fr) minmax(260px, 0.65fr) auto;
		gap: var(--space-6);
		align-items: start;
		padding-block: var(--space-7);
		border-bottom: 1px solid var(--border);
	}
	.service-heading h3 {
		margin-bottom: var(--space-3);
		font-size: clamp(1.5rem, 2.8vw, 2.5rem);
	}
	.service-heading p,
	.service-rows li {
		color: var(--text-secondary);
	}
	.service-rows ul {
		display: grid;
		gap: 0.55rem;
		padding-left: 1.1rem;
		font-size: var(--text-small);
	}
	.project-list {
		display: grid;
	}
	.fit-section {
		border-block: 1px solid var(--border);
		background: var(--background-raised);
	}
	.why-section {
		background: var(--background-raised);
	}
	.why-grid {
		display: grid;
		grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1.25fr);
		gap: var(--space-10);
	}
	.why-heading {
		position: sticky;
		top: 120px;
		align-self: start;
	}
	.why-heading h2 {
		max-width: 11ch;
		margin-block: var(--space-3) var(--space-5);
	}
	.why-heading > p:last-child {
		max-width: 34rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.why-list {
		border-top: 1px solid var(--border-strong);
	}
	.why-list article {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: var(--space-4);
		padding-block: var(--space-5);
		border-bottom: 1px solid var(--border);
	}
	.why-list article > span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.why-list h3 {
		margin-bottom: 0.6rem;
	}
	.why-list p {
		color: var(--text-secondary);
	}
	.about-preview {
		display: grid;
		grid-template-columns: minmax(260px, 0.6fr) minmax(0, 1fr);
		gap: var(--space-10);
		align-items: start;
	}
	.about-stamp {
		padding: var(--space-5);
		border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--border));
		background: var(--accent-soft);
		transform: rotate(-1deg);
	}
	.about-stamp span {
		display: block;
		margin-bottom: var(--space-3);
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		text-transform: uppercase;
	}
	.about-preview > div:last-child h2 {
		max-width: 17ch;
		margin-block: var(--space-3) var(--space-5);
	}
	.about-preview > div:last-child p {
		max-width: 50rem;
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.about-preview .text-link {
		margin-top: var(--space-5);
	}
	@media (max-width: 1050px) {
		.home-hero {
			grid-template-columns: 1fr;
			min-height: auto;
		}
		.hero-copy h1 {
			max-width: 14ch;
		}
		.hero-visual {
			max-width: 760px;
		}
		.path-grid {
			grid-template-columns: 1fr 1fr;
		}
		.service-rows article {
			grid-template-columns: 3rem 1fr 1fr;
		}
		.service-rows .text-link {
			grid-column: 2;
		}
	}
	@media (max-width: 860px) {
		.proof-strip > div {
			grid-template-columns: 1fr 1fr;
		}
		.why-grid,
		.about-preview,
		.path-heading {
			grid-template-columns: 1fr;
		}
		.why-heading {
			position: static;
		}
	}
	@media (max-width: 680px) {
		.home-hero {
			padding-block: 3.25rem 4.5rem;
		}
		.hero-copy h1 {
			font-size: clamp(2.8rem, 14vw, 4rem);
		}
		.hero-tour {
			align-items: flex-start;
			flex-direction: column;
		}
		.path-grid {
			grid-template-columns: 1fr;
		}
		.path-grid a {
			min-height: 240px;
		}
		.hero-note {
			grid-template-columns: 1fr;
		}
		.proof-strip > div {
			grid-template-columns: 1fr;
		}
		.proof-strip > div > div {
			min-height: 88px;
			border-right: 1px solid var(--border);
		}
		.service-rows article {
			grid-template-columns: 2rem 1fr;
		}
		.service-rows article ul,
		.service-rows .text-link {
			grid-column: 2;
		}
		.hero-receipt {
			width: calc(100% - 1rem);
			margin-right: 0.5rem;
		}
	}
</style>
