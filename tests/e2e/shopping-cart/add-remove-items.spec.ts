import { test, expect } from "@playwright/test";
import { loginAs } from "../../../utils/test-helpers";
import { InventoryPage } from "../../../pages/inventory.page";
import { config } from "../../../utils/config";

test.describe("Shopping Cart Management", () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");
  });

  test("Add Single Item to Cart from Inventory @smoke @regression", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");

    await inventoryPage.verifyProductButtonState(
      "Sauce Labs Backpack",
      "remove"
    );
    await inventoryPage.verifyCartBadgeCount(1);
  });

  test("Add Multiple Items to Cart @regression", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.verifyCartBadgeCount(1);

    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await inventoryPage.verifyCartBadgeCount(2);

    await inventoryPage.addProductToCart("Sauce Labs Onesie");
    await inventoryPage.verifyCartBadgeCount(3);

    await inventoryPage.verifyProductButtonState(
      "Sauce Labs Backpack",
      "remove"
    );
    await inventoryPage.verifyProductButtonState(
      "Sauce Labs Bike Light",
      "remove"
    );
    await inventoryPage.verifyProductButtonState("Sauce Labs Onesie", "remove");
  });

  test("Remove Item from Cart on Inventory Page @regression", async () => {
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.verifyCartBadgeCount(1);

    await inventoryPage.removeProductFromCart("Sauce Labs Backpack");

    await inventoryPage.verifyProductButtonState("Sauce Labs Backpack", "add");
    await inventoryPage.verifyCartBadgeCount(0);
  });
});
