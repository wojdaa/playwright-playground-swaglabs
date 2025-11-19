// spec: test-plan-saucedemo.md
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { loginAs } from "../../utils/test-helpers";
import { config } from "../../utils/config";

test.describe("Visual Testing", () => {
  test("Mobile View (375x667 - iPhone SE) @visual", async ({ page }) => {
    // 1. Set viewport to mobile size (375x667 - iPhone SE)
    await page.setViewportSize({ width: 375, height: 667 });

    // 2-3. Navigate and login
    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");

    // 4. Take screenshot of inventory page
    await expect(page).toHaveURL(/inventory\.html/);
    await page.screenshot({
      fullPage: true,
      path: "test-results/visual-mobile-inventory.png"
    });

    // 6. Add Sauce Labs Onesie to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();

    // 7. Click on shopping cart icon
    await page.locator('[data-test="shopping-cart-link"]').click();

    // 8. Take screenshot of cart page
    await expect(page).toHaveURL(/cart\.html/);
    await page.screenshot({
      fullPage: true,
      path: "test-results/visual-mobile-cart.png"
    });

    // 9. Click checkout button
    await page.locator('[data-test="checkout"]').click();

    // 10. Fill in checkout information (First Name: Mike, Last Name: Johnson, Zip: 98765)
    await page.locator('[data-test="firstName"]').fill("Mike");
    await page.locator('[data-test="lastName"]').fill("Johnson");
    await page.locator('[data-test="postalCode"]').fill("98765");

    // 11. Click continue
    await page.locator('[data-test="continue"]').click();

    // 12. Take screenshot of checkout overview page
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await page.screenshot({
      fullPage: true,
      path: "test-results/visual-mobile-checkout-overview.png"
    });

    // 13. Click finish
    await page.locator('[data-test="finish"]').click();

    // 14. Take screenshot of order complete page
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await page.screenshot({
      fullPage: true,
      path: "test-results/visual-mobile-order-complete.png"
    });

    // Verification: Verify order complete page is displayed
    await expect(
      page.getByRole("heading", { name: "Thank you for your order!" })
    ).toBeVisible();
  });
});
