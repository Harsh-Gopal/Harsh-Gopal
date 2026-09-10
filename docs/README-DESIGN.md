# README Design Philosophy

The `README.md` acts as the gateway to the developer identity. Standard GitHub profiles often devolve into noisy walls of badges and statistics. This profile is an intentional departure from that trend, designed as a premium, animated retro computer system interface.

## Why SVG?
SVG is used as the foundational visual technology because:
- **GitHub README compatibility**: GitHub strips out JavaScript and complex CSS styles from Markdown, but natively renders SVG images.
- **Self-contained animations**: CSS keyframes (`@keyframes`) inside an SVG file will animate successfully inside GitHub's rendering engine without any external JavaScript runtime.
- **Scalable graphics**: Vector art ensures pixel-perfect clarity.
- **Dark/Light Modes**: By utilizing `@media (prefers-color-scheme: dark)` directly inside the SVG's `<style>` tag, the assets automatically adapt to the user's GitHub theme preference.

## Animation System
- **Pixel Grid**: Subtly drawn lines or squares create depth.
- **Terminal Animation**: A typing effect is achieved through CSS `clip-path` and `width` animations.
- **Status Animation**: System nodes pulse slowly and scanlines move continuously across the visuals.
- All animations are designed to be slow and ambient so they do not distract from the reading experience.

## Asset Structure
- **SVGs**: Located in the `public/` directory (e.g. `hero.svg`, `cartradar.svg`, `status.svg`).
- **Activity**: `public/activity.svg` is generated programmatically via a GitHub Action located in `.github/workflows/generate-activity.yml`.

## Maintenance
To update the skills, text, or projects in the profile, directly edit the corresponding SVG file in the `public/` folder. The `README.md` file itself only maps to these images and provides a clean structural layout with whitespace.
