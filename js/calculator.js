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
}
