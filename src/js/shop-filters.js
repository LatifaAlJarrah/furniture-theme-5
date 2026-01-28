// Shop Filters and Product Management
// Handles filtering, sorting, and displaying products on the shop page

// Product data
const shopProducts = [
    { id: 1, name: 'Luna Curve Chair', price: 10.99, originalPrice: 14.99, rating: 4, image: './src/assets/images/product-1.png', category: 'chair', fabricColor: 'mint', material: 'wood', brand: 'gftima', size: '1-seater', onSale: true },
    { id: 2, name: 'Velvet Chester Chair', price: 14.99, originalPrice: null, rating: 5, image: './src/assets/images/product-2.png', category: 'chair', fabricColor: 'purple', material: 'metal', brand: 'nova', size: '2-seater', onSale: false },
    { id: 3, name: 'Roid Lounge Chair', price: 14.99, originalPrice: null, rating: 4, image: './src/assets/images/product-3.png', category: 'chair', fabricColor: 'orange', material: 'wood', brand: 'nessio', size: '1-seater', onSale: false },
    { id: 4, name: 'Modern Accent Chair', price: 299.99, originalPrice: null, rating: 5, image: './src/assets/images/product-1.png', category: 'chair', fabricColor: 'grey', material: 'mdf', brand: 'forms', size: '1-seater', onSale: false },
    { id: 5, name: 'Comfort Lounge Chair', price: 449.99, originalPrice: null, rating: 4, image: './src/assets/images/product-2.png', category: 'chair', fabricColor: 'pink', material: 'wood', brand: 'linea-sofa', size: '2-seater', onSale: false },
    { id: 6, name: 'Elegant Dining Chair', price: 199.99, originalPrice: null, rating: 5, image: './src/assets/images/product-3.png', category: 'chair', fabricColor: 'green', material: 'metal', brand: 'modura', size: '1-seater', onSale: false },
    { id: 7, name: 'Executive Office Chair', price: 599.99, originalPrice: null, rating: 4, image: './src/assets/images/product-1.png', category: 'chair', fabricColor: 'teal', material: 'cane', brand: 'gftima', size: '1-seater', onSale: false },
    { id: 8, name: 'Classic Armchair', price: 349.99, originalPrice: null, rating: 5, image: './src/assets/images/product-2.png', category: 'chair', fabricColor: 'baby-pink', material: 'wood', brand: 'nova', size: '2-seater', onSale: false },
    { id: 9, name: 'Contemporary Chair', price: 249.99, originalPrice: null, rating: 4, image: './src/assets/images/product-3.png', category: 'chair', fabricColor: 'mint', material: 'mdf', brand: 'nessio', size: '3-seater', onSale: false },
    { id: 10, name: 'Contemporary Chair', price: 249.99, originalPrice: null, rating: 4, image: './src/assets/images/product-3.png', category: 'chair', fabricColor: 'mint', material: 'mdf', brand: 'nessio', size: '3-seater', onSale: false },
    { id: 11, name: 'Contemporary Chair', price: 249.99, originalPrice: null, rating: 4, image: './src/assets/images/product-3.png', category: 'chair', fabricColor: 'mint', material: 'mdf', brand: 'nessio', size: '3-seater', onSale: false },
    { id: 12, name: 'Contemporary Chair', price: 249.99, originalPrice: null, rating: 4, image: './src/assets/images/product-3.png', category: 'chair', fabricColor: 'mint', material: 'mdf', brand: 'nessio', size: '3-seater', onSale: false },
    
];

// Current filters state
let currentFilters = {
    minPrice: null,
    maxPrice: null,
    fabricColors: [],
    materials: [],
    brands: [],
    size: null
};

// Current sort option
let currentSort = 'default';

// Initialize shop page
function initializeShopPage() {
    renderProducts(shopProducts);
    setupFilterListeners();
}

// Setup filter event listeners
function setupFilterListeners() {
    // Material checkboxes
    document.querySelectorAll('input[name="material"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    // Brand checkboxes
    document.querySelectorAll('input[name="brand"]').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });

    // Size radio buttons
    document.querySelectorAll('input[name="size"]').forEach(radio => {
        radio.addEventListener('change', handleFilterChange);
    });
}

// Toggle fabric color filter
function toggleFabricColor(colorValue, labelElement) {
    const colorIndex = currentFilters.fabricColors.indexOf(colorValue);
    const colorCircle = labelElement.querySelector('div');
    
    if (colorIndex > -1) {
        // Remove color from filters
        currentFilters.fabricColors.splice(colorIndex, 1);
        labelElement.classList.remove('bg-primary/10', 'border-primary');
        labelElement.classList.add('border-transparent');
        colorCircle.classList.remove('border-gray-800', 'ring-2', 'ring-gray-400');
        colorCircle.classList.add('border-transparent');
    } else {
        // Add color to filters
        currentFilters.fabricColors.push(colorValue);
        labelElement.classList.remove('border-transparent');
        labelElement.classList.add('bg-primary/10', 'border-primary');
        colorCircle.classList.remove('border-transparent');
        colorCircle.classList.add('border-gray-800', 'ring-2', 'ring-gray-400');
    }

    // Apply filters
    applyFilters();
}

// Handle filter changes
function handleFilterChange() {
    // Update current filters (excluding fabric colors which are handled by toggleFabricColor)
    currentFilters.materials = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(cb => cb.value);
    currentFilters.brands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(cb => cb.value);
    const selectedSize = document.querySelector('input[name="size"]:checked');
    currentFilters.size = selectedSize ? selectedSize.value : null;

    // Apply filters
    applyFilters();
}

// Apply price filter
function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || null;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || null;

    currentFilters.minPrice = minPrice;
    currentFilters.maxPrice = maxPrice;

    applyFilters();
}

// Clear all filters
function clearAllFilters() {
    // Clear price inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';

    // Clear checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);

    // Clear fabric color labels visual state
    document.querySelectorAll('.fabric-color-label').forEach(label => {
        label.classList.remove('bg-primary/10', 'border-primary');
        label.classList.add('border-transparent');
        const colorCircle = label.querySelector('div');
        colorCircle.classList.remove('border-gray-800', 'ring-2', 'ring-gray-400');
        colorCircle.classList.add('border-transparent');
    });

    // Reset filters
    currentFilters = {
        minPrice: null,
        maxPrice: null,
        fabricColors: [],
        materials: [],
        brands: [],
        size: null
    };

    // Reset sort
    currentSort = 'default';
    document.getElementById('sortSelect').value = 'default';

    // Re-render products
    applyFilters();
}

// Apply all filters
function applyFilters() {
    let filteredProducts = [...shopProducts];

    console.log('Applying filters:', currentFilters);
    console.log('Total products before filter:', filteredProducts.length);

    // Price filter
    if (currentFilters.minPrice !== null) {
        filteredProducts = filteredProducts.filter(p => p.price >= currentFilters.minPrice);
    }
    if (currentFilters.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(p => p.price <= currentFilters.maxPrice);
    }

    // Fabric color filter
    if (currentFilters.fabricColors.length > 0) {
        console.log('Filtering by fabric colors:', currentFilters.fabricColors);
        filteredProducts = filteredProducts.filter(p => {
            const matches = currentFilters.fabricColors.includes(p.fabricColor);
            console.log(`Product ${p.name} (${p.fabricColor}): ${matches ? 'MATCH' : 'NO MATCH'}`);
            return matches;
        });
        console.log('Products after fabric color filter:', filteredProducts.length);
    }

    // Material filter
    if (currentFilters.materials.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            currentFilters.materials.includes(p.material)
        );
    }

    // Brand filter
    if (currentFilters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            currentFilters.brands.includes(p.brand)
        );
    }

    // Size filter
    if (currentFilters.size) {
        filteredProducts = filteredProducts.filter(p => p.size === currentFilters.size);
    }

    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, currentSort);

    // Render filtered products
    renderProducts(filteredProducts);
}

// Sort products
function sortProducts(products, sortOption) {
    const sorted = [...products];

    switch (sortOption) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
}

// Handle sort change
function handleSortChange(sortOption) {
    currentSort = sortOption;
    applyFilters();
}

// Render products
function renderProducts(products) {
    const grid = document.getElementById('shopProductsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (products.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-lg text-secondary">No products found matching your filters.</p></div>';
        return;
    }

    products.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card group';
    card.setAttribute('data-product-id', product.id);

    const saleBadge = product.onSale ? `
        <span class="absolute top-4 left-4 bg-promo-red text-white text-xs font-bold px-3 py-1 rounded-full z-10">
            Sale ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
        </span>
    ` : '';

    const priceDisplay = product.originalPrice ? `
        <div class="flex items-center gap-2 mb-2">
            <span class="text-promo-red font-bold">$${product.price.toFixed(2)}</span>
            <span class="text-secondary text-sm line-through">$${product.originalPrice.toFixed(2)}</span>
        </div>
    ` : `
        <div class="flex items-center gap-2 mb-2">
            <span class="text-darkest font-bold">$${product.price.toFixed(2)}</span>
        </div>
    `;

    const stars = Array.from({ length: 5 }, (_, i) => {
        const filled = i < product.rating;
        return `
            <svg class="w-4 h-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
        `;
    }).join('');

    card.innerHTML = `
        <div class="relative bg-gray-50 rounded-2xl p-4 mb-4 overflow-hidden">
            ${saleBadge}
            <!-- Wishlist Button -->
            <button
                class="wishlist-btn absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 z-10"
                onclick="toggleWishlist(this, ${product.id})">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            <!-- Quick View Button -->
            <button
                class="absolute top-16 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
                onclick="quickViewProduct(${product.id})"
                title="Quick View">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </button>
            <!-- Product Image -->
            <img src="${product.image}" alt="${product.name}"
                class="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300">
        </div>
        <div class="flex items-start justify-between">
            <div>
                <h3 class="font-semibold text-[#1B232A] text-base mb-1">${product.name}</h3>
                ${priceDisplay}
                <!-- Star Rating -->
                <div class="flex items-center gap-1">
                    ${stars}
                </div>
            </div>
            <!-- Add to Cart Button -->
            <button
                class="add-to-cart-btn w-10 h-10 bg-surface rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
                onclick="addToCartProduct({id: ${product.id}, name: '${product.name}', price: ${product.price}})">
                <svg class="w-5 h-5 text-darkest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button>
        </div>
    `;

    return card;
}

// ---------- Quick View Modal ----------
let quickViewModalInitialized = false;

function ensureQuickViewModal() {
    if (quickViewModalInitialized) return;

    const modal = document.createElement('div');
    modal.id = 'quickViewModal';
    modal.className = 'quickview-modal hidden';
    modal.innerHTML = `
        <div class="quickview-backdrop" data-qv-close="true"></div>
        <div class="quickview-panel" role="dialog" aria-modal="true" aria-labelledby="quickViewTitle">
            <button type="button" class="quickview-close" aria-label="Close" data-qv-close="true">×</button>
            <div id="quickViewContent"></div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target?.getAttribute?.('data-qv-close') === 'true') {
            closeQuickView();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const el = document.getElementById('quickViewModal');
        if (el && !el.classList.contains('hidden')) closeQuickView();
    });

    quickViewModalInitialized = true;
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
}

function openQuickView(product) {
    ensureQuickViewModal();
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    if (!modal || !content) return;

    const sizes = Array.isArray(product.sizes) && product.sizes.length ? product.sizes : ['King', 'Full', 'Queen', 'Twin'];
    const colors = Array.isArray(product.colors) && product.colors.length
        ? product.colors
        : [
            { label: (product.fabricColor || 'Default'), value: (product.fabricColor || 'default'), image: product.image },
            { label: 'Alt', value: 'alt', image: './src/assets/images/product-2.png' },
        ];

    const defaultSize = sizes[0];
    const defaultColor = colors[0];

    const priceHtml = product.originalPrice
        ? `<div class="flex items-baseline gap-4 my-4">
                <span class="text-2xl md:text-3xl font-normal text-black">$${product.price.toFixed(2)}</span>
                <span class="text-xl font-medium text-[#52667A] line-through">$${product.originalPrice.toFixed(2)}</span>
           </div>`
        : `<div class="flex items-baseline gap-2">
                <span class="text-lg font-semibold text-[#1B232A]">$${product.price.toFixed(2)}</span>
           </div>`;

    content.innerHTML = `
        <div class="p-5">
            <h2 id="quickViewTitle" class="text-2xl md:text-3xl xl:text-4xl font-medium text-black mb-2">${product.name}</h2>
            ${priceHtml}

            <div class="h-px bg-[#E0E6EB] my-4"></div>

            <div class="mb-4">
                <p class="text-xl font-bold text-black mb-2">Chair Size</p>
                <div class="grid grid-cols-4 gap-2" id="qvSizeOptions">
                    ${sizes.map((s) => `<button type="button" class="qv-pill ${s === defaultSize ? 'active' : ''}" data-qv-size="${s}">${s}</button>`).join('')}
                </div>
            </div>

            <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                    <p class="text-sm font-semibold text-[#1B232A]">Choose Color</p>
                    <span class="text-xs text-secondary" id="qvColorLabel">${defaultColor.label}</span>
                </div>
                <div class="flex items-center gap-2" id="qvColorOptions">
                    ${colors.map((c) => `
                        <button type="button" class="qv-thumb ${c.value === defaultColor.value ? 'active' : ''}" data-qv-color="${c.value}" data-qv-color-label="${c.label}">
                            <img src="${c.image}" alt="${c.label}" class="w-full h-full object-contain bg-white" />
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="flex items-center gap-3 mb-3">
                <div class="qv-qty">
                    <button type="button" class="qv-qty-btn" data-qv-qty="minus">−</button>
                    <span class="qv-qty-value" id="qvQtyValue">1</span>
                    <button type="button" class="qv-qty-btn" data-qv-qty="plus">+</button>
                </div>
                <button type="button" class="qv-primary" id="qvAddToCart">ADD TO CART</button>
            </div>

            <button type="button" class="qv-secondary" id="qvPayNow">PAY NOW</button>
        </div>
    `;

    // State
    let qty = 1;

    const sizeWrap = content.querySelector('#qvSizeOptions');
    sizeWrap?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-qv-size]');
        if (!btn) return;
        sizeWrap.querySelectorAll('.qv-pill').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
    });

    const colorWrap = content.querySelector('#qvColorOptions');
    const colorLabel = content.querySelector('#qvColorLabel');
    colorWrap?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-qv-color]');
        if (!btn) return;
        const label = btn.getAttribute('data-qv-color-label') || '';
        if (colorLabel) colorLabel.textContent = label;
        colorWrap.querySelectorAll('.qv-thumb').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
    });

    const qtyValue = content.querySelector('#qvQtyValue');
    content.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-qv-qty]');
        if (!btn) return;
        const action = btn.getAttribute('data-qv-qty');
        if (action === 'minus') qty = Math.max(1, qty - 1);
        if (action === 'plus') qty += 1;
        if (qtyValue) qtyValue.textContent = String(qty);
    });

    const addBtn = content.querySelector('#qvAddToCart');
    addBtn?.addEventListener('click', () => {
        for (let i = 0; i < qty; i += 1) {
            addToCartProduct({ id: product.id, name: product.name, price: product.price });
        }
        if (typeof showNotification === 'function') {
            showNotification(`${product.name} added to cart (${qty})`, 'success');
        }
        closeQuickView();
    });

    const payBtn = content.querySelector('#qvPayNow');
    payBtn?.addEventListener('click', () => {
        if (typeof showNotification === 'function') {
            showNotification('Checkout flow coming soon!', 'info');
        }
    });

    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');
    modal.classList.add('open');
}

function quickViewProduct(productId) {
    const product = shopProducts.find(p => p.id === productId);
    if (!product) return;
    openQuickView(product);
}

// Toggle filter section (Accordion for mobile)
function toggleFilterSection(sectionId) {
    const content = document.querySelector(`.filter-content-${sectionId}`);
    const arrow = document.querySelector(`.filter-arrow-${sectionId}`);
    
    if (content && arrow) {
        content.classList.toggle('open');
        arrow.classList.toggle('rotate-180');
    }
}

// Make functions available globally
window.toggleFabricColor = toggleFabricColor;
window.handleSortChange = handleSortChange;
window.applyPriceFilter = applyPriceFilter;
window.clearAllFilters = clearAllFilters;
window.quickViewProduct = quickViewProduct;
window.toggleFilterSection = toggleFilterSection;
window.closeQuickView = closeQuickView;

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeShopPage);
} else {
    initializeShopPage();
}
