// === GMAIL BLOCK ===

const userGmail = document.querySelector('#gmail_input'),
    checkButton = document.querySelector('#gmail_button'),
    result = document.querySelector('#gmail_result');

const regExp = /^[a-zA-Z0-9._]+@gmail\.com$/

checkButton.addEventListener('click', (e) => {
    if (regExp.test(userGmail.value)) {
        result.innerHTML = 'OK'
        result.style.color = 'green'
    } else {
        result.innerHTML = 'NOT OK'
        result.style.color = 'red'
    }
})

// === / GMAIL BLOCK ===

// === MOVE BLOCK ===

const elem = document.querySelector('.child_block')

const moveElem = () => {
    let pos = 0

    const id = setInterval(frame, 10)
    function frame() {
        if (pos == 450) {
            elem.style.backgroundColor = 'green'
            clearInterval(id)
        } else {
            pos++
            elem.style.left = `${pos}px`
        }
    }
}

elem.addEventListener('click', moveElem)

// === / MOVE BLOCK ===
