import { test, expect } from '@playwright/test';
import loginData from './data/users.json';

test.describe('Enterprise Portal: Authentication Scenarios', () => {

  for (const user of loginData) {
    test(`Scenario: Unauthorized login attempt - ${user.description}`, async ({ page }) => {
      
      // Теперь никакой страховки — только чистое значение из окружения
      const url = process.env.APP_PORTAL_URL as string; 
      
      await test.step('Given I am on the portal login page', async () => {
        // Если переменная пуста, Playwright выдаст ошибку здесь
        await page.goto(url); 
      });

      await test.step(`When I enter email "${user.email}" and password "admin123"`, async () => {
        await page.locator('input[name="email"]').fill(user.email);
        await page.locator('input[name="password"]').fill('admin123');
        await page.getByRole('button', { name: /sign in/i }).click();
      });

      await test.step('Then I should see an error message "Username or password is incorrect"', async () => {
        const errorAlert = page.locator('div.message span');
        await expect(errorAlert).toContainText('Username or password is incorrect');
      });

      await test.step('And a visual confirmation of the failure is captured', async () => {
        // Путь к скриншоту в анонимную папку
        await page.screenshot({ path: `tests/enterprise-app/failure-${user.description}.png` });
      });
    });
  }
});