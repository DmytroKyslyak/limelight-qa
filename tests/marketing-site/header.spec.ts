import { test, expect } from '@playwright/test';
import pages from './data/urls.json'; 

test.describe('Marketing Site: Header Logo Navigation', () => {
  const baseUrl = process.env.PROMO_SITE_URL;

  // Проверка наличия URL перед стартом
  test.beforeAll(() => {
    if (!baseUrl) {
      throw new Error('КРИТИЧЕСКАЯ ОШИБКА: PROMO_SITE_URL не найден в .env!');
    }
  });

  for (const [pageName, path] of Object.entries(pages)) {
    test(`Scenario: From ${pageName} page, logo should link to Home`, async ({ page }) => {
      // Увеличиваем лимит времени для конкретного сценария
      test.setTimeout(90000);

      await test.step(`Given User navigates to the ${pageName} page`, async () => {
        const cleanBase = baseUrl!.replace(/\/$/, '');
        const cleanPath = path.replace(/^\//, '');
        const targetUrl = `${cleanBase}/${cleanPath}`;
        
        // Переходим и ждем начала отрисовки
        await page.goto(targetUrl, { waitUntil: 'commit' });
      });

      await test.step('When User checks the main logo link', async () => {
        const logo = page.locator('a.header-logo');
        const expectedHomeUrl = baseUrl!.endsWith('/') ? baseUrl : `${baseUrl}/`;
        
        // Используем ! для TypeScript, чтобы убрать ошибку
        await expect(logo).toHaveAttribute('href', expectedHomeUrl!); 
      });

      await test.step('And User clicks the logo', async () => {
        const logo = page.locator('a.header-logo');
        const expectedHomeUrl = baseUrl!.endsWith('/') ? baseUrl : `${baseUrl}/`;

        // Пытаемся кликнуть и одновременно ждать смены URL
        // Это поможет, если сайт "тупит" при редиректе
        await Promise.all([
          page.waitForURL(expectedHomeUrl!, { timeout: 20000 }).catch(() => {
              console.log('Предупреждение: Автоматический редирект задерживается');
          }),
          logo.click({ force: true }) // force пробивает overlay
        ]);
      });

      await test.step('Then User should be redirected to the homepage', async () => {
        const expectedHomeUrl = baseUrl!.endsWith('/') ? baseUrl : `${baseUrl}/`;
        // Если здесь упадет — это 100% баг редиректа на сайте
        await expect(page).toHaveURL(expectedHomeUrl!, { timeout: 15000 });
      });
    });
  }
});