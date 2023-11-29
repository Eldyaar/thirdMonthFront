window.addEventListener('DOMContentLoaded', () => {
    // === TABS ===
    const tabsContent = document.querySelectorAll('.tab_content_block')
    const tabs = document.querySelectorAll('.tab_content_item')
    const tabsParent = document.querySelector('.tab_content_items')


    const hideTabsContent = () => {
        tabsContent.forEach(tabContent => {
            tabContent.style.display = 'none'
        })
        tabs.forEach(tab => {
            tab.classList.remove('tab_content_item_active')
        })
    }

    const showTabsContent = (index = 0) => {
        tabsContent[index].style.display = 'block'
        tabs[index].classList.add('tab_content_item_active')
    }

    hideTabsContent()
    showTabsContent()

    tabsParent.addEventListener('click', (event) => {
        if (event.target.classList.contains('tab_content_item')) {
            tabs.forEach((tabElement, tabIndex) => {
                if (event.target === tabElement) {
                    hideTabsContent()
                    currentTab = tabIndex
                    showTabsContent(tabIndex)
                }
            })
        }
    })

    let currentTab = 0

    const nextTab = () => {
        currentTab = (currentTab + 1) % tabsContent.length
        hideTabsContent()
        showTabsContent(currentTab)
    }   

    const tabInterval = setInterval(nextTab, 3000)

    // === / TABS ===

     // === CONVERTOR ===

    const somInput = document.querySelector('#som')
    const usdInput = document.querySelector('#usd')
    const rubInput = document.querySelector('#rub')

    const convertor = (element, targetElement, moreTargetElement, type) => {
        element.addEventListener('input', () => {
            const req = new XMLHttpRequest()
            req.open('GET', '../data/convertor.json')
            req.setRequestHeader('Content-type', 'application/json')
            req.send()
            
            req.onload = () => {
                const changes = JSON.parse(req.response)

                switch (type) {
                    case 'som': 
                        targetElement.value = (element.value / changes.usd).toFixed(2)
                        moreTargetElement.value = (element.value / changes.rub).toFixed(2)
                        break
                    case 'usd':
                        targetElement.value = (element.value * changes.usd).toFixed(2)
                        moreTargetElement.value = (element.value * changes.usdToRub).toFixed(2)
                        break
                    case 'rub':
                        targetElement.value = (element.value * changes.rub).toFixed(2)
                        moreTargetElement.value = (element.value / changes.usd).toFixed(2)
                        break
                }

                if (element.value === '') {
                    targetElement.value = ''
                    moreTargetElement.value = ''
                }
            }
        })
    }

    convertor(somInput, usdInput, rubInput, 'som')
    convertor(usdInput, somInput, rubInput, 'usd')
    convertor(rubInput, somInput, usdInput, 'rub')

    // === / CONVERTOR ===

     // === CARD SWITCHER ===
        // first part
    const card = document.querySelector('.card'),
        btnPrev = document.querySelector('#btn-prev'),
        btnNext = document.querySelector('#btn-next')

    let count = 0
    btnNext.addEventListener('click', () => {
        count++
        cardSwitcherReq(count)
    })

    btnPrev.addEventListener('click', () => {
        count--
        cardSwitcherReq(count)
    })

    const cardSwitcherReq = (count) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${count}`)
            .then(response => response.json())
            .then(data => {
                if (count > data.length) {
                    count = 0
                } else if (count < 0) {
                    count = data.length
                }
                card.innerHTML = `
                    <h2>${data.title}</h2>
                    <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                    <span>${data.id}</span>
                `
            })
            .catch(error => console.log('error: ', error))
    }

    cardSwitcherReq(count)

        // second part

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => console.log(data))


    // === / CARD SWITCHER ===
})
