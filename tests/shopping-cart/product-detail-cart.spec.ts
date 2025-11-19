import { test, expect } from '@playwright/test';
import { loginAs } from '../../utils/test-helpers';
import { InventoryPage } from '../../pages/inventory.page';
import { ProductDetailPage } from '../../pages/product-detail.page';
import { config } from '../../utils/config';

test.describe('Shopping Cart Management', () => {
  let inventoryPage: InventoryPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    await page.goto(config.baseURL!);
    await loginAs(page, 'standard_user');
  });

  test('Add Item from Product Detail Page', async ({ page }) => {
    await inventoryPage.clickProductName('Sauce Labs Backpack');

    await productDetailPage.addToCart();

    await productDetailPage.verifyButtonState('remove');

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await productDetailPage.backToProducts();
    await inventoryPage.verifyProductButtonState('Sauce Labs Backpack', 'remove');
  });

  test('Remove Item from Product Detail Page', async ({ page }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await inventoryPage.clickProductName('Sauce Labs Backpack');

    await productDetailPage.removeFromCart();

    await productDetailPage.verifyButtonState('add');

    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    await productDetailPage.backToProducts();
    await inventoryPage.verifyProductButtonState('Sauce Labs Backpack', 'add');
  });
});