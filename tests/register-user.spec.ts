// spec: Register new user with credentials from fixtures and handle optional bank configuration popup
// seed: tests/seed.spec.ts

import { test, expect } from "@playwright/test";
import { users } from "../fixtures/users";
import { LoginPage } from "../pages/loginPage";

test.describe("User Registration", () => {
  test("register new user with bank account setup", async ({ page }) => {
    let loginPage: LoginPage;
    const user = users.standardUser;

    loginPage = new LoginPage(page);
    await loginPage.goto();

    await page.getByRole("textbox", { name: "First Name" }).fill(user.fistName);
    await page.getByRole("textbox", { name: "Last Name" }).fill(user.lastName);
    await page.getByRole("textbox", { name: "Username" }).fill(user.username);

    await page
      .getByTestId("signup-password")
      .getByRole("textbox", { name: "Password" })
      .fill(user.password);

    await page
      .getByRole("textbox", { name: "Confirm Password" })
      .fill(user.password);
    await page.getByTestId("signup-submit").click();
    await expect(page).toHaveURL(/\/signin$/);
    await page.getByRole("textbox", { name: "Username" }).fill(user.username);
    await page.getByRole("textbox", { name: "Password" }).fill(user.password);
    await page.getByTestId("signin-submit").click();
    await expect(
      page.getByRole("heading", { name: "Get Started with Real World App" })
    ).toBeVisible();
    await page.getByTestId("user-onboarding-next").click();
    await expect(
      page.getByRole("heading", { name: "Create Bank Account" })
    ).toBeVisible();

    await page.getByRole("textbox", { name: "Bank Name" }).fill("Test Bank");
    await page
      .getByRole("textbox", { name: "Routing Number" })
      .fill("987654321");
    await page
      .getByRole("textbox", { name: "Account Number" })
      .fill("123456789012");

    await page.getByTestId("bankaccount-submit").click();
    await expect(page.getByRole("heading", { name: "Finished" })).toBeVisible();
    await expect(page.getByText("You're all set!")).toBeVisible();
    await page.getByTestId("user-onboarding-next").click();
    await expect(page.getByText("Account Balance")).toBeVisible();
    await expect(page.getByText("$0.00")).toBeVisible();
  });
});
