window.addEventListener('DOMContentLoaded', () => {

    // === MODAL === 
    const modal = document.querySelector('.modal')
    const modalCloseBtn = document.querySelector('.modal_close')
    const triggerModal = document.querySelector('#btn-get')

    const openModal = () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimer)
    }

    const closeModal = () => {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }


    triggerModal.addEventListener('click', openModal)
    modalCloseBtn.addEventListener('click', closeModal)


    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal()
    })
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') closeModal()
    })


    const modalTimer = setTimeout(openModal, 3000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal()
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll',showModalByScroll)

    // === / MODAL === 
})
