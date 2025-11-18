import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { users } from "../fixtures/users";

export class LoginPage extends BasePage {
  readonly heading: Locator;

  readonly usernameField: Locator;
  readonly usernameInput: Locator;
  readonly lastNameInput: Locator;
  readonly usernameErrorMessage: Locator;

  readonly passwordField: Locator;
  readonly passwordInput: Locator;

  readonly rememberMeCheckbox: Locator;
  readonly loginButton: Locator;
  readonly singUpLink: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole("heading", { name: "Sign in" });

    this.usernameField = page.getByTestId("signin-username");
    this.usernameInput = this.usernameField.locator("input#username");
    this.usernameErrorMessage = this.usernameField.locator(
      "#username-helper-text"
    );
    this.lastNameInput = this.usernameField.locator("#lastName");

    this.passwordField = page.getByTestId("signin-password");
    this.passwordInput = this.passwordField.locator("input#password");

    this.rememberMeCheckbox = page
      .getByTestId("signin-remember-me")
      .locator("input[type='checkbox']");

    this.loginButton = page.getByTestId("signin-submit");
    this.singUpLink = page.getByTestId("signup");
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async loginAs(userKey: keyof typeof users) {
    const user = users[userKey];
    await this.login(user.username, user.password);
  }

  async navigateToSignUp() {
    // Fill username field to prevent validation error that blocks the first click
    await this.usernameInput.fill("temp");
    await this.singUpLink.click();
    // Wait for navigation to complete
    await this.page.waitForURL("**/signup");
  }
}
