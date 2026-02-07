import { test, expect } from '@playwright/test';

test('Negative login test for Limelight Platform', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('https://app.limelightplatform.com/users/login');

    // 2. Fill in the Email field using the name attribute
    await page.locator('input[name="email"]').fill('admin@test.com');

    // 3. Fill in the Password field using the name attribute
    await page.locator('input[name="password"]').fill('admin123');

    // 4. Click the "Sign in" button
    await page.getByRole('button', { name: /sign in/i }).click();

    // 5. Verify that the error message is displayed
    // The locator targets the specific span within the message div found in the DOM
    const errorAlert = page.locator('div.message span');
    await expect(errorAlert).toContainText('Username or password is incorrect');
    
    // Take a screenshot for the test execution report
    await page.screenshot({ path: 'tests/failure-notification.png' });
});