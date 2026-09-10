# Harsh Gopal // Developer System Profile

A premium, animated developer portfolio directly integrated with a GitHub profile README, utilizing a unified retro Macintosh aesthetic.

## Purpose
To create a highly distinctive, custom developer identity that serves as a visually striking engineering portfolio. The goal is to move beyond generic static templates and present a memorable first impression for recruiters, peers, and collaborators, showcasing technical depth through an abstract, ambient visual language.

## Concept
The project combines a minimal, retro computer aesthetic inspired by early windowed operating systems (like Macintosh) with modern AI engineering concepts. It integrates standard developer portfolio sections (About, Tech Stack, Currently Building) completely through original SVG diagrams embedded in the `README.md`.

## Goals
- Provide a visually stunning GitHub README that stands out.
- Ensure animations are ambient, smooth, and do not distract.
- Utilize self-contained SVGs that work perfectly within GitHub's markdown rendering limits.
- Automatically support both dark and light modes via CSS `@media (prefers-color-scheme)`.

## Technology Stack
- **Languages**: SVG, CSS, JavaScript (for GitHub Action generation)
- **CI/CD**: GitHub Actions
- **Visuals**: Handcrafted SVG vector graphics and CSS keyframe animations.

## Local Preview
To preview the SVG rendering and test dark/light themes without pushing to GitHub, you can use the built-in static preview environment.

Start a lightweight local server from the repository root:
```bash
python3 -m http.server 4173
```

Then open your browser to:
http://localhost:4173/preview/

The preview page replicates GitHub's markdown rendering structure and loads the production SVG assets. It includes a developer toolbar (top right) to toggle between:
- Light / Dark mode
- Normal / Reduced Motion
