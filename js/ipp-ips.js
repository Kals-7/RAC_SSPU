document.addEventListener('DOMContentLoaded', function() {
    // Get all read more buttons
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    // Add click event to each button
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.profile-card');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle the active class on the card
            card.classList.toggle('active');
            
            // Update the aria-expanded attribute
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle the icon
            const icon = this.querySelector('i');
            if (isExpanded) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
        
        // Keyboard navigation
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            } else if (e.key === 'Escape') {
                const card = this.closest('.profile-card');
                if (card.classList.contains('active')) {
                    card.classList.remove('active');
                    this.setAttribute('aria-expanded', 'false');
                    const icon = this.querySelector('i');
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });
    
    // Add animation class to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each profile card
    document.querySelectorAll('.profile-card').forEach(card => {
        observer.observe(card);
    });
});
