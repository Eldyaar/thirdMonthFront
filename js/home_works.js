window.addEventListener('DOMContentLoaded', () => {

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
    let posX = 0
    let posY = 0

    const moveElem = () => {
        if (posX < 448 && posY == 0) {
            posX += 1
            elem.style.left = `${posX}px`
            setTimeout(moveElem, 5)
        } else if (posX >= 448 && posY < 448) {
            posY += 1
            elem.style.top = `${posY}px`
            setTimeout(moveElem, 5)
        } else if (posX > 0 && posY >= 0) {
            posX -= 1
            elem.style.left = `${posX}px`
            setTimeout(moveElem, 5)
        } else if (posX == 0 && posY >= 0) {
            posY -= 1
            elem.style.top = `${posY}px`
            setTimeout(moveElem, 5)
        }
    }

    moveElem()

    // === / MOVE BLOCK ===

    // === STOPWATCH ===
    
    const startBtn = document.querySelector('#start'),
          stopBtn = document.querySelector('#stop'),
          resetBtn = document.querySelector('#reset'),
          minBlock = document.querySelector('#minutesS'),
          secBlock = document.querySelector('#secondsS'),
          mlSecBlock = document.querySelector('#ml-secondsS')

    let min = 0,
        sec = 0,
        mlSec = 0,
        interval

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    const startTime = () => {
        mlSec++
        mlSecBlock.innerHTML = getZero(mlSec) 
        
        if (mlSec > 99) {
            sec++
            secBlock.innerHTML = getZero(sec)
            mlSec = 0
        }

        if (sec > 59) {
            min++
            minBlock.innerHTML = getZero(min)
            sec = 0
        }
    }

    startBtn.addEventListener('click', () => {
        clearInterval(interval)
        interval = setInterval(startTime, 10)
    })

    stopBtn.addEventListener('click', () => {
        clearInterval(interval)
    })

    resetBtn.addEventListener('click', () => {
        clearInterval(interval)
        min = 0
        sec = 0
        mlSec = 0

        minBlock.innerHTML = '00'
        secBlock.innerHTML = '00'
        mlSecBlock.innerHTML = '00'
    })


    // === / STOPWATCH ===


})
