import { expect, test } from '@playwright/test';

async function waitForHydration(page: import('@playwright/test').Page) {
	await expect(page.locator('html')).toHaveAttribute('data-hydrated', 'true');
}

const routes = [
	['/', 'Custom software that fits the way your business works'],
	['/services', 'Websites and software built for your business'],
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

test('mobile menu traps focus, closes on Escape, and restores body scrolling', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await waitForHydration(page);
	const trigger = page.getByRole('button', { name: 'Open menu' });
	await trigger.click();
	await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
	await expect(page.getByRole('dialog', { name: 'Main navigation' })).toBeVisible();
	await page.keyboard.press('Escape');
	await expect(page.getByRole('dialog', { name: 'Main navigation' })).toBeHidden();
	await expect(trigger).toBeFocused();
	await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('project fit result carries context into the inquiry', async ({ page }) => {
	await page.goto('/');
	await waitForHydration(page);
	await page.getByLabel('AI-powered feature').check();
	await page.getByLabel('Only an idea').check();
	await page.getByLabel('Adding AI responsibly').check();
	await expect(page.getByRole('heading', { name: /AI integration could fit/i })).toBeVisible();
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
