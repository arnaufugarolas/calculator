const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

const url = 'http://localhost:8080/calculator/src/index.html'

Given(/^a user opens the app$/, async () => {
    await page.goto(url)
    await page.waitForLoadState('load')
})

Given(/^the display has the value: (.*)$/, async (numberOnScreen) => {
    const display = await page.locator('[data-testid="display"]')

    await display.type(numberOnScreen)
    expect(await display.inputValue()).toBe(numberOnScreen)
})

When(/^the user press the key: (.*)$/, async (key) => {
    if (key === 'ESC') {
        await page.keyboard.press('Escape')
    } else if (key === 'Left Ctrl' || key === 'Right Ctrl') {
        await page.keyboard.down('Control')
    } else {
        await page.keyboard.press(key)
    }
})

When(/^the user writes the number: (.*)$/, async (number) => {
    const numberArray = number.split('')

    for (const number of numberArray) {
        await (await getButton(number)).click()
    }
})

When(/^the user press the button: (.*)$/, async (button) => {
    await (await getButton(button)).click()
})

Then(/^in the display screen should be show: (.*)$/, async (numberOnScreen) => {
    const display = await page.locator('[data-testid="display"]')

    expect(await display.inputValue()).toBe(numberOnScreen)
})

Then(/^all buttons should be enabled except: (.*)$/, async (disabledButtons) => {
    const buttons = await getButtons()

    for (const button of buttons) {
        let haveToBeDisabled = false
        for (const disabledButton of disabledButtons.split(' ')) {
            if (await button.inputValue() === disabledButton) {
                expect(await button.getAttribute('class')).toContain('disabled')
                haveToBeDisabled = true
            }
        }
        if (!haveToBeDisabled) {
            expect(await button.isDisabled()).toBe(false)
        }
    }
})

Then(/^all buttons shouldn't be highlighted except: (.*)$/, async (highlightedButtons) => {
    const buttons = await getButtons()

    for (const button of buttons) {
        for (const highlightedButton of highlightedButtons.split(' ')) {
            if (await button.inputValue() === highlightedButton) {
                expect(await button.getAttribute('class')).toContain('highlighted')
            } else {
                expect(await button.getAttribute('class')).not.toContain('highlighted')
            }
        }
    }
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
