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
    } else if (currentExpression.match('=')) {
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
    let result
    expression = expression.replaceAll(',', '.')
    expression = expression.replaceAll('--', '+')

    if (expression.match(/\/0/)) {
        result = 'ERROR'
    } else if (expression.match(/[+\-*/]$/)) {
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
            result = result.toString().replace('.', ',')
        }
    }

    document.getElementById('display').value = result
    currentExpression += '=' + result

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

function changeNumbersState (state) {
    const numbers = document.getElementsByClassName('number')

    for (let i = 0; i < numbers.length; i++) {
        changeKeyState(numbers[i].id, state)
    }
}

function checkDisplay () {
    console.log(currentExpression)
    const display = document.getElementById('display')
    const expression = splitExpression(display.value)
    const lastNumber = expression[expression.length - 1]

    if (display.value === '0') {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState('+/-', false)
        changeKeyState('0', false)
    } else if (lastNumber.toString().match(',')) {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState(',', false)
    } else if (display.value.replace(/[^0-9]/g, '').length >= 10) {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState(',', true)
    } else {
        changeNumbersState(true)
        changeOperatorsState(true)
        changeKeyState('0', true)
    }
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

    currentExpression += value
}

function splitExpression (expression) {
    const copy = expression
    const baseExpression = expression.replace(/[0-9]+/g, '#').replace(/[(|,)]/g, '')
    const numbers = copy.split(/[^0-9,]+/)
    const operators = baseExpression.split('#').filter(function (n) { return n })
    const result = []

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === '' && i === 0) {
            i++
            result.push((operators[i - 1] + numbers[i]))
        } else if (isNaN(parseFloat(numbers[i]))) {
            continue
        } else { result.push(numbers[i]) }

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
