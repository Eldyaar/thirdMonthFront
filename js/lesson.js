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
})
