import { test, expect } from '@playwright/test';
import { loginAs } from '../../utils/test-helpers';
import { NavigationPage } from '../../pages/navigation.page';
import { config } from '../../utils/config';

test.describe('Navigation & Menu', () => {
  let navigation: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navigation = new NavigationPage(page);
    await page.goto(config.baseURL!);
    await loginAs(page, 'standard_user');
  });

  test('Social Media Links - Twitter', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await navigation.twitterLink.click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('x.com');
  });

  test('Social Media Links - Facebook', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await navigation.facebookLink.click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('facebook.com');
  });

  test('Social Media Links - LinkedIn', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await navigation.linkedinLink.click();
    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('linkedin.com');
  });
});