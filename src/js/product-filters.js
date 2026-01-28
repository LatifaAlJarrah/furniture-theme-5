// Product Filtering Functionality
// Handles filtering products by category in different sections

// Filter by Category Function - Called when clicking filter tabs
function filterByCategory(category, clickedBtn) {
    // Get filter tabs within the Best Selling section and product cards within productsGrid
    const bestSellingSection = clickedBtn.closest('section');
    if (!bestSellingSection) return;

    const allTabs = bestSellingSection.querySelectorAll('.filter-tab');
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    const allProducts = productsGrid.querySelectorAll('.product-card');

    // Update active tab styling within this section only
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Filter products
    allProducts.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            // Show product with animation
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            // Hide product
            product.style.display = 'none';
        }
    });
}

// Filter function for New Arrivals section
function filterNewArrivals(category, clickedBtn) {
    // Get filter tabs within the New Arrivals section and product cards within newArrivalsGrid
    const newArrivalsSection = clickedBtn.closest('section');
    if (!newArrivalsSection) return;

    const allTabs = newArrivalsSection.querySelectorAll('.filter-tab');
    const newArrivalsGrid = document.getElementById('newArrivalsGrid');
    if (!newArrivalsGrid) return;

    const allProducts = newArrivalsGrid.querySelectorAll('.product-card');

    // Update active tab styling within this section only
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Filter products
    allProducts.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            // Show product with animation
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            // Hide product
            product.style.display = 'none';
        }
    });
}

// Filter function for Featured Products section
function filterFeaturedProducts(category, clickedBtn) {
    // Get filter tabs within the Featured Products section and product cards within featuredProductsGrid
    const featuredProductsSection = clickedBtn.closest('section');
    if (!featuredProductsSection) return;

    const allTabs = featuredProductsSection.querySelectorAll('.filter-tab');
    const featuredProductsGrid = document.getElementById('featuredProductsGrid');
    if (!featuredProductsGrid) return;

    const allProducts = featuredProductsGrid.querySelectorAll('.product-card');

    // Update active tab styling within this section only
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }

    // Filter products
    allProducts.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            // Show product with animation
            product.style.display = 'block';
            product.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            // Hide product
            product.style.display = 'none';
        }
    });
}
