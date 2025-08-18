(function() {
    'use strict';
    
    // Configuration
    const config = {
        position: 'bottom-right',
        theme: 'light',
        language: 'en',
        features: {
            seizureSafe: true,
            fontSize: true,
            contrast: true,
            grayscale: true,
            highContrast: true,
            negativeContrast: true,
            lightBackground: true,
            links: true,
            fontFamily: true,
            cursor: true,
            readingGuide: true,
            screenReader: true,
            keyboardNavigation: true
        }
    };

    // Accessibility features implementation
    const AccessibilityWidget = {
        init() {
            // Clean up any existing elements first
            const existingSpotlights = document.querySelectorAll('#adhd-spotlight, [id*="spotlight"], [class*="spotlight"]');
            existingSpotlights.forEach(element => {
                element.remove();
            });
            
            this.createWidget();
            this.createPanel();
            this.bindEvents();
            this.loadSettings();
            this.focusLight = null;
        },

        createWidget() {
            const widget = document.createElement('div');
            widget.id = 'accessibility-widget';
            widget.innerHTML = `
                <button id="accessibility-toggle" aria-label="Accessibility Menu" title="Accessibility Menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </button>
            `;
            document.body.appendChild(widget);
        },

        createPanel() {
            const panel = document.createElement('div');
            panel.id = 'accessibility-panel';
            panel.innerHTML = `
                <div class="accessibility-header">
                    <button id="reset-settings" aria-label="Reset Settings">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                        </svg>
                        Reset Settings
                    </button>
                    <button id="statement" aria-label="Statement">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                        </svg>
                        Statement
                    </button>
                    <button id="hide-interface" aria-label="Hide Interface">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        Hide Interface
                    </button>
                </div>
                
                <div class="search-section">
                    <div class="search-container">
                        <input type="text" id="search-content" placeholder="Q Unclear content? Search in dictionary..." aria-label="Search unclear content in dictionary">
                        <button id="search-dropdown" aria-label="Search options">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="accessibility-content">
                    <h3>Choose the right accessibility profile for you</h3>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>Seizure Safe Profile</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="seizure-safe-toggle" aria-label="Toggle Seizure Safe Profile">
                                    <label for="seizure-safe-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">Clear flashes & reduces color</p>
                            <p class="profile-details">This profile enables epileptic and seizure prone users to browse safely by eliminating the risk of seizures that result from flashing or blinking animations and risky color combinations.</p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>Vision Impaired Profile</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="vision-impaired-toggle" aria-label="Toggle Vision Impaired Profile">
                                    <label for="vision-impaired-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">Enhances website's visuals</p>
                            <p class="profile-details">This profile adjusts the website, so that it is accessible to the majority of visual impairments such as Degrading Eyesight, Tunnel Vision, Cataract, Glaucoma, and others.</p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>ADHD Friendly Profile</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="adhd-toggle" aria-label="Toggle ADHD Friendly Profile">
                                    <label for="adhd-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">More focus & fewer distractions</p>
                            <p class="profile-details">This profile significantly reduces distractions, to help people with ADHD and Neurodevelopmental disorders browse, read, and focus on the essential elements of the website more easily.</p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>Cognitive Disability Profile</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="cognitive-toggle" aria-label="Toggle Cognitive Disability Profile">
                                    <label for="cognitive-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">Assists with reading & focusing</p>
                            <p class="profile-details">This profile provides various assistive features to help users with cognitive disabilities such as Autism, Dyslexia, CVA, and others, to focus on the essential elements of the website more easily.</p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>Keyboard Navigation (Motor)</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="keyboard-toggle" aria-label="Toggle Keyboard Navigation">
                                    <label for="keyboard-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">Use website with the keyboard</p>
                            <p class="profile-details">This profile enables motor-impaired persons to operate the website using the keyboard Tab, Shift+Tab, and the Enter keys. Users can also use shortcuts such as 'M' (menus), 'H' (headings), 'F' (forms), 'B' (buttons), and 'G' (graphics) to jump to specific elements.</p>
                            <p class="profile-note"><strong>Note:</strong> This profile prompts automatically for keyboard users.</p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>Blind Users (Screen Reader)</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="blind-toggle" aria-label="Toggle Blind Users Profile">
                                    <label for="blind-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">Optimize website for screen-readers</p>
                            <p class="profile-details">This profile adjusts the website to be compatible with screen-readers such as JAWS, NVDA, VoiceOver, and TalkBack. A screen-reader is software that is installed on the blind user's computer and smartphone, and websites should ensure compatibility with it.</p>
                            <p class="profile-note"><strong>Note:</strong> This profile prompts automatically to screen-readers.</p>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(panel);
        },

        bindEvents() {
            // Toggle panel
            document.getElementById('accessibility-toggle').addEventListener('click', () => {
                this.togglePanel();
            });

            // Hide interface
            document.getElementById('hide-interface').addEventListener('click', () => {
                this.hidePanel();
            });

            // Reset settings
            document.getElementById('reset-settings').addEventListener('click', () => {
                this.resetAll();
            });

            // Seizure Safe Profile
            document.getElementById('seizure-safe-toggle').addEventListener('change', (e) => {
                this.toggleSeizureSafe(e.target.checked);
            });

            // Vision Impaired Profile
            document.getElementById('vision-impaired-toggle').addEventListener('change', (e) => {
                this.toggleVisionImpaired(e.target.checked);
            });

            // ADHD Friendly Profile
            document.getElementById('adhd-toggle').addEventListener('change', (e) => {
                this.toggleADHD(e.target.checked);
            });

            // Cognitive Disability Profile
            document.getElementById('cognitive-toggle').addEventListener('change', (e) => {
                this.toggleCognitive(e.target.checked);
            });

            // Keyboard Navigation
            document.getElementById('keyboard-toggle').addEventListener('change', (e) => {
                this.toggleKeyboardNavigation(e.target.checked);
            });

            // Blind Users Profile
            document.getElementById('blind-toggle').addEventListener('change', (e) => {
                this.toggleBlindUsers(e.target.checked);
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('#accessibility-widget') && 
                    !e.target.closest('#accessibility-panel')) {
                    this.hidePanel();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hidePanel();
                }
            });

            // Mouse movement for focus light
            document.addEventListener('mousemove', (e) => {
                if (this.focusLight && document.body.classList.contains('acsb-adhd-profile')) {
                    this.updateFocusLight(e.clientX, e.clientY);
                }
            });
        },

        togglePanel() {
            const panel = document.getElementById('accessibility-panel');
            panel.classList.toggle('active');
        },

        hidePanel() {
            const panel = document.getElementById('accessibility-panel');
            panel.classList.remove('active');
        },

        toggleSeizureSafe(enabled) {
            if (enabled) {
                document.body.classList.add('acsb-seizure-safe');
                localStorage.setItem('accessibility-seizure-safe', 'true');
                this.applySeizureSafeStyles();
            } else {
                document.body.classList.remove('acsb-seizure-safe');
                localStorage.setItem('accessibility-seizure-safe', 'false');
                this.removeSeizureSafeStyles();
            }
        },

        applySeizureSafeStyles() {
            this.removeSeizureSafeStyles();
            
            const style = document.createElement('style');
            style.id = 'seizure-safe-styles';
            style.textContent = `
                /* Subtle grey layer over the website */
                body:not(#accessibility-widget):not(#accessibility-panel):not(#adhd-spotlight)::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(128, 128, 128, 0.1);
                    z-index: 9997;
                    pointer-events: none;
                }
                
                /* WCAG 2.1 Level AAA Compliance - Three Flashes or Below Threshold */
                *:not(#accessibility-widget):not(#accessibility-panel):not(#adhd-spotlight) {
                    animation: none !important;
                    transition: none !important;
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    animation-fill-mode: forwards !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                /* Block all CSS animations and transitions */
                *, *::before, *::after {
                    animation: none !important;
                    transition: none !important;
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                /* Override all keyframe animations to prevent flashing */
                @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 1; } }
                @keyframes flash { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 1; } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 1; } }
                @keyframes fadeIn { from { opacity: 1; } to { opacity: 1; } }
                @keyframes fadeOut { from { opacity: 1; } to { opacity: 1; } }
                @keyframes slideIn { from { transform: none; } to { transform: none; } }
                @keyframes slideOut { from { transform: none; } to { transform: none; } }
                @keyframes bounce { 0%, 100% { transform: none; } 50% { transform: none; } }
                @keyframes shake { 0%, 100% { transform: none; } 25%, 75% { transform: none; } }
                @keyframes spin { from { transform: none; } to { transform: none; } }
                @keyframes rotate { from { transform: none; } to { transform: none; } }
                @keyframes scale { from { transform: none; } to { transform: none; } }
                @keyframes move { from { transform: none; } to { transform: none; } }
                
                /* Prevent any hover effects that might cause flashing */
                body:not(#accessibility-widget):not(#accessibility-panel):not(#adhd-spotlight) *:hover {
                    animation: none !important;
                    transition: none !important;
                }
                
                /* Block any JavaScript animations */
                body:not(#accessibility-widget):not(#accessibility-panel):not(#adhd-spotlight) * {
                    animation-play-state: paused !important;
                }
                
                /* Ensure accessibility widget remains functional */
                #accessibility-widget,
                #accessibility-panel,
                #adhd-spotlight {
                    animation: none !important;
                    transition: none !important;
                }
                
                #accessibility-widget *,
                #accessibility-panel *,
                #adhd-spotlight * {
                    animation: none !important;
                    transition: none !important;
                }
            `;
            document.head.appendChild(style);
            
            // Additional JavaScript to prevent any dynamic flashing
            this.preventDynamicFlashing();
        },

        preventDynamicFlashing() {
            // Override any existing animation/transition styles
            const allElements = document.querySelectorAll('*:not(#accessibility-widget):not(#accessibility-panel):not(#adhd-spotlight)');
            allElements.forEach(element => {
                element.style.animation = 'none';
                element.style.transition = 'none';
                element.style.animationDuration = '0.01ms';
                element.style.transitionDuration = '0.01ms';
                element.style.animationIterationCount = '1';
            });
            
            // Monitor for dynamically added elements
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && !node.closest('#accessibility-widget, #accessibility-panel, #adhd-spotlight')) {
                            node.style.animation = 'none';
                            node.style.transition = 'none';
                            node.style.animationDuration = '0.01ms';
                            node.style.transitionDuration = '0.01ms';
                            node.style.animationIterationCount = '1';
                        }
                    });
                });
            });
            
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            // Store observer for cleanup
            this.seizureSafeObserver = observer;
        },

        removeSeizureSafeStyles() {
            const style = document.getElementById('seizure-safe-styles');
            if (style) {
                style.remove();
            }
            
            // Clean up observer
            if (this.seizureSafeObserver) {
                this.seizureSafeObserver.disconnect();
                this.seizureSafeObserver = null;
            }
            
            // Remove inline styles from elements
            const allElements = document.querySelectorAll('*:not(#accessibility-widget):not(#accessibility-panel):not(#adhd-spotlight)');
            allElements.forEach(element => {
                element.style.removeProperty('animation');
                element.style.removeProperty('transition');
                element.style.removeProperty('animation-duration');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('animation-iteration-count');
            });
        },

        toggleVisionImpaired(enabled) {
            if (enabled) {
                document.body.classList.add('acsb-vision-profile');
                localStorage.setItem('accessibility-vision-impaired', 'true');
                this.applyVisionImpairedStyles();
            } else {
                document.body.classList.remove('acsb-vision-profile');
                localStorage.setItem('accessibility-vision-impaired', 'false');
                this.removeVisionImpairedStyles();
            }
        },

        applyVisionImpairedStyles() {
            this.removeVisionImpairedStyles();
            
            const style = document.createElement('style');
            style.id = 'vision-impaired-styles';
            style.textContent = `
                body:not(access-widget-ui):not([data-acsb]) {
                    zoom: 1.16 !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) * {
                    font-family: Arial, Helvetica, sans-serif !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) {
                    color: #000000 !important;
                    background-color: #ffffff !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) a {
                    color: #0000EE !important;
                    text-decoration: underline !important;
                }
                
                /* Increased contrast */
                body:not(access-widget-ui):not([data-acsb]) {
                    filter: contrast(1.3) !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) * {
                    filter: contrast(1.3) !important;
                }
                
                /* Ensure accessibility elements are not affected */
                #accessibility-widget,
                #accessibility-panel {
                    filter: none !important;
                }
                
                #accessibility-widget *,
                #accessibility-panel * {
                    filter: none !important;
                }
            `;
            document.head.appendChild(style);
        },

        removeVisionImpairedStyles() {
            const style = document.getElementById('vision-impaired-styles');
            if (style) {
                style.remove();
            }
        },

        toggleADHD(enabled) {
            if (enabled) {
                document.body.classList.add('acsb-adhd-profile');
                localStorage.setItem('accessibility-adhd', 'true');
                this.applyADHDStyles();
                this.createSpotlightFocus();
            } else {
                document.body.classList.remove('acsb-adhd-profile');
                localStorage.setItem('accessibility-adhd', 'false');
                this.removeADHDStyles();
                this.removeSpotlightFocus();
                
                // Extra cleanup for any leftover spotlight elements
                const existingSpotlights = document.querySelectorAll('#adhd-spotlight, [id*="spotlight"], [class*="spotlight"]');
                existingSpotlights.forEach(element => {
                    element.remove();
                });
                
                // Remove any CSS custom properties
                document.documentElement.style.removeProperty('--spotlight-top');
            }
        },

        createSpotlightFocus() {
            this.removeSpotlightFocus();
            
            // Create spotlight border lines only
            this.focusLight = document.createElement('div');
            this.focusLight.id = 'adhd-spotlight';
            this.focusLight.style.cssText = `
                position: fixed;
                width: 100%;
                height: 150px;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.15s ease;
                border-top: 3px solid rgba(255, 255, 255, 0.8);
                border-bottom: 3px solid rgba(255, 255, 255, 0.8);
                box-shadow: 
                    0 0 20px rgba(255, 255, 255, 0.3),
                    inset 0 0 20px rgba(255, 255, 255, 0.1);
            `;
            
            document.body.appendChild(this.focusLight);
            this.updateFocusLight(window.innerWidth / 2, window.innerHeight / 2);
        },

        updateFocusLight(x, y) {
            if (this.focusLight) {
                const top = y - 75;
                this.focusLight.style.top = top + 'px';
                
                // Update CSS custom property for the mask
                document.documentElement.style.setProperty('--spotlight-top', y + 'px');
            }
        },

        removeSpotlightFocus() {
            if (this.focusLight) {
                this.focusLight.remove();
                this.focusLight = null;
            }
        },

        applyADHDStyles() {
            this.removeADHDStyles();
            
            const style = document.createElement('style');
            style.id = 'adhd-styles';
            style.textContent = `
                body:not(access-widget-ui):not([data-acsb]) {
                    font-family: Arial, Helvetica, sans-serif !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) * {
                    background-image: none !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) video {
                    display: none !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) p,
                body:not(access-widget-ui):not([data-acsb]) h1,
                body:not(access-widget-ui):not([data-acsb]) h2,
                body:not(access-widget-ui):not([data-acsb]) h3,
                body:not(access-widget-ui):not([data-acsb]) h4,
                body:not(access-widget-ui):not([data-acsb]) h5,
                body:not(access-widget-ui):not([data-acsb]) h6 {
                    line-height: 1.6 !important;
                    margin-bottom: 1em !important;
                }
                
                /* Increased contrast */
                body:not(access-widget-ui):not([data-acsb]) {
                    filter: contrast(1.3) !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) * {
                    filter: contrast(1.3) !important;
                }
                
                /* Create a mask that makes everything darker except the spotlight area */
                body:not(access-widget-ui):not([data-acsb])::before {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    z-index: 9998;
                    pointer-events: none;
                    mask: linear-gradient(to bottom, 
                        black 0%, 
                        black calc(var(--spotlight-top, 50%) - 75px), 
                        transparent calc(var(--spotlight-top, 50%) - 75px), 
                        transparent calc(var(--spotlight-top, 50%) + 75px), 
                        black calc(var(--spotlight-top, 50%) + 75px), 
                        black 100%);
                    -webkit-mask: linear-gradient(to bottom, 
                        black 0%, 
                        black calc(var(--spotlight-top, 50%) - 75px), 
                        transparent calc(var(--spotlight-top, 50%) - 75px), 
                        transparent calc(var(--spotlight-top, 50%) + 75px), 
                        black calc(var(--spotlight-top, 50%) + 75px), 
                        black 100%);
                }
                
                /* Make the spotlight area much brighter */
                body:not(access-widget-ui):not([data-acsb])::after {
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(255, 255, 255, 0.3);
                    z-index: 9996;
                    pointer-events: none;
                    mask: linear-gradient(to bottom, 
                        transparent 0%, 
                        transparent calc(var(--spotlight-top, 50%) - 75px), 
                        black calc(var(--spotlight-top, 50%) - 75px), 
                        black calc(var(--spotlight-top, 50%) + 75px), 
                        transparent calc(var(--spotlight-top, 50%) + 75px), 
                        transparent 100%);
                    -webkit-mask: linear-gradient(to bottom, 
                        transparent 0%, 
                        transparent calc(var(--spotlight-top, 50%) - 75px), 
                        black calc(var(--spotlight-top, 50%) - 75px), 
                        black calc(var(--spotlight-top, 50%) + 75px), 
                        transparent calc(var(--spotlight-top, 50%) + 75px), 
                        transparent 100%);
                }
                
                /* Ensure accessibility elements are not affected */
                #accessibility-widget,
                #accessibility-panel,
                #adhd-spotlight {
                    filter: none !important;
                    z-index: 9999 !important;
                }
                
                #accessibility-widget *,
                #accessibility-panel *,
                #adhd-spotlight * {
                    filter: none !important;
                }
            `;
            document.head.appendChild(style);
        },

        removeADHDStyles() {
            const style = document.getElementById('adhd-styles');
            if (style) {
                style.remove();
            }
        },

        toggleCognitive(enabled) {
            if (enabled) {
                document.body.classList.add('acsb-cognitive-profile');
                localStorage.setItem('accessibility-cognitive', 'true');
                this.applyCognitiveStyles();
            } else {
                document.body.classList.remove('acsb-cognitive-profile');
                localStorage.setItem('accessibility-cognitive', 'false');
                this.removeCognitiveStyles();
            }
        },

        applyCognitiveStyles() {
            this.removeCognitiveStyles();
            
            const style = document.createElement('style');
            style.id = 'cognitive-styles';
            style.textContent = `
                body:not(access-widget-ui):not([data-acsb]) {
                    font-family: Arial, Helvetica, sans-serif !important;
                    font-size: 18px !important;
                    line-height: 1.8 !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) p {
                    margin-bottom: 1.5em !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) a {
                    text-decoration: underline !important;
                    color: #0000EE !important;
                }
                
                body:not(access-widget-ui):not([data-acsb]) *:focus {
                    outline: 3px solid #0000EE !important;
                    outline-offset: 2px !important;
                }
                
                /* Add boxes around all interactive elements */
                body:not(access-widget-ui):not([data-acsb]) button,
                body:not(access-widget-ui):not([data-acsb]) input,
                body:not(access-widget-ui):not([data-acsb]) select,
                body:not(access-widget-ui):not([data-acsb]) textarea,
                body:not(access-widget-ui):not([data-acsb]) a,
                body:not(access-widget-ui):not([data-acsb]) h1,
                body:not(access-widget-ui):not([data-acsb]) h2,
                body:not(access-widget-ui):not([data-acsb]) h3,
                body:not(access-widget-ui):not([data-acsb]) h4,
                body:not(access-widget-ui):not([data-acsb]) h5,
                body:not(access-widget-ui):not([data-acsb]) h6,
                body:not(access-widget-ui):not([data-acsb]) li,
                body:not(access-widget-ui):not([data-acsb]) label,
                body:not(access-widget-ui):not([data-acsb]) [role="button"],
                body:not(access-widget-ui):not([data-acsb]) [role="link"],
                body:not(access-widget-ui):not([data-acsb]) [role="menuitem"],
                body:not(access-widget-ui):not([data-acsb]) [role="tab"],
                body:not(access-widget-ui):not([data-acsb]) [role="option"] {
                    border: 2px solid #0066CC !important;
                    border-radius: 4px !important;
                    padding: 4px 8px !important;
                    margin: 2px !important;
                    background-color: rgba(0, 102, 204, 0.05) !important;
                }
                
                /* Ensure accessibility elements are not affected */
                #accessibility-widget,
                #accessibility-panel {
                    border: none !important;
                    background-color: transparent !important;
                }
                
                #accessibility-widget *,
                #accessibility-panel * {
                    border: none !important;
                    background-color: transparent !important;
                }
            `;
            document.head.appendChild(style);
        },

        removeCognitiveStyles() {
            const style = document.getElementById('cognitive-styles');
            if (style) {
                style.remove();
            }
        },

        toggleKeyboardNavigation(enabled) {
            if (enabled) {
                document.body.classList.add('acsb-keyboard-profile');
                localStorage.setItem('accessibility-keyboard', 'true');
                this.applyKeyboardNavigationStyles();
                this.setupKeyboardShortcuts();
            } else {
                document.body.classList.remove('acsb-keyboard-profile');
                localStorage.setItem('accessibility-keyboard', 'false');
                this.removeKeyboardNavigationStyles();
                this.removeKeyboardShortcuts();
            }
        },

        applyKeyboardNavigationStyles() {
            this.removeKeyboardNavigationStyles();
            
            const style = document.createElement('style');
            style.id = 'keyboard-navigation-styles';
            style.textContent = `
                /* Enhanced focus indicators */
                body:not(access-widget-ui):not([data-acsb]) *:focus {
                    outline: 3px solid #0066CC !important;
                    outline-offset: 2px !important;
                    background-color: rgba(0, 102, 204, 0.1) !important;
                }
                
                /* Skip links */
                .skip-link {
                    position: absolute;
                    top: -40px;
                    left: 6px;
                    background: #0066CC;
                    color: white;
                    padding: 8px;
                    text-decoration: none;
                    border-radius: 4px;
                    z-index: 10000;
                }
                
                .skip-link:focus {
                    top: 6px;
                }
                
                /* Ensure accessibility elements are not affected */
                #accessibility-widget,
                #accessibility-panel {
                    outline: none !important;
                    background-color: transparent !important;
                }
                
                #accessibility-widget *,
                #accessibility-panel * {
                    outline: none !important;
                    background-color: transparent !important;
                }
            `;
            document.head.appendChild(style);
        },

        removeKeyboardNavigationStyles() {
            const style = document.getElementById('keyboard-navigation-styles');
            if (style) {
                style.remove();
            }
        },

        setupKeyboardShortcuts() {
            // Remove existing shortcuts
            this.removeKeyboardShortcuts();
            
            // Add keyboard shortcuts
            this.keyboardShortcuts = (e) => {
                if (e.altKey) {
                    switch(e.key.toLowerCase()) {
                        case 'm':
                            e.preventDefault();
                            this.focusElement('[role="menu"], nav, .menu, .navigation');
                            break;
                        case 'h':
                            e.preventDefault();
                            this.focusElement('h1, h2, h3, h4, h5, h6');
                            break;
                        case 'f':
                            e.preventDefault();
                            this.focusElement('form, input, select, textarea');
                            break;
                        case 'b':
                            e.preventDefault();
                            this.focusElement('button, [role="button"]');
                            break;
                        case 'g':
                            e.preventDefault();
                            this.focusElement('img, svg, canvas, [role="img"]');
                            break;
                    }
                }
            };
            
            document.addEventListener('keydown', this.keyboardShortcuts);
        },

        removeKeyboardShortcuts() {
            if (this.keyboardShortcuts) {
                document.removeEventListener('keydown', this.keyboardShortcuts);
                this.keyboardShortcuts = null;
            }
        },

        focusElement(selector) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                elements[0].focus();
                elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },

        toggleBlindUsers(enabled) {
            if (enabled) {
                document.body.classList.add('acsb-blind-profile');
                localStorage.setItem('accessibility-blind', 'true');
                this.applyBlindUsersStyles();
            } else {
                document.body.classList.remove('acsb-blind-profile');
                localStorage.setItem('accessibility-blind', 'false');
                this.removeBlindUsersStyles();
            }
        },

        applyBlindUsersStyles() {
            this.removeBlindUsersStyles();
            
            const style = document.createElement('style');
            style.id = 'blind-users-styles';
            style.textContent = `
                /* Screen reader optimizations */
                body:not(access-widget-ui):not([data-acsb]) {
                    /* Ensure proper heading structure */
                }
                
                /* Add ARIA labels where missing */
                body:not(access-widget-ui):not([data-acsb]) img:not([alt]) {
                    position: relative;
                }
                
                body:not(access-widget-ui):not([data-acsb]) img:not([alt])::after {
                    content: attr(data-alt, 'Image');
                    position: absolute;
                    left: -9999px;
                    width: 1px;
                    height: 1px;
                    overflow: hidden;
                }
                
                /* Ensure proper focus management */
                body:not(access-widget-ui):not([data-acsb]) *:focus {
                    outline: 3px solid #0066CC !important;
                    outline-offset: 2px !important;
                }
                
                /* Ensure accessibility elements are not affected */
                #accessibility-widget,
                #accessibility-panel {
                    outline: none !important;
                }
                
                #accessibility-widget *,
                #accessibility-panel * {
                    outline: none !important;
                }
            `;
            document.head.appendChild(style);
            
            // Add missing ARIA labels
            this.addMissingARIALabels();
        },

        removeBlindUsersStyles() {
            const style = document.getElementById('blind-users-styles');
            if (style) {
                style.remove();
            }
        },

        addMissingARIALabels() {
            // Add alt text to images without alt
            const images = document.querySelectorAll('img:not([alt])');
            images.forEach((img, index) => {
                if (!img.hasAttribute('alt')) {
                    img.setAttribute('alt', `Image ${index + 1}`);
                }
            });
            
            // Add labels to form elements without labels
            const inputs = document.querySelectorAll('input:not([id]):not([aria-label]):not([aria-labelledby])');
            inputs.forEach((input, index) => {
                if (!input.hasAttribute('aria-label')) {
                    input.setAttribute('aria-label', `Input field ${index + 1}`);
                }
            });
        },

        resetAll() {
            document.body.classList.remove(
                'acsb-seizure-safe',
                'acsb-vision-profile',
                'acsb-adhd-profile',
                'acsb-cognitive-profile',
                'acsb-keyboard-profile',
                'acsb-blind-profile'
            );
            
            document.getElementById('seizure-safe-toggle').checked = false;
            document.getElementById('vision-impaired-toggle').checked = false;
            document.getElementById('adhd-toggle').checked = false;
            document.getElementById('cognitive-toggle').checked = false;
            document.getElementById('keyboard-toggle').checked = false;
            document.getElementById('blind-toggle').checked = false;
            
            this.removeSeizureSafeStyles();
            this.removeVisionImpairedStyles();
            this.removeADHDStyles();
            this.removeCognitiveStyles();
            this.removeKeyboardNavigationStyles();
            this.removeBlindUsersStyles();
            this.removeSpotlightFocus();
            this.removeKeyboardShortcuts();
            
            // Extra cleanup for any leftover spotlight elements
            const existingSpotlights = document.querySelectorAll('#adhd-spotlight, [id*="spotlight"], [class*="spotlight"]');
            existingSpotlights.forEach(element => {
                element.remove();
            });
            
            // Remove any CSS custom properties
            document.documentElement.style.removeProperty('--spotlight-top');
            
            localStorage.removeItem('accessibility-seizure-safe');
            localStorage.removeItem('accessibility-vision-impaired');
            localStorage.removeItem('accessibility-adhd');
            localStorage.removeItem('accessibility-cognitive');
            localStorage.removeItem('accessibility-keyboard');
            localStorage.removeItem('accessibility-blind');
        },

        loadSettings() {
            const seizureSafe = localStorage.getItem('accessibility-seizure-safe');
            if (seizureSafe === 'true') {
                document.getElementById('seizure-safe-toggle').checked = true;
                this.toggleSeizureSafe(true);
            }

            const visionImpaired = localStorage.getItem('accessibility-vision-impaired');
            if (visionImpaired === 'true') {
                document.getElementById('vision-impaired-toggle').checked = true;
                this.toggleVisionImpaired(true);
            }

            const adhd = localStorage.getItem('accessibility-adhd');
            if (adhd === 'true') {
                document.getElementById('adhd-toggle').checked = true;
                this.toggleADHD(true);
            }

            const cognitive = localStorage.getItem('accessibility-cognitive');
            if (cognitive === 'true') {
                document.getElementById('cognitive-toggle').checked = true;
                this.toggleCognitive(true);
            }

            const keyboard = localStorage.getItem('accessibility-keyboard');
            if (keyboard === 'true') {
                document.getElementById('keyboard-toggle').checked = true;
                this.toggleKeyboardNavigation(true);
            }

            const blind = localStorage.getItem('accessibility-blind');
            if (blind === 'true') {
                document.getElementById('blind-toggle').checked = true;
                this.toggleBlindUsers(true);
            }
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccessibilityWidget.init());
    } else {
        AccessibilityWidget.init();
    }
})();
