import { describe, expect, it } from 'vitest';
import { recommendProjectFit } from './project-fit';

describe('recommendProjectFit', () => {
	it('maps a business website to the website service', () => {
		expect(
			recommendProjectFit({ build: 'business-website', stage: 'notes', priority: 'get-online' })
		).toMatchObject({ service: 'websites' });
	});

	it('prioritizes the AI service when responsible AI is the stated goal', () => {
		expect(
			recommendProjectFit({ build: 'internal-tool', stage: 'idea', priority: 'responsible-ai' })
		).toMatchObject({ service: 'ai' });
	});

	it('does not invent an instant quote', () => {
		const result = recommendProjectFit({
			build: 'not-sure',
			stage: 'partial-build',
			priority: 'reliability'
		});
		expect(result.nextStep.toLowerCase()).not.toContain('price');
	});
});
