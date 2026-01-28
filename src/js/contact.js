/**
 * Contact Form Handler
 * Handles form submission and validation
 */

function handleContactSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    console.log('Contact form submitted:', formData);

    // Show success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    document.getElementById('contactForm').reset();
}

// Make function available globally
window.handleContactSubmit = handleContactSubmit;
