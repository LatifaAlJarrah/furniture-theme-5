/**
 * Product Page Management
 * Loads and displays product details based on URL parameters
 */

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Get product data (from shop-filters.js or local storage)
function getProductData(productId) {
    // Try to get from global shopProducts array first
    if (typeof window.shopProducts !== 'undefined' && window.shopProducts.length > 0) {
        const product = window.shopProducts.find(p => p.id === productId);
        if (product) return product;
    }

    // Fallback: Try to get from localStorage if available
    try {
        const storedProducts = JSON.parse(localStorage.getItem('shopProducts'));
        if (storedProducts && Array.isArray(storedProducts)) {
            return storedProducts.find(p => p.id === productId);
        }
    } catch (e) {
        console.error('Error loading products from localStorage:', e);
    }

    return null;
}

// Load product data from shop-filters.js
function loadProductData() {
    // Load shop-filters.js to get product data
    return new Promise((resolve) => {
        if (typeof window.shopProducts !== 'undefined') {
            resolve(window.shopProducts);
            return;
        }

        const script = document.createElement('script');
        script.src = './src/js/shop-filters.js';
        script.onload = () => {
            // Wait a bit for the script to execute
            setTimeout(() => {
                resolve(window.shopProducts || []);
            }, 100);
        };
        script.onerror = () => {
            console.error('Failed to load shop-filters.js');
            resolve([]);
        };
        document.head.appendChild(script);
    });
}

// Display product details
function displayProduct(product) {
    if (!product) {
        document.body.innerHTML = '<div class="text-center py-12"><h1 class="text-2xl mb-4">Product Not Found</h1><a href="./shop.html" class="text-primary hover:underline">Back to Shop</a></div>';
        return;
    }

    // Product Name
    document.getElementById('productName').textContent = product.name;

    // Product Description
    document.getElementById('productDescription').textContent = product.description || '';

    // Price
    const priceElement = document.getElementById('productPrice');
    const originalPriceElement = document.getElementById('productOriginalPrice');

    priceElement.textContent = `$${product.price.toFixed(2)}`;

    if (product.originalPrice && product.originalPrice > product.price) {
        originalPriceElement.textContent = `$${product.originalPrice.toFixed(2)}`;
        originalPriceElement.classList.remove('hidden');
    } else {
        originalPriceElement.classList.add('hidden');
    }

    // Measurements
    document.getElementById('productMeasurements').textContent = product.measurements || '';

    // SKU
    document.getElementById('productSKU').textContent = product.sku || '';

    // Category
    document.getElementById('productCategory').textContent = product.category || '';
    document.getElementById('breadcrumbCategory').textContent = product.category ? product.category.split(',')[0].toLowerCase() : 'chair';

    // Badges
    const badgesContainer = document.getElementById('productBadges');
    badgesContainer.innerHTML = '';

    if (product.isNew) {
        const newBadge = document.createElement('span');
        newBadge.className = 'bg-white text-black text-base font-bold px-3 py-1 rounded-[4px] inter-font';
        newBadge.textContent = 'NEW';
        badgesContainer.appendChild(newBadge);
    }

    if (product.onSale && product.originalPrice) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const saleBadge = document.createElement('span');
        saleBadge.className = 'bg-[#38CB89] text-white text-base font-bold px-3 py-1 rounded-[4px] inter-font';
        saleBadge.textContent = `-${discount}%`;
        badgesContainer.appendChild(saleBadge);
    }

    // Main Product Image
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = product.image || './src/assets/images/product-1.png';
    mainImage.alt = product.name;

    // Thumbnail Images
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = '';

    const images = product.images || [product.image];
    images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'mb-14 w-24 h-24 md:w-52 md:h-52 bg-[#0000000D] rounded-lg overflow-hidden border-2 border-transparent cursor-pointer hover:border-primary transition-colors';
        thumbnail.onclick = () => {
            mainImage.src = imgSrc;
            // Update active thumbnail
            thumbnailContainer.querySelectorAll('div').forEach(t => {
                t.classList.remove('border-primary');
                t.classList.add('border-transparent');
            });
            thumbnail.classList.remove('border-transparent');
            thumbnail.classList.add('border-primary');
        };

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${product.name} - View ${index + 1}`;
        img.className = 'w-full h-full object-cover';
        thumbnail.appendChild(img);
        thumbnailContainer.appendChild(thumbnail);
    });

    // Set first thumbnail as active
    if (thumbnailContainer.firstChild) {
        thumbnailContainer.firstChild.classList.remove('border-transparent');
        thumbnailContainer.firstChild.classList.add('border-primary');
    }

    // Color Variants
    const colorContainer = document.getElementById('colorVariants');
    const selectedColorName = document.getElementById('selectedColorName');
    colorContainer.innerHTML = '';

    if (product.colorVariants && product.colorVariants.length > 0) {
        selectedColorName.textContent = product.colorVariants[0].name;

        product.colorVariants.forEach((variant, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = `w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${index === 0 ? 'border-primary' : 'border-gray-300'
                }`;
            colorOption.onclick = () => {
                // Update selected color
                selectedColorName.textContent = variant.name;
                mainImage.src = variant.image;

                // Update active color variant
                colorContainer.querySelectorAll('div').forEach(c => {
                    c.classList.remove('border-primary');
                    c.classList.add('border-gray-300');
                });
                colorOption.classList.remove('border-gray-300');
                colorOption.classList.add('border-primary');
            };

            const colorImg = document.createElement('img');
            colorImg.src = variant.image;
            colorImg.alt = variant.name;
            colorImg.className = 'w-full h-full object-cover';
            colorOption.appendChild(colorImg);
            colorContainer.appendChild(colorOption);
        });
    }

    // Quantity Selector
    const quantityInput = document.getElementById('productQuantity');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');

    decreaseBtn.onclick = () => {
        const currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    };

    increaseBtn.onclick = () => {
        const currentValue = parseInt(quantityInput.value) || 1;
        quantityInput.value = currentValue + 1;
    };

    quantityInput.onchange = () => {
        const value = parseInt(quantityInput.value) || 1;
        if (value < 1) {
            quantityInput.value = 1;
        }
    };

    // Add to Cart Button
    const addToCartBtn = document.getElementById('addToCartBtn');
    addToCartBtn.onclick = () => {
        const quantity = parseInt(quantityInput.value) || 1;
        const selectedColor = product.colorVariants && product.colorVariants.length > 0
            ? product.colorVariants[0].name
            : product.fabricColor || 'Default';

        // Use the addToCartProduct function from cart.js
        if (typeof window.addToCartProduct === 'function') {
            for (let i = 0; i < quantity; i++) {
                window.addToCartProduct({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    color: selectedColor
                });
            }

            // Show success message
            alert(`${quantity} ${product.name} added to cart!`);
        } else {
            console.error('addToCartProduct function not found');
            alert('Unable to add to cart. Please try again.');
        }
    };
}

// Initialize product page
async function initializeProductPage() {
    const productId = getProductIdFromURL();

    if (!productId) {
        document.body.innerHTML = '<div class="text-center py-12"><h1 class="text-2xl mb-4">Invalid Product ID</h1><a href="./shop.html" class="text-primary hover:underline">Back to Shop</a></div>';
        return;
    }

    // Load product data
    await loadProductData();

    // Get product
    const product = getProductData(productId);

    // Display product
    displayProduct(product);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProductPage);
} else {
    initializeProductPage();
}
