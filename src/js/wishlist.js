// Wishlist Management
// Handles wishlist functionality and display

// Wishlist state
let wishlistItems = [];
let wishlistState = {};

// Update Wishlist Display
function updateWishlistDisplay() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlistItems.length;
    }
}

// Add to Wishlist Function
function addToWishlist(product) {
    wishlistItems.push(product);
    updateWishlistDisplay();
    console.log(`Added ${product.name} to wishlist`);
}

// Wishlist Toggle Function
function toggleWishlist(button, productId) {
    const svg = button.querySelector('svg');

    if (wishlistState[productId]) {
        // Remove from wishlist
        wishlistState[productId] = false;
        svg.setAttribute('fill', 'none');
        button.classList.remove('bg-promo-red', 'text-white');
        button.classList.add('bg-white');

        // Remove from wishlist array
        const index = wishlistItems.findIndex(item => item.id === productId);
        if (index > -1) {
            wishlistItems.splice(index, 1);
        }
    } else {
        // Add to wishlist
        wishlistState[productId] = true;
        svg.setAttribute('fill', 'currentColor');
        button.classList.add('bg-promo-red', 'text-white');
        button.classList.remove('bg-white');

        // Add to wishlist array
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        wishlistItems.push({ id: productId, name: productName });
    }

    updateWishlistDisplay();
}

// Initialize wishlist display on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWishlistDisplay);
} else {
    updateWishlistDisplay();
}
