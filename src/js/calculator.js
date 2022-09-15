window.addEventListener('load', loadCalculator)

let currentExpression = ''

function loadCalculator () {
    resetDisplay()
    addEvents()
}

/**
 * It adds event listeners to all the buttons and the keyboard
 */
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

        if (!document.getElementById(key).classList.contains('disabled')) {
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
        }
    })
}

/**
 * `resetDisplay` resets the display to 0 and unhighlights all keys.
 */
function resetDisplay () {
    setDisplay('0')
    unHighlightKeys()
    checkDisplay()
}

/**
 * It checks the current expression and changes the state of the buttons accordingly
 */
function checkDisplay () {
    const display = document.getElementById('display')
    const expression = splitExpression(currentExpression)
    const lastNumber = expression[expression.length - 1]

    if (display.value === '0') {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState('+/-', false)
        changeKeyState('0', false)
    } else if (currentExpression.match(/=/)) {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState(',', false)
    } else if (lastNumber.match(/[+\-*/]/)) {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState('+/-', false)
    } else if (lastNumber.replace(/[^0-9]/g, '').length >= 10) {
        changeNumbersState(false)
        changeOperatorsState(true)
        changeKeyState(',', false)
    } else if (lastNumber.toString().match(',')) {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState(',', false)
    } else if (currentExpression === 'ERROR') {
        changeNumbersState(false)
        changeOperatorsState(false)
        changeKeyState('C', true)
    } else {
        changeNumbersState(true)
        changeOperatorsState(true)
    }
}

/**
 * It takes a value as an argument, and sets the value of the display to that value
 * @param value - The value to be displayed on the calculator screen.
 */
function setDisplay (value) {
    document.getElementById('display').value = value
    currentExpression = value
}

/**
 * It takes a value, adds it to the display, and adds it to the currentExpression variable
 * @param value - The value to be added to the display.
 */
function addToDisplay (value) {
    document.getElementById('display').value += value
    currentExpression += value
}

/**
 * It takes a value as an argument, removes the last character from the currentExpression variable, and then adds the value
 * to the end of the currentExpression variable
 * @param value - The value to be added to the display.
 */
function replaceLastCharacterOnDisplay (value) {
    currentExpression = currentExpression.slice(0, -1)
    currentExpression += value
}

/**
 * If the display value is less than 10 characters long, add a comma to the display and check the display
 */
function addPoint () {
    const displayValue = document.getElementById('display').value

    if (displayValue.replace(/[^0-9]/g, '').length < 10) {
        addToDisplay(',')
        checkDisplay()
    }
}

/**
 * If the current expression is 0 or the result of an operation, set the display to the number. Otherwise, if the current
 * expression is a negative sign, add the number to the display. Otherwise, if the current expression ends with an
 * operator, check if the previous character is an operator. If it is, add the number to the display. Otherwise, set the
 * display to the number. Otherwise, if the display doesn't have 10 digits, add the number to the display
 * @param number - The number that is being added to the display.
 */
function addNumber (number) {
    const display = document.getElementById('display')

    if (currentExpression === '0' || currentExpression.match('=')) {
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
        if (display.value.replace(/[^0-9]/g, '').length < 10) {
            addToDisplay(number)
        }
    }

    checkDisplay()
}

/**
 * If the current expression is a complete expression, calculate it. If the current expression is a result, replace it with
 * the result. If the current expression ends with an operator, replace it with the new operator. Otherwise, add the new
 * operator to the current expression
 * @param operator - the operator that was clicked
 */
function addOperator (operator) {
    const display = document.getElementById('display')
    const expression = splitExpression(currentExpression)

    if (expression.length === 3) {
        calculate()
    }

    if (currentExpression.match('=')) {
        currentExpression = currentExpression.split('=')[1]
    }
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
        currentExpression += operator
        highlightKey(operator)
    }
    checkDisplay()
}

/**
 * It takes the last number of the current expression, changes its sign and updates the display
 */
function changeSign () {
    const splitedExpression = splitExpression(currentExpression)
    let numberToChange = splitedExpression[splitedExpression.length - 1].toString().replace(/,/g, '.')

    if (numberToChange.match(/\.$/)) {
        numberToChange = (-numberToChange.toString() + ',')
    } else {
        numberToChange = (-numberToChange).toString().replace(/\./g, ',')
    }

    splitedExpression[splitedExpression.length - 1] = numberToChange
    document.getElementById('display').value = numberToChange
    currentExpression = splitedExpression.join('')
}

/**
 * It takes a button as an argument, removes the highlighted class from all buttons, and then adds the highlighted class to
 * the button that was passed as an argument
 * @param button - The button that was pressed.
 */
function highlightKey (button) {
    unHighlightKeys()
    document.getElementById(button).classList.add('highlighted')
}

/**
 * It removes the `highlighted` class from all the buttons
 */
function unHighlightKeys () {
    const buttons = document.getElementsByClassName('button')

    for (const button of buttons) {
        if (button.classList.contains('highlighted')) {
            button.classList.remove('highlighted')
        }
    }
}

/**
 * It takes the current expression, replaces all commas with dots, replaces all double minus signs with plus signs, checks
 * if the expression ends with an operator or if it contains a division by zero, and if not, it evaluates the expression
 * and displays the result
 */
function calculate () {
    let expression = currentExpression
    let result
    expression = expression.replaceAll(',', '.')
    expression = expression.replaceAll('--', '+')

    if (expression.match(/\/0/) || expression.match(/[+\-*/]$/)) {
        result = 'ERROR'
    } else {
        // eslint-disable-next-line no-eval
        result = eval(expression).toString()

        const nonDecimal = result.split('.')[0]

        if (nonDecimal.length > 10) {
            result = 'ERROR'
        } else {
            const maxDecimal = 10 - nonDecimal.length
            result = parseFloat(parseFloat(result).toFixed(maxDecimal))
            result = result.toString().replace(/\./g, ',')
        }
    }
    if (result === 'ERROR') {
        setDisplay(result)
    } else {
        document.getElementById('display').value = result
        currentExpression += '=' + result
    }

    unHighlightKeys()
    checkDisplay()
}

/**
 * It takes a key ID and a state, and if the state is true, it removes the disabled class from the key and enables it, and
 * if the state is false, it adds the disabled class to the key and disables it
 * @param keyId - The id of the key to change the state of.
 * @param state - true or false
 */
function changeKeyState (keyId, state) {
    const key = document.getElementById(keyId)

    if (state && key.classList.contains('disabled')) {
        key.classList.remove('disabled')
        key.disabled = false
    } else if (!state && !key.classList.contains('disabled')) {
        key.classList.add('disabled')
        key.disabled = true
    }
}

/**
 * It loops through all the elements with the class name 'operator' and changes their state to the state passed in as an
 * argument
 * @param state - the state of the key (enabled or disabled)
 */
function changeOperatorsState (state) {
    const operators = document.getElementsByClassName('operator')

    for (const operator of operators) {
        changeKeyState(operator.id, state)
    }
}

/**
 * It changes the state of all the number keys
 * @param state - the state of the key (enabled or disabled)
 */
function changeNumbersState (state) {
    const numbers = document.getElementsByClassName('number')

    for (const number of numbers) {
        changeKeyState(number.id, state)
    }
}

/**
 * It splits the expression into an array of numbers and operators
 * @param expression - The expression to be evaluated.
 * @returns an array of numbers and operators.
 */
function splitExpression (expression) {
    const copy = expression
    const baseExpression = expression.replace(/[0-9]+/g, '#').replace(/[(|,)]/g, '')
    const numbers = copy.split(/[^0-9,]+/)
    const operators = baseExpression.split('#').filter(function (n) {
        return n
    })
    const result = []

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === '' && i === 0) {
            i++
            result.push((operators[i - 1] + numbers[i]))
        } else if (isNaN(parseFloat(numbers[i]))) {
            continue
        } else {
            result.push(numbers[i])
        }

        if (i < operators.length) {
            if (operators[i].match(RegExp(/[+\-*/=]-/))) {
                const operatorsArray = operators[i].split('')
                i++

                result.push(operatorsArray[0])
                result.push(operatorsArray[1] + numbers[i])
            } else {
                if (operators[i]) {
                    result.push(operators[i])
                }
            }
        }
    }
    return result
}
