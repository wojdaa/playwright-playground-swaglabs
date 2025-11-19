# playwright-playground-swaglabs

Comprehensive end-to-end test suite for SauceDemo e-commerce application using Playwright.

## 🚀 Quick Start

### Installation

```bash
npm install
npx playwright install
```

### Run Tests

```bash
# Run all tests
npm test

# Run smoke tests (critical paths)
npm run test:smoke

# Run regression tests (full suite)
npm run test:regression

# Run accessibility tests
npm run test:accessibility

# Run with UI mode
npm run test:ui

# Run in headed mode (visible browser)
npm run test:headed
```

## 📋 Test Organization

### Test Categories

Tests are organized using tags for flexible execution:

- **@smoke** - Critical path tests that must pass before deployment
- **@regression** - Comprehensive functional tests covering all features
- **@accessibility** - WCAG 2.0/2.1 Level AA compliance tests
- **@visual** - Visual regression tests for different viewports

See [TEST-TAGS.md](./TEST-TAGS.md) for detailed documentation on test tags and execution strategies.

### Test Structure

```
tests/
├── accessibility/         # Accessibility and a11y tests (@accessibility)
├── visual/               # Visual regression tests (@visual)
├── e2e/                  # End-to-end functional tests
│   ├── authentication/   # Login, logout, and user management tests
│   ├── checkout/         # Checkout process and validations (@smoke, @regression)
│   ├── navigation/       # Menu navigation and links (@regression)
│   ├── performance-user/ # Performance glitch user scenarios (@regression)
│   ├── problem-user/     # Problem user scenarios (@regression)
│   ├── product-browsing/ # Product viewing and sorting (@regression)
│   └── shopping-cart/    # Cart management (@smoke, @regression)
└── seed.spec.ts         # Seed test for setup
```

## 🎯 Features

- ✅ **Page Object Model (POM)** - Maintainable and reusable page objects
- ✅ **Test Tags** - Flexible test execution with @smoke, @regression, @accessibility
- ✅ **Accessibility Testing** - Automated a11y checks with axe-core
- ✅ **Multi-Browser Support** - Chromium, Firefox, and WebKit
- ✅ **CI/CD Ready** - Configured for continuous integration
- ✅ **Comprehensive Coverage** - Authentication, checkout, navigation, cart management
- ✅ **Special User Scenarios** - Tests for problem_user and performance_glitch_user

## 🧪 Test Coverage

### Smoke Tests (~2-5 minutes)

- User login and authentication
- Product inventory viewing
- Adding items to cart
- Complete checkout flow
- User logout

### Regression Tests (~15-30 minutes)

- All authentication scenarios
- Product browsing and sorting
- Shopping cart operations
- Checkout validations
- Navigation and menu
- Social media links
- Special user scenarios

### Accessibility Tests (~5-10 minutes)

- Automated WCAG scanning
- Keyboard navigation
- Form accessibility
- Color contrast validation
- Focus management
- ARIA attributes

## 📊 Reports

View test results:

```bash
npm run report
```

## 🔧 Configuration

Test configuration is in `playwright.config.ts`:

- Base URL: `https://www.saucedemo.com`
- Multiple browser projects (Chromium, Firefox, WebKit)
- Screenshot on failure
- Video on failure
- HTML reporter

## 📚 Documentation

- [TEST-TAGS.md](./TEST-TAGS.md) - Complete guide to test tags and execution
- [test-plan-saucedemo.md](./test-plan-saucedemo.md) - Detailed test plan

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Environment Variables

Create a `.env` file (optional):

```env
BASE_URL=https://www.saucedemo.com
```

### Run Specific Tests

```bash
# Run tests in specific file
npx playwright test tests/e2e/authentication/successful-login-standard-user.spec.ts

# Run tests in specific folder
npx playwright test tests/accessibility/

# Run e2e tests only
npx playwright test tests/e2e/

# Run visual tests only
npx playwright test --grep @visual

# Run with specific browser
npm run test:chromium

# Debug mode
npm run test:debug
```

## 🤝 Contributing

When adding new tests:

1. Use appropriate tags (@smoke, @regression, @accessibility)
2. Follow Page Object Model pattern
3. Add clear test descriptions
4. Update documentation

## 📝 License

ISC
