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

    // Extract stable identifier based on overlay type
    function getStableIdentifier(overlayType) {
        const params = new URLSearchParams(window.location.search);

        switch(overlayType) {
            case 'chat':
                // Unique per channel
                return params.get('channel') || 'unknown';

            case 'valorant':
                // Unique per player (name + tag)
                const vName = params.get('name') || 'unknown';
                const vTag = params.get('tag') || 'unknown';
                return `${vName}#${vTag}`;

            case 'lol':
                // Unique per player (name + tag + region)
                const lName = params.get('name') || 'unknown';
                const lTag = params.get('tag') || 'unknown';
                const region = params.get('region') || 'unknown';
                return `${lName}#${lTag}@${region}`;

            case 'sub':
                // Unique per broadcaster
                const broadcasterId = params.get('broadcaster_id') || params.get('channel') || 'unknown';
                return broadcasterId;

            case 'spotify':
                // Spotify is per user - use access_token hash (first 16 chars for uniqueness)
                const token = params.get('access_token') || 'unknown';
                return token.substring(0, 16);

            default:
                return 'unknown';
        }
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
        const stableId = getStableIdentifier(overlayType);
        const hash = simpleHash(stableId + overlayType);

        // Check if we've already tracked this specific overlay (avoid double counting same overlay)
        const sessionKey = `gitviz_tracked_${hash}`;
        if (sessionStorage.getItem(sessionKey)) {
            return; // Already tracked this overlay in this session
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
                console.log(`[GitViz] Overlay tracked: ${overlayType} (${stableId})`);
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
