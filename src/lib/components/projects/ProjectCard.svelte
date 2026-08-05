<script lang="ts">
	import type { Project } from '$lib/content/projects';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
</script>

<article class:featured class="project-card">
	<a
		class="project-media"
		href={`/work/${project.slug}`}
		aria-label={`Read the ${project.name} case study`}
	>
		<div class="window-label"><span></span>{project.name.toLowerCase()} / shipped-product</div>
		<picture>
			{#if project.hero.webp}<source srcset={project.hero.webp} type="image/webp" />{/if}
			<img
				src={project.hero.src}
				alt={project.hero.alt}
				width={project.hero.width}
				height={project.hero.height}
				loading="lazy"
				decoding="async"
			/>
		</picture>
		<span class="media-arrow" aria-hidden="true">↗</span>
	</a>
	<div class="project-copy">
		<div class="project-meta">
			<span>{project.eyebrow}</span>
			<span>{project.period}</span>
		</div>
		<h3><a href={`/work/${project.slug}`}>{project.name}</a></h3>
		<p>{project.summary}</p>
		<dl>
			<div>
				<dt>Problem</dt>
				<dd>{project.problem}</dd>
			</div>
			<div>
				<dt>Built</dt>
				<dd>{project.built}</dd>
			</div>
			<div>
				<dt>Status</dt>
				<dd>{project.status}</dd>
			</div>
		</dl>
		<div class="tech-list" aria-label={`${project.name} technologies`}>
			{#each project.technologies.slice(0, featured ? 6 : 4) as technology}<span>{technology}</span
				>{/each}
		</div>
		<a class="text-link" href={`/work/${project.slug}`}
			>Read the case study <span aria-hidden="true">→</span></a
		>
	</div>
</article>

<style>
	.project-card {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
		gap: clamp(2rem, 5vw, 5rem);
		align-items: center;
		padding-block: var(--space-8);
		border-top: 1px solid var(--border);
	}
	.project-card:nth-child(even) .project-media {
		order: 2;
	}
	.project-media {
		position: relative;
		display: block;
		overflow: hidden;
		border: 1px solid var(--border-strong);
		background: var(--background-raised);
		box-shadow: var(--shadow-large);
		text-decoration: none;
	}
	.window-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.55rem 0.7rem;
		border-bottom: 1px solid var(--border);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.05em;
	}
	.window-label span {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--positive);
	}
	picture {
		display: block;
		aspect-ratio: 16 / 10;
		overflow: hidden;
	}
	img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top left;
		transition: transform 700ms var(--ease-out);
	}
	.project-media:hover img {
		transform: scale(1.025);
	}
	.media-arrow {
		position: absolute;
		right: 0.75rem;
		bottom: 0.75rem;
		display: grid;
		width: 42px;
		height: 42px;
		place-items: center;
		border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--border));
		background: color-mix(in srgb, var(--background) 86%, transparent);
		color: var(--accent);
	}
	.project-meta {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	h3 {
		margin-block: var(--space-3) var(--space-4);
		font-size: var(--text-h2);
	}
	h3 a {
		text-decoration: none;
	}
	.project-copy > p {
		color: var(--text-secondary);
		font-size: var(--text-body-large);
	}
	dl {
		display: grid;
		gap: var(--space-3);
		margin-block: var(--space-5);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
	}
	dl div {
		display: grid;
		grid-template-columns: 4.5rem 1fr;
		gap: 1rem;
	}
	dt {
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	dd {
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.tech-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-bottom: var(--space-5);
	}
	.tech-list span {
		padding: 0.35rem 0.55rem;
		border: 1px solid var(--border);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.64rem;
	}
	@media (max-width: 900px) {
		.project-card {
			grid-template-columns: 1fr;
		}
		.project-card:nth-child(even) .project-media {
			order: 0;
		}
	}
	@media (max-width: 520px) {
		dl div {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}
</style>
