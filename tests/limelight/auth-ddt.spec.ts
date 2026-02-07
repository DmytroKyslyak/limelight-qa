import { test, expect } from '@playwright/test';
import loginData from './data/users.json';

test.describe('User Authentication (BDD style)', () => {

  for (const user of loginData) {
    test(`Scenario: Unauthorized user login attempt - ${user.description}`, async ({ page }) => {
      
      await test.step('Given I am on the login page', async () => {
        await page.goto('https://app.limelightplatform.com/users/login');
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

      await test.step('And a screenshot of the failure is captured', async () => {
        await page.screenshot({ path: `tests/platform-app/failure-${user.description}.png` });
      });
    });
  }
});

// import { test, expect } from '@playwright/test';
// import loginData from './data/users.json'; // Импорт данных из JSON

// test.describe('DDT: Login Field Validation', () => {
//   for (const variant of loginData) {
//     test(`Login attempt with: ${variant.description}`, async ({ page }) => {
//       await page.goto('https://app.limelightplatform.com/users/login');
//       await page.locator('input[name="email"]').fill(variant.email);
//       await page.locator('input[name="password"]').fill('admin123');
//       await page.getByRole('button', { name: /sign in/i }).click();

//       const errorAlert = page.locator('div.message span');
//       await expect(errorAlert).toContainText('Username or password is incorrect');
//     });
//   }
// });