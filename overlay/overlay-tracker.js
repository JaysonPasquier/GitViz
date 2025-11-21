// GitViz Overlay Usage Tracker
// This script tracks overlay usage for analytics (privacy-friendly)
(() => {
    const TRACKER_URL = 'https://gitviz-overlay-tracker.jaysonpasquier-contact.workers.dev/track';

    // Determine overlay type from URL path
    function getOverlayType() {
        const path = window.location.pathname;
        if (path.includes('/chat/')) return 'chat';
        if (path.includes('/valorant/')) return 'valorant';
        if (path.includes('/sub/')) return 'sub';
        if (path.includes('/spotify/')) return 'spotify';
        if (path.includes('/lol/')) return 'lol';
        return 'unknown';
    }

    // Simple hash function for privacy (doesn't expose actual data)
    function simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36);
    }

    // Check if overlay has URL parameters (meaning it's actually being used)
    function hasActiveParams() {
        const params = new URLSearchParams(window.location.search);
        // Check if there are any non-preview params
        return params.toString().length > 0 && !window.location.pathname.includes('preview');
    }

    // Track overlay usage
    function trackOverlay() {
        // Only track if overlay has parameters (active usage)
        if (!hasActiveParams()) {
            return;
        }

        const overlayType = getOverlayType();
        const urlParams = window.location.search;
        const hash = simpleHash(urlParams + overlayType + Date.now());

        // Check if we've already tracked this session (avoid double counting)
        const sessionKey = `gitviz_tracked_${overlayType}`;
        if (sessionStorage.getItem(sessionKey)) {
            return; // Already tracked in this session
        }

        // Send tracking data
        fetch(TRACKER_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: overlayType,
                hash: hash,
                timestamp: Date.now()
            })
        })
        .then(response => {
            if (response.ok) {
                // Mark as tracked for this session
                sessionStorage.setItem(sessionKey, 'true');
                console.log(`[GitViz] Overlay tracked: ${overlayType}`);
            }
        })
        .catch(error => {
            // Silently fail - tracking shouldn't break the overlay
            console.debug('[GitViz] Tracking error:', error);
        });
    }

    // Track when overlay loads and is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackOverlay);
    } else {
        trackOverlay();
    }
})();
