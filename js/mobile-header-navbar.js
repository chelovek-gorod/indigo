'use strict'

useMobileNavbar()

function useMobileNavbar() {
    let isMobileSize = window.innerWidth <= 640
    let isNavbarVisible = false

    window.addEventListener('resize', handleScreenResize)

    const headerNavbar = document.querySelector('.header-navbar')
    headerNavbar.onclick = hideMobileNavbar

    const headerNavbarMobileButton = document.querySelector('.header-navbar-mobile-button')
    headerNavbarMobileButton.onclick = showMobileNavbar

    function hideMobileNavbar() {
        headerNavbar.style.display = 'none'
        isNavbarVisible = false
    }

    function showMobileNavbar() {
        if (isMobileSize) {
            headerNavbar.style.display = 'flex'
            isNavbarVisible = true
        }
        else {
            headerNavbar.style.display = 'block'
            isNavbarVisible = false
        }
    }

    function handleScreenResize() {
        isMobileSize = window.innerWidth <= 640
        if (!isMobileSize) showMobileNavbar()
        else hideMobileNavbar()
    }
}

