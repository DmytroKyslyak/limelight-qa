import { test, expect } from '@playwright/test';

test('Negative login validation for Corporate Portal', async ({ page }) => {
    // Теперь только переменная. Используем 'as string' для TypeScript, 
    // чтобы он не ругался на возможный undefined.
    const url = process.env.APP_PORTAL_URL as string;
    
    await test.step('Given I am on the portal login page', async () => {
        // Playwright выдаст ошибку, если url будет пустым
        await page.goto(url); 
    });

    await test.step('When I fill in the credentials', async () => {
        await page.locator('input[name="email"]').fill('admin@test.com');
        await page.locator('input[name="password"]').fill('admin123');
        await page.getByRole('button', { name: /sign in/i }).click();
    });

    await test.step('Then I should see the error message', async () => {
        const errorAlert = page.locator('div.message span');
        await expect(errorAlert).toContainText('Username or password is incorrect');
    });
    
    await test.step('And I take a screenshot of the result', async () => {
        await page.screenshot({ path: 'tests/enterprise-app/failure-notification.png' });
    });
});