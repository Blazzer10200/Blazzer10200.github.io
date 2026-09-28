import { describe, expect, it } from 'vitest';
import { validateInquiry } from './validation';

function validInquiry(overrides: Record<string, string> = {}) {
	const fields = {
		name: 'Avery Client',
		email: 'Avery@Example.com',
		businessName: 'Client Co',
		websiteUrl: 'https://example.com',
		projectType: 'internal-tool',
		stage: 'notes',
		projectGoal: 'manual-workflow',
		description: 'We need a clear internal tool that replaces a repeated spreadsheet workflow.',
		desiredFeatures: 'Role-based dashboard and exports',
		deadline: 'one-to-three-months',
		budget: '2500-5000',
		referral: 'github',
		referenceLinks: 'https://example.com/reference',
		consent: 'yes',
		...overrides
	};
	const form = new FormData();
	for (const [key, value] of Object.entries(fields)) form.set(key, value);
	return form;
}

describe('validateInquiry', () => {
	it('normalizes and accepts a complete inquiry', () => {
		const result = validateInquiry(validInquiry());
		expect(result.errors).toEqual({});
		expect(result.values.email).toBe('avery@example.com');
		expect(result.values.consent).toBe(true);
	});

	it('rejects missing required values and unsafe URL schemes', () => {
		const result = validateInquiry(
			validInquiry({ email: 'not-an-email', websiteUrl: 'javascript:alert(1)', consent: '' })
		);
		expect(result.errors.email).toBeDefined();
		expect(result.errors.websiteUrl).toBeDefined();
		expect(result.errors.consent).toBeDefined();
	});

	it('rejects more than three reference links', () => {
		const result = validateInquiry(
			validInquiry({
				referenceLinks: [
					'https://a.test',
					'https://b.test',
					'https://c.test',
					'https://d.test'
				].join('\n')
			})
		);
		expect(result.errors.referenceLinks).toContain('no more than three');
	});

	it('removes control characters without stripping ordinary content', () => {
		const result = validateInquiry(validInquiry({ name: 'Avery\u0000 Client' }));
		expect(result.values.name).toBe('Avery Client');
	});

	it('accepts optional context fields when they are blank', () => {
		const result = validateInquiry(
			validInquiry({
				businessName: '',
				websiteUrl: '',
				desiredFeatures: '',
				referral: '',
				referenceLinks: ''
			})
		);
		expect(result.errors).toEqual({});
	});
});
