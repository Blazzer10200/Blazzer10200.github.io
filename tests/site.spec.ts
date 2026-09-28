import { expect, test } from '@playwright/test';

async function waitForHydration(page: import('@playwright/test').Page) {
	await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true');
}

const routes = [
	['/', 'Custom websites, Windows tools, and connected systems'],
	['/services', 'Websites, Windows tools, and systems that work together'],
	['/work', 'Products you can download, inspect, and use'],
	['/work/rift', 'Rift'],
	['/work/exfil', 'EXFIL'],
	['/about', 'I learned software by building products I wanted to use'],
	['/privacy', 'A plain-language note about project inquiries'],
	['/start', 'Tell me about the project']
] as const;

for (const [path, heading] of routes) {
	test(`${path} renders its primary heading`, async ({ page }) => {
		await page.goto(path);
		await expect(
			page.getByRole('heading', { level: 1, name: new RegExp(heading, 'i') })
		).toBeVisible();
		await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
	});
}

test('legacy project routes return permanent redirects', async ({ request }) => {
	for (const [oldPath, target] of [
		['/rift', '/work/rift'],
		['/exfil', '/work/exfil']
	] as const) {
		const response = await request.get(oldPath, { maxRedirects: 0 });
		expect(response.status()).toBe(308);
		expect(response.headers().location).toBe(target);
	}
});

test('service inquiry links preselect the matching project type', async ({ page }) => {
	await page.goto('/services');
	const hrefs = await page
		.locator('.service-detail article > .text-link')
		.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
	expect(hrefs).toEqual([
		'/start?type=business-website',
		'/start?type=windows-tool-script',
		'/start?type=systems-integration'
	]);
});

test('worker responses include the production security policy', async ({ request }) => {
	const response = await request.get('/');
	expect(response.headers()['content-security-policy']).toContain("frame-ancestors 'none'");
});

test('mobile menu traps focus, closes on Escape, and restores body scrolling', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await waitForHydration(page);
	const trigger = page.getByRole('button', { name: 'Open menu' });
	await trigger.click();
	await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
	await expect(page.getByRole('dialog', { name: 'Main navigation' })).toBeVisible();
	await page.getByRole('button', { name: 'Open Services menu' }).click();
	await expect(page.getByRole('link', { name: /Custom websites/i })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog', { name: 'Main navigation' })).toBeHidden();
	await expect(trigger).toBeFocused();
	await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('desktop navigation submenus open by button and close with Escape', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 800 });
	await page.goto('/');
	await waitForHydration(page);
	const trigger = page.getByRole('button', { name: 'Open Services menu' });
	await trigger.click();
	await expect(page.getByRole('link', { name: /Custom websites/i })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('link', { name: /Custom websites/i })).toBeHidden();
});

test('guided tour is optional, advances clearly, and restores scrolling on exit', async ({
	page
}) => {
	await page.goto('/');
	await waitForHydration(page);
	const trigger = page.getByRole('button', { name: /Take the guided tour/i });
	await trigger.click();
	const tour = page.getByRole('dialog', { name: /A custom website should make/i });
	await expect(tour).toBeVisible();
	await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
	await page.getByRole('button', { name: 'Next' }).click();
	await expect(
		page.getByRole('heading', { name: /Small Windows tools can remove/i })
	).toBeVisible();
	await page.getByRole('button', { name: 'Exit tour' }).click();
	await expect(tour).toBeHidden();
	await expect(trigger).toBeFocused();
	await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('project fit result carries context into the inquiry', async ({ page }) => {
	await page.goto('/');
	await waitForHydration(page);
	await page.getByLabel('AI-powered feature').check();
	await page.getByLabel('Only an idea').check();
	await page.getByLabel('Adding AI responsibly').check();
	await expect(
		page.getByRole('heading', { name: /integration or automation project could connect/i })
	).toBeVisible();
	await page.getByRole('link', { name: /Continue to Contact Form/i }).click();
	await expect(page).toHaveURL(/\/start\?.*goal=responsible-ai/);
	await expect(page.getByText('Adding AI responsibly', { exact: true })).toBeVisible();
});

test('inquiry validation preserves entered values and reports errors', async ({ page }) => {
	await page.goto('/start');
	await waitForHydration(page);
	await page.getByLabel(/^Name/).fill('Avery Client');
	await page.getByLabel(/Email/).fill('bad-email');
	await page.getByRole('button', { name: /Send Message/ }).click();
	await expect(page.getByRole('heading', { name: 'Check the highlighted fields.' })).toBeVisible();
	await expect(page.getByLabel(/^Name/)).toHaveValue('Avery Client');
	await expect(page.locator('#email-error')).toHaveText('Enter a valid email address.');
});

test('optional inquiry details stay out of the initial path', async ({ page }) => {
	await page.goto('/start');
	await waitForHydration(page);
	await expect(page.getByLabel('Business or project name')).toBeHidden();
	await page.getByText('Add optional project details', { exact: true }).click();
	await expect(page.getByLabel('Business or project name')).toBeVisible();
});

test('reduced-motion preference disables decorative animation', async ({ page }) => {
	await page.emulateMedia({ reducedMotion: 'reduce' });
	await page.goto('/');
	const animationState = await page.locator('.delivery-rail *').evaluateAll((elements) =>
		elements.map((element) => ({
			duration: getComputedStyle(element).animationDuration,
			iterations: getComputedStyle(element).animationIterationCount
		}))
	);
	expect(
		animationState.every(({ duration, iterations }) => duration === '1e-05s' && iterations === '1')
	).toBe(true);
});
