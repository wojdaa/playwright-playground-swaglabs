import { test, expect } from "@playwright/test";
import { loginAs } from "../../utils/test-helpers";
import { InventoryPage } from "../../pages/inventory.page";
import { config } from "../../utils/config";

test.describe("Product Browsing & Navigation", () => {
  test("View Product Inventory @smoke @regression", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");

    await inventoryPage.verifyInventoryPageDisplayed();
    await inventoryPage.verifyProductCount(6);
    await inventoryPage.verifySortOption("az");
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
  });
});
