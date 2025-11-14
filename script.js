// GitVize – URL Builder & Editor
(() => {
    const $ = (sel, ctx=document) => ctx.querySelector(sel);
    const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

    // Template definitions and expected params
    const TEMPLATES = {
        chat: {
            label: 'Chat',
            path: 'overlay/chat/chat-widget.html',
            params: [
                { key: 'channel', label: 'Canal Twitch', type: 'text', placeholder: 'ex: streamer_channel', required: true },
                { key: 'twitch_client_id', label: 'Twitch Client ID', type: 'text', placeholder: 'Votre Client ID Twitch', required: true },
                { key: 'twitch_auth_token', label: 'Twitch Auth Token', type: 'text', placeholder: 'Votre Token d\'authentification', required: true },
                { key: 'broadcaster_id', label: 'Broadcaster ID', type: 'text', placeholder: 'Votre ID de diffuseur', required: true },
                { key: 'font', label: 'Police', type: 'select', options: [
                    'Arial', 'Roboto', 'Montserrat', 'Open Sans', 'Poppins', 'Inter', 'Lato', 'Raleway',
                    'Oswald', 'Playfair Display', 'Merriweather', 'Ubuntu', 'Nunito', 'Source Sans Pro',
                    'Crimson Text', 'Libre Baskerville', 'PT Sans', 'PT Serif', 'Dancing Script', 'Pacifico',
                    'Bebas Neue', 'Anton', 'Fjalla One', 'Righteous', 'Bangers', 'Fredoka One',
                    'Comfortaa', 'Quicksand', 'Rubik', 'Work Sans', 'Space Grotesk', 'DM Sans',
                    'Manrope', 'Sora', 'Outfit', 'Plus Jakarta Sans', 'Figtree', 'Geist',
                    'JetBrains Mono', 'Fira Code', 'Courier New', 'Georgia', 'Times New Roman',
                    'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Arial Black'
                ], default: 'Arial' },
                { key: 'moderators', label: 'Modérateurs (optionnel)', type: 'text', placeholder: 'user1,user2,user3' },
                { key: 'vips', label: 'VIPs (optionnel)', type: 'text', placeholder: 'user1,user2' },
            ]
        },
        valorant: {
            label: 'Valorant',
            path: 'overlay/valorant/rang/rank-widget.html',
            params: [
                { key: 'name', label: 'Nom du joueur', type: 'text', placeholder: 'ex: ANAKINSKYWALKER', required: true },
                { key: 'tag', label: 'Tag du joueur', type: 'text', placeholder: 'ex: HARR', required: true },
                { key: 'api_key', label: 'Clé API', type: 'text', placeholder: 'Obtenez-la sur Discord', required: true },
                { key: 'region', label: 'Région', type: 'select', options: ['eu', 'na', 'ap', 'kr', 'latam', 'br'], default: 'eu', required: true },
                { key: 'platform', label: 'Plateforme', type: 'select', options: ['pc'], default: 'pc', required: true },
                { key: 'font', label: 'Police', type: 'select', options: [
                    'Arial', 'Roboto', 'Montserrat', 'Open Sans', 'Poppins', 'Inter', 'Lato', 'Raleway',
                    'Oswald', 'Playfair Display', 'Merriweather', 'Ubuntu', 'Nunito', 'Source Sans Pro',
                    'Crimson Text', 'Libre Baskerville', 'PT Sans', 'PT Serif', 'Dancing Script', 'Pacifico',
                    'Bebas Neue', 'Anton', 'Fjalla One', 'Righteous', 'Bangers', 'Fredoka One',
                    'Comfortaa', 'Quicksand', 'Rubik', 'Work Sans', 'Space Grotesk', 'DM Sans',
                    'Manrope', 'Sora', 'Outfit', 'Plus Jakarta Sans', 'Figtree', 'Geist',
                    'JetBrains Mono', 'Fira Code', 'Courier New', 'Georgia', 'Times New Roman',
                    'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Arial Black'
                ], default: 'Arial' },
                { key: 'update_interval', label: 'Intervalle de mise à jour (ms)', type: 'number', min: 2000, max: 300000, step: 1000, default: 3000 },
                { key: 'show_leaderboard', label: 'Afficher leaderboard', type: 'select', options: ['true', 'false'], default: 'true' },
                { key: 'channel', label: 'Canal Twitch (optionnel)', type: 'text', placeholder: 'ex: twitch_channel' },
                { key: 'moderators', label: 'Modérateurs (optionnel)', type: 'text', placeholder: 'user1,user2,user3' },
                { key: 'vips', label: 'VIPs (optionnel)', type: 'text', placeholder: 'user1,user2' },
            ]
        },
        sub: {
            label: 'Sub Goal',
            path: 'overlay/sub/sub-count-widget.html',
            params: [
                { key: 'broadcaster_id', label: 'Broadcaster ID', type: 'text', placeholder: 'Votre ID de diffuseur', required: true },
                { key: 'access_token', label: 'Access Token', type: 'text', placeholder: 'Votre Token OAuth Twitch', required: true },
                { key: 'client_id', label: 'Client ID', type: 'text', placeholder: 'Votre Client ID Twitch', required: true },
                { key: 'channel', label: 'Canal Twitch', type: 'text', placeholder: 'ex: streamer_channel', required: true },
                { key: 'font', label: 'Police', type: 'select', options: [
                    'Arial', 'Roboto', 'Montserrat', 'Open Sans', 'Poppins', 'Inter', 'Lato', 'Raleway',
                    'Oswald', 'Playfair Display', 'Merriweather', 'Ubuntu', 'Nunito', 'Source Sans Pro',
                    'Crimson Text', 'Libre Baskerville', 'PT Sans', 'PT Serif', 'Dancing Script', 'Pacifico',
                    'Bebas Neue', 'Anton', 'Fjalla One', 'Righteous', 'Bangers', 'Fredoka One',
                    'Comfortaa', 'Quicksand', 'Rubik', 'Work Sans', 'Space Grotesk', 'DM Sans',
                    'Manrope', 'Sora', 'Outfit', 'Plus Jakarta Sans', 'Figtree', 'Geist',
                    'JetBrains Mono', 'Fira Code', 'Courier New', 'Georgia', 'Times New Roman',
                    'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Arial Black'
                ], default: 'Arial' },
                { key: 'goals', label: 'Objectifs (format: 3:24h stream,10:something else)', type: 'text', placeholder: '3:24h stream,10:something else' },
                { key: 'update_interval', label: 'Intervalle de mise à jour (ms)', type: 'number', min: 10000, max: 300000, step: 1000, default: 30000 },
            ]
        }
    };

    // Utilities
    const baseUrl = () => new URL('.', window.location.href); // folder of index.html
    const makeUrl = (path, paramsObj) => {
        const url = new URL(path, baseUrl());
        Object.entries(paramsObj).forEach(([k,v]) => {
            if (v !== undefined && v !== null && String(v) !== '') url.searchParams.set(k, v);
        });
        return url.toString();
    };
    const parseUrl = (urlStr) => {
        try { return new URL(urlStr, baseUrl()); } catch { return null; }
    };
    const guessTemplateFromUrl = (urlObj) => {
        const p = urlObj.pathname;
        if (p.includes('/overlay/chat')) return 'chat';
        if (p.includes('/overlay/valorant')) return 'valorant';
        if (p.includes('/overlay/sub')) return 'sub';
        // Relative paths on GH Pages may not include repo root; check endsWith too
        if (p.endsWith('overlay/chat/') || p.endsWith('overlay/chat')) return 'chat';
        if (p.endsWith('overlay/valorant/') || p.endsWith('overlay/valorant')) return 'valorant';
        if (p.endsWith('overlay/sub/') || p.endsWith('overlay/sub')) return 'sub';
        return null;
    };

    // DOM refs – Builder
    const templateSelection = $('#templateSelection');
    const generatorForm = $('#generatorForm');
    const backToSelection = $('#backToSelection');
    const dynamicFields = $('#dynamicFields');
    const generatedUrl = $('#generatedUrl');
    const copyUrlBtn = $('#copyUrlBtn');
    const openUrlBtn = $('#openUrlBtn');

    // Track current selected template
    let currentTemplateKey = null;

    // DOM refs – Editor
    const existingUrl = $('#existingUrl');
    const loadUrlBtn = $('#loadUrlBtn');
    const editorFields = $('#editorFields');
    const editedUrl = $('#editedUrl');
    const copyEditedUrlBtn = $('#copyEditedUrlBtn');
    const openEditedUrlBtn = $('#openEditedUrlBtn');

    // Template selection handlers
    const showTemplateSelection = () => {
        templateSelection.style.display = 'block';
        generatorForm.classList.add('hidden');
    };

    const showGeneratorForm = (templateKey) => {
        templateSelection.style.display = 'none';
        generatorForm.classList.remove('hidden');
        // Trigger animation by removing and re-adding the class
        generatorForm.style.animation = 'none';
        setTimeout(() => {
            generatorForm.style.animation = '';
        }, 10);
        currentTemplateKey = templateKey;

        // Show API key help only for Valorant template
        const apiKeyHelp = document.getElementById('apiKeyHelp');
        if (apiKeyHelp) {
            apiKeyHelp.style.display = templateKey === 'valorant' ? 'block' : 'none';
        }

        // Show Twitch credentials help only for Chat and Sub templates
        const twitchCredentialsHelp = document.getElementById('twitchCredentialsHelp');
        const chatModsVipsSection = document.getElementById('chatModsVipsSection');
        const chatBroadcasterIdSection = document.getElementById('chatBroadcasterIdSection');
        const twitchTokenLink = document.getElementById('twitchTokenLink');

        if (twitchCredentialsHelp) {
            twitchCredentialsHelp.style.display = (templateKey === 'chat' || templateKey === 'sub') ? 'block' : 'none';
        }

        // Update token link based on template
        if (twitchTokenLink) {
            if (templateKey === 'sub') {
                twitchTokenLink.href = 'https://twitchtokengenerator.com/quick/YBwXGzxVmZ';
            } else if (templateKey === 'chat') {
                twitchTokenLink.href = 'https://twitchtokengenerator.com/quick/mM9XnCBQf9';
            }
        }

        // Show sections 2 and 3 only for Chat template
        if (chatModsVipsSection) {
            chatModsVipsSection.style.display = templateKey === 'chat' ? 'block' : 'none';
        }
        if (chatBroadcasterIdSection) {
            chatBroadcasterIdSection.style.display = templateKey === 'chat' ? 'block' : 'none';
        }

        // Show preview section for Valorant, Chat, and Sub templates
        const previewSection = document.getElementById('previewSection');
        const valorantPreviewContainer = document.getElementById('valorantPreviewContainer');
        const chatPreviewContainer = document.getElementById('chatPreviewContainer');
        const subPreviewContainer = document.getElementById('subPreviewContainer');

        if (previewSection) {
            if (templateKey === 'valorant' || templateKey === 'chat' || templateKey === 'sub') {
                previewSection.style.display = 'block';
                if (valorantPreviewContainer) {
                    valorantPreviewContainer.style.display = templateKey === 'valorant' ? 'block' : 'none';
                }
                if (chatPreviewContainer) {
                    chatPreviewContainer.style.display = templateKey === 'chat' ? 'block' : 'none';
                }
                if (subPreviewContainer) {
                    subPreviewContainer.style.display = templateKey === 'sub' ? 'block' : 'none';
                }
            } else {
                previewSection.style.display = 'none';
            }
        }

        renderBuilder();
    };

    // Handle template card clicks
    $$('.template-choice').forEach(btn => {
        btn.addEventListener('click', () => {
            const templateKey = btn.dataset.template;
            if (templateKey && TEMPLATES[templateKey]) {
                showGeneratorForm(templateKey);
            }
        });
    });

    // Handle back button
    backToSelection?.addEventListener('click', () => {
        showTemplateSelection();
    });


    // Create a field control from definition
    const createField = (def, scopeName) => {
        const wrap = document.createElement('div');
        wrap.className = 'form-row';
        const id = `${scopeName}-${def.key}`;
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = def.label + (def.required ? ' *' : '');
        wrap.appendChild(label);

        let input;
        if (def.type === 'select') {
            input = document.createElement('select');
            input.className = 'input'; input.id = id;
            (def.options || []).forEach(v => {
                const o = document.createElement('option'); o.value = v; o.textContent = v; input.appendChild(o);
            });
            if (def.default != null) input.value = String(def.default);
        } else {
            input = document.createElement('input');
            input.className = 'input'; input.id = id; input.type = def.type || 'text';
            if (def.placeholder) input.placeholder = def.placeholder;
            if (def.min != null) input.min = String(def.min);
            if (def.max != null) input.max = String(def.max);
            if (def.step != null) input.step = String(def.step);
            if (def.default != null) input.value = String(def.default);
        }
        if (def.required) input.required = true;
        input.dataset.key = def.key;
        wrap.appendChild(input);
        return wrap;
    };

    // Read values from a fields container
    const readValues = (fieldsContainer) => {
        const inputs = $$('input, select', fieldsContainer);
        const vals = {};
        inputs.forEach(el => {
            const key = el.dataset.key;
            if (!key) return;
            let v = (el.type === 'number') ? (el.value === '' ? '' : Number(el.value)) : el.value;
            vals[key] = v;
        });
        return vals;
    };

    // Render builder fields for selected template
    const renderBuilder = () => {
        const tKey = currentTemplateKey || Object.keys(TEMPLATES)[0];
        const t = TEMPLATES[tKey];
        if (!t || !dynamicFields) return;
        dynamicFields.innerHTML = '';
        t.params.forEach(def => dynamicFields.appendChild(createField(def, 'builder')));
        updateBuilderUrl();
        $$('input, select', dynamicFields).forEach(el => {
            el.addEventListener('input', updateBuilderUrl);
            el.addEventListener('change', updateBuilderUrl);
        });
    };

    const updateBuilderUrl = () => {
        const tKey = currentTemplateKey || Object.keys(TEMPLATES)[0];
        const t = TEMPLATES[tKey];
        if (!t || !generatedUrl) return;
        const vals = readValues(dynamicFields);
        const url = makeUrl(t.path, vals);
        generatedUrl.value = url;
        if (openUrlBtn) openUrlBtn.href = url;

        // Update preview iframe for Valorant template
        if (tKey === 'valorant') {
            const previewIframe = document.getElementById('valorantPreview');
            const previewCardIframe = document.getElementById('valorantPreviewCard');

            // Build preview URL with current values
            const previewParams = new URLSearchParams();
            previewParams.set('name', vals.name || 'Player');
            previewParams.set('tag', vals.tag || 'TAG');
            // Add API configuration for real data loading
            if (vals.api_key) previewParams.set('api_key', vals.api_key);
            if (vals.region) previewParams.set('region', vals.region);
            if (vals.platform) previewParams.set('platform', vals.platform);
            // Font value - URLSearchParams will automatically encode spaces
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            previewParams.set('update_interval', vals.update_interval || '3000');
            previewParams.set('show_leaderboard', vals.show_leaderboard || 'true');

            const previewUrl = `overlay/valorant/rang/rank-preview.html?${previewParams.toString()}`;
            console.log('🔤 Font value in URL:', fontValue, 'URL:', previewUrl);

            // Force reload by adding timestamp to URL to bypass cache
            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

            // Always force reload to ensure preview updates
            if (previewIframe) {
                previewIframe.src = '';
                setTimeout(() => {
                    previewIframe.src = previewUrlWithCache;
                }, 50);
            }
            if (previewCardIframe) {
                previewCardIframe.src = '';
                setTimeout(() => {
                    previewCardIframe.src = previewUrlWithCache;
                }, 50);
            }
        }

        // Update preview iframe for Sub template
        if (tKey === 'sub') {
            const previewIframe = document.getElementById('subPreview');
            const previewCardIframe = document.getElementById('subPreviewCard');

            // Build preview URL with current values (preview doesn't need API credentials)
            const previewParams = new URLSearchParams();
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.goals) previewParams.set('goals', vals.goals);

            const previewUrl = `overlay/sub/sub-count-widget-preview.html?${previewParams.toString()}`;
            console.log('💬 Sub preview URL:', previewUrl);

            // Force reload by adding timestamp to URL to bypass cache
            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

            // Always force reload to ensure preview updates
            if (previewIframe) {
                previewIframe.src = '';
                setTimeout(() => {
                    previewIframe.src = previewUrlWithCache;
                }, 50);
            }
            if (previewCardIframe) {
                previewCardIframe.src = '';
                setTimeout(() => {
                    previewCardIframe.src = previewUrlWithCache;
                }, 50);
            }
        }

        // Update preview iframe for Chat template
        if (tKey === 'chat') {
            const previewIframe = document.getElementById('chatPreview');
            const previewCardIframe = document.getElementById('chatPreviewCard');

            // Build preview URL with current values (preview doesn't need API credentials)
            const previewParams = new URLSearchParams();
            previewParams.set('channel', vals.channel || 'streamer_channel');
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.moderators) previewParams.set('moderators', vals.moderators);
            if (vals.vips) previewParams.set('vips', vals.vips);

            const previewUrl = `overlay/chat/chat-widget-preview.html?${previewParams.toString()}`;
            console.log('💬 Chat preview URL:', previewUrl);

            // Force reload by adding timestamp to URL to bypass cache
            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

            // Always force reload to ensure preview updates
            if (previewIframe) {
                previewIframe.src = '';
                setTimeout(() => {
                    previewIframe.src = previewUrlWithCache;
                }, 50);
            }
            if (previewCardIframe) {
                previewCardIframe.src = '';
                setTimeout(() => {
                    previewCardIframe.src = previewUrlWithCache;
                }, 50);
            }
        }
    };

    copyUrlBtn?.addEventListener('click', async () => {
        if (!generatedUrl.value) return;
        await navigator.clipboard.writeText(generatedUrl.value);
        copyUrlBtn.textContent = 'Copié';
        setTimeout(() => (copyUrlBtn.textContent = 'Copier'), 1200);
    });

    // Editor logic
    const loadUrlIntoEditor = () => {
        editorFields.innerHTML = '';
        editedUrl.value = '';
        const urlObj = parseUrl(existingUrl.value.trim());
        if (!urlObj) { existingUrl.focus(); return; }

        const tKey = guessTemplateFromUrl(urlObj);
        if (!tKey || !TEMPLATES[tKey]) {
            // Fallback: try chat
            existingUrl.setCustomValidity('Template introuvable dans l’URL.');
            existingUrl.reportValidity();
            setTimeout(() => existingUrl.setCustomValidity(''), 1500);
            return;
        }
        const t = TEMPLATES[tKey];
        // Render fields with values
        t.params.forEach(def => {
            const el = createField(def, 'editor');
            const input = $('input, select', el);
            const v = urlObj.searchParams.get(def.key);
            if (v != null) input.value = v;
            editorFields.appendChild(el);
        });

        const updateEdited = () => {
            const vals = readValues(editorFields);
            const url = makeUrl(t.path, vals);
            editedUrl.value = url;
            openEditedUrlBtn.href = url;
        };
        $$('input, select', editorFields).forEach(el => el.addEventListener('input', updateEdited));
        updateEdited();
    };

    loadUrlBtn?.addEventListener('click', loadUrlIntoEditor);
    copyEditedUrlBtn?.addEventListener('click', async () => {
        if (!editedUrl.value) return;
        await navigator.clipboard.writeText(editedUrl.value);
        copyEditedUrlBtn.textContent = 'Copié';
        setTimeout(() => (copyEditedUrlBtn.textContent = 'Copier'), 1200);
    });

    // Init
    // Initially show template selection, hide form
    if (templateSelection && generatorForm) {
        showTemplateSelection();
    }
})();


