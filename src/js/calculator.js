function loadCalculator () {
    clearDisplay()
    addEvents()
}

function addEvents () {
    const buttons = document.getElementsByClassName('button')

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]

        if (button.classList.contains('number')) {
            button.addEventListener('click', function () {
                if (!this.classList.contains('disabled')) {
                    addNumberToDisplay(button.id)
                }
            })
        } else if (button.classList.contains('operator')) {
            if (button.id === 'C') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        clearDisplay()
                    }
                })
            } else if (button.id === '+/-') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        changeDisplaySign()
                    }
                })
            } else if (button.id === '+' || button.id === '-' || button.id === '*' || button.id === '/') {
                button.addEventListener('click', function () {
                    if (!this.classList.contains('disabled')) {
                        addOperatorToDisplay(button.id)
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
                        addPointToDisplay()
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
            addPointToDisplay()
        } else if (key >= 0 && key <= 9) {
            addNumberToDisplay(key)
        } else if (key === 'C') {
            clearDisplay()
        } else if (key === '+/-') {
            changeDisplaySign()
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            addOperatorToDisplay(key)
        } else if (key === '=') {
            calculate()
        }
    })
}

function clearDisplay () {
    document.getElementById('display').value = 0

    checkDisplay()
    unHighlightKeys()
}

function addPointToDisplay () {
    const display = document.getElementById('display')

    if (display.value === 'Error') {
        return
    } else if (display.value.replace(/[^0-9]/g, '').length === 10) {
        return
    }

    document.getElementById('display').value += ','

    checkDisplay()
}

function addNumberToDisplay (number) {
    const display = document.getElementById('display')

    if (display.value.replace(/[^0-9]/g, '').length === 10) {
        return
    }

    if ((display.value[0] === '0' && display.value.length === 1) || display.value === 'Error') {
        display.value = number
    } else {
        display.value += number
    }

    checkDisplay()
}

function addOperatorToDisplay (operator) {
    const display = document.getElementById('display')
    console.log(operator)
    if (display.value === '0' && operator === '-') {
        display.value = operator
    } else {
        display.value += operator
    }
    highlightKey(operator)
    checkDisplay()
}

function changeDisplaySign () {
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
    const display = document.getElementById('display')
    const expression = display.value
    let result
    if (expression.charAt(expression.length - 1).match('[0-9]')) {
        // eslint-disable-next-line no-eval
        result = eval(expression.replace(',', '.')).toString().replace('.', ',')
    }

    display.value = result || 'Error'

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
    if (display.value === 'Error') {
        console.log('Error')
        changeOperatorsState(false)
        changeKeyState('C', true)
    } else if (display.value.match('[+]$')) {
        changeOperatorsState(false)
        changeKeyState('C', true)
    } else if (display.value === '0') {
        changeOperatorsState(true)
        changeKeyState('+/-', false)
        changeKeyState('0', false)
    } else if (display.value.match('[0-9],$')) {
        changeOperatorsState(false)
        changeKeyState('C', true)
        changeKeyState('+/-', true)
        changeKeyState('0', true)
    } else if (display.value === '-' && display.value.length === 1) {
        console.log('minus')
        changeOperatorsState(false)
        changeKeyState('C', true)
        changeKeyState('0', true)
        changeKeyState('+/-', false)
    } else {
        changeOperatorsState(true)
        changeKeyState('0', true)
    }
}
