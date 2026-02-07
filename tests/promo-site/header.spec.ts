import { test, expect } from '@playwright/test';

test('Verify logo redirects to the homepage', async ({ page }) => {
    // 1. Navigate to the Tour page
    await page.goto('https://www.golimelight.com/tour');

    // 2. Locate the logo link
    const logoLink = page.locator('a.header-logo');

    // 3. We EXPECT the link to point to the homepage
    // This step will FAIL because current href is "javascript:void(0)"
    await expect(logoLink).toHaveAttribute('href', 'https://www.golimelight.com/');

    // 4. Click the logo to trigger navigation
    await logoLink.click();

    // 5. Assert that the current URL is now the homepage
    // This will also fail if navigation doesn't happen
    await expect(page).toHaveURL('https://www.golimelight.com/');
});