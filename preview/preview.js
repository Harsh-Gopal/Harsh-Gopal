document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const body = document.body;
    const themeSelect = document.getElementById('theme-select');
    const motionBtn = document.getElementById('motion-btn');

    // ── Theme Switcher ──────────────────────────────────────────────────────
    // All <picture class="preview-pic"> elements will respond to theme changes.
    // The JS overrides the <source media="..."> attribute to force light or dark.

    function applyTheme(mode) {
        body.setAttribute('data-theme', mode);
        html.setAttribute('data-theme', mode);

        const pictures = document.querySelectorAll('picture.preview-pic');
        pictures.forEach(pic => {
            const sources = pic.querySelectorAll('source');
            sources.forEach(source => {
                // Cache the original media value on first run
                const originalMedia = source.getAttribute('data-original-media') || source.getAttribute('media');
                if (!source.hasAttribute('data-original-media')) {
                    source.setAttribute('data-original-media', originalMedia);
                }

                if (mode === 'system') {
                    source.setAttribute('media', originalMedia);
                } else if (mode === 'light') {
                    // Disable the dark source so the light fallback <img> is used
                    source.setAttribute('media', '(max-width: 0px)');
                } else if (mode === 'dark') {
                    // Activate the dark source unconditionally
                    source.setAttribute('media', 'all');
                }
            });
        });
    }

    themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
    // Apply default on load
    applyTheme(themeSelect.value);

    // ── Reduced Motion Toggle ───────────────────────────────────────────────
    motionBtn.addEventListener('click', () => {
        if (html.getAttribute('data-reduce-motion') === 'true') {
            html.removeAttribute('data-reduce-motion');
            motionBtn.textContent = 'Toggle Reduced Motion';
        } else {
            html.setAttribute('data-reduce-motion', 'true');
            motionBtn.textContent = 'Enable Motion';
        }
    });

    // ── Cursor Parallax (Preview-Only) ──────────────────────────────────────
    // Updates CSS custom properties tracked by preview.css ::before grid layer.
    let rafId = null;
    document.addEventListener('mousemove', (e) => {
        if (html.getAttribute('data-reduce-motion') === 'true') return;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            // Normalize to [-1, 1]
            const x = (e.clientX / window.innerWidth)  * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            html.style.setProperty('--mouse-x', x);
            html.style.setProperty('--mouse-y', y);
        });
    });
});
