import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* * Unified Reporter Configuration 
   * Combining HTML and Allure into one array
   */
  reporter: [
    ['html'], 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  /* Shared settings for all projects */
  use: {
    /* Collect trace when retrying. You can set this to 'on' to record every run */
    trace: 'on-first-retry',
    /* Useful for debugging: record video for failed tests */
    video: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Firefox and Webkit are commented out to save time during CI runs
  ],
});