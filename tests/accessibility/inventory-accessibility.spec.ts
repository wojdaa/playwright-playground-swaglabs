import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { loginAs } from "../../utils/test-helpers";
import { config } from "../../utils/config";

test.describe("Inventory Page - Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseURL!);
    await loginAs(page, "standard_user");
  });

  test("should not have any automatically detectable accessibility issues @accessibility", async ({
    page
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have accessible product images @accessibility", async ({
    page
  }) => {
    // Check if all product images have alt text
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(".inventory_item_img")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading hierarchy @accessibility", async ({
    page
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const headingViolations = accessibilityScanResults.violations.filter(
      (violation) =>
        violation.id === "heading-order" ||
        violation.id === "page-has-heading-one"
    );

    expect(headingViolations).toEqual([]);
  });

  test("should support keyboard navigation for product actions @accessibility", async ({
    page
  }) => {
    // Focus on first add to cart button
    await page.locator(".inventory_item").first().locator("button").focus();
    await expect(
      page.locator(".inventory_item").first().locator("button")
    ).toBeFocused();

    // Press Enter to add to cart
    await page.keyboard.press("Enter");

    // Verify item was added
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("should have accessible sorting dropdown @accessibility", async ({
    page
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('[data-test="product-sort-container"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have accessible navigation menu @accessibility", async ({
    page
  }) => {
    // Open menu
    await page.locator("#react-burger-menu-btn").click();

    // Wait for menu to be visible
    await page.locator(".bm-menu").waitFor({ state: "visible" });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(".bm-menu")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should meet WCAG 2.1 Level AA standards @accessibility", async ({
    page
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
