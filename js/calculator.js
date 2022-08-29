function loadCalculator () {
    const buttons = document.getElementsByClassName('button')

    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('highlighted')) {
            buttons[i].classList.remove('highlighted')
        }
        if (buttons[i].classList.contains('disabled')) {
            buttons[i].classList.remove('disabled')
        }
    }

    document.getElementById('result').value = 0
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
                    result.value += ','
                })
            } else {
                button.addEventListener('click', function () {
                    if (result.value[0] === '0' && result.value.length === 1) {
                        result.value = button.id
                    } else {
                        result.value += button.id
                    }
                })
            }
        } else if (button.classList.contains('operator')) {
            if (button.id === 'C') {
                button.addEventListener('click', function () {
                    result.value = 0
                })
            } else if (button.id === '+/-') {
                button.addEventListener('click', function () {
                    result.value = result.value * -1
                })
            } else if (button.id === '+' || button.id === '-' || button.id === '*' || button.id === '/') {
                button.addEventListener('click', function () {
                    highlight(button)
                })
            }
        }
    }

    function highlight (button) {
        const buttons = document.getElementsByClassName('button')

        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains('highlighted')) {
                buttons[i].classList.remove('highlighted')
            }
        }
        button.classList.add('highlighted')
    }
}
