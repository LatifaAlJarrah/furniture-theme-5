// Search Functionality
// Handles search functionality for both desktop and mobile

// Desktop Search Functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const selectedCategory = document.getElementById('selectedCategory');
    
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.trim();
    const category = selectedCategory ? selectedCategory.textContent : 'All Categories';

    if (searchTerm) {
        console.log(`Searching for "${searchTerm}" in ${category}`);
        // Add your search logic here
        // You can redirect to search results page or filter products
    }
}

function handleSearchKeypress(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

// Mobile Search Functions
function handleMobileSearchKeypress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        performMobileSearch();
    }
}

function performMobileSearch() {
    const searchInput = document.getElementById('mobileSearchInput');
    const mobileSelectedCategory = document.getElementById('mobileSelectedCategory');
    
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    const category = mobileSelectedCategory ? mobileSelectedCategory.textContent : 'All Categories';
    
    if (query) {
        // Perform search - you can customize this
        console.log('Mobile Search:', { query, category });
        // Close mobile menu after search
        if (typeof closeMobileMenu === 'function') {
            closeMobileMenu();
        }
        // You can redirect or filter products here
    } else {
        // If no query, just filter by category
        if (category && category !== 'All Categories') {
            console.log('Filter by category:', category);
            // You can add category filtering logic here
        }
    }
}
