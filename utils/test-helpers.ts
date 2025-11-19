import { Page, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { config, UserType, getUser } from './config';

export async function loginAs(page: Page, userType: UserType) {
  const loginPage = new LoginPage(page);
  const user = getUser(userType);
  
  await page.goto(config.baseURL!);
  await loginPage.login(user.username, user.password!);
}

export async function addItemsToCart(page: Page, itemNames: string[]) {
  for (const itemName of itemNames) {
    const itemId = convertProductNameToId(itemName);
    await page.click(`[data-test="add-to-cart-${itemId}"]`);
  }
}

export function convertProductNameToId(productName: string): string {
  return productName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '');
}

export async function getCartCount(page: Page): Promise<number> {
  const badge = page.locator('.shopping_cart_badge');
  if (await badge.isVisible()) {
    const text = await badge.textContent();
    return parseInt(text || '0', 10);
  }
  return 0;
}

export async function verifyUrlContains(page: Page, urlPart: string) {
  await expect(page).toHaveURL(new RegExp(urlPart));
}

export async function waitForPageLoad(page: Page, timeout?: number) {
  await page.waitForLoadState('networkidle', { timeout });
}