import { defineConfig, devices } from '@playwright/test'; // ДОБАВЛЕН ИМПОРТ
import dotenv from 'dotenv';
import path from 'path';

/**
 * Читаем переменные окружения из .env файла.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Запускать тесты в файлах параллельно */
  fullyParallel: true,
  /* Остановить билд на CI, если в коде остался test.only */
  forbidOnly: !!process.env.CI,
  /* Рестарт тестов только на CI */
  retries: process.env.CI ? 2 : 0,
  /* Ограничение воркеров на CI для стабильности */
  workers: process.env.CI ? 1 : undefined,

  /* Настройка репортеров: HTML и Allure */
  reporter: [
    ['html'], 
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  /* Общие настройки для всех проектов */
  use: {
    /* Базовый URL теперь можно не хардкодить, а брать из env */
    baseURL: process.env.APP_PORTAL_URL,
    
    /* Собирать трейсы при первой неудаче */
    trace: 'on-first-retry',
    /* Записывать видео для упавших тестов */
    video: 'on-first-retry',
    /* Скриншоты при падении */
    screenshot: 'only-on-failure',
  },

  /* Конфигурация браузеров */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});