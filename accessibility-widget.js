class AccessibilityWidget {
    constructor() {
        this.settings = {};
        console.log('Accessibility Widget: Initializing...'); // Debug log
        this.init();
    }

    init() {
        this.addFontAwesome();
        this.createWidget();
        this.loadSettings();
        this.bindEvents();
        this.applySettings();
        console.log('Accessibility Widget: Initialized successfully'); // Debug log
    }

    addFontAwesome() {
        // Add Font Awesome CSS if not already present
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(fontAwesome);
            console.log('Accessibility Widget: Font Awesome added'); // Debug log
        }
    }

    createWidget() {
        // Create accessibility icon
        const icon = document.createElement('div');
        icon.id = 'accessibility-icon';
        icon.className = 'accessibility-icon';
        icon.innerHTML = '<i class="fas fa-universal-access"></i>';
        document.body.appendChild(icon);
        console.log('Accessibility Widget: Icon created'); // Debug log

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'accessibility-overlay';
        overlay.id = 'accessibility-overlay';
        document.body.appendChild(overlay);

        // Create panel
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        panel.innerHTML = this.getPanelHTML();
        document.body.appendChild(panel);
        console.log('Accessibility Widget: Panel created'); // Debug log
    }

    getPanelHTML() {
        return `
            <div class="panel-header">
                <div class="close-btn" id="close-panel">
                    <i class="fas fa-times"></i>
                </div>
                <div class="language-selector">
                    <span>ENGLISH</span>
                    <i class="fas fa-flag"></i>
                </div>
            </div>
            
            <h2>Accessibility Adjustments</h2>
            
            <div class="action-buttons">
                <button id="reset-settings" class="action-btn">
                    <i class="fas fa-redo"></i>
                    Reset Settings
                </button>
                <button id="statement" class="action-btn">
                    <i class="fas fa-file-alt"></i>
                    Statement
                </button>
                <button id="hide-interface" class="action-btn">
                    <i class="fas fa-eye-slash"></i>
                    Hide Interface
                </button>
            </div>

            
            <div class="profiles-section">
                <h3>Choose the right accessibility profile for you</h3>
                
                <!-- Module 1: Seizure Safe Profile -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-bolt"></i>
                        <div>
                            <h4>Seizure Safe Profile</h4>
                            <p>Clear flashes & reduces color</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="seizure-safe">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 2: Vision Impaired Profile -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-eye"></i>
                        <div>
                            <h4>Vision Impaired Profile</h4>
                            <p>Enhances website's visuals</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="vision-impaired">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 3: ADHD Friendly Profile -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-layer-group"></i>
                        <div>
                            <h4>ADHD Friendly Profile</h4>
                            <p>More focus & fewer distractions</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="adhd-friendly">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 4: Cognitive Disability Profile -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-bullseye"></i>
                        <div>
                            <h4>Cognitive Disability Profile</h4>
                            <p>Assists with reading & focusing</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="cognitive-disability">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 5: Keyboard Navigation -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-arrow-right"></i>
                        <div>
                            <h4>Keyboard Navigation (Motor)</h4>
                            <p>Use website with the keyboard</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="keyboard-nav" checked>
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 6: Blind Users Screen Reader -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-headphones"></i>
                        <div>
                            <h4>Blind Users Screen Reader</h4>
                            <p>Screen reader compatibility</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="screen-reader">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 7: Content Scaling -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-expand-arrows-alt"></i>
                        <div>
                            <h4>Content Scaling</h4>
                            <p>Responsive to browser zoom</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="content-scaling">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 8: Readable Font -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-font"></i>
                        <div>
                            <h4>Readable Font</h4>
                            <p>High-legibility fonts</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="readable-font">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 9: Highlight Titles -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-heading"></i>
                        <div>
                            <h4>Highlight Titles</h4>
                            <p>Visual emphasis on headings</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="highlight-titles">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 10: Highlight Links -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-link"></i>
                        <div>
                            <h4>Highlight Links</h4>
                            <p>Clear link identification</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="highlight-links">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 11: Text Magnifier -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-search-plus"></i>
                        <div>
                            <h4>Text Magnifier</h4>
                            <p>Floating magnifying glass tool</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="text-magnifier">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 12: Adjust Font Sizing -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-text-height"></i>
                        <div>
                            <h4>Adjust Font Sizing</h4>
                            <p>Percentage-based scaling</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="font-sizing">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 13: Align Center -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-align-center"></i>
                        <div>
                            <h4>Align Center</h4>
                            <p>Center-aligns all text content</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="align-center">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 14: Adjust Line Height -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-arrows-alt-v"></i>
                        <div>
                            <h4>Adjust Line Height</h4>
                            <p>Increases spacing between lines</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="adjust-line-height">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 15: Adjust Letter Spacing -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-text-width"></i>
                        <div>
                            <h4>Adjust Letter Spacing</h4>
                            <p>Increases character spacing</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="adjust-letter-spacing">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 16: Align Left -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-align-left"></i>
                        <div>
                            <h4>Align Left</h4>
                            <p>Left-aligns text content</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="align-left">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 17: Align Right -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-align-right"></i>
                        <div>
                            <h4>Align Right</h4>
                            <p>Right-aligns text content</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="align-right">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 18: Dark Contrast -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-moon"></i>
                        <div>
                            <h4>Dark Contrast</h4>
                            <p>Dark background with light text</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="dark-contrast">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 19: Light Contrast -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-sun"></i>
                        <div>
                            <h4>Light Contrast</h4>
                            <p>Light background with dark text</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="light-contrast">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 20: High Contrast -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-adjust"></i>
                        <div>
                            <h4>High Contrast</h4>
                            <p>Maximum contrast implementation</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="high-contrast">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 21: High Saturation -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-palette"></i>
                        <div>
                            <h4>High Saturation</h4>
                            <p>Increases color intensity</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="high-saturation">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 22: Adjust Text Colors -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-paint-brush"></i>
                        <div>
                            <h4>Adjust Text Colors</h4>
                            <p>Color picker functionality</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="adjust-text-colors">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 23: Monochrome -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-circle"></i>
                        <div>
                            <h4>Monochrome</h4>
                            <p>Removes all colors except black, white, grays</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="monochrome">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 24: Adjust Title Colors -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-heading"></i>
                        <div>
                            <h4>Adjust Title Colors</h4>
                            <p>Color customization for headings</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="adjust-title-colors">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 25: Low Saturation -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-tint"></i>
                        <div>
                            <h4>Low Saturation</h4>
                            <p>Reduces color intensity</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="low-saturation">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 26: Adjust Background Colors -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-fill-drip"></i>
                        <div>
                            <h4>Adjust Background Colors</h4>
                            <p>Background color customization</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="adjust-bg-colors">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 27: Mute Sound -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-volume-mute"></i>
                        <div>
                            <h4>Mute Sound</h4>
                            <p>Disables all audio content</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="mute-sound">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 28: Hide Images -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-image"></i>
                        <div>
                            <h4>Hide Images</h4>
                            <p>Toggle to hide all images</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="hide-images">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 29: Read Mode -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-book-open"></i>
                        <div>
                            <h4>Read Mode</h4>
                            <p>Removes navigation elements</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="read-mode">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 30: Reading Guide -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-highlighter"></i>
                        <div>
                            <h4>Reading Guide</h4>
                            <p>Movable highlight bar</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="reading-guide">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 31: Useful Links -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-external-link-alt"></i>
                        <div>
                            <h4>Useful Links</h4>
                            <p>Accessibility resources compilation</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="useful-links">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 32: Stop Animation -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-pause"></i>
                        <div>
                            <h4>Stop Animation</h4>
                            <p>Pauses all CSS animations</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="stop-animation">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 33: Reading Mask -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-mask"></i>
                        <div>
                            <h4>Reading Mask</h4>
                            <p>Semi-transparent overlay</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="reading-mask">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 34: Highlight Hover -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-mouse-pointer"></i>
                        <div>
                            <h4>Highlight Hover</h4>
                            <p>Visual feedback on hover</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="highlight-hover">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 35: Highlight Focus -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-crosshairs"></i>
                        <div>
                            <h4>Highlight Focus</h4>
                            <p>Prominent focus indicators</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="highlight-focus">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 36: Big Black Cursor -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-mouse"></i>
                        <div>
                            <h4>Big Black Cursor</h4>
                            <p>Increases cursor size</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="big-black-cursor">
                        <span class="slider"></span>
                    </label>
                </div>

                <!-- Module 37: Big White Cursor -->
                <div class="profile-item">
                    <div class="profile-info">
                        <i class="fas fa-mouse"></i>
                        <div>
                            <h4>Big White Cursor</h4>
                            <p>Increases cursor size</p>
                        </div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="big-white-cursor">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="panel-footer">
                <div>
                    <i class="fas fa-check"></i>
                    Web Accessibility By accessiBe
                </div>
                <a href="#" class="learn-more">Learn More ></a>
            </div>
        `;
    }

    bindEvents() {
        console.log('Accessibility Widget: Binding events...'); // Debug log
        
        // Toggle panel
        const icon = document.getElementById('accessibility-icon');
        if (icon) {
            icon.addEventListener('click', () => {
                console.log('Accessibility Widget: Icon clicked'); // Debug log
                this.togglePanel();
            });
        } else {
            console.error('Accessibility Widget: Icon not found!');
        }

        // Close panel
        const closeBtn = document.getElementById('close-panel');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.togglePanel();
            });
        }

        // Overlay click
        const overlay = document.getElementById('accessibility-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.togglePanel();
            });
        }

        // Reset settings
        const resetBtn = document.getElementById('reset-settings');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetSettings();
            });
        }

        // Hide interface
        const hideBtn = document.getElementById('hide-interface');
        if (hideBtn) {
            hideBtn.addEventListener('click', () => {
                this.togglePanel();
            });
        }

        // Statement
        const statementBtn = document.getElementById('statement');
        if (statementBtn) {
            statementBtn.addEventListener('click', () => {
                this.showStatement();
            });
        }

        // Bind all toggle switches
        const toggles = document.querySelectorAll('.toggle-switch input');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.handleToggle(e.target.id, e.target.checked);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePanel();
            }
        });

        // Text magnifier
        this.initTextMagnifier();
        
        console.log('Accessibility Widget: Events bound successfully'); // Debug log
    }

togglePanel() {
    console.log('Accessibility Widget: Toggling panel...');
    const panel = document.getElementById('accessibility-panel');
    
    if (panel) {
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            console.log('Accessibility Widget: Panel closed');
        } else {
            panel.classList.add('active');
            console.log('Accessibility Widget: Panel opened');
        }
    } else {
        console.error('Accessibility Widget: Panel not found!');
    }
}

    handleToggle(feature, enabled) {
        this.settings[feature] = enabled;
        this.saveSettings();
        this.applyFeature(feature, enabled);
    }

    applyFeature(feature, enabled) {
        const body = document.body;
        
        if (enabled) {
            body.classList.add(feature);
            
            // Special handling for specific features
            switch(feature) {
                case 'text-magnifier':
                    this.enableTextMagnifier();
                    break;
                case 'font-sizing':
                    this.enableFontSizing();
                    break;
                case 'adjust-text-colors':
                    this.showColorPicker('text');
                    break;
                case 'adjust-title-colors':
                    this.showColorPicker('title');
                    break;
                case 'adjust-bg-colors':
                    this.showColorPicker('background');
                    break;
                case 'useful-links':
                    this.showUsefulLinks();
                    break;
            }
        } else {
            body.classList.remove(feature);
            
            // Special handling for specific features
            switch(feature) {
                case 'text-magnifier':
                    this.disableTextMagnifier();
                    break;
                case 'font-sizing':
                    this.disableFontSizing();
                    break;
            }
        }
    }

    initTextMagnifier() {
        const magnifier = document.createElement('div');
        magnifier.className = 'magnifier';
        magnifier.id = 'text-magnifier';
        document.body.appendChild(magnifier);
    }

    enableTextMagnifier() {
        const magnifier = document.getElementById('text-magnifier');
        magnifier.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            const text = document.elementFromPoint(e.clientX, e.clientY);
            if (text && text.textContent) {
                magnifier.style.left = (e.clientX + 20) + 'px';
                magnifier.style.top = (e.clientY - 50) + 'px';
                magnifier.style.fontSize = '16px';
                magnifier.textContent = text.textContent.substring(0, 100);
            }
        });
    }

    disableTextMagnifier() {
        const magnifier = document.getElementById('text-magnifier');
        magnifier.style.display = 'none';
    }

    enableFontSizing() {
        const controls = document.createElement('div');
        controls.id = 'font-size-controls';
        controls.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 10001;
        `;
        controls.innerHTML = `
            <button onclick="accessibilityWidget.changeFontSize(0.9)">A-</button>
            <button onclick="accessibilityWidget.changeFontSize(1.1)">A+</button>
            <button onclick="accessibilityWidget.resetFontSize()">Reset</button>
        `;
        document.body.appendChild(controls);
    }

    disableFontSizing() {
        const controls = document.getElementById('font-size-controls');
        if (controls) controls.remove();
    }

    changeFontSize(factor) {
        const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
        document.body.style.fontSize = (currentSize * factor) + 'px';
    }

    resetFontSize() {
        document.body.style.fontSize = '';
    }

    showColorPicker(type) {
        const color = prompt(`Enter ${type} color (hex code):`, '#000000');
        if (color) {
            document.documentElement.style.setProperty(`--custom-${type}-color`, color);
            document.body.classList.add(`custom-${type}-color`);
        }
    }

    showUsefulLinks() {
        const links = [
            { name: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
            { name: 'WebAIM', url: 'https://webaim.org/' },
            { name: 'A11Y Project', url: 'https://www.a11yproject.com/' },
            { name: 'Color Contrast Checker', url: 'https://webaim.org/resources/contrastchecker/' }
        ];
        
        let message = 'Useful Accessibility Resources:\n\n';
        links.forEach(link => {
            message += `${link.name}: ${link.url}\n`;
        });
        
        alert(message);
    }

    showStatement() {
        alert('This website is committed to providing an accessible experience for all users. We follow WCAG 2.1 guidelines and continuously work to improve accessibility.');
    }

    resetSettings() {
        this.settings = {};
        this.saveSettings();
        this.applySettings();
        
        // Remove all accessibility classes
        const body = document.body;
        const classes = body.className.split(' ').filter(cls => 
            !cls.includes('-') || cls.includes('accessibility')
        );
        body.className = classes.join(' ');
        
        // Reset font size
        this.resetFontSize();
        
        // Disable text magnifier
        this.disableTextMagnifier();
        
        // Remove font size controls
        this.disableFontSizing();
        
        // Reset custom colors
        document.documentElement.style.removeProperty('--custom-text-color');
        document.documentElement.style.removeProperty('--custom-title-color');
        document.documentElement.style.removeProperty('--custom-bg-color');
        
        // Reset all toggles
        const toggles = document.querySelectorAll('.toggle-switch input');
        toggles.forEach(toggle => {
            toggle.checked = false;
        });
    }

    loadSettings() {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
            this.settings = JSON.parse(saved);
        }
    }

    saveSettings() {
        localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
    }

    applySettings() {
        Object.entries(this.settings).forEach(([feature, enabled]) => {
            if (enabled) {
                this.applyFeature(feature, true);
                const toggle = document.getElementById(feature);
                if (toggle) toggle.checked = true;
            }
        });
    }
}

// Initialize the widget when DOM is loaded
let accessibilityWidget;

// Wait for DOM to be ready
function initWidget() {
    console.log('Accessibility Widget: Starting initialization...'); // Debug log
    accessibilityWidget = new AccessibilityWidget();
}

// Try multiple ways to initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
} else {
    // DOM is already loaded
    initWidget();
}

// Also try with a small delay as backup
setTimeout(() => {
    if (!accessibilityWidget) {
        console.log('Accessibility Widget: Initializing with timeout...'); // Debug log
        initWidget();
    }
}, 1000);
