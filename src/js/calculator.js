let currentExpression = ''

// eslint-disable-next-line no-unused-vars
function loadCalculator () {
    resetDisplay()
    addEvents()
}

function addEvents () {
    const buttons = document.getElementsByClassName('button')

    for (const button of buttons) {
        if (button.classList.contains('number')) {
            button.addEventListener('click', function () {
                if (!this.classList.contains('disabled')) {
                    addNumber(button.id)
                }
            })
        } else if (button.classList.contains('operator')) {
            if (button.id === 'C') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        resetDisplay()
                    }
                })
            } else if (button.id === '+/-') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        changeSign()
                    }
                })
            } else if (button.id === '+' || button.id === '-' || button.id === '*' || button.id === '/') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        addOperator(button.id)
                    }
                })
            } else if (button.id === '=') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        calculate()
                    }
                })
            } else if (button.id === ',') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        addPoint()
                    }
                })
            }
        }
    }

    document.addEventListener('keydown', function (event) {
        let key = event.key

        if (key === 'Enter') {
            key = '='
        } else if (key === 'Control') {
            key = '+/-'
        } else if (key === 'Escape') {
            key = 'C'
        }

        if (document.getElementById(key).classList.contains('disabled')) {
            return
        }

        if (key === ',') {
            addPoint()
        } else if (key >= 0 && key <= 9) {
            addNumber(key)
        } else if (key === 'C') {
            resetDisplay()
        } else if (key === '+/-') {
            changeSign()
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            addOperator(key)
        } else if (key === '=') {
            calculate()
        }
    })
}

function resetDisplay () {
    setDisplay('0')
    checkDisplay()
    unHighlightKeys()
}

function addPoint () {
    const display = document.getElementById('display')
    if (display.value.replace(/[^0-9]/g, '').length >= 10) {
        return
    }
    addToDisplay(',')
    checkDisplay()
}

function addNumber (number) {
    const display = document.getElementById('display')

    if (currentExpression === '0') {
        setDisplay(number)
    } else if (currentExpression === '-') {
        addToDisplay(number)
    } else if (currentExpression[currentExpression.length - 1].match(/[+\-*/]/)) {
        const length = currentExpression.length - 2
        if (length >= 0) {
            if (currentExpression[length].match(/[+\-*/]/)) {
                addToDisplay(number)
            } else {
                display.value = number
                currentExpression += number
            }
        } else {
            display.value = number
            currentExpression += number
        }
    } else {
        if (display.value.replace(/[^0-9]/g, '').length >= 10) {
            return
        }
        addToDisplay(number)
    }

    checkDisplay()
}

function addOperator (operator) {
    const display = document.getElementById('display')

    if (currentExpression === '0' && operator === '-') {
        setDisplay(operator)
    } else if (currentExpression[currentExpression.length - 1].match(/[+\-*/]/)) {
        if (operator === '-') {
            display.value = operator
            currentExpression += operator
        } else {
            replaceLastCharacterOnDisplay(operator)
            highlightKey(operator)
        }
    } else {
        addToDisplay(operator)
        highlightKey(operator)
    }
    checkDisplay()
}

function changeSign () {
    const display = document.getElementById('display')
    let value = display.value

    if (value.match(',$')) {
        value = -value.replace(',', '')
        value = value.toString() + ','
    } else {
        value = -value.replace(',', '.')
        value = value.toString().replace('.', ',')
    }
    display.value = value
}

function highlightKey (button) {
    unHighlightKeys()
    document.getElementById(button).classList.add('highlighted')
}

function unHighlightKeys () {
    const buttons = document.getElementsByClassName('button')

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('highlighted')) {
            buttons[i].classList.remove('highlighted')
        }
    }
}

function calculate () {
    let expression = currentExpression

    expression = expression.replaceAll(',', '.')
    expression = expression.replaceAll('--', '+')

    // eslint-disable-next-line no-eval
    let result = eval(expression).toString()

    const nonDecimal = result.split('.')[0]

    if (nonDecimal.length > 10) {
        result = 'ERROR'
    } else {
        const maxDecimal = 10 - nonDecimal.length
        result = parseFloat(parseFloat(result).toFixed(maxDecimal))
    }
    document.getElementById('display').value = result.toString().replace('.', ',')
    currentExpression = '0'

    unHighlightKeys()
    checkDisplay()
}

function changeKeyState (keyId, state) {
    const key = document.getElementById(keyId)
    if (state && key.classList.contains('disabled')) {
        key.classList.remove('disabled')
    } else if (!state && !key.classList.contains('disabled')) {
        key.classList.add('disabled')
    }
}

function changeOperatorsState (state) {
    const operators = document.getElementsByClassName('operator')

    for (let i = 0; i < operators.length; i++) {
        changeKeyState(operators[i].id, state)
    }
}

function checkDisplay () {
    const display = document.getElementById('display')
    const splitExpression = splitExpressionNumbers(display.value)
    const lastNumber = splitExpression[splitExpression.length - 1]

    if (display.value === '0') {
        changeOperatorsState(true)
        changeKeyState('+/-', false)
        changeKeyState('0', false)
    } else if (lastNumber.match(',')) {
        changeOperatorsState(true)
        changeKeyState(',', false)
    } else {
        changeOperatorsState(true)
        changeKeyState('0', true)
    }
}

function splitExpressionNumbers (expression) {
    const numbers = expression.split(/[^0-9,]+/)
    const result = []

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] !== '') {
            result.push(numbers[i])
        }
    }
    if (result.length === 0) {
        return ['']
    }
    return result
}

function setDisplay (value) {
    document.getElementById('display').value = value
    currentExpression = value
}

function addToDisplay (value) {
    document.getElementById('display').value += value
    currentExpression += value
}

function replaceLastCharacterOnDisplay (value) {
    const display = document.getElementById('display')

    currentExpression = currentExpression.slice(0, -1)
    display.value = display.value.slice(0, -1)

    addToDisplay(value)
}
