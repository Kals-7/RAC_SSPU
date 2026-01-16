document.addEventListener('DOMContentLoaded', function() {
    // Get all flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Add click event to each flip card
    flipCards.forEach(card => {
        // Click to flip
        card.addEventListener('click', function() {
            this.classList.toggle('is-flipped');
        });
        
        // Keyboard navigation
        card.addEventListener('keydown', function(e) {
            // Space or Enter to flip
            if (e.key === ' ' || e.key === 'Enter' || e.keyCode === 32 || e.keyCode === 13) {
                e.preventDefault();
                this.classList.toggle('is-flipped');
            }
            // Escape to unflip
            if (e.key === 'Escape' || e.keyCode === 27) {
                this.classList.remove('is-flipped');
            }
        });
        
        // Hover effect for non-touch devices
        if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('is-flipped')) {
                    this.classList.add('hover-effect');
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover-effect');
            });
        }
    });
    
    // Add animation class after a short delay to trigger the entrance animation
    setTimeout(() => {
        flipCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('animate-in');
        });
    }, 100);
});
