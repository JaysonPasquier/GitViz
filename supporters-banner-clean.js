// Clean Infinite Scrolling Supporters Banner
// Fetches supporters from Ko-fi API and displays them in a seamless infinite scroll

(function() {
    'use strict';

    const API_URL = 'https://kofi-supporters.jaysonpasquier-contact.workers.dev/supporters';
    const SCROLL_SPEED = 50; // pixels per second
    const MIN_DURATION = 20; // minimum animation duration in seconds

    // Format currency with symbol
    function formatCurrency(amount, currency) {
        const symbolMap = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'CAD': 'C$',
            'AUD': 'A$',
            'JPY': '¥',
            'CNY': '¥',
            'CHF': 'CHF ',
            'SEK': 'kr ',
            'NOK': 'kr ',
            'DKK': 'kr ',
            'PLN': 'zł ',
            'BRL': 'R$ ',
            'MXN': '$ ',
            'INR': '₹ ',
            'KRW': '₩ ',
            'SGD': 'S$ ',
            'HKD': 'HK$ ',
            'NZD': 'NZ$ '
        };
        const symbol = symbolMap[currency] || currency + ' ';
        return symbol + parseFloat(amount).toFixed(2) + ' ' + currency;
    }

    // Format supporter item
    function formatSupporter(supporter) {
        const name = supporter.name || 'Anonymous';
        const amount = supporter.amount || '0.00';
        const currency = supporter.currency || 'USD';
        return `${name} — ${formatCurrency(amount, currency)} ☕`;
    }

    // Create banner content
    function createBannerContent(supporters) {
        let items = [];

        if (!supporters || supporters.length === 0) {
            items = ['☕ Vous pouvez faire un petit don sur Ko-fi pour soutenir le projet !'];
        } else {
            items = supporters.map(formatSupporter);
        }

        // Ensure we have enough items for smooth scrolling
        // Repeat items to fill the banner adequately
        const minItems = 3;
        while (items.length < minItems) {
            items = [...items, ...items];
        }

        return items;
    }

    // Initialize banner
    function initBanner(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const scrollContainer = container.querySelector('.supporters-scroll-container');
        const scroll1 = container.querySelector('.supporters-scroll-1');
        const scroll2 = container.querySelector('.supporters-scroll-2');

        if (!scrollContainer || !scroll1 || !scroll2) return;

        // Fetch supporters
        fetch(API_URL, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
        })
        .then(supporters => {
            const items = createBannerContent(supporters);
            const content = items.join(' • ');

            // Duplicate content for seamless infinite scroll (left-to-right)
            const duplicatedContent = content + ' • ' + content;

            scroll1.textContent = duplicatedContent;
            scroll2.textContent = duplicatedContent;

            requestAnimationFrame(() => {
                const width = scroll1.scrollWidth || scroll1.offsetWidth;
                const duration = Math.max(width / SCROLL_SPEED, MIN_DURATION);
                // Use CSS variable for consistency
                scroll1.style.setProperty('--duration', `${duration}s`);
                scroll2.style.setProperty('--duration', `${duration}s`);
                // Second stream offset for seamless loop
                scroll2.style.animationDelay = `-${duration / 2}s`;
                container.style.display = 'block';
            });
        })
        .catch(error => {
            console.warn('Supporters banner: Failed to load', error);
            // Show fallback message
            const fallback = '☕ Vous pouvez faire un petit don sur Ko-fi pour soutenir le projet !';
            const duplicatedFallback = fallback + ' • ' + fallback;
            scroll1.textContent = duplicatedFallback;
            scroll2.textContent = duplicatedFallback;

            requestAnimationFrame(() => {
                const width = scroll1.scrollWidth || scroll1.offsetWidth;
                const duration = Math.max(width / SCROLL_SPEED, MIN_DURATION);
                scroll1.style.setProperty('--duration', `${duration}s`);
                scroll2.style.setProperty('--duration', `${duration}s`);
                scroll2.style.animationDelay = `-${duration / 2}s`;
                container.style.display = 'block';
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initBanner('supportersBannerTop');
            initBanner('supportersBannerBottom');
        });
    } else {
        initBanner('supportersBannerTop');
        initBanner('supportersBannerBottom');
    }

    // Refresh every hour
    setInterval(() => {
        initBanner('supportersBannerTop');
        initBanner('supportersBannerBottom');
    }, 3600000);

})();

