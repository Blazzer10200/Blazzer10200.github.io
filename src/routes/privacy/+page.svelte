<script lang="ts">
	import Seo from '$lib/components/ui/Seo.svelte';
	import { site } from '$lib/content/site';
</script>

<Seo
	title={`Privacy · ${site.name}`}
	description="What the project inquiry form collects, why it is collected, which services may process it, and how to request deletion."
	path="/privacy"
/>

<main id="main-content" tabindex="-1">
	<section class="page-hero container-reading">
		<p class="eyebrow">Privacy</p>
		<h1>A plain-language note about project inquiries.</h1>
		<p class="lead">
			This page describes the information collected by the project inquiry form. It is not a promise
			beyond the services actually configured at launch.
		</p>
	</section>
	<section class="prose container-reading section-tight">
		<h2>What the form collects</h2>
		<p>
			The form collects the contact and project information you choose to provide: name, email,
			business or project name, existing links, project type, current stage, description, desired
			features, timeline, budget range, referral source, and optional references.
		</p>
		<h2>Why it is collected</h2>
		<p>
			I use the information to understand the request, decide whether the project fits the work I
			offer, respond to you, and keep enough context to continue the conversation.
		</p>
		<h2>How it is processed</h2>
		<p>
			The production form is designed to send the inquiry through a server-side email provider. The
			final provider has not been configured in this development build. Before launch, this
			paragraph must name that provider and link to its privacy terms.
		</p>
		<p>
			Cloudflare Turnstile may process technical signals to reduce spam. The form validates
			Turnstile tokens on the server; the private key is not sent to the browser.
		</p>
		<h2>Storage</h2>
		<p>
			Version one does not require a database. If optional Cloudflare D1 storage is enabled later
			for delivery reliability, this page must be updated with the retention period and deletion
			behavior before that binding is used.
		</p>
		<h2>Analytics</h2>
		<p>
			No analytics are enabled in version one. If analytics are added later, this page will identify
			the service and the data it collects before it is enabled.
		</p>
		<h2>Deletion requests</h2>
		<p>
			You can ask me to delete an inquiry or related correspondence by emailing <a
				href={`mailto:${site.email}?subject=Delete%20my%20project%20inquiry`}>{site.email}</a
			>. I may need enough information to identify the conversation, but please do not send
			sensitive documents just to make the request.
		</p>
		<h2>Do not send secrets</h2>
		<p>
			Do not put passwords, API keys, private customer data, medical information, financial records,
			or confidential source code into the inquiry form. The form is for initial project context,
			not secure file transfer.
		</p>
	</section>
</main>
