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
                    showTabsContent(currentTab)
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
        element.oninput = async () => {
            try {
                const req = await fetch('../data/convertor.json')
                const data = await req.json()

                if (!req.ok) return null
                
                switch (type) {
                    case 'som': 
                        targetElement.value = (element.value / data.usd).toFixed(2)
                        moreTargetElement.value = (element.value / data.rub).toFixed(2)
                        break
                    case 'usd':
                        targetElement.value = (element.value * data.usd).toFixed(2)
                        moreTargetElement.value = (element.value * data.usdToRub).toFixed(2)
                        break
                    case 'rub':
                        targetElement.value = (element.value * data.rub).toFixed(2)
                        moreTargetElement.value = (element.value / data.usd).toFixed(2)
                        break
                }
    
                if (element.value === '') {
                    targetElement.value = ''
                    moreTargetElement.value = ''
                }
            } catch (e) {
                console.log(e)
            }
        }
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

    let count = 1

    btnNext.addEventListener('click', () => {
        if (count < 200) {
            count++
            cardSwitcherReq(count)
        } else {
            count = 1
            cardSwitcherReq(count)
        }
    })

    btnPrev.addEventListener('click', () => {
        if (count > 1) {
            count--
            cardSwitcherReq(count)
        } else {
            count = 200
            cardSwitcherReq(count)
        }
    })

    const cardSwitcherReq = async (count) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
            const data = await response.json()

            if (!response.ok) return null

            card.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `
        } catch (e) {
            console.log(e)
        }
    }

    cardSwitcherReq(count)

        // second part

     fetch('https://jsonplaceholder.typicode.com/posts')
         .then((response) => response.json())
         .then((data) => console.log(data))


    // === / CARD SWITCHER ===

    // === WEATHER ===

    const cityInput = document.querySelector('.cityName'),
        searchBtn = document.querySelector('#search-btn'),
        city = document.querySelector('.city')
        temp = document.querySelector('.temp')


    const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather'
    const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

    cityInput.oninput = async (event) => {
        try {
            const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()

            if (!response.ok) return null

            city.innerHTML = data?.name ? data.name : 'Город не существует!'
            temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273) + '&deg;C' : '...'
        } catch (e) {
            console.log(e)
        }

    }

    // === / WEATHER ===

})






