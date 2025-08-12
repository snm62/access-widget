(function() {
    'use strict';
    
    // Configuration
    const config = {
        position: 'bottom-left', // Changed to bottom-left
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
            this.createWidget();
            this.createPanel();
            this.bindEvents();
            this.loadSettings();
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
                            <p class="profile-description">Assists with reading and focusing</p>
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
                            <p class="profile-description">Reduces distractions and helps focus</p>
                        </div>
                    </div>
                    
                    <div class="accessibility-section">
                        <div class="profile-item">
                            <div class="profile-header">
                                <h4>Blind Users Profile</h4>
                                <div class="toggle-switch">
                                    <input type="checkbox" id="blind-toggle" aria-label="Toggle Blind Users Profile">
                                    <label for="blind-toggle">
                                        <span class="toggle-off">OFF</span>
                                        <span class="toggle-on">ON</span>
                                    </label>
                                </div>
                            </div>
                            <p class="profile-description">Compatible with screen readers</p>
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
                // Apply seizure safe features
                document.body.classList.add('accessibility-seizure-safe');
                localStorage.setItem('accessibility-seizure-safe', 'true');
                
                // Disable animations and reduce motion
                this.disableAnimations();
                this.reduceMotion();
                this.safeColors();
            } else {
                // Remove seizure safe features
                document.body.classList.remove('accessibility-seizure-safe');
                localStorage.setItem('accessibility-seizure-safe', 'false');
                
                // Re-enable animations
                this.enableAnimations();
            }
        },

        disableAnimations() {
            // Disable CSS animations and transitions
            const style = document.createElement('style');
            style.id = 'seizure-safe-styles';
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
                
                /* Disable flashing elements */
                * {
                    animation: none !important;
                    transition: none !important;
                }
                
                /* Remove any blinking or flashing */
                @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 1; } }
                @keyframes flash { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 1; } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 1; } }
            `;
            document.head.appendChild(style);
        },

        reduceMotion() {
            // Add reduced motion support
            const style = document.createElement('style');
            style.id = 'reduced-motion-styles';
            style.textContent = `
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
            `;
            document.head.appendChild(style);
        },

        safeColors() {
            // Apply safe color combinations
            const style = document.createElement('style');
            style.id = 'safe-colors-styles';
            style.textContent = `
                .accessibility-seizure-safe {
                    /* Use high contrast, non-flashing colors */
                    color: #000000 !important;
                    background-color: #ffffff !important;
                }
                
                .accessibility-seizure-safe a {
                    color: #0000EE !important;
                }
                
                .accessibility-seizure-safe a:visited {
                    color: #551A8B !important;
                }
                
                /* Remove any bright flashing colors */
                .accessibility-seizure-safe * {
                    background-color: #ffffff !important;
                    color: #000000 !important;
                }
            `;
            document.head.appendChild(style);
        },

        enableAnimations() {
            // Remove seizure safe styles
            const seizureStyles = document.getElementById('seizure-safe-styles');
            const motionStyles = document.getElementById('reduced-motion-styles');
            const colorStyles = document.getElementById('safe-colors-styles');
            
            if (seizureStyles) seizureStyles.remove();
            if (motionStyles) motionStyles.remove();
            if (colorStyles) colorStyles.remove();
        },

        toggleVisionImpaired(enabled) {
            if (enabled) {
                document.body.classList.add('accessibility-vision-impaired');
                localStorage.setItem('accessibility-vision-impaired', 'true');
            } else {
                document.body.classList.remove('accessibility-vision-impaired');
                localStorage.setItem('accessibility-vision-impaired', 'false');
            }
        },

        resetAll() {
            // Remove all classes
            document.body.classList.remove(
                'accessibility-seizure-safe',
                'accessibility-vision-impaired'
            );
            
            // Reset toggles
            document.getElementById('seizure-safe-toggle').checked = false;
            document.getElementById('vision-impaired-toggle').checked = false;
            
            // Remove styles
            this.enableAnimations();
            
            // Clear localStorage
            localStorage.removeItem('accessibility-seizure-safe');
            localStorage.removeItem('accessibility-vision-impaired');
        },

        loadSettings() {
            // Load seizure safe setting
            const seizureSafe = localStorage.getItem('accessibility-seizure-safe');
            if (seizureSafe === 'true') {
                document.getElementById('seizure-safe-toggle').checked = true;
                this.toggleSeizureSafe(true);
            }

            // Load vision impaired setting
            const visionImpaired = localStorage.getItem('accessibility-vision-impaired');
            if (visionImpaired === 'true') {
                document.getElementById('vision-impaired-toggle').checked = true;
                this.toggleVisionImpaired(true);
            }
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AccessibilityWidget.init());
    } else {
        AccessibilityWidget.init();
    }
})();
