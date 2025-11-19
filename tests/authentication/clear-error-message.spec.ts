import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { config } from '../../utils/config';

test.describe('Authentication & User Management', () => {
  test('Clear Error Message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto(config.baseURL!);
    await loginPage.login('locked_out_user', config.password!);
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    await loginPage.clearErrorMessage();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
  });
});