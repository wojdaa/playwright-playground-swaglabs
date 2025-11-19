import { test, expect } from '@playwright/test';
import { loginAs, verifyUrlContains } from '../../utils/test-helpers';
import { InventoryPage } from '../../pages/inventory.page';
import { ProductDetailPage } from '../../pages/product-detail.page';
import { config } from '../../utils/config';

test.describe('Product Browsing & Navigation', () => {
  let inventoryPage: InventoryPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    await page.goto(config.baseURL!);
    await loginAs(page, 'standard_user');
  });

  test('View Product Details', async ({ page }) => {
    await inventoryPage.clickProductName('Sauce Labs Backpack');

    await verifyUrlContains(page, 'inventory-item.html');
    await productDetailPage.verifyProductDetails('Sauce Labs Backpack', '$29.99');
    await productDetailPage.verifyButtonState('add');
    await expect(productDetailPage.backButton).toBeVisible();
  });

  test('Return to Product List from Detail Page', async ({ page }) => {
    await inventoryPage.clickProductName('Sauce Labs Backpack');

    await productDetailPage.backToProducts();

    await verifyUrlContains(page, 'inventory.html');
    await inventoryPage.verifyInventoryPageDisplayed();
  });
});