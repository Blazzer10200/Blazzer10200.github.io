import { describe, expect, it } from 'vitest';
import { projects } from './projects';

describe('project content', () => {
	it('uses unique slugs and complete, local media metadata', () => {
		expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
		for (const project of projects) {
			expect(project.hero.src).toMatch(/^\//);
			expect(project.hero.alt.length).toBeGreaterThan(20);
			expect(project.hero.width).toBeGreaterThan(0);
			expect(project.hero.height).toBeGreaterThan(0);
			expect(project.productView.length).toBeGreaterThan(0);
			expect(project.engineeringView.length).toBeGreaterThan(0);
		}
	});
});
