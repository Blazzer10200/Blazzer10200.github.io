<script lang="ts">
	import CtaBand from '$lib/components/ui/CtaBand.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import type { Project } from '$lib/content/projects';
	import { site, siteUrl } from '$lib/content/site';

	let { project }: { project: Project } = $props();

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: project.name,
		description: project.summary,
		applicationCategory: project.slug === 'rift' ? 'DeveloperApplication' : 'UtilitiesApplication',
		operatingSystem: 'Windows',
		author: {
			'@type': 'Person',
			name: site.name,
			url: siteUrl
		},
		codeRepository: project.links.find((link) => link.href.includes('github.com'))?.href
	});
</script>

<Seo
	title={`${project.name} case study · ${site.name}`}
	description={`${project.summary} Read the product decisions, architecture, testing, security boundaries, and current status.`}
	path={`/work/${project.slug}`}
	image={project.hero.src}
	imageAlt={project.hero.alt}
	{schema}
/>

<main id="main-content" tabindex="-1">
	<section class="case-hero container-wide">
		<nav class="breadcrumbs" aria-label="Breadcrumb">
			<a href="/">Home</a><span aria-hidden="true">/</span><a href="/work">Work</a><span
				aria-hidden="true">/</span
			><span aria-current="page">{project.name}</span>
		</nav>

		<div class="case-heading">
			<div>
				<p class="eyebrow">{project.eyebrow}</p>
				<h1>{project.name}</h1>
			</div>
			<p>{project.summary}</p>
		</div>

		<div class="case-actions">
			{#each project.links as link}
				<a
					class:button-primary={link.kind === 'primary'}
					class:button-secondary={link.kind === 'secondary'}
					class="button"
					href={link.href}
					target="_blank"
					rel="noopener">{link.label} <span aria-hidden="true">↗</span></a
				>
			{/each}
		</div>

		<dl class="case-meta">
			<div>
				<dt>Problem</dt>
				<dd>{project.problem}</dd>
			</div>
			<div>
				<dt>What I built</dt>
				<dd>{project.built}</dd>
			</div>
			<div>
				<dt>Current status</dt>
				<dd>{project.status}</dd>
			</div>
		</dl>
	</section>

	<section class="case-media container-wide" aria-labelledby="media-title">
		<h2 id="media-title" class="sr-only">{project.name} product media</h2>
		<figure>
			<picture>
				{#if project.hero.webp}<source srcset={project.hero.webp} type="image/webp" />{/if}
				<img
					src={project.hero.src}
					alt={project.hero.alt}
					width={project.hero.width}
					height={project.hero.height}
					decoding="async"
				/>
			</picture>
			<figcaption>{project.hero.caption}</figcaption>
		</figure>
		{#if project.slug === 'rift'}
			<video controls preload="metadata" poster={project.hero.src} aria-label="Rift product tour">
				<source src="/videos/rift-tour.mp4" type="video/mp4" />
				Your browser does not support the Rift product tour video.
			</video>
		{/if}
	</section>

	<section
		class="case-capabilities container-wide section-tight"
		aria-labelledby="capabilities-title"
	>
		<div class="capability-heading">
			<p class="eyebrow">Product at a glance</p>
			<h2 id="capabilities-title">What the shipped product does.</h2>
		</div>
		<ul>
			{#each project.capabilities as capability}<li>{capability}</li>{/each}
		</ul>
		<div class="technology-row" aria-label="Technologies used">
			{#each project.technologies as technology}<span>{technology}</span>{/each}
		</div>
	</section>

	<section class="depth container-wide section" aria-labelledby="depth-title">
		<header class="depth-header">
			<div>
				<p class="eyebrow">Two levels of detail</p>
				<h2 id="depth-title">Start with the product. Inspect the engineering when it matters.</h2>
			</div>
			<nav aria-label="Case study views">
				<a href="#product-view">Product View</a>
				<a href="#engineering-view">Engineering View</a>
			</nav>
		</header>

		<div class="depth-grid">
			<section id="product-view" aria-labelledby="product-view-title">
				<div class="view-label">
					<span>01</span>
					<h3 id="product-view-title">Product View</h3>
				</div>
				{#each project.productView as section}
					<article>
						<h4>{section.title}</h4>
						{#each section.body as paragraph}<p>{paragraph}</p>{/each}
						{#if section.points}<ul>
								{#each section.points as point}<li>{point}</li>{/each}
							</ul>{/if}
					</article>
				{/each}
			</section>

			<section id="engineering-view" aria-labelledby="engineering-view-title">
				<div class="view-label">
					<span>02</span>
					<h3 id="engineering-view-title">Engineering View</h3>
				</div>
				{#each project.engineeringView as section}
					<article>
						<h4>{section.title}</h4>
						{#each section.body as paragraph}<p>{paragraph}</p>{/each}
						{#if section.points}<ul>
								{#each section.points as point}<li>{point}</li>{/each}
							</ul>{/if}
					</article>
				{/each}
			</section>
		</div>
	</section>

	{#if project.gallery.length}
		<section class="gallery container-wide section-tight" aria-labelledby="gallery-title">
			<div>
				<p class="eyebrow">Interface evidence</p>
				<h2 id="gallery-title">The product, not a placeholder.</h2>
			</div>
			<div class="gallery-grid">
				{#each project.gallery as media}
					<figure>
						<picture>
							{#if media.webp}<source srcset={media.webp} type="image/webp" />{/if}
							<img
								src={media.src}
								alt={media.alt}
								width={media.width}
								height={media.height}
								loading="lazy"
								decoding="async"
							/>
						</picture>
						<figcaption>{media.caption}</figcaption>
					</figure>
				{/each}
			</div>
		</section>
	{/if}

	<section class="demonstrates container section" aria-labelledby="demonstrates-title">
		<div>
			<p class="eyebrow">What this demonstrates</p>
			<h2 id="demonstrates-title">The client-relevant proof behind the project.</h2>
		</div>
		<ul>
			{#each project.demonstrates as item}<li>{item}</li>{/each}
		</ul>
	</section>

	<CtaBand
		eyebrow="Need something built?"
		title="Your product will have different constraints. The discipline stays the same."
		body="Start with the problem, the people affected, and what already exists. I will help turn that into the next useful decision."
	/>
</main>

<style>
	.case-hero {
		padding-block: clamp(3rem, 8vw, 7rem);
	}
	.breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin-bottom: var(--space-8);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.breadcrumbs a:hover {
		color: var(--accent);
	}
	.case-heading {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(340px, 0.65fr);
		gap: var(--space-8);
		align-items: end;
	}
	.case-heading h1 {
		margin-top: var(--space-3);
		font-size: var(--text-display);
	}
	.case-heading > p {
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	.case-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: var(--space-6);
	}
	.case-meta {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-top: var(--space-8);
		border-top: 1px solid var(--border-strong);
		border-left: 1px solid var(--border);
	}
	.case-meta div {
		padding: var(--space-5);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background: var(--background-raised);
	}
	dt {
		margin-bottom: 0.55rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	dd {
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.case-media {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--space-5);
	}
	.case-media figure,
	.case-media video {
		overflow: hidden;
		border: 1px solid var(--border-strong);
		background: var(--background-raised);
		box-shadow: var(--shadow-large);
	}
	.case-media picture,
	.case-media img {
		display: block;
		width: 100%;
	}
	.case-media img {
		height: auto;
	}
	figcaption {
		padding: 0.75rem 1rem;
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.case-media video {
		width: 100%;
		aspect-ratio: 16 / 9;
	}
	.case-capabilities {
		display: grid;
		grid-template-columns: minmax(260px, 0.6fr) minmax(0, 1fr);
		gap: var(--space-8);
	}
	.capability-heading h2 {
		margin-top: var(--space-3);
	}
	.case-capabilities ul {
		display: grid;
		grid-template-columns: 1fr 1fr;
		border-top: 1px solid var(--border);
		border-left: 1px solid var(--border);
		list-style: none;
	}
	.case-capabilities li {
		padding: var(--space-4);
		border-right: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
		background: var(--background-raised);
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.technology-row {
		grid-column: 2;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.technology-row span {
		padding: 0.35rem 0.55rem;
		border: 1px solid var(--border);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.depth {
		border-top: 1px solid var(--border-strong);
	}
	.depth-header {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-8);
		align-items: end;
		margin-bottom: var(--space-8);
	}
	.depth-header h2 {
		max-width: 18ch;
		margin-top: var(--space-3);
	}
	.depth-header nav {
		display: flex;
		gap: 0.5rem;
	}
	.depth-header nav a {
		padding: 0.65rem 0.8rem;
		border: 1px solid var(--border);
		background: var(--surface);
		color: var(--text-secondary);
		font-size: var(--text-small);
		text-decoration: none;
	}
	.depth-header nav a:hover {
		border-color: var(--accent);
		color: var(--text-primary);
	}
	.depth-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-5);
	}
	.depth-grid > section {
		scroll-margin-top: 100px;
		border: 1px solid var(--border);
		background: var(--background-raised);
	}
	.view-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: var(--space-4) var(--space-5);
		border-bottom: 1px solid var(--border-strong);
		background: var(--surface);
	}
	.view-label span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.view-label h3 {
		font-size: 1rem;
		letter-spacing: -0.01em;
	}
	.depth article {
		padding: var(--space-5);
		border-bottom: 1px solid var(--border);
	}
	.depth article:last-child {
		border-bottom: 0;
	}
	.depth h4 {
		margin: 0 0 var(--space-3);
		font-size: 1rem;
	}
	.depth article p,
	.depth article li {
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.depth article p + p {
		margin-top: 0.75rem;
	}
	.gallery > div:first-child {
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		gap: var(--space-8);
		align-items: end;
		margin-bottom: var(--space-7);
	}
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}
	.gallery figure {
		overflow: hidden;
		border: 1px solid var(--border);
		background: var(--background-raised);
	}
	.gallery picture,
	.gallery img {
		display: block;
		width: 100%;
	}
	.gallery img {
		aspect-ratio: 16 / 11;
		object-fit: cover;
		object-position: top left;
	}
	.demonstrates {
		display: grid;
		grid-template-columns: minmax(280px, 0.7fr) minmax(0, 1fr);
		gap: var(--space-8);
		align-items: start;
	}
	.demonstrates h2 {
		margin-top: var(--space-3);
	}
	.demonstrates ul {
		display: grid;
		gap: var(--space-3);
		list-style: none;
	}
	.demonstrates li {
		padding: var(--space-4);
		border-left: 2px solid var(--accent);
		background: var(--background-raised);
		color: var(--text-secondary);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
	@media (max-width: 900px) {
		.case-heading,
		.case-capabilities,
		.demonstrates {
			grid-template-columns: 1fr;
		}
		.technology-row {
			grid-column: auto;
		}
		.depth-grid {
			grid-template-columns: 1fr;
		}
		.gallery-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 680px) {
		.case-meta,
		.case-capabilities ul,
		.gallery-grid {
			grid-template-columns: 1fr;
		}
		.depth-header,
		.gallery > div:first-child {
			grid-template-columns: 1fr;
		}
		.depth-header nav {
			flex-direction: column;
		}
		.case-actions .button {
			width: 100%;
		}
	}
</style>
