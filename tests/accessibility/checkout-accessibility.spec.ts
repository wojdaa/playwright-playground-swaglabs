import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { loginAs } from "../../utils/test-helpers";
import { InventoryPage } from "../../pages/inventory.page";
import { CartPage } from "../../pages/cart.page";
import { config } from "../../utils/config";

test.describe("Checkout Flow - Accessibility Tests", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");

    // Add item to cart and navigate to checkout
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.navigateToCart();
  });

  test("cart page should not have accessibility issues @accessibility", async ({
    page
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("checkout step one should have accessible form fields @accessibility", async ({
    page
  }) => {
    await cartPage.proceedToCheckout();

    // Check form accessibility
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-test="firstName"]')
      .include('[data-test="lastName"]')
      .include('[data-test="postalCode"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("checkout form should support keyboard navigation @accessibility", async ({
    page
  }) => {
    await cartPage.proceedToCheckout();

    // Tab through form fields
    await page.keyboard.press("Tab");
    await expect(page.locator('[data-test="firstName"]')).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator('[data-test="lastName"]')).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator('[data-test="postalCode"]')).toBeFocused();
  });

  test("checkout overview should not have accessibility issues @accessibility", async ({
    page
  }) => {
    await cartPage.proceedToCheckout();

    // Fill form
    await page.locator('[data-test="firstName"]').fill("John");
    await page.locator('[data-test="lastName"]').fill("Doe");
    await page.locator('[data-test="postalCode"]').fill("12345");
    await page.locator('[data-test="continue"]').click();

    // Check overview page accessibility
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("checkout complete page should be accessible @accessibility", async ({
    page
  }) => {
    await cartPage.proceedToCheckout();

    // Fill form
    await page.locator('[data-test="firstName"]').fill("John");
    await page.locator('[data-test="lastName"]').fill("Doe");
    await page.locator('[data-test="postalCode"]').fill("12345");
    await page.locator('[data-test="continue"]').click();

    // Finish checkout
    await page.locator('[data-test="finish"]').click();

    // Check complete page accessibility
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("error messages should be accessible @accessibility", async ({
    page
  }) => {
    await cartPage.proceedToCheckout();

    // Submit without filling form to trigger error
    await page.locator('[data-test="continue"]').click();

    // Check error message accessibility
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-test="error"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("cancel buttons should be keyboard accessible @accessibility", async ({
    page
  }) => {
    await cartPage.proceedToCheckout();

    // Focus on cancel button
    await page.locator('[data-test="cancel"]').focus();
    await expect(page.locator('[data-test="cancel"]')).toBeFocused();

    // Press Enter to cancel
    await page.keyboard.press("Enter");

    // Verify navigation back to cart
    await expect(page).toHaveURL(/cart\.html/);
  });
});
