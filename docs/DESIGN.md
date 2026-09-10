# Design System

The visual design language across the README relies on the concepts of:
1. **Retro Macintosh Geometry**: Restrained, deliberate use of visual elements, thin borders, square corners, and simple controls.
2. **Pixel-grid Construction**: The fundamental unit of the design is the square pixel. Clusters, grids, and matrices are used to imply technical depth and structure.
3. **Ambient Motion**: Smooth, looping, slow animations (e.g. `opacity`, `transform`) using CSS keyframes directly within SVGs.

## Typography
- **Primary Text & Code**: `monospace` (System monospace font such as Courier, Consolas, or SF Mono).
- **Hierarchy**: All uppercase section headers, subtle monospace text for technical data.

## Color Palette
The colors are managed directly inside the SVGs via CSS variables mapping to system themes:
- **Light Mode**: Off-white background `#fcfcfc`, charcoal borders `#222222`, muted accent `#0044cc`.
- **Dark Mode**: Dark charcoal background `#0d1117`, light gray borders `#444c56`, bright accent `#58a6ff`.

## Design Rules for Maintainers / AI Agents
- **No Arcade**: Do not bring back the interactive arcade Next.js app.
- **No Neon Cyberpunk**: Do not use highly saturated neon colors or generic hacker aesthetics.
- **No Generic Badges**: Do not use simple shield.io badge collections.
- **No External JavaScript**: Do not use Next.js, React, or JavaScript running in the browser for visuals. SVGs must be strictly self-contained.
- **Preserve the Pixel Grid**: Any new designs must utilize the pixel grid and geometric styling.

## DESIGN QA
Checklist:
- [ ] No arcade
- [ ] No game UI
- [ ] No clock
- [ ] No date
- [ ] No fake macOS lock screen
- [ ] No generic badge wall
- [ ] No neon cyberpunk aesthetic
- [ ] Pixel-grid identity preserved
- [ ] Retro-computer aesthetic preserved
- [ ] Hero animation works
- [ ] Dark mode works
- [ ] Light mode works
- [ ] Mobile layout works
- [ ] SVG assets remain lightweight
- [ ] README works without JavaScript
- [ ] Project information is accurate
- [ ] No dead links
## Visual Regression Checklist

### DARK

- [ ] Hero dark
- [ ] Cart Radar dark
- [ ] MySphere dark
- [ ] System Status dark
- [ ] System Components dark
- [ ] Activity dark
- [ ] Selected Work readable

### LIGHT

- [ ] Hero light
- [ ] Cart Radar light
- [ ] MySphere light
- [ ] System Status light
- [ ] System Components light
- [ ] Activity light
- [ ] Selected Work readable

### Rendering

- [ ] No SVG clipping
- [ ] No SVG overflow
- [ ] No mixed themes
- [ ] No broken text
- [ ] No missing assets
- [ ] No animation glitches
- [ ] No preview-only controls in README

### GitHub

- [ ] README renders correctly
- [ ] Dark GitHub renders correctly
- [ ] Light GitHub renders correctly
- [ ] All links work
- [ ] SVG assets load
- [ ] Activity workflow works
