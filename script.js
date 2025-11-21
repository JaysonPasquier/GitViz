// GitViz – URL Builder & Editor
// what are you doing here ?
// are you trying to copy my code ? or looking if its ai generated ?
// if you are, you are not gonna find anything here.
// this is a custom code that i wrote for my own use.
// if you want to use it, you can, but you need to ask me for permission.
// if you are not trying to copy my code, or looking if its ai generated, then you can continue.
// i hope you enjoy my code.
// if you have any questions, feel free to ask me.
// if you have any suggestions, feel free to suggest them.
// if you have any bugs, feel free to report them.
(() => {
    const $ = (sel, ctx=document) => ctx.querySelector(sel);
    const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

    const FONT_OPTIONS = [
        'Arial', 'Roboto', 'Montserrat', 'Open Sans', 'Poppins', 'Inter', 'Lato', 'Raleway',
        'Oswald', 'Playfair Display', 'Merriweather', 'Ubuntu', 'Nunito', 'Source Sans Pro',
        'Crimson Text', 'Libre Baskerville', 'PT Sans', 'PT Serif', 'Dancing Script', 'Pacifico',
        'Bebas Neue', 'Anton', 'Fjalla One', 'Righteous', 'Bangers', 'Fredoka One',
        'Comfortaa', 'Quicksand', 'Rubik', 'Work Sans', 'Space Grotesk', 'DM Sans',
        'Manrope', 'Sora', 'Outfit', 'Plus Jakarta Sans', 'Figtree', 'Geist',
        'JetBrains Mono', 'Fira Code', 'Courier New', 'Georgia', 'Times New Roman',
        'Verdana', 'Tahoma', 'Trebuchet MS', 'Impact', 'Comic Sans MS', 'Arial Black'
    ];

    const TEMPLATES = {
        chat: {
            label: 'Chat',
            path: 'overlay/chat/chat-widget.html',
            configParams: [
                { key: 'channel', label: 'Canal Twitch', type: 'text', placeholder: 'ex: streamer_channel', required: true },
                { key: 'twitch_client_id', label: 'Twitch Client ID', type: 'text', placeholder: 'Votre Client ID Twitch', required: true },
                { key: 'twitch_auth_token', label: 'Twitch Auth Token', type: 'text', placeholder: 'Votre Token d\'authentification', required: true },
                { key: 'broadcaster_id', label: 'Broadcaster ID', type: 'text', placeholder: 'Votre ID de diffuseur', required: true },
                { key: 'seventv_emote_set', label: '7TV Emote Set ID (optionnel)', type: 'text', placeholder: 'ex: 01GEG2EPE80006SAE3KT92JGK5' },
                { key: 'moderators', label: 'Modérateurs (optionnel)', type: 'text', placeholder: 'user1,user2,user3' },
                { key: 'vips', label: 'VIPs (optionnel)', type: 'text', placeholder: 'user1,user2' },
            ],
            styleParams: [
                { key: 'font', label: 'Police', type: 'select', options: FONT_OPTIONS, default: 'Arial' },
                { key: 'font_size', label: 'Taille de police (px)', type: 'number', min: 8, max: 200, step: 1, default: 28 },
                { key: 'font_effect', label: 'Effet de police', type: 'select', options: ['normal', 'hollow', 'border'], default: 'normal' },
                { key: 'chat_style', label: 'Style de chat', type: 'select', options: ['default', 'card', 'bubble', 'minimal', 'gradient', 'glass'], default: 'default' },
            ]
        },
        valorant: {
            label: 'Valorant',
            path: 'overlay/valorant/rang/rank-widget.html',
            configParams: [
                { key: 'name', label: 'Nom du joueur', type: 'text', placeholder: 'ex: ANAKINSKYWALKER', required: true },
                { key: 'tag', label: 'Tag du joueur', type: 'text', placeholder: 'ex: HARR', required: true },
                { key: 'api_key', label: 'Clé API', type: 'text', placeholder: 'Obtenez-la sur Discord', required: true },
                { key: 'region', label: 'Région', type: 'select', options: ['eu', 'na', 'ap', 'kr', 'latam', 'br'], default: 'eu', required: true },
                { key: 'platform', label: 'Plateforme', type: 'select', options: ['pc'], default: 'pc', required: true },
                { key: 'update_interval', label: 'Intervalle de mise à jour (ms)', type: 'number', min: 2000, max: 300000, step: 1000, default: 3000 },
                { key: 'show_leaderboard', label: 'Afficher leaderboard', type: 'select', options: ['true', 'false'], default: 'true' },
                { key: 'channel', label: 'Canal Twitch (optionnel)', type: 'text', placeholder: 'ex: twitch_channel' },
                { key: 'moderators', label: 'Modérateurs (optionnel)', type: 'text', placeholder: 'user1,user2,user3' },
                { key: 'vips', label: 'VIPs (optionnel)', type: 'text', placeholder: 'user1,user2' },
            ],
            styleParams: [
                { key: 'font', label: 'Police', type: 'select', options: FONT_OPTIONS, default: 'Arial' },
                { key: 'font_size', label: 'Taille de police (px)', type: 'number', min: 8, max: 200, step: 1, default: 24 },
                { key: 'font_effect', label: 'Effet de police', type: 'select', options: ['normal', 'hollow', 'border'], default: 'normal' },
                { key: 'rank_image_size', label: 'Taille de l\'image du rang (px)', type: 'number', min: 20, max: 200, step: 5, default: 60 },
                { key: 'overlay_style', label: 'Style d\'overlay', type: 'select', options: ['default', 'card', 'bubble', 'minimal', 'gradient', 'glass'], default: 'default' },
            ]
        },
        sub: {
            label: 'Sub Goal',
            path: 'overlay/sub/sub-count-widget.html',
            configParams: [
                { key: 'broadcaster_id', label: 'Broadcaster ID', type: 'text', placeholder: 'Votre ID de diffuseur', required: true },
                { key: 'access_token', label: 'Access Token', type: 'text', placeholder: 'Votre Token OAuth Twitch', required: true },
                { key: 'client_id', label: 'Client ID', type: 'text', placeholder: 'Votre Client ID Twitch', required: true },
                { key: 'channel', label: 'Canal Twitch', type: 'text', placeholder: 'ex: streamer_channel', required: true },
                { key: 'goals', label: 'Objectifs (format: 3:24h stream,10:something else)', type: 'text', placeholder: '3:24h stream,10:something else' },
                { key: 'update_interval', label: 'Intervalle de mise à jour (ms)', type: 'number', min: 10000, max: 300000, step: 1000, default: 30000 },
            ],
            styleParams: [
                { key: 'font', label: 'Police', type: 'select', options: FONT_OPTIONS, default: 'Arial' },
                { key: 'font_size', label: 'Taille de police (px)', type: 'number', min: 8, max: 200, step: 1, default: 48 },
                { key: 'font_effect', label: 'Effet de police', type: 'select', options: ['normal', 'hollow', 'border'], default: 'normal' },
                { key: 'overlay_style', label: 'Style d\'overlay', type: 'select', options: ['default', 'card', 'bubble', 'minimal', 'gradient', 'glass'], default: 'default' },
            ]
        },
        spotify: {
            label: 'Spotify',
            path: 'overlay/spotify/spotify-widget.html',
            configParams: [
                { key: 'client_id', label: 'Client ID', type: 'text', placeholder: 'Votre Client ID Spotify', required: true },
                { key: 'redirect_uri', label: 'Redirect URI', type: 'text', placeholder: 'https://jaysonpasquier.github.io/GitViz/overlay/spotify/spotify-widget.html', default: 'https://jaysonpasquier.github.io/GitViz/overlay/spotify/spotify-widget.html', required: true, readonly: true, help: '⚠️ IMPORTANT: Cette URL est verrouillée et ne peut pas être modifiée. Elle doit correspondre EXACTEMENT à celle configurée dans Spotify Dashboard' },
                { key: 'display_mode', label: 'Mode d\'affichage', type: 'select', options: ['always', 'changement', 'commande', 'changement_ou_commande', 'changement_et_commande'], default: 'always', help: 'always: Toujours affiché | changement: Apparaît à chaque changement de musique | commande: Apparaît sur commande Twitch | changement_ou_commande: Apparaît sur changement OU commande | changement_et_commande: Apparaît sur changement ET commande' },
                { key: 'display_duration', label: 'Durée d\'affichage (ms)', type: 'number', min: 1000, max: 60000, step: 1000, default: 5000, help: 'Durée pendant laquelle l\'overlay reste visible (uniquement pour les modes avec cooldown)' },
                { key: 'twitch_channel', label: 'Chaine Twitch (pour commandes)', type: 'text', placeholder: 'nom de la chaine', help: 'Optionnel: Nom du canal Twitch pour écouter les commandes (ex: !music)' },
                { key: 'twitch_command', label: 'Commande Twitch', type: 'text', placeholder: '!music', default: '!music', help: 'Commande à écouter dans le chat Twitch (ex: !music)' },
            ],
            styleParams: [
                { key: 'font', label: 'Police', type: 'select', options: FONT_OPTIONS, default: 'Arial' },
                { key: 'font_size', label: 'Taille de police (px)', type: 'number', min: 8, max: 200, step: 1, default: 24 },
                { key: 'font_effect', label: 'Effet de police', type: 'select', options: ['normal', 'hollow', 'border'], default: 'normal' },
                { key: 'overlay_style', label: 'Style d\'overlay', type: 'select', options: ['default', 'card', 'bubble', 'minimal', 'gradient', 'glass'], default: 'default' },
            ]
        },
        lol: {
            label: 'LoL Rank',
            path: 'overlay/lol/rank/rank-widget.html',
            configParams: [
                { key: 'name', label: 'Nom du joueur', type: 'text', placeholder: 'ex: SummonerName', required: true },
                { key: 'tag', label: 'Tag du joueur', type: 'text', placeholder: 'ex: EUW', required: true },
                { key: 'region', label: 'Région', type: 'select', options: ['euw1', 'eun1', 'na1', 'kr', 'br1', 'la1', 'la2', 'jp1', 'ru', 'tr1', 'oc1', 'ph2', 'sg2', 'th2', 'tw2', 'vn2'], default: 'euw1', required: true },
                { key: 'update_interval', label: 'Intervalle de mise à jour (ms)', type: 'number', min: 2000, max: 300000, step: 1000, default: 60000 },
                { key: 'channel', label: 'Canal Twitch (optionnel)', type: 'text', placeholder: 'ex: twitch_channel' },
                { key: 'moderators', label: 'Modérateurs (optionnel)', type: 'text', placeholder: 'user1,user2,user3' },
                { key: 'vips', label: 'VIPs (optionnel)', type: 'text', placeholder: 'user1,user2' },
            ],
            styleParams: [
                { key: 'font', label: 'Police', type: 'select', options: FONT_OPTIONS, default: 'Arial' },
                { key: 'font_size', label: 'Taille de police (px)', type: 'number', min: 8, max: 200, step: 1, default: 24 },
                { key: 'font_effect', label: 'Effet de police', type: 'select', options: ['normal', 'hollow', 'border'], default: 'normal' },
                { key: 'rank_image_size', label: 'Taille de l\'image du rang (px)', type: 'number', min: 20, max: 200, step: 5, default: 60 },
                { key: 'overlay_style', label: 'Style d\'overlay', type: 'select', options: ['default', 'card', 'bubble', 'minimal', 'gradient', 'glass'], default: 'default' },
            ]
        }
    };

    const baseUrl = () => new URL('.', window.location.href);
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
        if (p.includes('/overlay/spotify')) return 'spotify';
        if (p.includes('/overlay/lol')) return 'lol';
        if (p.endsWith('overlay/chat/') || p.endsWith('overlay/chat')) return 'chat';
        if (p.endsWith('overlay/valorant/') || p.endsWith('overlay/valorant')) return 'valorant';
        if (p.endsWith('overlay/sub/') || p.endsWith('overlay/sub')) return 'sub';
        if (p.endsWith('overlay/spotify/') || p.endsWith('overlay/spotify')) return 'spotify';
        if (p.endsWith('overlay/lol/') || p.endsWith('overlay/lol')) return 'lol';
        return null;
    };

    const templateSelection = $('#templateSelection');
    const generatorForm = $('#generatorForm');
    const backToSelection = $('#backToSelection');
    const dynamicFields = $('#dynamicFields');
    const generatedUrl = $('#generatedUrl');
    const copyUrlBtn = $('#copyUrlBtn');
    const openUrlBtn = $('#openUrlBtn');

    let currentTemplateKey = null;

    const existingUrl = $('#existingUrl');
    const loadUrlBtn = $('#loadUrlBtn');
    const editorFields = $('#editorFields');
    const editedUrl = $('#editedUrl');
    const copyEditedUrlBtn = $('#copyEditedUrlBtn');
    const openEditedUrlBtn = $('#openEditedUrlBtn');

    const showTemplateSelection = () => {
        templateSelection.style.display = 'block';
        generatorForm.classList.add('hidden');
    };

    const showGeneratorForm = (templateKey) => {
        templateSelection.style.display = 'none';
        generatorForm.classList.remove('hidden');
        generatorForm.style.animation = 'none';
        setTimeout(() => {
            generatorForm.style.animation = '';
        }, 10);
        currentTemplateKey = templateKey;

        const apiKeyHelp = document.getElementById('apiKeyHelp');
        if (apiKeyHelp) {
            apiKeyHelp.style.display = templateKey === 'valorant' ? 'block' : 'none';
        }

        const twitchCredentialsHelp = document.getElementById('twitchCredentialsHelp');
        const chatModsVipsSection = document.getElementById('chatModsVipsSection');
        const chatBroadcasterIdSection = document.getElementById('chatBroadcasterIdSection');
        const twitchTokenLink = document.getElementById('twitchTokenLink');

        if (twitchCredentialsHelp) {
            twitchCredentialsHelp.style.display = (templateKey === 'chat' || templateKey === 'sub') ? 'block' : 'none';
        }

        const spotifyHelpSection = document.getElementById('spotifyHelpSection');
        if (spotifyHelpSection) {
            spotifyHelpSection.style.display = templateKey === 'spotify' ? 'block' : 'none';
        }

        const lolHelpSection = document.getElementById('lolHelpSection');
        if (lolHelpSection) {
            lolHelpSection.style.display = templateKey === 'lol' ? 'block' : 'none';
        }

        if (twitchTokenLink) {
            if (templateKey === 'spotify') {
                const spotifyPreviewContainer = document.getElementById('spotifyPreviewContainer');
                if (spotifyPreviewContainer) {
                    spotifyPreviewContainer.style.display = 'block';
                }
            }

            if (templateKey === 'sub') {
                twitchTokenLink.href = 'https://twitchtokengenerator.com/quick/YBwXGzxVmZ';
            } else if (templateKey === 'chat') {
                twitchTokenLink.href = 'https://twitchtokengenerator.com/quick/mM9XnCBQf9';
            }
        }

        if (chatModsVipsSection) {
            chatModsVipsSection.style.display = templateKey === 'chat' ? 'block' : 'none';
        }
        if (chatBroadcasterIdSection) {
            chatBroadcasterIdSection.style.display = templateKey === 'chat' ? 'block' : 'none';
        }

        const previewSection = document.getElementById('previewSection');
        const valorantPreviewContainer = document.getElementById('valorantPreviewContainer');
        const chatPreviewContainer = document.getElementById('chatPreviewContainer');
        const subPreviewContainer = document.getElementById('subPreviewContainer');

        if (previewSection) {
            if (templateKey === 'valorant' || templateKey === 'chat' || templateKey === 'sub' || templateKey === 'spotify' || templateKey === 'lol') {
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
                const spotifyPreviewContainer = document.getElementById('spotifyPreviewContainer');
                if (spotifyPreviewContainer) {
                    spotifyPreviewContainer.style.display = templateKey === 'spotify' ? 'block' : 'none';
                }
                const lolPreviewContainer = document.getElementById('lolPreviewContainer');
                if (lolPreviewContainer) {
                    lolPreviewContainer.style.display = templateKey === 'lol' ? 'block' : 'none';
                }
            } else {
                previewSection.style.display = 'none';
            }
        }

        renderBuilder();
    };

    $$('.template-choice').forEach(btn => {
        btn.addEventListener('click', () => {
            const templateKey = btn.dataset.template;
            if (templateKey && TEMPLATES[templateKey]) {
                showGeneratorForm(templateKey);
            }
        });
    });

    backToSelection?.addEventListener('click', () => {
        showTemplateSelection();
    });


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
        if (def.readonly) {
            input.readOnly = true;
            input.style.backgroundColor = 'var(--bg-secondary, rgba(255, 255, 255, 0.05))';
            input.style.cursor = 'not-allowed';
            input.style.opacity = '0.7';
        }
        input.dataset.key = def.key;
        wrap.appendChild(input);
        return wrap;
    };

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

    const getAllParams = (template) => {
        return [...(template.configParams || []), ...(template.styleParams || [])];
    };

    const renderBuilder = () => {
        const tKey = currentTemplateKey || Object.keys(TEMPLATES)[0];
        const t = TEMPLATES[tKey];
        if (!t || !dynamicFields) return;
        dynamicFields.innerHTML = '';

        // Section Configuration
        const configSection = document.createElement('div');
        configSection.className = 'form-section';
        const configTitle = document.createElement('h3');
        configTitle.className = 'section-title';
        configTitle.textContent = 'Configuration';
        configSection.appendChild(configTitle);
        const configFields = document.createElement('div');
        configFields.className = 'fields';
        (t.configParams || []).forEach(def => configFields.appendChild(createField(def, 'builder')));
        configSection.appendChild(configFields);
        dynamicFields.appendChild(configSection);

        // Section Style
        const styleSection = document.createElement('div');
        styleSection.className = 'form-section';
        const styleTitle = document.createElement('h3');
        styleTitle.className = 'section-title';
        styleTitle.textContent = 'Style';
        styleSection.appendChild(styleTitle);
        const styleFields = document.createElement('div');
        styleFields.className = 'fields';
        (t.styleParams || []).forEach(def => styleFields.appendChild(createField(def, 'builder')));
        styleSection.appendChild(styleFields);
        dynamicFields.appendChild(styleSection);

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

        if (tKey === 'valorant') {
            const previewIframe = document.getElementById('valorantPreview');
            const previewCardIframe = document.getElementById('valorantPreviewCard');

            const previewParams = new URLSearchParams();
            previewParams.set('name', vals.name || 'Player');
            previewParams.set('tag', vals.tag || 'TAG');
            if (vals.api_key) previewParams.set('api_key', vals.api_key);
            if (vals.region) previewParams.set('region', vals.region);
            if (vals.platform) previewParams.set('platform', vals.platform);
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.font_size) previewParams.set('font_size', vals.font_size);
            if (vals.font_effect) previewParams.set('font_effect', vals.font_effect);
            if (vals.rank_image_size) previewParams.set('rank_image_size', vals.rank_image_size);
            if (vals.overlay_style) previewParams.set('overlay_style', vals.overlay_style);
            previewParams.set('update_interval', vals.update_interval || '3000');
            previewParams.set('show_leaderboard', vals.show_leaderboard || 'true');

            const previewUrl = `overlay/valorant/rang/rank-preview.html?${previewParams.toString()}`;
            console.log('🔤 Font value in URL:', fontValue, 'URL:', previewUrl);

            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

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

        if (tKey === 'sub') {
            const previewIframe = document.getElementById('subPreview');
            const previewCardIframe = document.getElementById('subPreviewCard');

            const previewParams = new URLSearchParams();
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.font_size) previewParams.set('font_size', vals.font_size);
            if (vals.font_effect) previewParams.set('font_effect', vals.font_effect);
            if (vals.overlay_style) previewParams.set('overlay_style', vals.overlay_style);
            if (vals.goals) previewParams.set('goals', vals.goals);

            const previewUrl = `overlay/sub/sub-count-widget-preview.html?${previewParams.toString()}`;
            console.log('💬 Sub preview URL:', previewUrl);

            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

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

        if (tKey === 'spotify') {
            const previewIframe = document.getElementById('spotifyPreview');
            const previewCardIframe = document.getElementById('spotifyPreviewCard');

            const previewParams = new URLSearchParams();
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.font_size) previewParams.set('font_size', vals.font_size);
            if (vals.font_effect) previewParams.set('font_effect', vals.font_effect);
            if (vals.overlay_style) previewParams.set('overlay_style', vals.overlay_style);

            const previewUrl = `overlay/spotify/spotify-widget-preview.html?${previewParams.toString()}`;
            console.log('🎵 Spotify preview URL:', previewUrl);

            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

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

        if (tKey === 'chat') {
            const previewIframe = document.getElementById('chatPreview');
            const previewCardIframe = document.getElementById('chatPreviewCard');

            const previewParams = new URLSearchParams();
            previewParams.set('channel', vals.channel || 'streamer_channel');
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.font_size) previewParams.set('font_size', vals.font_size);
            if (vals.font_effect) previewParams.set('font_effect', vals.font_effect);
            if (vals.chat_style) previewParams.set('chat_style', vals.chat_style);
            if (vals.moderators && String(vals.moderators).trim()) previewParams.set('moderators', vals.moderators);
            if (vals.vips && String(vals.vips).trim()) previewParams.set('vips', vals.vips);
            if (vals.twitch_client_id && String(vals.twitch_client_id).trim()) previewParams.set('twitch_client_id', vals.twitch_client_id);
            if (vals.twitch_auth_token && String(vals.twitch_auth_token).trim()) previewParams.set('twitch_auth_token', vals.twitch_auth_token);
            if (vals.broadcaster_id && String(vals.broadcaster_id).trim()) previewParams.set('broadcaster_id', vals.broadcaster_id);
            if (vals.seventv_emote_set && String(vals.seventv_emote_set).trim()) previewParams.set('seventv_emote_set', vals.seventv_emote_set);

            const previewUrl = `overlay/chat/chat-widget-preview.html?${previewParams.toString()}`;
            console.log('💬 Chat preview URL:', previewUrl);
            console.log('💬 Chat preview vals:', vals);

            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

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

        if (tKey === 'lol') {
            const previewIframe = document.getElementById('lolPreview');
            const previewCardIframe = document.getElementById('lolPreviewCard');

            const previewParams = new URLSearchParams();
            previewParams.set('name', vals.name || 'username');
            previewParams.set('tag', vals.tag || 'tags');
            previewParams.set('region', vals.region || 'euw1');
            const fontValue = vals.font || 'Arial';
            previewParams.set('font', fontValue);
            if (vals.font_size) previewParams.set('font_size', vals.font_size);
            if (vals.font_effect) previewParams.set('font_effect', vals.font_effect);
            if (vals.rank_image_size) previewParams.set('rank_image_size', vals.rank_image_size);
            if (vals.overlay_style) previewParams.set('overlay_style', vals.overlay_style);
            previewParams.set('update_interval', vals.update_interval || '3000');

            const previewUrl = `overlay/lol/rank/rank-widget-preview.html?${previewParams.toString()}`;
            console.log('⚔️ LoL preview URL:', previewUrl);

            const timestamp = Date.now();
            const previewUrlWithCache = `${previewUrl}&_t=${timestamp}`;

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

    const loadUrlIntoEditor = () => {
        editorFields.innerHTML = '';
        editedUrl.value = '';
        const urlObj = parseUrl(existingUrl.value.trim());
        if (!urlObj) { existingUrl.focus(); return; }

        const tKey = guessTemplateFromUrl(urlObj);
        if (!tKey || !TEMPLATES[tKey]) {
            existingUrl.setCustomValidity('Template introuvable dans l\'URL.');
            existingUrl.reportValidity();
            setTimeout(() => existingUrl.setCustomValidity(''), 1500);
            return;
        }
        const t = TEMPLATES[tKey];

        // Section Configuration
        const configSection = document.createElement('div');
        configSection.className = 'form-section';
        const configTitle = document.createElement('h3');
        configTitle.className = 'section-title';
        configTitle.textContent = 'Configuration';
        configSection.appendChild(configTitle);
        const configFields = document.createElement('div');
        configFields.className = 'fields';
        (t.configParams || []).forEach(def => {
            const el = createField(def, 'editor');
            const input = $('input, select', el);
            const v = urlObj.searchParams.get(def.key);
            if (v != null) input.value = v;
            configFields.appendChild(el);
        });
        configSection.appendChild(configFields);
        editorFields.appendChild(configSection);

        // Section Style
        const styleSection = document.createElement('div');
        styleSection.className = 'form-section';
        const styleTitle = document.createElement('h3');
        styleTitle.className = 'section-title';
        styleTitle.textContent = 'Style';
        styleSection.appendChild(styleTitle);
        const styleFields = document.createElement('div');
        styleFields.className = 'fields';
        (t.styleParams || []).forEach(def => {
            const el = createField(def, 'editor');
            const input = $('input, select', el);
            const v = urlObj.searchParams.get(def.key);
            if (v != null) input.value = v;
            styleFields.appendChild(el);
        });
        styleSection.appendChild(styleFields);
        editorFields.appendChild(styleSection);

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

    if (templateSelection && generatorForm) {
        showTemplateSelection();
    }

    const GITHUB_REPO = 'JaysonPasquier/GitViz';

    async function fetchGitHubStars() {
        try {
            const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch GitHub stats');
            const data = await response.json();

            const starsEl = document.querySelector('.star-count');
            if (starsEl) {
                starsEl.textContent = data.stargazers_count?.toLocaleString() || '0';
            }
        } catch (error) {
            console.error('Error fetching GitHub stars:', error);
            const starsEl = document.querySelector('.star-count');
            if (starsEl) {
                starsEl.textContent = '0';
            }
        }
    }

    fetchGitHubStars();
    // Load and display supporters from Ko-fi API
    async function loadSupporters() {
        try {
            const response = await fetch('https://kofi-supporters.jaysonpasquier-contact.workers.dev/supporters', {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                console.warn('Supporters API returned non-OK status:', response.status, response.statusText);
                $('#supportersBannerTop').style.display = 'none';
                $('#supportersBannerBottom').style.display = 'none';
                return;
            }

            const supporters = await response.json();

            // Check if it's an array and has data
            if (!Array.isArray(supporters) || supporters.length === 0) {
                // Show message if no supporters
                const noSupportersText = '☕ Vous pouvez faire un petit don sur Ko-fi pour soutenir le projet !';

                const topBanner1 = $('#supportersScrollTop1 .supporters-list');
                const topBanner2 = $('#supportersScrollTop2 .supporters-list');
                const bottomBanner1 = $('#supportersScrollBottom1 .supporters-list');
                const bottomBanner2 = $('#supportersScrollBottom2 .supporters-list');

                if (topBanner1 && topBanner2) {
                    topBanner1.textContent = noSupportersText;
                    topBanner2.textContent = noSupportersText;
                    $('#supportersBannerTop').style.display = 'block';
                }

                if (bottomBanner1 && bottomBanner2) {
                    bottomBanner1.textContent = noSupportersText;
                    bottomBanner2.textContent = noSupportersText;
                    $('#supportersBannerBottom').style.display = 'block';
                }
                return;
            }

            // Format supporters: "Name - $amount currency"
            const formatCurrency = (amount, currency) => {
                const symbolMap = {
                    'USD': '$',
                    'EUR': '€',
                    'GBP': '£',
                    'CAD': 'C$',
                    'AUD': 'A$',
                    'JPY': '¥',
                    'CNY': '¥'
                };
                const symbol = symbolMap[currency] || currency + ' ';
                return symbol + parseFloat(amount).toFixed(2) + ' ' + currency;
            };

            // Format each supporter
            const formattedSupporters = supporters.map(supporter => {
                const name = supporter.name || 'Anonymous';
                const amount = supporter.amount || '0.00';
                const currency = supporter.currency || 'USD';
                return `${name} - ${formatCurrency(amount, currency)}`;
            });

            // Ensure we have enough repetitions for smooth scrolling
            // If only 1 supporter, repeat it 5 times. If 2, repeat 3 times. Otherwise use as is.
            let repeatedSupporters;
            if (formattedSupporters.length === 1) {
                repeatedSupporters = Array(5).fill(formattedSupporters[0]);
            } else if (formattedSupporters.length === 2) {
                repeatedSupporters = [...formattedSupporters, ...formattedSupporters, ...formattedSupporters];
            } else {
                repeatedSupporters = [...formattedSupporters, ...formattedSupporters];
            }

            // Join with separators - no need to duplicate since we have two scroll elements
            const supportersText = repeatedSupporters.join(' • ');

            // Update both scroll elements in each banner
            const topBanner1 = $('#supportersScrollTop1 .supporters-list');
            const topBanner2 = $('#supportersScrollTop2 .supporters-list');
            const bottomBanner1 = $('#supportersScrollBottom1 .supporters-list');
            const bottomBanner2 = $('#supportersScrollBottom2 .supporters-list');

            if (topBanner1 && topBanner2) {
                topBanner1.textContent = supportersText;
                topBanner2.textContent = supportersText;

                // Wait for DOM to update, then calculate width and set animation
                requestAnimationFrame(() => {
                    const scroll1 = $('#supportersScrollTop1');
                    const scroll2 = $('#supportersScrollTop2');
                    if (scroll1 && scroll2) {
                        const width = scroll1.scrollWidth || scroll1.offsetWidth;
                        const scrollSpeed = 50; // pixels per second
                        const animationDuration = Math.max(width / scrollSpeed, 20);

                        // Position scrolls: both start at left: 0
                        // scroll2 is offset by width using CSS variable so it appears right after scroll1
                        scroll1.style.left = `0px`;
                        scroll2.style.left = `0px`;
                        scroll2.style.setProperty('--scroll-width', `${width}px`);

                        scroll1.style.animationDuration = `${animationDuration}s`;
                        scroll2.style.animationDuration = `${animationDuration}s`;
                        scroll2.style.animationDelay = `-${animationDuration / 2}s`;
                    }
                });

                $('#supportersBannerTop').style.display = 'block';
            }

            if (bottomBanner1 && bottomBanner2) {
                bottomBanner1.textContent = supportersText;
                bottomBanner2.textContent = supportersText;

                // Wait for DOM to update, then calculate width and set animation
                requestAnimationFrame(() => {
                    const scroll1 = $('#supportersScrollBottom1');
                    const scroll2 = $('#supportersScrollBottom2');
                    if (scroll1 && scroll2) {
                        const width = scroll1.scrollWidth || scroll1.offsetWidth;
                        const scrollSpeed = 50; // pixels per second
                        const animationDuration = Math.max(width / scrollSpeed, 20);

                        // Position scrolls: both start at left: 0
                        // scroll2 is offset by width using CSS variable so it appears right after scroll1
                        scroll1.style.left = `0px`;
                        scroll2.style.left = `0px`;
                        scroll2.style.setProperty('--scroll-width', `${width}px`);

                        scroll1.style.animationDuration = `${animationDuration}s`;
                        scroll2.style.animationDuration = `${animationDuration}s`;
                        scroll2.style.animationDelay = `-${animationDuration / 2}s`;
                    }
                });

                $('#supportersBannerBottom').style.display = 'block';
            }
        } catch (error) {
            // Log detailed error for debugging
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                console.warn('Supporters API: CORS or network error. Make sure your Cloudflare Worker includes CORS headers:', {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
            } else {
                console.error('Error loading supporters:', error);
            }
            $('#supportersBannerTop').style.display = 'none';
            $('#supportersBannerBottom').style.display = 'none';
        }
    }

    // Load supporters when DOM is ready and then every hour
    function initSupporters() {
        // Initial load
        loadSupporters();

        // Refresh every hour (3600000 milliseconds)
        setInterval(loadSupporters, 3600000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSupporters);
    } else {
        initSupporters();
    }
})();



