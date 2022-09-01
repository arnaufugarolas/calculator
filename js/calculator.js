function loadCalculator () {
    clearDisplay()

    document.getElementById('+/-').classList.add('disabled')
    document.getElementById('0').classList.add('disabled')

    addEvents()
}

function addEvents () {
    const buttons = document.getElementsByClassName('button')

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]

        if (button.classList.contains('number')) {
            if (button.id === ',') {
                button.addEventListener('click', function () {
                    addPointToDisplay()
                })
            } else {
                button.addEventListener('click', function () {
                    addNumberToDisplay(button.id)
                })
            }
        } else if (button.classList.contains('operator')) {
            if (button.id === 'C') {
                button.addEventListener('click', function () {
                    clearDisplay()
                })
            } else if (button.id === '+/-') {
                button.addEventListener('click', function () {
                    changeDisplaySign()
                })
            } else if (button.id === '+' || button.id === '-' || button.id === '*' || button.id === '/') {
                button.addEventListener('click', function () {
                    addOperatorToDisplay(button.id)
                    highlightKey(button.id)
                })
            } else if (button.id === '=') {
                button.addEventListener('click', function () {
                    unHighlightKeys()
                })
            }
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === ',') {
            addPointToDisplay()
        } else if (event.key >= 0 && event.key <= 9) {
            addNumberToDisplay(event.key)
        } else if (event.key === 'Escape') {
            clearDisplay()
        } else if (event.key === 'Control') {
            changeDisplaySign()
        } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
            addOperatorToDisplay(event.key)
            highlightKey(event.key)
        } else if (event.key === 'Enter') {
            calculate()
        }
    })
}

function clearDisplay () {
    unHighlightKeys()
    document.getElementById('display').value = 0
}

function addPointToDisplay () {
    document.getElementById('display').value += ','
}

function addNumberToDisplay (number) {
    const display = document.getElementById('display')

    if ((display.value[0] === '0' && display.value.length === 1) || display.value === 'Error') {
        display.value = number
    } else {
        display.value += number
    }
}

function addOperatorToDisplay (operator) {
    const display = document.getElementById('display')

    display.value += operator
}

function changeDisplaySign () {
    const display = document.getElementById('display')

    display.value = display.value * -1
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
    let result = 'Error'

    if (expression.match(/[+\-*/]/)) {
        if (!expression.charAt(expression.length - 1).match(/[+\-*/]/)) {
            result = eval(expression)
        }
    }

    display.value = result
    unHighlightKeys()
}
