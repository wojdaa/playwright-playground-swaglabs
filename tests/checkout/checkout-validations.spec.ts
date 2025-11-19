import { test, expect } from '@playwright/test';
import { loginAs } from '../../utils/test-helpers';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutStepOnePage } from '../../pages/checkout-step-one.page';
import { config } from '../../utils/config';

test.describe('Checkout Process', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOne: CheckoutStepOnePage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOne = new CheckoutStepOnePage(page);

    await page.goto(config.baseURL!);
    await loginAs(page, 'standard_user');
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.navigateToCart();
    await cartPage.proceedToCheckout();
  });

  test('Checkout Validation - Empty First Name', async ({ page }) => {
    await checkoutStepOne.lastNameInput.fill('Doe');
    await checkoutStepOne.postalCodeInput.fill('12345');
    await checkoutStepOne.continue();

    await checkoutStepOne.verifyErrorMessage('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('Checkout Validation - Empty Last Name', async ({ page }) => {
    await checkoutStepOne.firstNameInput.fill('John');
    await checkoutStepOne.postalCodeInput.fill('12345');
    await checkoutStepOne.continue();

    await checkoutStepOne.verifyErrorMessage('Last Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('Checkout Validation - Empty Postal Code', async ({ page }) => {
    await checkoutStepOne.firstNameInput.fill('John');
    await checkoutStepOne.lastNameInput.fill('Doe');
    await checkoutStepOne.continue();

    await checkoutStepOne.verifyErrorMessage('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('Checkout Validation - All Fields Empty', async ({ page }) => {
    await checkoutStepOne.continue();

    await checkoutStepOne.verifyErrorMessage('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});