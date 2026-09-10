document.addEventListener('DOMContentLoaded', () => {
    // 1. Load SVGs inline so CSS variables can cascade in the preview
    const containers = document.querySelectorAll('.svg-container');
    
    Promise.all(Array.from(containers).map(container => {
        const src = container.getAttribute('data-src');
        return fetch(src)
            .then(res => res.text())
            .then(svgText => {
                // Remove the strict `@media (prefers-color-scheme)` wrapper from the SVG 
                // ONLY for the local preview so we can force the theme via parent CSS.
                // In production, GitHub respects the OS setting natively.
                let modifiedSvg = svgText.replace(/@media \(prefers-color-scheme:\s*dark\)\s*\{([\s\S]*?)\}/, '$1');
                
                // Also modify root variables to cascade from the parent html[data-theme]
                modifiedSvg = modifiedSvg.replace(/:root\s*\{([\s\S]*?)\}/, '/* root removed for preview cascade */');
                
                container.innerHTML = modifiedSvg;
            });
    })).then(() => {
        console.log("SVGs loaded and prepared for theme overriding.");
    });

    // 2. Setup Controls
    const html = document.documentElement;
    const themeBtn = document.getElementById('theme-btn');
    const motionBtn = document.getElementById('motion-btn');

    themeBtn.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            themeBtn.textContent = 'Toggle Dark Mode';
        } else {
            html.setAttribute('data-theme', 'dark');
            themeBtn.textContent = 'Toggle Light Mode';
        }
    });

    motionBtn.addEventListener('click', () => {
        if (html.getAttribute('data-reduce-motion') === 'true') {
            html.removeAttribute('data-reduce-motion');
            motionBtn.textContent = 'Toggle Reduced Motion';
        } else {
            html.setAttribute('data-reduce-motion', 'true');
            motionBtn.textContent = 'Enable Motion';
        }
    });
});
