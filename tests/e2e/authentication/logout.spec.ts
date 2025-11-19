import { test, expect } from "@playwright/test";
import { loginAs } from "../../../utils/test-helpers";
import { NavigationPage } from "../../../pages/navigation.page";
import { config } from "../../../utils/config";

test.describe("Authentication & User Management", () => {
  test("Successful Logout @smoke @regression", async ({ page }) => {
    const navigation = new NavigationPage(page);

    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");

    await navigation.openMenu();
    await navigation.verifyMenuVisible();
    await navigation.logoutLink.click();

    await expect(page).toHaveURL(config.baseURL + "/");
    await expect(page.locator('[data-test="username"]')).toBeVisible();
  });
});
