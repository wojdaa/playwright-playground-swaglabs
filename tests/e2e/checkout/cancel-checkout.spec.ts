import { test, expect } from "@playwright/test";
import { loginAs } from "../../utils/test-helpers";
import { InventoryPage } from "../../pages/inventory.page";
import { CartPage } from "../../pages/cart.page";
import { CheckoutStepOnePage } from "../../pages/checkout-step-one.page";
import { CheckoutStepTwoPage } from "../../pages/checkout-step-two.page";
import { CheckoutCompletePage } from "../../pages/checkout-complete.page";
import { config } from "../../utils/config";

test.describe("Checkout Process", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutStepOne: CheckoutStepOnePage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutStepOne = new CheckoutStepOnePage(page);

    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.navigateToCart();
    await cartPage.proceedToCheckout();
  });

  test("Cancel Checkout - Step One @regression", async ({ page }) => {
    await checkoutStepOne.cancel();

    await expect(page).toHaveURL(/cart\.html/);
    await cartPage.verifyCartItemCount(1);
    await inventoryPage.verifyCartBadgeCount(1);
  });

  test("Cancel Checkout - Step Two @regression", async ({ page }) => {
    const checkoutStepTwo = new CheckoutStepTwoPage(page);

    await checkoutStepOne.fillCheckoutInformation("John", "Doe", "12345");
    await checkoutStepOne.continue();

    await checkoutStepTwo.cancel();

    await expect(page).toHaveURL(/inventory\.html/);
    await inventoryPage.verifyCartBadgeCount(1);
  });

  test("Return Home After Successful Order @regression", async ({ page }) => {
    const checkoutStepTwo = new CheckoutStepTwoPage(page);
    const checkoutComplete = new CheckoutCompletePage(page);

    await checkoutStepOne.fillCheckoutInformation("John", "Doe", "12345");
    await checkoutStepOne.continue();
    await checkoutStepTwo.finish();

    await checkoutComplete.backHome();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator(".shopping_cart_badge")).not.toBeVisible();
    await inventoryPage.verifyProductButtonState("Sauce Labs Backpack", "add");
  });
});
