import { error } from '@sveltejs/kit';
import { getProject, projects } from '$lib/content/projects';
import type { PageLoad } from './$types';

export const entries = () => projects.map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};
