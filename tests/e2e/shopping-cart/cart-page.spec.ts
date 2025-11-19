import { test, expect } from "@playwright/test";
import { loginAs } from "../../utils/test-helpers";
import { InventoryPage } from "../../pages/inventory.page";
import { CartPage } from "../../pages/cart.page";
import { config } from "../../utils/config";

test.describe("Shopping Cart Management", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");
  });

  test("View Shopping Cart @regression", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await inventoryPage.addProductToCart("Sauce Labs Onesie");

    await inventoryPage.navigateToCart();

    await cartPage.verifyCartPageDisplayed();
    await cartPage.verifyCartItemCount(3);

    await cartPage.verifyItemInCart("Sauce Labs Backpack");
    await cartPage.verifyItemInCart("Sauce Labs Bike Light");
    await cartPage.verifyItemInCart("Sauce Labs Onesie");

    await expect(cartPage.continueShoppingButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeVisible();
  });

  test("Empty Cart State @regression", async () => {
    await inventoryPage.navigateToCart();

    await cartPage.verifyCartPageDisplayed();
    await cartPage.verifyCartItemCount(0);
    await expect(cartPage.continueShoppingButton).toBeVisible();
  });

  test("Remove Item from Cart Page @regression", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await inventoryPage.navigateToCart();

    await cartPage.removeItem("Sauce Labs Backpack");

    await cartPage.verifyCartItemCount(1);
    await cartPage.verifyItemInCart("Sauce Labs Bike Light");
    await inventoryPage.verifyCartBadgeCount(1);
  });

  test("Continue Shopping from Cart @regression", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.navigateToCart();

    await cartPage.continueShopping();

    await inventoryPage.verifyInventoryPageDisplayed();
    await inventoryPage.verifyCartBadgeCount(1);
    await inventoryPage.verifyProductButtonState(
      "Sauce Labs Backpack",
      "remove"
    );
  });

  test("Navigate to Cart via Product Link @regression", async ({ page }) => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.navigateToCart();

    await cartPage.clickProductName("Sauce Labs Backpack");

    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.locator('[data-test^="remove"]')).toBeVisible();
  });
});
