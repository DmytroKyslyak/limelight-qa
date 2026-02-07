import { test, expect } from '@playwright/test';
import loginData from './data/users.json'; // Импорт данных из JSON

test.describe('DDT: Login Field Validation', () => {
  for (const variant of loginData) {
    test(`Login attempt with: ${variant.description}`, async ({ page }) => {
      await page.goto('https://app.limelightplatform.com/users/login');
      await page.locator('input[name="email"]').fill(variant.email);
      await page.locator('input[name="password"]').fill('admin123');
      await page.getByRole('button', { name: /sign in/i }).click();

      const errorAlert = page.locator('div.message span');
      await expect(errorAlert).toContainText('Username or password is incorrect');
    });
  }
});