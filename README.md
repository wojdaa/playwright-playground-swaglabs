# playwright-playground-swaglabs

Playwright test automation project for the Cypress Real World App.

## Prerequisites

- Node.js (v18 or higher)
- npm

## Setup

1. Clone the repository:

```bash
git clone https://github.com/wojdaa/playwright-playground-swaglabs.git
cd playwright-playground-swaglabs
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright:

```bash
npx playwright install
```

4. Create a `.env` file in the root dir:

```bash
cp .env
```

5. Update the `.env` file with your test credentials.

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in heded mode:

```bash
npx playwright test --headed
```

Run specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

## Test Reports

View HTML report

```bash
npx playwright show-report
```

## Project Structure

```bash
├── fixtures/          # Test data and user credentials
├── pages/            # Page Object Models
├── tests/            # Test specifications
├── .env             # Environment variables (not in git)
└── playwright.config.ts
```

## Application Under Test

The tests run against the Cypress Real World App running locally at http://localhost:3000.

Make sure the application is running before executing tests.

## Environment Variables

STANDARD_USER_PASSWORD - Password for the standard test user

## Notes

The app data resets when the server is restarted
register-user.spec.ts should be run first to create a test user
Bank account details are configured during the first login
