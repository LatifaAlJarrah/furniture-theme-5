// Newsletter Subscription
// Handles newsletter subscription form submission

// Newsletter Subscription Handler
function handleSubscribe(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (email) {
        // Here you would typically send the email to your backend/email service
        console.log('Subscribed email:', email);
        
        // Show success notification
        if (typeof showNotification === 'function') {
            showNotification('Thank you for subscribing! Check your email for your 10% OFF discount code.', 'success');
        }
        
        emailInput.value = '';
    }
}
