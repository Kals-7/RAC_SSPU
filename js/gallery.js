document.addEventListener('DOMContentLoaded', function() {
    // Initialize all gallery cards
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    galleryCards.forEach(card => {
        const images = card.querySelectorAll('.gallery-image');
        const prevBtn = card.querySelector('.prev-btn');
        const nextBtn = card.querySelector('.next-btn');
        const counter = card.querySelector('.image-counter');
        const totalImages = images.length;
        let currentIndex = 0;
        
        // Update the counter
        function updateCounter() {
            counter.textContent = `${currentIndex + 1}/${totalImages}`;
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === totalImages - 1;
            
            // Update active image
            images.forEach((img, index) => {
                if (index === currentIndex) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        }
        
        // Navigation functions
        function goToNext() {
            if (currentIndex < totalImages - 1) {
                currentIndex++;
                updateCounter();
            }
        }
        
        function goToPrev() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCounter();
            }
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', goToNext);
        if (prevBtn) prevBtn.addEventListener('click', goToPrev);
        
        // Keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                goToPrev();
            }
        });
        
        // Swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        card.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        card.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum distance to consider as a swipe
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - go to next
                goToNext();
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - go to previous
                goToPrev();
            }
        }
        
        // Initialize the first image and counter
        updateCounter();
    });
});
