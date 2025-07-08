'use strict'

useMainSlider()

function useMainSlider() {
    const mainSlider = document.querySelector('.main-slider')
    if (!mainSlider) return

    const sliderContainer = document.querySelector('.slides')
    if (!sliderContainer) return

    const slides = sliderContainer.querySelectorAll('.slide')
    if (!slides || slides.length < 1) return

    const slidesArr = Array.from(slides)
    const lastSlideIndex = slidesArr.length - 1
    slidesArr.forEach( (slide, index) => slide.style.zIndex = lastSlideIndex - index )

    const previousButton = mainSlider.querySelector('.previous')
    const nextButton = mainSlider.querySelector('.next')

    // clear controllers if only one slide
    if (slidesArr.length < 2) {
        previousButton.remove()
        nextButton.remove()
        return
    }

    previousButton.onclick = previousSlide
    nextButton.onclick = nextSlide

    let currentSlideIndex = 0
    let nextSlideIndex = 1

    const slideDelay = parseInt(mainSlider.dataset.slideDelay, 10)
    const slideChangeTimeout = 1200 // slider.css [.main-slider .slide {transition}]
    let nextSlideTimeout = setTimeout(nextSlide, slideDelay)
    let isSlideOnchange = false

    

    const controllerDiv = mainSlider.querySelector('.controller')
    const sliderPoints = []
    for(let i = lastSlideIndex; i >= 0; i--) createSliderPoint(i)

    previousButton.style.zIndex = slidesArr.length
    nextButton.style.zIndex = slidesArr.length
    controllerDiv.style.zIndex = slidesArr.length

    function createSliderPoint(index) {
        const point = document.createElement('span')
        point.dataset.index = index
        point.onclick = () => switchSlide(index)
        if (index === currentSlideIndex) point.classList.add('active')
        controllerDiv.prepend(point)
        sliderPoints.unshift(point)
    }

    function updateSliderPoints(activeIndex) {
        sliderPoints.forEach( (point, index) => {
            if (index === activeIndex) point.classList.add('active')
            else point.classList.remove('active')
        })
    }

    function previousSlide() {
        if (isSlideOnchange) return

        clearTimeout(nextSlideTimeout)
        isSlideOnchange = true

        nextSlideIndex = currentSlideIndex - 1
        if (nextSlideIndex < 0) nextSlideIndex = lastSlideIndex

        slidesArr[nextSlideIndex].classList.add('jump-to-left')
        updateSliderPoints(nextSlideIndex)

        nextSlideTimeout = setTimeout(runPreviousSlide, 0)
    }
    function runPreviousSlide() {
        sortSlides(nextSlideIndex)
        slides[nextSlideIndex].classList.remove('jump-to-left')
        currentSlideIndex = nextSlideIndex
        clearTimeout(nextSlideTimeout)
        nextSlideTimeout = setTimeout(donePreviousSlide, slideChangeTimeout)
    }
    function donePreviousSlide() {
        isSlideOnchange = false
        clearTimeout(nextSlideTimeout)
        nextSlideTimeout = setTimeout(nextSlide, slideDelay)
    }

    function nextSlide() {
        if (isSlideOnchange) return

        clearTimeout(nextSlideTimeout)
        isSlideOnchange = true

        slides[currentSlideIndex].classList.add('smooth-move-to-left')

        nextSlideIndex = currentSlideIndex + 1
        if (nextSlideIndex > lastSlideIndex) nextSlideIndex = 0

        updateSliderPoints(nextSlideIndex)

        nextSlideTimeout = setTimeout(replaceSlidesByNext, slideChangeTimeout)
    }
    function replaceSlidesByNext() {
        sortSlides(nextSlideIndex)
        
        slidesArr[currentSlideIndex].classList.remove('smooth-move-to-left')
        currentSlideIndex = nextSlideIndex

        clearTimeout(nextSlideTimeout)
        isSlideOnchange = false

        nextSlideTimeout = setTimeout(nextSlide, slideDelay)
    }

    function sortSlides(indexToTop) {
        let changedIndex = indexToTop
        for(let zIndex = lastSlideIndex; zIndex >= 0; zIndex--) {
            slidesArr[changedIndex].style.zIndex = zIndex
            changedIndex++
            if(changedIndex > lastSlideIndex) changedIndex = 0
        }
    }

    function switchSlide(index) {
        if (isSlideOnchange) return

        console.log(index)

        currentSlideIndex = index
        updateSliderPoints(index)
        sortSlides(index)
    }
}