let isScrolling = false;
let currentVelocity = 0;
let animationId = null;

document.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    currentVelocity += e.deltaY * 0.075; // Чувствительность скролла
    if (!isScrolling) {
        isScrolling = true;
        animateScroll();
    }
}, { passive: false });

function animateScroll() {
    currentVelocity *= 0.94; // Замедление (коэффициент трения)
    
    if (Math.abs(currentVelocity) < 0.01) {
        isScrolling = false;
        return; // Останавливаем анимацию, если скорость мала
    }
    
    window.scrollBy(0, currentVelocity);
    animationId = requestAnimationFrame(animateScroll);
}

// Остановка анимации при касании экрана/мыши
document.addEventListener('mousedown', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
        isScrolling = false;
        currentVelocity = 0;
    }
});