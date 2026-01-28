// Desktop Navigation Functionality
// Handles dropdown menus, currency, and language selection

// Categories Dropdown (Search bar)
function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    const arrow = document.getElementById('dropdownArrow');
    if (menu && arrow) {
        menu.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
}

function selectCategory(category) {
    const selectedCategory = document.getElementById('selectedCategory');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownArrow = document.getElementById('dropdownArrow');
    
    if (selectedCategory) {
        selectedCategory.textContent = category;
    }
    if (dropdownMenu) {
        dropdownMenu.classList.add('hidden');
    }
    if (dropdownArrow) {
        dropdownArrow.classList.remove('rotate-180');
    }
}

// Close search dropdown when clicking outside
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('categoriesDropdown');
    if (dropdown && !dropdown.contains(event.target)) {
        const dropdownMenu = document.getElementById('dropdownMenu');
        const dropdownArrow = document.getElementById('dropdownArrow');
        if (dropdownMenu) {
            dropdownMenu.classList.add('hidden');
        }
        if (dropdownArrow) {
            dropdownArrow.classList.remove('rotate-180');
        }
    }
});

// Navigation Dropdowns
let activeDropdown = null;

function toggleNavDropdown(dropdownId) {
    const menu = document.querySelector(`[data-menu="${dropdownId}"]`);
    const arrow = document.querySelector(`[data-arrow="${dropdownId}"]`);

    if (!menu || !arrow) return;

    // Close other dropdowns first
    if (activeDropdown && activeDropdown !== dropdownId) {
        closeNavDropdown(activeDropdown);
    }

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        arrow.classList.add('rotate-180');
        activeDropdown = dropdownId;
    } else {
        closeNavDropdown(dropdownId);
    }
}

function closeNavDropdown(dropdownId) {
    const menu = document.querySelector(`[data-menu="${dropdownId}"]`);
    const arrow = document.querySelector(`[data-arrow="${dropdownId}"]`);
    if (menu) {
        menu.classList.add('hidden');
    }
    if (arrow) {
        arrow.classList.remove('rotate-180');
    }
    if (activeDropdown === dropdownId) {
        activeDropdown = null;
    }
}

// Close nav dropdowns when clicking outside
document.addEventListener('click', function (event) {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    let clickedInside = false;

    dropdowns.forEach(dropdown => {
        if (dropdown.contains(event.target)) {
            clickedInside = true;
        }
    });

    if (!clickedInside && activeDropdown) {
        closeNavDropdown(activeDropdown);
    }
});

// Currency Selection
function selectCurrency(currency) {
    const selectedCurrency = document.getElementById('selectedCurrency');
    if (selectedCurrency) {
        selectedCurrency.textContent = currency;
    }
    closeNavDropdown('currency');
    // Here you would typically update prices across the site
    console.log(`Currency changed to: ${currency}`);
}

// Language Selection
function selectLanguage(langCode, countryCode) {
    const selectedLanguage = document.getElementById('selectedLanguage');
    if (selectedLanguage) {
        selectedLanguage.textContent = langCode;
    }
    
    // Update flag image
    const flagImg = document.querySelector('[data-dropdown="language"] button img');
    if (flagImg) {
        flagImg.src = `https://flagcdn.com/w20/${countryCode}.png`;
    }
    
    closeNavDropdown('language');
    // Here you would typically change the site language
    console.log(`Language changed to: ${langCode}`);
}
