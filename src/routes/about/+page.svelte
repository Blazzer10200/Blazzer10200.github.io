<script lang="ts">
	import CtaBand from '$lib/components/ui/CtaBand.svelte';
	import Seo from '$lib/components/ui/Seo.svelte';
	import { site } from '$lib/content/site';
</script>

<Seo
	title={`About ${site.name} · ${site.role}`}
	description="My path from game-server work and industrial equipment into shipped desktop software, AI-assisted product development, and custom client projects."
	path="/about"
/>

<main id="main-content" tabindex="-1">
	<section class="page-hero container-wide about-hero">
		<div>
			<p class="eyebrow">About me</p>
			<h1>I learned software by building products I wanted to use.</h1>
		</div>
		<p class="lead">
			My path into product development started with game servers and continued through industrial
			work, Windows utilities, and an AI coding application. I learned by solving real problems,
			shipping the result, and seeing where it needed to improve.
		</p>
	</section>

	<section class="story container-wide section">
		<div class="story-rail" aria-label="Career path">
			<span>2022</span><i></i><span>2025</span><i></i><span>Now</span>
		</div>
		<div class="story-copy prose">
			<h2>Game servers were the entry point.</h2>
			<p>
				I started modifying game files in 2022, returned in early 2023, and tried hosting a FiveM
				server. It did not survive. I did not yet know how to optimize it or manage a live system,
				and the failure made that obvious quickly.
			</p>
			<p>
				I spent the next two years working with FiveM and RedM communities alongside full-time work:
				configuring resources, modifying and debugging Lua, running databases, and administering
				Windows and Linux systems. A live community notices immediately when something breaks. That
				taught me to observe the real system instead of trusting the plan in my head.
			</p>

			<h2>Industrial work made reliability concrete.</h2>
			<p>
				At S&amp;L Contracting, I operated heavy equipment and handled landfill operations on a
				working paper-mill site. Later I worked production and assembly at Strong Manufacturing.
				Those jobs made safety, repeatability, communication, and responsibility part of how I
				approach any kind of work.
			</p>

			<h2>EXFIL was the first product I shipped.</h2>
			<p>
				I wanted display color to change automatically for each application on my Windows PC. The
				first version became a C#/.NET 8/WPF utility. After learning more, I rebuilt it in Rust and
				Tauri. Keeping both versions public matters to me because the growth is part of the
				evidence.
			</p>

			<h2>Rift pushed the whole product discipline further.</h2>
			<p>
				Rift is a desktop application for coding with AI. Building it meant working across interface
				design, native processes, permissions, local tools, release infrastructure, updates,
				testing, and the hard question of how much authority an AI feature should receive.
			</p>

			<h2>AI is part of the method, not the job title.</h2>
			<p>
				I use AI to accelerate research, implementation, testing, and iteration. I decide the
				architecture, establish the limits, review changes, test behavior, and remain responsible
				for what ships. I do not treat generated output as finished just because it appeared
				quickly.
			</p>

			<h2>Today, I build custom projects for businesses and founders.</h2>
			<p>
				I help businesses and founders turn rough ideas and operational problems into websites,
				software tools, desktop applications, and connected workflows. When AI is useful, I add it
				around a defined task and review process. Clients work directly with me from the first
				conversation through launch.
			</p>
		</div>
	</section>

	<section class="work-history container section-tight">
		<div>
			<p class="eyebrow">Secondary background</p>
			<h2>Work that shaped how I operate.</h2>
		</div>
		<dl>
			<div>
				<dt>2025–2026</dt>
				<dd><strong>Production / Assembly</strong><span>Strong Manufacturing</span></dd>
			</div>
			<div>
				<dt>2023–2025</dt>
				<dd>
					<strong>Heavy Equipment Operator</strong><span
						>S&amp;L Contracting · Twin Rivers Paper Mill</span
					>
				</dd>
			</div>
			<div>
				<dt>2022–2025</dt>
				<dd>
					<strong>FiveM &amp; RedM server work</strong><span
						>Game-server operations and community development</span
					>
				</dd>
			</div>
		</dl>
	</section>

	<CtaBand
		eyebrow="Work together"
		title="You can bring me a rough idea, an existing product, or a process that needs improvement."
	/>
</main>

<style>
	.about-hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(340px, 0.65fr);
		gap: var(--space-10);
		align-items: end;
	}
	.about-hero .lead {
		margin: 0;
	}
	.story {
		display: grid;
		grid-template-columns: 12rem minmax(0, 1fr);
		gap: var(--space-10);
		border-top: 1px solid var(--border-strong);
	}
	.story-rail {
		position: sticky;
		top: 120px;
		display: grid;
		grid-template-columns: auto 1fr auto 1fr auto;
		gap: 0.6rem;
		align-items: center;
		align-self: start;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		writing-mode: vertical-rl;
	}
	.story-rail i {
		width: 1px;
		height: 5rem;
		background: linear-gradient(var(--accent), var(--border));
	}
	.story-copy h2:first-child {
		margin-top: 0;
	}
	.work-history {
		display: grid;
		grid-template-columns: minmax(260px, 0.7fr) minmax(0, 1fr);
		gap: var(--space-10);
		border-top: 1px solid var(--border);
	}
	.work-history h2 {
		margin-top: var(--space-3);
	}
	.work-history dl {
		border-top: 1px solid var(--border-strong);
	}
	.work-history dl > div {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: var(--space-4);
		padding-block: var(--space-4);
		border-bottom: 1px solid var(--border);
	}
	.work-history dt {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.work-history dd {
		display: grid;
		gap: 0.25rem;
	}
	.work-history dd span {
		color: var(--text-muted);
		font-size: var(--text-small);
	}
	@media (max-width: 800px) {
		.about-hero,
		.story,
		.work-history {
			grid-template-columns: 1fr;
		}
		.story-rail {
			position: static;
			writing-mode: horizontal-tb;
			grid-template-columns: auto 1fr auto 1fr auto;
		}
		.story-rail i {
			width: auto;
			height: 1px;
		}
	}
</style>
