// Cart Management
// Handles cart functionality, adding items, updating display

const CART_STORAGE_KEY = 'furniture_cart_v1';

function loadCartItems() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCartItems(items) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
        // ignore storage failures
    }
}

// Cart state (persisted)
let cartItems = loadCartItems();

function formatMoney(amount) {
    return `$${Number(amount || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function groupCartItems(items) {
    const map = new Map();
    items.forEach((it) => {
        const key = String(it.id);
        const existing = map.get(key);
        if (!existing) {
            map.set(key, { ...it, quantity: 1 });
        } else {
            existing.quantity += 1;
        }
    });
    return Array.from(map.values());
}

// Update Cart Display
function updateCartDisplay() {
    // keep in sync with persisted cart
    cartItems = loadCartItems();
    const total = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cartCount) {
        cartCount.textContent = cartItems.length;
    }
    if (cartTotal) {
        cartTotal.textContent = formatMoney(total);
    }
    
    // Update mobile cart display
    updateMobileCartDisplay();

    // If we're on the cart page, render it too
    renderCartPage();
}

// Update mobile cart count
function updateMobileCartDisplay() {
    const mobileCartCount = document.getElementById('mobileCartCount');
    if (mobileCartCount) {
        mobileCartCount.textContent = cartItems.length;
    }
}

// Add to Cart Function
function addToCart(product) {
    cartItems = loadCartItems();
    cartItems.push(product);
    saveCartItems(cartItems);
    updateCartDisplay();
    console.log(`Added ${product.name} to cart`);
}

// Add to Cart for Products
function addToCartProduct(product) {
    // Add one item per click (increase count every time)
    cartItems = loadCartItems();
    cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || './src/assets/images/product-1.png',
        color: product.color || '',
        originalPrice: product.originalPrice ?? null,
    });
    saveCartItems(cartItems);
    updateCartDisplay();
    if (typeof showNotification === 'function') {
        showNotification(`${product.name} added to cart!`, 'success');
    }
}

function removeCartItem(id) {
    cartItems = loadCartItems().filter((it) => String(it.id) !== String(id));
    saveCartItems(cartItems);
    updateCartDisplay();
}

function setCartItemQuantity(id, quantity) {
    const q = Math.max(1, Number(quantity) || 1);
    const current = loadCartItems().filter((it) => String(it.id) !== String(id));
    const sample = loadCartItems().find((it) => String(it.id) === String(id));
    if (!sample) {
        saveCartItems(current);
        updateCartDisplay();
        return;
    }
    const next = [...current];
    for (let i = 0; i < q; i += 1) next.push(sample);
    saveCartItems(next);
    updateCartDisplay();
}

function renderCartPage() {
    const tbody = document.getElementById('cartTableBody');
    const emptyState = document.getElementById('cartEmptyState');
    const totalEl = document.getElementById('cartPageTotal');
    const savedEl = document.getElementById('cartPageSaved');

    if (!tbody) return; // not on cart page

    const items = loadCartItems();
    const grouped = groupCartItems(items);

    // totals
    const total = grouped.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.quantity || 0), 0);
    const saved = grouped.reduce((sum, it) => {
        const op = it.originalPrice == null ? null : Number(it.originalPrice);
        if (!op) return sum;
        return sum + Math.max(0, op - (Number(it.price) || 0)) * (it.quantity || 0);
    }, 0);

    if (totalEl) totalEl.textContent = formatMoney(total);
    if (savedEl) savedEl.textContent = formatMoney(saved);

    if (grouped.length === 0) {
        tbody.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    if (emptyState) emptyState.classList.add('hidden');

    tbody.innerHTML = grouped
        .map((it) => {
            const img = it.image || './src/assets/images/product-1.png';
            const colorLine = it.color ? `<div class="text-xs text-secondary mt-1">Color: ${it.color}</div>` : '';
            const lineTotal = (Number(it.price) || 0) * (it.quantity || 0);
            return `
                <tr class="border-t border-[#ECEFF2]">
                    <td class="py-4">
                        <div class="flex items-center gap-4">
                            <div class="w-18 h-16 bg-[#0000000D] flex items-center justify-center overflow-hidden">
                                <img src="${img}" alt="${it.name}" class="w-12 h-12 object-cover" />
                            </div>
                            <div>
                                <div class="text-sm font-medium text-black">${it.name}</div>
                                ${colorLine}
                                <div class="text-sm font-medium text-[#2A5C86] mt-1">${formatMoney(it.price)}</div>
                            </div>
                        </div>
                    </td>
                    <td class="py-4 text-center">
                        <input
                            type="text"
                            min="1"
                            value="${it.quantity}"
                            class="w-14 h-9 border border-[#808080] text-center text-sm text-black font-medium"
                            onchange="setCartItemQuantity('${it.id}', this.value)"
                        />
                        <button class="block mx-auto mt-2 text-sm font-medium text-red-500 hover:text-darkest" onclick="removeCartItem('${it.id}')">Remove</button>
                    </td>
                    <td class="py-4 text-right text-sm font-medium text-black">${formatMoney(lineTotal)}</td>
                </tr>
            `;
        })
        .join('');
}

// expose for inline handlers
window.removeCartItem = removeCartItem;
window.setCartItemQuantity = setCartItemQuantity;

// Initialize cart display on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCartDisplay);
} else {
    updateCartDisplay();
}
