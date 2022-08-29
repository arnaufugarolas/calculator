function loadCalculator () {
    clearResult()

    document.getElementById('+/-').classList.add('disabled')
    document.getElementById('0').classList.add('disabled')

    addEvents()
}

function addEvents () {
    const buttons = document.getElementsByClassName('button')
    const result = document.getElementById('result')

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i]

        if (button.classList.contains('number')) {
            if (button.id === ',') {
                button.addEventListener('click', function () {
                    addPointToResult()
                })
            } else {
                button.addEventListener('click', function () {
                    addNumberToResult(button.id)
                })
            }
        } else if (button.classList.contains('operator')) {
            if (button.id === 'C') {
                button.addEventListener('click', function () {
                    clearResult()
                })
            } else if (button.id === '+/-') {
                button.addEventListener('click', function () {
                    changeResultSign()
                })
            } else if (button.id === '+' || button.id === '-' || button.id === '*' || button.id === '/') {
                button.addEventListener('click', function () {
                    highlightKey(button)
                })
            } else if (button.id === '=') {
                button.addEventListener('click', function () {
                    unHighlightKeys()
                })
            }
        }
    }

    document.addEventListener('keydown', function (event) {
        console.log(event)

        if (event.key === ',') {
            addPointToResult()
        } else if (event.key >= 0 && event.key <= 9) {
            addNumberToResult(event.key)
        } else if (event.key === 'Escape') {
            clearResult()
        } else if (event.key === 'Control') {
            changeResultSign()
        }
    })
}

function clearResult () {
    unHighlightKeys()
    document.getElementById('result').value = 0
}

function addPointToResult () {
    document.getElementById('result').value += ','
}

function addNumberToResult (number) {
    const result = document.getElementById('result')

    if (result.value[0] === '0' && result.value.length === 1) {
        result.value = number
    } else {
        result.value += number
    }
}

function changeResultSign () {
    const result = document.getElementById('result')

    result.value = result.value * -1
}

function highlightKey (button) {
    unHighlightKeys()
    button.classList.add('highlighted')
}

function unHighlightKeys () {
    const buttons = document.getElementsByClassName('button')

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('highlighted')) {
            buttons[i].classList.remove('highlighted')
        }
    }
}
