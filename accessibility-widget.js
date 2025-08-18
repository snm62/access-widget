(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function initAccessibilityWidget() {
        // Check if already initialized
        if (document.getElementById('accessibility-widget')) {
            return;
        }
        
        // Add styles first
        const style = document.createElement('style');
        style.textContent = `
            #accessibility-widget {
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 999999 !important;
                font-family: Arial, sans-serif !important;
            }

            #accessibility-toggle {
                width: 50px !important;
                height: 50px !important;
                border-radius: 50% !important;
                border: none !important;
                background: #007bff !important;
                color: white !important;
                cursor: pointer !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                transition: all 0.3s ease !important;
            }

            #accessibility-toggle:hover {
                background: #0056b3 !important;
                transform: scale(1.1) !important;
            }

            #accessibility-panel {
                position: fixed !important;
                top: 0 !important;
                right: -400px !important;
                width: 400px !important;
                height: 100vh !important;
                background: white !important;
                box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1) !important;
                z-index: 999998 !important;
                transition: right 0.3s ease !important;
                overflow-y: auto !important;
                font-family: Arial, sans-serif !important;
            }

            #accessibility-panel.active {
                right: 0 !important;
            }

            .accessibility-header {
                padding: 20px !important;
                border-bottom: 1px solid #eee !important;
                display: flex !important;
                gap: 10px !important;
            }

            .accessibility-header button {
                padding: 8px 12px !important;
                border: 1px solid #ddd !important;
                background: white !important;
                border-radius: 4px !important;
                cursor: pointer !important;
                font-size: 12px !important;
                display: flex !important;
                align-items: center !important;
                gap: 5px !important;
            }

            .accessibility-header button:hover {
                background: #f5f5f5 !important;
            }

            .search-section {
                padding: 20px !important;
                border-bottom: 1px solid #eee !important;
            }

            .search-container {
                position: relative !important;
            }

            #search-content {
                width: 100% !important;
                padding: 10px !important;
                border: 1px solid #ddd !important;
                border-radius: 4px !important;
                font-size: 14px !important;
            }

            #search-dropdown {
                position: absolute !important;
                right: 10px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                background: none !important;
                border: none !important;
                cursor: pointer !important;
            }

            .accessibility-content {
                padding: 20px !important;
            }

            .accessibility-content h3 {
                margin: 0 0 20px 0 !important;
                font-size: 18px !important;
                color: #333 !important;
            }

            .accessibility-section {
                margin-bottom: 20px !important;
            }

            .profile-item {
                border: 1px solid #eee !important;
                border-radius: 8px !important;
                padding: 15px !important;
            }

            .profile-header {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                margin-bottom: 10px !important;
            }

            .profile-header h4 {
                margin: 0 !important;
                font-size: 16px !important;
                color: #333 !important;
            }

            .profile-description {
                margin: 5px 0 !important;
                font-size: 14px !important;
                color: #666 !important;
            }

            .profile-details {
                margin: 10px 0 0 0 !important;
                font-size: 12px !important;
                color: #888 !important;
                line-height: 1.4 !important;
            }

            .toggle-switch {
                position: relative !important;
                width: 50px !important;
                height: 24px !important;
            }

            .toggle-switch input {
                opacity: 0 !important;
                width: 0 !important;
                height: 0 !important;
            }

            .toggle-switch label {
                position: absolute !important;
                cursor: pointer !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background-color: #ccc !important;
                transition: .4s !important;
                border-radius: 24px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 0 4px !important;
            }

            .toggle-switch label:before {
                position: absolute !important;
                content: "" !important;
                height: 18px !important;
                width: 18px !important;
                left: 3px !important;
                bottom: 3px !important;
                background-color: white !important;
                transition: .4s !important;
                border-radius: 50% !important;
            }

            .toggle-switch input:checked + label {
                background-color: #007bff !important;
            }

            .toggle-switch input:checked + label:before {
                transform: translateX(26px) !important;
            }

            .toggle-off, .toggle-on {
                font-size: 10px !important;
                font-weight: bold !important;
                color: white !important;
            }

            .toggle-off {
                margin-left: 5px !important;
            }

            .toggle-on {
                margin-right: 5px !important;
            }
        `;
        document.head.appendChild(style);
        
        // Create widget
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
        
        // Create panel
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
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        
        // Bind events
        document.getElementById('accessibility-toggle').addEventListener('click', () => {
            document.getElementById('accessibility-panel').classList.toggle('active');
        });
        
        document.getElementById('hide-interface').addEventListener('click', () => {
            document.getElementById('accessibility-panel').classList.remove('active');
        });
        
        // Seizure Safe Profile
        document.getElementById('seizure-safe-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.style.filter = 'grayscale(0.2)';
                localStorage.setItem('accessibility-seizure-safe', 'true');
            } else {
                document.body.style.filter = '';
                localStorage.setItem('accessibility-seizure-safe', 'false');
            }
        });
        
        // Vision Impaired Profile
        document.getElementById('vision-impaired-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.style.filter = 'contrast(1.1)';
                localStorage.setItem('accessibility-vision-impaired', 'true');
            } else {
                document.body.style.filter = '';
                localStorage.setItem('accessibility-vision-impaired', 'false');
            }
        });
        
        // ADHD Profile
        document.getElementById('adhd-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.style.filter = 'contrast(1.1)';
                localStorage.setItem('accessibility-adhd', 'true');
            } else {
                document.body.style.filter = '';
                localStorage.setItem('accessibility-adhd', 'false');
            }
        });
        
        // Reset settings
        document.getElementById('reset-settings').addEventListener('click', () => {
            document.body.style.filter = '';
            document.getElementById('seizure-safe-toggle').checked = false;
            document.getElementById('vision-impaired-toggle').checked = false;
            document.getElementById('adhd-toggle').checked = false;
            document.getElementById('cognitive-toggle').checked = false;
            localStorage.removeItem('accessibility-seizure-safe');
            localStorage.removeItem('accessibility-vision-impaired');
            localStorage.removeItem('accessibility-adhd');
            localStorage.removeItem('accessibility-cognitive');
        });
        
        // Load saved settings
        if (localStorage.getItem('accessibility-seizure-safe') === 'true') {
            document.getElementById('seizure-safe-toggle').checked = true;
            document.body.style.filter = 'grayscale(0.2)';
        }
        if (localStorage.getItem('accessibility-vision-impaired') === 'true') {
            document.getElementById('vision-impaired-toggle').checked = true;
            document.body.style.filter = 'contrast(1.1)';
        }
        if (localStorage.getItem('accessibility-adhd') === 'true') {
            document.getElementById('adhd-toggle').checked = true;
            document.body.style.filter = 'contrast(1.1)';
        }
        
        console.log('Accessibility widget initialized successfully!');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccessibilityWidget);
    } else {
        initAccessibilityWidget();
    }
    
    // Also try to initialize after a short delay as backup
    setTimeout(initAccessibilityWidget, 1000);
})();
