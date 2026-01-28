/**
 * Load shared components (header and footer) into pages
 * This allows us to maintain header and footer in one place
 */

async function loadComponent(componentPath, targetElementId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
            targetElement.innerHTML = html;
        } else {
            console.error(`Target element with id "${targetElementId}" not found`);
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Load header
    loadComponent('./src/components/header.html', 'header-placeholder');

    // Load footer
    loadComponent('./src/components/footer.html', 'footer-placeholder');
});
