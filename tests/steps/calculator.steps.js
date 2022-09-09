const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

const url = 'http://localhost:8080/calculator/src/index.html'

async function buttonClick (buttonId) {
    await page.click(`[data-testid="${buttonId}"]`, { force: true })
}

async function serialForEach (array, cb) {
    return array.reduce((promise, data) => promise.then(() => cb(data)), Promise.resolve())
}

async function writeNumber (strNumber) {
    let isNegative = false
    const digits = strNumber.split('')
    await serialForEach(digits, async (digit) => {
        if (digit === '-') {
            isNegative = true
        } else {
            await buttonClick(digit)
        }
    })
    if (isNegative) {
        await buttonClick('+-')
    }
}

async function keyPress (keyId) {
    await page.keyboard.press(keyId, { force: true })
}

Given('a user opens the app', async () => {
    await page.goto(url)
})

Then('the display should show the following value: {string}', async (string) => {
    const display = await page.locator('data-testid=display').inputValue()
    expect(display).toBe(string)
})

Given('the display shows the following value: {string}', async (string) => {
    await buttonClick('C')
    await writeNumber(string)
})

When('the user presses the {string} button', async (string) => {
    await buttonClick(string)
})

When('the user presses the {string} key', async (string) => {
    await keyPress(string)
})

When('the user writes the number: {string}', async (string) => {
    await writeNumber(string)
})

Then('the {string} button should be disabled', async (string) => {
    const locator = page.locator(`[data-testid="${string}"]`)
    await expect(locator).toBeDisabled()
})

Then('the {string} button should be enabled', async (string) => {
    const locator = page.locator(`[data-testid="${string}"]`)
    await expect(locator).toBeEnabled()
})
