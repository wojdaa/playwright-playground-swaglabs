import { test, expect } from "@playwright/test";
import { config } from "../../utils/config";

test.describe("Authentication & User Management", () => {
  test("Successful Login - Standard User @smoke @regression", async ({
    page
  }) => {
    // 1. Navigate to https://www.saucedemo.com/
    await page.goto(config.baseURL!);

    // 2. Verify login page displays with username and password fields
    await expect(page.getByRole("textbox", { name: "Username" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Password" })).toBeVisible();

    // 3. Verify accepted usernames are listed on the page
    await expect(page.getByText("Accepted usernames are:")).toBeVisible();

    // 4. Enter "standard_user" in the username field
    await page.locator('[data-test="username"]').fill("standard_user");

    // 5. Enter "secret_sauce" in the password field
    await page.locator('[data-test="password"]').fill("secret_sauce");

    // 6. Click the "Login" button
    await page.locator('[data-test="login-button"]').click();

    // Verify user is redirected to /inventory.html with Products page title
    await expect(page.getByText("Products")).toBeVisible();

    // Verify all 6 products are visible on the page
    await expect(page.locator(".inventory_item")).toHaveCount(6);

    // Verify hamburger menu icon is visible
    await expect(page.getByRole("button", { name: "Open Menu" })).toBeVisible();

    // Verify shopping cart link is visible
    await expect(page.locator(".shopping_cart_link")).toBeVisible();

    // Verify no error messages are displayed
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });
});
