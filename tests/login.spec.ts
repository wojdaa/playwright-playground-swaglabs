import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { users } from "../fixtures/users";

test.describe("Login Page", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/signin");
  });

  test("user can login with valid credentials", async ({ page }) => {
    await loginPage.loginAs("standardUser");

    await expect(page.getByText("Account Balance")).toBeVisible();
  });

  test("user cannot login with invalid credentials", async ({ page }) => {
    await page.locator("#password").click();
    await expect(loginPage.loginButton).toBeDisabled();
    await expect(loginPage.usernameErrorMessage).toBeVisible();
    await expect(loginPage.usernameErrorMessage).toHaveText(
      "Username is required"
    );
    await expect(loginPage.usernameInput).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await loginPage.login(users.standardUser.username, "wrongPassword!");

    const alert = page.getByRole("alert");
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/Username or password is invalid/i);
  });

  test("remember me checkbox can be toggled", async ({ page }) => {
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
    await loginPage.rememberMeCheckbox.check();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
    await loginPage.rememberMeCheckbox.uncheck();
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
  });

  test("sign up link navigates to registration page", async ({ page }) => {
    await expect(
      page.getByText("Don't have an account? Sign Up")
    ).toBeVisible();
    await loginPage.navigateToSignUp();
    await expect(page.getByTestId("signup-title")).toHaveText("Sign Up");
  });
});
