/**
 * My Account page: tab navigation, order details view, pagination, password toggles
 */
(function () {
    'use strict';

    const ACTIVE_NAV_CLASS = 'bg-gray-100 border-[#266497]';
    const INACTIVE_NAV_CLASS = 'border-transparent';

    function init() {
        initTabNavigation();
        initOrderDetails();
        initPagination();
        initPasswordToggles();
        initProfileImageUpload();
        initDashboardLinks();
    }

    function initTabNavigation() {
        const navLinks = document.querySelectorAll('.account-nav[data-tab]');
        const panels = document.querySelectorAll('.account-panel');

        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var tab = link.getAttribute('data-tab');
                if (!tab) return;

                setActiveNav(link);
                showPanel(tab);
            });
        });
    }

    function setActiveNav(activeLink) {
        document.querySelectorAll('.account-nav[data-tab]').forEach(function (link) {
            link.classList.remove('bg-gray-100', 'border-[#266497]');
            link.classList.add('border-transparent');
        });
        if (activeLink && activeLink.hasAttribute('data-tab')) {
            activeLink.classList.remove('border-transparent');
            activeLink.classList.add('bg-gray-100', 'border-[#266497]');
        }
    }

    function showPanel(panelId) {
        var panel = document.getElementById('panel-' + panelId);
        if (!panel) return;

        document.querySelectorAll('.account-panel').forEach(function (p) {
            p.classList.add('hidden');
        });
        panel.classList.remove('hidden');
    }

    function initOrderDetails() {
        document.querySelectorAll('.view-order-details').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showPanel('order-details');
                var orderHistoryNav = document.querySelector('.account-nav[data-tab="order-history"]');
                if (orderHistoryNav) setActiveNav(orderHistoryNav);
            });
        });

        var backBtn = document.getElementById('backToOrderList');
        if (backBtn) {
            backBtn.addEventListener('click', function (e) {
                e.preventDefault();
                showPanel('order-history');
                setActiveNav(document.querySelector('.account-nav[data-tab="order-history"]'));
            });
        }

        document.querySelectorAll('a[data-tab="order-history"]').forEach(function (link) {
            if (link.classList.contains('account-nav')) return;
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showPanel('order-history');
                setActiveNav(document.querySelector('.account-nav[data-tab="order-history"]'));
            });
        });
    }

    function initPagination() {
        var currentPage = 1;
        var totalPages = 3;
        var pageBtns = document.querySelectorAll('.pagination-page');
        var prevBtn = document.querySelector('.pagination-prev');
        var nextBtn = document.querySelector('.pagination-next');

        function updatePaginationUI() {
            pageBtns.forEach(function (btn, index) {
                if (index + 1 === currentPage) {
                    btn.classList.add('bg-[#266497]', 'text-white');
                    btn.classList.remove('border', 'border-gray-300', 'text-gray-600');
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('bg-[#266497]', 'text-white', 'active');
                    btn.classList.add('border', 'border-gray-300', 'text-gray-600');
                }
            });
            if (prevBtn) prevBtn.disabled = currentPage <= 1;
            if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
        }

        pageBtns.forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                currentPage = index + 1;
                updatePaginationUI();
            });
        });
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                if (currentPage > 1) {
                    currentPage--;
                    updatePaginationUI();
                }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePaginationUI();
                }
            });
        }
        updatePaginationUI();
    }

    function initPasswordToggles() {
        document.querySelectorAll('.toggle-password').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var targetId = btn.getAttribute('data-target');
                var input = document.getElementById(targetId);
                if (!input) return;
                input.type = input.type === 'password' ? 'text' : 'password';
            });
        });
    }

    function initProfileImageUpload() {
        var chooseImageBtn = document.getElementById('chooseImageBtn');
        var fileInput = document.getElementById('profileImageInput');
        var imagePreview = document.getElementById('profileImagePreview');
        var imagePlaceholder = document.getElementById('profileImageContainer');

        if (!chooseImageBtn || !fileInput || !imagePreview || !imagePlaceholder) return;

        chooseImageBtn.addEventListener('click', function () {
            fileInput.click();
        });

        fileInput.addEventListener('change', function (e) {
            var file = e.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
            }

            var reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.src = event.target.result;
                imagePreview.classList.remove('hidden');
                var placeholder = document.getElementById('profileImagePlaceholder');
                if (placeholder) placeholder.classList.add('hidden');
            };
            reader.onerror = function () {
                alert('Error reading the image file.');
            };
            reader.readAsDataURL(file);
        });
    }

    function initDashboardLinks() {
        document.querySelectorAll('[data-action="go-to-settings"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                showPanel('settings');
                var settingsNav = document.querySelector('.account-nav[data-tab="settings"]');
                if (settingsNav) setActiveNav(settingsNav);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
