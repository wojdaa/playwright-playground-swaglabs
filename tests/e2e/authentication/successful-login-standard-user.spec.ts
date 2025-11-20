import { test, expect } from '@playwright/test'
import { LoginPage } from '../../../pages/login.page'
import { InventoryPage } from '../../../pages/inventory.page'
import { NavigationPage } from '../../../pages/navigation.page'

test.describe('Authentication & User Management', () => {
    test('Successful Login - Standard User @smoke @regression', async ({
        page,
    }) => {
        const loginPage = new LoginPage(page)
        const inventoryPage = new InventoryPage(page)
        const navigation = new NavigationPage(page)

        await page.goto('/')
        await loginPage.assertLoginFieldsVisible()
        await loginPage.assertAcceptedUsernamesTextVisible()
        await loginPage.login('standard_user', 'secret_sauce')
        await expect(page).toHaveURL(/inventory\.html/)
        await inventoryPage.assertInventoryPageDisplayed()
        await inventoryPage.assertProductCount(6)
        await navigation.assertMenuButtonVisible()
        await inventoryPage.assertShoppingCartLinkVisible()
        await loginPage.assertNoErrorDisplayed()
    })
})
