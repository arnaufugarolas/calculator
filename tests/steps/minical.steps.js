const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

const url = 'http://localhost:63342/calculator/src/index.html?_ijt=n9lur12o8jibafv2ejbp3vhjmi'

Given('a user opens the app', async () => {
    await page.goto(url)
})

Then('at the display should show the following value: {int}', async (value) => {
    const display = await page.locator('[data-testid="display"]').inputValue()
    expect(display).toBe(value.toString())
})
