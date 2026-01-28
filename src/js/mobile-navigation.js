// Mobile Navigation Functionality
// Handles mobile menu toggle, dropdowns, and mobile-specific navigation

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');

    if (mobileMenu && menuIcon && closeIcon) {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
        
        // Prevent body scroll when menu is open
        if (!mobileMenu.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close Mobile Menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');

    if (mobileMenu && menuIcon && closeIcon) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Toggle Mobile Navigation Dropdown
function toggleMobileNavDropdown(dropdownId) {
    const menu = document.querySelector(`[data-mobile-menu="${dropdownId}"]`);
    const arrow = document.querySelector(`[data-arrow="mobile-${dropdownId}"]`);

    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

// Mobile Categories Dropdown Functions
function toggleMobileDropdown() {
    const mobileDropdown = document.getElementById('mobileDropdownMenu');
    if (mobileDropdown) {
        mobileDropdown.classList.toggle('hidden');
    }
}

function selectMobileCategory(category) {
    const mobileSelectedCategory = document.getElementById('mobileSelectedCategory');
    const mobileDropdown = document.getElementById('mobileDropdownMenu');
    
    if (mobileSelectedCategory) {
        mobileSelectedCategory.textContent = category;
    }
    
    if (mobileDropdown) {
        mobileDropdown.classList.add('hidden');
    }
    
    // Sync with desktop category if it exists
    const desktopSelectedCategory = document.getElementById('selectedCategory');
    if (desktopSelectedCategory) {
        desktopSelectedCategory.textContent = category;
    }
    
    // You can add filtering logic here
    console.log('Mobile category selected:', category);
}

// Select Mobile Currency
function selectMobileCurrency(currency) {
    const mobileSelectedCurrency = document.getElementById('mobileSelectedCurrency');
    const desktopSelectedCurrency = document.getElementById('selectedCurrency');
    
    if (mobileSelectedCurrency) {
        mobileSelectedCurrency.textContent = currency;
    }
    if (desktopSelectedCurrency) {
        desktopSelectedCurrency.textContent = currency;
    }
    
    // Close mobile dropdown
    const menu = document.querySelector(`[data-mobile-menu="currency-mobile"]`);
    if (menu) {
        menu.classList.add('hidden');
    }
    
    console.log(`Currency changed to: ${currency}`);
}

// Select Mobile Language
function selectMobileLanguage(langCode, countryCode) {
    const mobileSelectedLanguage = document.getElementById('mobileSelectedLanguage');
    const desktopSelectedLanguage = document.getElementById('selectedLanguage');
    
    if (mobileSelectedLanguage) {
        mobileSelectedLanguage.textContent = langCode;
    }
    if (desktopSelectedLanguage) {
        desktopSelectedLanguage.textContent = langCode;
    }
    
    // Update flag image in desktop
    const flagImg = document.querySelector('[data-dropdown="language"] button img');
    if (flagImg) {
        flagImg.src = `https://flagcdn.com/w20/${countryCode}.png`;
    }
    
    // Close mobile dropdown
    const menu = document.querySelector(`[data-mobile-menu="language-mobile"]`);
    if (menu) {
        menu.classList.add('hidden');
    }
    
    console.log(`Language changed to: ${langCode}`);
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = event.target.closest('[onclick="toggleMobileMenu()"]');
    const isMenuOpen = mobileMenu && !mobileMenu.classList.contains('hidden');
    
    if (isMenuOpen && !mobileMenu.contains(event.target) && !menuButton) {
        closeMobileMenu();
    }
});

// Close mobile dropdown when clicking outside
document.addEventListener('click', function(event) {
    const mobileDropdown = document.getElementById('mobileDropdownMenu');
    const mobileCategoriesBtn = document.getElementById('mobileCategoriesBtn');
    
    if (mobileDropdown && mobileCategoriesBtn) {
        const isClickInside = mobileCategoriesBtn.contains(event.target) || mobileDropdown.contains(event.target);
        if (!isClickInside && !mobileDropdown.classList.contains('hidden')) {
            mobileDropdown.classList.add('hidden');
        }
    }
});
