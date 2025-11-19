import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { config } from '../../utils/config';

test.describe('Authentication & User Management', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto(config.baseURL!);
  });

  test('Login with Empty Credentials', async ({ page }) => {
    await loginPage.loginButton.click();

    await loginPage.verifyErrorMessage('Username is required');
    await expect(page).toHaveURL(config.baseURL + '/');
  });

  test('Login with Invalid Username', async ({ page }) => {
    await loginPage.login('invalid_user', config.password!);

    await loginPage.verifyErrorMessage('Username and password do not match');
    await expect(page).toHaveURL(config.baseURL + '/');
  });

  test('Login with Invalid Password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');

    await loginPage.verifyErrorMessage('Username and password do not match');
    await expect(page).toHaveURL(config.baseURL + '/');
  });
});