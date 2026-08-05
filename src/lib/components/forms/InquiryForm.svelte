<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { tick } from 'svelte';
	import {
		budgetOptions,
		deadlineOptions,
		inquiryProjectTypes,
		inquiryStages,
		referralOptions
	} from '$lib/content/inquiry-options';
	import { optionLabel, priorityOptions } from '$lib/content/project-fit';
	import type {
		InquiryActionData,
		InquiryErrors,
		InquiryPrefill,
		InquiryValues
	} from '$lib/types/inquiry';

	let {
		form,
		turnstileSiteKey,
		prefill
	}: { form?: InquiryActionData | null; turnstileSiteKey: string; prefill: InquiryPrefill } =
		$props();

	let submitting = $state(false);
	let resultPanel = $state<HTMLDivElement>();
	let errorSummary = $state<HTMLDivElement>();
	let errors = $derived(form?.errors ?? ({} as InquiryErrors));
	let values = $derived(form?.values ?? ({} as Partial<InquiryValues>));

	function value(field: keyof InquiryValues, fallback = '') {
		const current = values[field];
		if (typeof current === 'string') return current;
		return fallback;
	}

	const handleSubmit: SubmitFunction = () => {
		submitting = true;
		return async ({ update }) => {
			await update();
			submitting = false;
			await tick();
			if (form?.success) resultPanel?.focus();
			else if (form?.errors) errorSummary?.focus();
		};
	};
</script>

<svelte:head>
	{#if turnstileSiteKey}
		<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
	{/if}
</svelte:head>

{#if form?.success}
	<div class="status-panel success" role="status" tabindex="-1" bind:this={resultPanel}>
		<h2>
			{form.development ? 'The form passed its development checks.' : 'Your message was sent.'}
		</h2>
		<p>
			{form.development
				? 'This local preview checked your form successfully. No email was sent.'
				: 'I will review the details and reply using the email address you provided.'}
		</p>
	</div>
{/if}

{#if form?.failure && !form.errors}
	<div class="status-panel failure" role="alert" tabindex="-1" bind:this={resultPanel}>
		<h2>Your message could not be delivered.</h2>
		<p>Your form values are still here. Try again, or email directly if the problem continues.</p>
	</div>
{/if}

{#if Object.keys(errors).length}
	<div class="error-summary" role="alert" tabindex="-1" bind:this={errorSummary}>
		<h2>Check the highlighted fields.</h2>
		<ul>
			{#each Object.entries(errors).filter(([field]) => field !== 'form') as [field, message]}
				<li><a href={`#${field}`}>{message}</a></li>
			{/each}
		</ul>
	</div>
{/if}

{#if prefill.projectGoal}
	<div class="prefill-note">
		<span>Carried from Project Fit</span>
		<p>{optionLabel(priorityOptions, prefill.projectGoal)}</p>
	</div>
{/if}

<form method="POST" use:enhance={handleSubmit} aria-busy={submitting} novalidate>
	<input type="hidden" name="projectGoal" value={prefill.projectGoal} />

	<div class="form-section">
		<div class="form-section-heading">
			<span>01</span>
			<div>
				<h2>Contact</h2>
				<p>Your name and where I should send my reply.</p>
			</div>
		</div>
		<div class="field-grid two">
			<div class="form-field">
				<label for="name">Name <span aria-hidden="true">*</span></label><input
					id="name"
					name="name"
					autocomplete="name"
					required
					maxlength="100"
					value={value('name')}
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={errors.name ? 'name-error' : undefined}
				/>{#if errors.name}<p class="field-error" id="name-error">{errors.name}</p>{/if}
			</div>
			<div class="form-field">
				<label for="email">Email <span aria-hidden="true">*</span></label><input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					maxlength="254"
					value={value('email')}
					aria-invalid={errors.email ? 'true' : undefined}
					aria-describedby={errors.email ? 'email-error' : undefined}
				/>{#if errors.email}<p class="field-error" id="email-error">{errors.email}</p>{/if}
			</div>
			<div class="form-field">
				<label for="businessName">Business or project name</label><input
					id="businessName"
					name="businessName"
					autocomplete="organization"
					maxlength="160"
					value={value('businessName')}
					aria-invalid={errors.businessName ? 'true' : undefined}
				/>{#if errors.businessName}<p class="field-error">{errors.businessName}</p>{/if}
			</div>
			<div class="form-field">
				<label for="websiteUrl">Existing website or product URL</label><input
					id="websiteUrl"
					name="websiteUrl"
					type="url"
					inputmode="url"
					placeholder="https://"
					maxlength="500"
					value={value('websiteUrl')}
					aria-invalid={errors.websiteUrl ? 'true' : undefined}
					aria-describedby={errors.websiteUrl ? 'websiteUrl-error' : undefined}
				/>{#if errors.websiteUrl}<p class="field-error" id="websiteUrl-error">
						{errors.websiteUrl}
					</p>{/if}
			</div>
		</div>
	</div>

	<div class="form-section">
		<div class="form-section-heading">
			<span>02</span>
			<div>
				<h2>Project shape</h2>
				<p>Choose the closest answer. It is okay if you are still deciding.</p>
			</div>
		</div>
		<div class="field-grid two">
			<div class="form-field">
				<label for="projectType">Project type <span aria-hidden="true">*</span></label><select
					id="projectType"
					name="projectType"
					required
					aria-invalid={errors.projectType ? 'true' : undefined}
					><option value="">Choose one</option>{#each inquiryProjectTypes as option}<option
							value={option.value}
							selected={value('projectType', prefill.projectType) === option.value}
							>{option.label}</option
						>{/each}</select
				>{#if errors.projectType}<p class="field-error">{errors.projectType}</p>{/if}
			</div>
			<div class="form-field">
				<label for="stage">Current stage <span aria-hidden="true">*</span></label><select
					id="stage"
					name="stage"
					required
					aria-invalid={errors.stage ? 'true' : undefined}
					><option value="">Choose one</option>{#each inquiryStages as option}<option
							value={option.value}
							selected={value('stage', prefill.stage) === option.value}>{option.label}</option
						>{/each}</select
				>{#if errors.stage}<p class="field-error">{errors.stage}</p>{/if}
			</div>
		</div>
		<div class="form-field">
			<label for="description">Short project description <span aria-hidden="true">*</span></label>
			<p class="field-help" id="description-help">
				What are you trying to create, improve, or replace?
			</p>
			<textarea
				id="description"
				name="description"
				required
				minlength="30"
				maxlength="2500"
				aria-invalid={errors.description ? 'true' : undefined}
				aria-describedby={`description-help${errors.description ? ' description-error' : ''}`}
				>{value('description')}</textarea
			>{#if errors.description}<p class="field-error" id="description-error">
					{errors.description}
				</p>{/if}
		</div>
		<div class="form-field">
			<label for="desiredFeatures">Desired features</label>
			<p class="field-help">
				List any features already on your mind. We will confirm the scope later.
			</p>
			<textarea
				id="desiredFeatures"
				name="desiredFeatures"
				maxlength="1500"
				aria-invalid={errors.desiredFeatures ? 'true' : undefined}
				>{value('desiredFeatures')}</textarea
			>{#if errors.desiredFeatures}<p class="field-error">{errors.desiredFeatures}</p>{/if}
		</div>
		<div class="form-field">
			<label for="mainProblem">Main problem being solved <span aria-hidden="true">*</span></label>
			<p class="field-help" id="mainProblem-help">
				What is difficult, slow, unreliable, or currently impossible?
			</p>
			<textarea
				id="mainProblem"
				name="mainProblem"
				required
				minlength="15"
				maxlength="1200"
				aria-invalid={errors.mainProblem ? 'true' : undefined}
				aria-describedby={`mainProblem-help${errors.mainProblem ? ' mainProblem-error' : ''}`}
				>{value('mainProblem')}</textarea
			>{#if errors.mainProblem}<p class="field-error" id="mainProblem-error">
					{errors.mainProblem}
				</p>{/if}
		</div>
	</div>

	<div class="form-section">
		<div class="form-section-heading">
			<span>03</span>
			<div>
				<h2>Timing and context</h2>
				<p>These answers help me understand the size and timing of the project.</p>
			</div>
		</div>
		<div class="field-grid two">
			<div class="form-field">
				<label for="deadline">Desired timeline <span aria-hidden="true">*</span></label><select
					id="deadline"
					name="deadline"
					required
					aria-invalid={errors.deadline ? 'true' : undefined}
					><option value="">Choose one</option>{#each deadlineOptions as option}<option
							value={option.value}
							selected={value('deadline') === option.value}>{option.label}</option
						>{/each}</select
				>{#if errors.deadline}<p class="field-error">{errors.deadline}</p>{/if}
			</div>
			<div class="form-field">
				<label for="budget">Approximate budget range <span aria-hidden="true">*</span></label
				><select
					id="budget"
					name="budget"
					required
					aria-invalid={errors.budget ? 'true' : undefined}
					><option value="">Choose one</option>{#each budgetOptions as option}<option
							value={option.value}
							selected={value('budget') === option.value}>{option.label}</option
						>{/each}</select
				>{#if errors.budget}<p class="field-error">{errors.budget}</p>{/if}
			</div>
			<div class="form-field">
				<label for="referral">How did you find me? <span aria-hidden="true">*</span></label><select
					id="referral"
					name="referral"
					required
					aria-invalid={errors.referral ? 'true' : undefined}
					><option value="">Choose one</option>{#each referralOptions as option}<option
							value={option.value}
							selected={value('referral') === option.value}>{option.label}</option
						>{/each}</select
				>{#if errors.referral}<p class="field-error">{errors.referral}</p>{/if}
			</div>
			<div class="form-field">
				<label for="referenceLinks">Optional reference links</label>
				<p class="field-help">Up to three complete URLs, one per line.</p>
				<textarea
					id="referenceLinks"
					name="referenceLinks"
					maxlength="1500"
					aria-invalid={errors.referenceLinks ? 'true' : undefined}
					>{value('referenceLinks')}</textarea
				>{#if errors.referenceLinks}<p class="field-error">{errors.referenceLinks}</p>{/if}
			</div>
		</div>
	</div>

	<div class="honeypot" aria-hidden="true">
		<label for="companyWebsite">Leave this field blank</label><input
			id="companyWebsite"
			name="companyWebsite"
			tabindex="-1"
			autocomplete="off"
		/>
	</div>

	<div class="form-final">
		{#if turnstileSiteKey}
			<div
				class="cf-turnstile"
				data-sitekey={turnstileSiteKey}
				data-theme="dark"
				data-action="project-inquiry"
			></div>
		{:else}
			<div class="development-note">
				<span>Development mode</span>
				<p>
					This local preview does not send inquiries. Live delivery stays disabled until the
					required security keys are configured.
				</p>
			</div>
		{/if}
		{#if errors.turnstile}<p class="field-error" id="turnstile">{errors.turnstile}</p>{/if}

		<label class="consent" for="consent"
			><input
				id="consent"
				name="consent"
				type="checkbox"
				value="yes"
				checked={values.consent === true}
				required
				aria-invalid={errors.consent ? 'true' : undefined}
			/><span
				>I consent to the use of this information to review and respond to my inquiry. I have read
				the <a href="/privacy">privacy note</a>.</span
			></label
		>
		{#if errors.consent}<p class="field-error" id="consent-error">{errors.consent}</p>{/if}

		<button class="button button-primary" type="submit" disabled={submitting}
			>{submitting ? 'Sending…' : 'Send Message'} <span aria-hidden="true">→</span></button
		>
		<p class="submission-note">
			Do not include passwords, API keys, private customer data, or confidential files.
		</p>
	</div>
</form>

<style>
	form {
		display: grid;
		gap: var(--space-5);
	}
	.form-section {
		display: grid;
		gap: var(--space-5);
		padding: var(--space-6);
		border: 1px solid var(--border);
		background: var(--background-raised);
	}
	.form-section-heading {
		display: grid;
		grid-template-columns: 2rem 1fr;
		gap: var(--space-3);
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--border);
	}
	.form-section-heading > span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
	}
	.form-section-heading h2 {
		font-size: 1.35rem;
		letter-spacing: -0.02em;
	}
	.form-section-heading p {
		margin-top: 0.25rem;
		color: var(--text-muted);
		font-size: var(--text-small);
	}
	.field-grid {
		display: grid;
		gap: var(--space-4);
	}
	.field-grid.two {
		grid-template-columns: 1fr 1fr;
	}
	.form-field textarea {
		min-height: 140px;
	}
	.prefill-note {
		display: flex;
		gap: 1rem;
		align-items: center;
		padding: var(--space-4);
		border-left: 2px solid var(--accent);
		background: var(--accent-soft);
	}
	.prefill-note span {
		color: var(--accent);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		text-transform: uppercase;
	}
	.prefill-note p {
		color: var(--text-secondary);
	}
	.honeypot {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	.form-final {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-6);
		border: 1px solid var(--border-strong);
		background: var(--surface);
	}
	.development-note {
		padding: var(--space-4);
		border: 1px dashed var(--warning);
		background: color-mix(in srgb, var(--warning) 6%, transparent);
	}
	.development-note span {
		color: var(--warning);
		font-family: var(--font-mono);
		font-size: var(--text-metadata);
		text-transform: uppercase;
	}
	.development-note p {
		margin-top: 0.35rem;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.consent {
		display: grid;
		grid-template-columns: 1.2rem 1fr;
		gap: 0.75rem;
		align-items: start;
		color: var(--text-secondary);
		font-size: var(--text-small);
	}
	.consent input {
		width: 18px;
		height: 18px;
		min-height: 0;
		margin-top: 0.15rem;
		accent-color: var(--accent);
	}
	.consent a {
		color: var(--text-primary);
	}
	.form-final .button {
		width: fit-content;
		min-width: 220px;
	}
	.submission-note {
		color: var(--text-muted);
		font-size: var(--text-metadata);
	}
	@media (max-width: 680px) {
		.field-grid.two {
			grid-template-columns: 1fr;
		}
		.form-section,
		.form-final {
			padding: var(--space-4);
		}
		.form-final .button {
			width: 100%;
		}
	}
</style>
