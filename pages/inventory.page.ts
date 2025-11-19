import { expect, Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class InventoryPage extends BasePage {
    readonly pageTitle: Locator
    readonly inventoryItems: Locator
    readonly sortDropdown: Locator
    readonly shoppingCartBadge: Locator
    readonly shoppingCartLink: Locator
    readonly inventoryItemName: Locator
    readonly inventoryItemPrice: Locator

    constructor(page: Page) {
        super(page)
        this.pageTitle = page.locator('.title')
        this.inventoryItems = page.locator('.inventory_item')
        this.sortDropdown = page.locator('[data-test="product-sort-container"]')
        this.shoppingCartBadge = page.locator('.shopping_cart_badge')
        this.shoppingCartLink = page.locator('.shopping_cart_link')
        this.inventoryItemName = page.locator('.inventory_item_name')
        this.inventoryItemPrice = page.locator('.inventory_item_price')
    }

    async verifyInventoryPageDisplayed() {
        await expect(this.pageTitle).toHaveText('Products')
        await expect(this.inventoryItems.first()).toBeVisible()
    }

    async verifyProductCount(expectedCount: number) {
        await expect(this.inventoryItems).toHaveCount(expectedCount)
    }

    async selectSort(sortOption: string) {
        await this.sortDropdown.selectOption(sortOption)
    }

    async verifySortOption(expectedOption: string) {
        await expect(this.sortDropdown).toHaveValue(expectedOption)
    }

    async getProductNames(): Promise<string[]> {
        return await this.inventoryItemName.allTextContents()
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.inventoryItemPrice.allTextContents()
        return prices.map((price) => parseFloat(price.replace('$', '')))
    }

    async addProductToCart(productName: string) {
        const productId = this.convertProductNameToId(productName)
        await this.page
            .locator(`[data-test="add-to-cart-${productId}"]`)
            .click()
    }

    async removeProductFromCart(productName: string) {
        const productId = this.convertProductNameToId(productName)
        await this.page.locator(`[data-test="remove-${productId}"]`).click()
    }

    async verifyProductButtonState(
        productName: string,
        state: 'add' | 'remove'
    ) {
        const productId = this.convertProductNameToId(productName)
        const locator =
            state === 'add'
                ? this.page.locator(`[data-test="add-to-cart-${productId}"]`)
                : this.page.locator(`[data-test="remove-${productId}"]`)
        await expect(locator).toBeVisible()
    }

    async clickProductName(productName: string) {
        await this.inventoryItemName.filter({ hasText: productName }).click()
    }

    async verifyCartBadgeCount(expectedCount: number) {
        if (expectedCount > 0) {
            await expect(this.shoppingCartBadge).toHaveText(
                expectedCount.toString()
            )
        } else {
            await expect(this.shoppingCartBadge).not.toBeVisible()
        }
    }

    async navigateToCart() {
        await this.shoppingCartLink.click()
    }

    private convertProductNameToId(productName: string): string {
        return productName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '')
    }
}
