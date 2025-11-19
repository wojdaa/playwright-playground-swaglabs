import { test, expect } from "@playwright/test";
import { loginAs } from "../../utils/test-helpers";
import { config } from "../../utils/config";

test.describe("Navigation and Focus Management", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");
  });

  test("shopping cart badge should be keyboard accessible @accessibility", async ({
    page
  }) => {
    // Add item to cart first
    await page
      .locator(".inventory_item")
      .first()
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();

    // Navigate to cart using keyboard
    await page.locator(".shopping_cart_link").focus();
    await expect(page.locator(".shopping_cart_link")).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/cart\.html/);
  });

  test("all buttons should be keyboard accessible @accessibility", async ({
    page
  }) => {
    const buttons = await page.locator("button").all();

    for (const button of buttons) {
      const isVisible = await button.isVisible();
      if (isVisible) {
        await button.focus();
        await expect(button).toBeFocused();
      }
    }
  });

  test("focus should be visible on all interactive elements @accessibility", async ({
    page
  }) => {
    // Check if focus outline is visible
    const interactiveElements = await page
      .locator("button, a, input, select")
      .all();

    for (const element of interactiveElements) {
      const isVisible = await element.isVisible();
      if (isVisible) {
        await element.focus();

        // Get computed style to check if outline is visible
        const outline = await element.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return {
            outlineWidth: style.outlineWidth,
            outlineStyle: style.outlineStyle,
            outlineColor: style.outlineColor
          };
        });

        // Verify that some focus indicator exists
        // (outline width should not be 0px or outline style should not be 'none')
        const hasFocusIndicator =
          outline.outlineWidth !== "0px" || outline.outlineStyle !== "none";

        expect(hasFocusIndicator).toBeTruthy();
      }
    }
  });

  test("navigation menu should be keyboard accessible @accessibility", async ({
    page
  }) => {
    // Open menu using keyboard
    await page.locator("#react-burger-menu-btn").focus();
    await page.keyboard.press("Enter");

    // Wait for menu to be visible
    await page.locator(".bm-menu").waitFor({ state: "visible" });

    // Navigate through menu items
    await page.locator("#inventory_sidebar_link").focus();
    await expect(page.locator("#inventory_sidebar_link")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator("#about_sidebar_link")).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator("#logout_sidebar_link")).toBeFocused();
  });

  test("sort dropdown should be keyboard operable @accessibility", async ({
    page
  }) => {
    // Focus on sort dropdown
    await page.locator('[data-test="product-sort-container"]').focus();
    await expect(
      page.locator('[data-test="product-sort-container"]')
    ).toBeFocused();

    // Change sort using keyboard
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    // Verify sort was applied
    const sortValue = await page
      .locator('[data-test="product-sort-container"]')
      .inputValue();
    expect(sortValue).not.toBe("az");
  });
});
