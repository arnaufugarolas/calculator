const { Given, When, Then, DataTable } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

const url = 'http://localhost:8080/calculator/src/index.html'

Given(/^a user opens the app$/, async () => {
    await page.goto(url)
})

Then(/^in the display screen should be show a (.*)$/, async (value) => {
    const display = await page.locator('[data-testid="display"]').inputValue()
    expect(display).toBe(value)
})

Then(/^no button should be highlighted$/, async () => {
    const buttons = await getButtons()

    for (const button of buttons) {
        expect(await button.getAttribute('class')).not.toContain('highlighted')
    }
})

Then(/^all buttons should be enabled except (.*) and (.*)$/, async (disabledButton01, disabledButton02) => {
    const disabledButtons = [disabledButton01.replaceAll('\'', ''), disabledButton02.replaceAll('\'', '')]

    const buttons = await getButtons()

    for (const button of buttons) {
        let haveToBeDisabled = false
        for (let j = 0; j < disabledButtons.length; j++) {
            if (await button.inputValue() === disabledButtons[j]) {
                expect(await button.isDisabled()).toBe(true)
                haveToBeDisabled = true
            }
        }
        if (!haveToBeDisabled) {
            expect(await button.isDisabled()).toBe(false)
        }
    }
})

Given(/^in the display screen the number (.*) is shown$/, async (numberOnScreen) => {
    const display = await page.locator('[data-testid="display"]')
    await display.type(numberOnScreen.toString())
    expect(await display.inputValue()).toBe(numberOnScreen.toString())
})

When(/^the user press the (.*) button$/, async (key) => {
    const button = await getButton(key)

    await button.click()
})

async function getButtons () {
    const locatorButtons = await page.locator('[data-testid]')
    const buttons = []

    for (let i = 0; i < await locatorButtons.count(); i++) {
        if ((await locatorButtons.nth(i).getAttribute('data-testid')).includes('button')) {
            buttons.push(await locatorButtons.nth(i))
        }
    }

    return buttons
}

async function getButton (key) {
    const buttons = await getButtons()

    for (const button of buttons) {
        if (await button.inputValue() === key) {
            return button
        }
    }
}
