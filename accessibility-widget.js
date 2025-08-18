class AccessibilityWidget {
    constructor() {
        this.settings = {};
        this.init();
    }

    init() {
        this.createWidget();
        this.loadSettings();
        this.bindEvents();
        this.applySettings();
    }

    createWidget() {
        // Create accessibility icon
        const icon = document.createElement('div');
        icon.id = 'accessibility-icon';
        icon.className = 'accessibility-icon';
        icon.innerHTML = '<i class="fas fa-universal-access"></i>';
        document.body.appendChild(icon);

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

        // Add Font Awesome if not present
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(fontAwesome);
        }
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

            <div class="search-bar">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Unclear content? Search in dictionary...">
                <i class="fas fa-chevron-down"></i>
            </div>

            <div class="profiles-section">
                <h3>Choose the right accessibility profile for you</h3>
                
                ${this.getProfileItems()}
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

    getProfileItems() {
        const profiles = [
            { id: 'seizure-safe', icon: 'fas fa-bolt', title: 'Seizure Safe Profile', desc: 'Clear flashes & reduces color' },
            { id: 'vision-impaired', icon: 'fas fa-eye', title: 'Vision Impaired Profile', desc: 'Enhances website\'s visuals' },
            { id: 'adhd-friendly', icon: 'fas fa-layer-group', title: 'ADHD Friendly Profile', desc: 'More focus & fewer distractions' },
            { id: 'cognitive-disability', icon: 'fas fa-bullseye', title: 'Cognitive Disability Profile', desc: 'Assists with reading & focusing' },
            { id: 'keyboard-nav', icon: 'fas fa-arrow-right', title: 'Keyboard Navigation (Motor)', desc: 'Use website with the keyboard' },
            { id: 'screen-reader', icon: 'fas fa-headphones', title: 'Blind Users Screen Reader', desc: 'Screen reader compatibility' },
            { id: 'content-scaling', icon: 'fas fa-expand-arrows-alt', title: 'Content Scaling', desc: 'Responsive to browser zoom' },
            { id: 'readable-font', icon: 'fas fa-font', title: 'Readable Font', desc: 'High-legibility fonts' },
            { id: 'highlight-titles', icon: 'fas fa-heading', title: 'Highlight Titles', desc: 'Visual emphasis on headings' },
            { id: 'highlight-links', icon: 'fas fa-link', title: 'Highlight Links', desc: 'Clear link identification' },
            { id: 'text-magnifier', icon: 'fas fa-search-plus', title: 'Text Magnifier', desc: 'Floating magnifying glass tool' },
            { id: 'font-sizing', icon: 'fas fa-text-height', title: 'Adjust Font Sizing', desc: 'Percentage-based scaling' },
            { id: 'align-center', icon: 'fas fa-align-center', title: 'Align Center', desc: 'Center-aligns all text content' },
            { id: 'adjust-line-height', icon: 'fas fa-arrows-alt-v', title: 'Adjust Line Height', desc: 'Increases spacing between lines' },
            { id: 'adjust-letter-spacing', icon: 'fas fa-text-width', title: 'Adjust Letter Spacing', desc: 'Increases character spacing' },
            { id: 'align-left', icon: 'fas fa-align-left', title: 'Align Left', desc: 'Left-aligns text content' },
            { id: 'align-right', icon: 'fas fa-align-right', title: 'Align Right', desc: 'Right-aligns text content' },
            { id: 'dark-contrast', icon: 'fas fa-moon', title: 'Dark Contrast', desc: 'Dark background with light text' },
            { id: 'light-contrast', icon: 'fas fa-sun', title: 'Light Contrast', desc: 'Light background with dark text' },
            { id: 'high-contrast', icon: 'fas fa-adjust', title: 'High Contrast', desc: 'Maximum contrast implementation' },
            { id: 'high-saturation', icon: 'fas fa-palette', title: 'High Saturation', desc: 'Increases color intensity' },
            { id: 'adjust-text-colors', icon: 'fas fa-paint-brush', title: 'Adjust Text Colors', desc: 'Color picker functionality' },
            { id: 'monochrome', icon: 'fas fa-circle', title: 'Monochrome', desc: 'Removes all colors except black, white, grays' },
            { id: 'adjust-title-colors', icon: 'fas fa-heading', title: 'Adjust Title Colors', desc: 'Color customization for headings' },
            { id: 'low-saturation', icon: 'fas fa-tint', title: 'Low Saturation', desc: 'Reduces color intensity' },
            { id: 'adjust-bg-colors', icon: 'fas fa-fill-drip', title: 'Adjust Background Colors', desc: 'Background color customization' },
            { id: 'mute-sound', icon: 'fas fa-volume-mute', title: 'Mute Sound', desc: 'Disables all audio content' },
            { id: 'hide-images', icon: 'fas fa-image', title: 'Hide Images', desc: 'Toggle to hide all images' },
            { id: 'read-mode', icon: 'fas fa-book-open', title: 'Read Mode', desc: 'Removes navigation elements' },
            { id: 'reading-guide', icon: 'fas fa-highlighter', title: 'Reading Guide', desc: 'Movable highlight bar' },
            { id: 'useful-links', icon: 'fas fa-external-link-alt', title: 'Useful Links', desc: 'Accessibility resources compilation' },
            { id: 'stop-animation', icon: 'fas fa-pause', title: 'Stop Animation', desc: 'Pauses all CSS animations' },
            { id: 'reading-mask', icon: 'fas fa-mask', title: 'Reading Mask', desc: 'Semi-transparent overlay' },
            { id: 'highlight-hover', icon: 'fas fa-mouse-pointer', title: 'Highlight Hover', desc: 'Visual feedback on hover' },
            { id: 'highlight-focus', icon: 'fas fa-crosshairs', title: 'Highlight Focus', desc: 'Prominent focus indicators' },
            { id: 'big-black-cursor', icon: 'fas fa-mouse', title: 'Big Black Cursor', desc: 'Increases cursor size' },
            { id: 'big-white-cursor', icon: 'fas fa-mouse', title: 'Big White Cursor', desc: 'Increases cursor size' }
        ];

        return profiles.map(profile => `
            <div class="profile-item">
                <div class="profile-info">
                    <i class="${profile.icon}"></i>
                    <div>
                        <h4>${profile.title}</h4>
                        <p>${profile.desc}</p>
                    </div>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" id="${profile.id}">
                    <span class="slider"></span>
                </label>
            </div>
        `).join('');
    }

    bindEvents() {
        // Toggle panel
        document.getElementById('accessibility-icon').addEventListener('click', () => {
            this.togglePanel();
        });

        // Close panel
        document.getElementById('close-panel').addEventListener('click', () => {
            this.togglePanel();
        });

        // Overlay click
        document.getElementById('accessibility-overlay').addEventListener('click', () => {
            this.togglePanel();
        });

        // Reset settings
        document.getElementById('reset-settings').addEventListener('click', () => {
            this.resetSettings();
        });

        // Hide interface
        document.getElementById('hide-interface').addEventListener('click', () => {
            this.togglePanel();
        });

        // Statement
        document.getElementById('statement').addEventListener('click', () => {
            this.showStatement();
        });

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
    }

    togglePanel() {
        const panel = document.getElementById('accessibility-panel');
        const overlay = document.getElementById('accessibility-overlay');
        
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            panel.classList.add('active');
            overlay.classList.add('active');
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
document.addEventListener('DOMContentLoaded', () => {
    accessibilityWidget = new AccessibilityWidget();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        accessibilityWidget = new AccessibilityWidget();
    });
} else {
    accessibilityWidget = new AccessibilityWidget();
}
