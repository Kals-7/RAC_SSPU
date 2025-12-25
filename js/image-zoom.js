// Initialize image zoom functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageZoomModal');
    const modalImg = modal.querySelector('img');
    const leaderPhotos = document.querySelectorAll('.leader-photo img');

    // Add click event to all leader photos
    leaderPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
});
