const { Given, When, Then, DataTable } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')

const url = 'http://localhost:8080/calculator/src/index.html'

Given(/^a user opens the app$/, async () => {
    await page.goto(url)
    await page.waitForLoadState('networkidle')
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
    const disabledButtons = [disabledButton01, disabledButton02]

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
    await display.type(numberOnScreen)
    expect(await display.inputValue()).toBe(numberOnScreen)
})

When(/^the user press the (.*) button$/, async (key) => {
    await (await getButton(key)).click()
})

Then(/^just the operator (.*) button should be highlighted$/, async (key) => {
    const buttons = await getButtons()

    for (const button of buttons) {
        if (await button.inputValue() === key) {
            expect(await button.getAttribute('class')).toContain('highlighted')
        } else {
            expect(await button.getAttribute('class')).not.toContain('highlighted')
        }
    }
})

Then(/^all the operators buttons should be unhighlighted$/, async () => {
    const operators = await getOperators()

    for (const operator of operators) {
        expect(await operator.getAttribute('class')).not.toContain('highlighted')
    }
})

When(/^the user press the (.*) key$/, async (key) => {
    if (key === 'ESC') {
        await page.keyboard.press('Escape')
    } else if (key === 'Left Ctrl' || key === 'Right Ctrl') {
        await page.keyboard.down('Control')
    } else {
        await page.keyboard.press(key)
    }
})

Then(/^the (.*) button should be highlighted$/, async (key) => {
    const button = await getButton(key)
    expect(await button.getAttribute('class')).toContain('highlighted')
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

async function getOperators () {
    const locatorButtons = await page.locator('[data-testid]')
    const operators = []

    for (let i = 0; i < await locatorButtons.count(); i++) {
        if ((await locatorButtons.nth(i).getAttribute('data-testid')).includes('operator')) {
            operators.push(await locatorButtons.nth(i))
        }
    }

    return operators
}

async function getButton (key) {
    const buttons = await getButtons()

    for (const button of buttons) {
        if (await button.inputValue() === key) {
            return button
        }
    }
}
