<script lang="ts">
	import { navigation, site } from '$lib/content/site';
</script>

<footer class="site-footer">
	<div class="container-wide footer-grid">
		<div class="footer-intro">
			<a class="footer-brand" href="/">{site.name}</a>
			<p>
				Custom websites, software tools, desktop applications, and carefully bounded AI products.
			</p>
		</div>

		<div class="footer-links">
			<div>
				<span>Navigate</span>
				{#each navigation as item}<a href={item.href}>{item.label}</a>{/each}
			</div>
			<div>
				<span>Evidence</span>
				<a href="/work/rift">Rift case study</a>
				<a href="/work/exfil">EXFIL case study</a>
				<a href={site.github} target="_blank" rel="noopener">GitHub ↗</a>
				<a href="/ats">Technical résumé</a>
			</div>
			<div>
				<span>Contact</span>
				<a href={`mailto:${site.email}`}>{site.email}</a>
				<a href={site.phoneHref}>{site.phoneDisplay}</a>
				<a href="/privacy">Privacy</a>
			</div>
		</div>
	</div>
	<div class="container-wide footer-base">
		<span>Independent product developer · {site.location}</span>
		<span>© {new Date().getFullYear()} {site.name}</span>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		z-index: 1;
		border-top: 1px solid var(--border);
		background: var(--background-raised);
	}
	.footer-grid {
		display: grid;
		grid-template-columns: minmax(240px, 0.9fr) minmax(420px, 1.5fr);
		gap: var(--space-10);
		padding-block: var(--space-12);
	}
	.footer-intro {
		max-width: 32rem;
	}
	.footer-brand {
		display: inline-block;
		margin-bottom: var(--space-4);
		color: var(--text-primary);
		font-size: var(--text-h3);
		font-weight: 680;
		letter-spacing: -0.03em;
		text-decoration: none;
	}
	.footer-intro p {
		color: var(--text-secondary);
	}
	.footer-links {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
	}
	.footer-links > div {
		display: grid;
		align-content: start;
		gap: 0.7rem;
	}
	.footer-links span {
		margin-bottom: 0.25rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.footer-links a {
		width: fit-content;
		color: var(--text-secondary);
		font-size: var(--text-small);
		text-decoration-color: transparent;
	}
	.footer-links a:hover {
		color: var(--text-primary);
		text-decoration-color: var(--accent);
	}
	.footer-base {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding-block: var(--space-4);
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	@media (max-width: 800px) {
		.footer-grid {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 580px) {
		.footer-links {
			grid-template-columns: 1fr 1fr;
		}
		.footer-links > div:last-child {
			grid-column: 1 / -1;
		}
		.footer-base {
			flex-direction: column;
		}
	}
</style>
