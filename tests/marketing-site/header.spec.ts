import { test, expect } from '@playwright/test';

test.describe('Marketing Site: Header Verifications', () => {
  
  test('Scenario: Logo should redirect to the homepage', async ({ page }) => {
    // Используем переменную окружения для безопасности
    const baseUrl = process.env.PROMO_SITE_URL;

    await test.step('Given I navigate to the Tour page', async () => {
      await page.goto(`${baseUrl}/tour`);
    });

    await test.step('When I locate the main logo link', async () => {
      const logoLink = page.locator('a.header-logo');
      
      // ВАЖНО: Тест упадет здесь, так как href="javascript:void(0)"
      // Это правильно — тест нашел баг!
      await expect(logoLink).toHaveAttribute('href', `${baseUrl}/`);
    });

    await test.step('And I click the logo', async () => {
      await page.locator('a.header-logo').click();
    });

    await test.step('Then I should be redirected to the homepage', async () => {
      await expect(page).toHaveURL(`${baseUrl}/`);
    });
  });
});