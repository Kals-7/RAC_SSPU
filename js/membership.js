document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabs = document.querySelectorAll('.subtab');
    const subsections = document.querySelectorAll('.subsection');
    const membershipForm = document.getElementById('membership-form');
    const interestSelect = document.getElementById('interest');
    const otherInterestContainer = document.getElementById('other-interest-container');
    const formMessage = document.getElementById('form-message');

    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and subsections
            tabs.forEach(t => t.classList.remove('selected'));
            subsections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding subsection
            tab.classList.add('selected');
            const target = tab.getAttribute('data-target');
            document.querySelector(`.subsection[data-subsection="${target}"]`).classList.add('active');
        });
    });

    // Show/hide other interest field
    if (interestSelect) {
        interestSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherInterestContainer.style.display = 'block';
                document.getElementById('other-interest').setAttribute('required', '');
            } else {
                otherInterestContainer.style.display = 'none';
                document.getElementById('other-interest').removeAttribute('required');
            }
        });
    }

    // Form submission handling
    if (membershipForm) {
        membershipForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            this.classList.add('form-submitting');
            
            // Hide any previous messages
            formMessage.style.display = 'none';
            
            try {
                const formData = new FormData(this);
                
                // If other interest is not shown, make sure it's not included in the form data
                if (otherInterestContainer.style.display !== 'block') {
                    formData.delete('other_interest');
                }

                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success message
                    showFormMessage('Thank you for your application! We will get back to you soon.', 'success');
                    this.reset();
                    
                    // Reset other interest field
                    otherInterestContainer.style.display = 'none';
                    document.getElementById('other-interest').removeAttribute('required');
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                showFormMessage('There was an error submitting your application. Please try again later.', 'error');
            } finally {
                // Reset form state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                this.classList.remove('form-submitting');
            }
        });
    }

    function showFormMessage(message, type = 'success') {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.style.display = 'none';
                formMessage.style.opacity = '1';
            }, 300);
        }, 10000);
    }
});
