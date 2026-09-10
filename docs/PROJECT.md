# PROFILE SYSTEM SPECIFICATION

## 1. Project Overview

This repository contains the GitHub profile README for Harsh Gopal.

The profile is designed as an original retro-computer developer interface rather than a conventional GitHub README.

The visual identity combines:

- retro Macintosh-era computer aesthetics
- pixel-grid graphics
- geometric system diagrams
- terminal-inspired typography
- technical interface panels
- subtle ambient animation
- modern AI-engineering identity

The goal is to make the GitHub profile feel like entering a small, living computer system while keeping the content professional, readable, and recruiter-friendly.

The profile is not a game, application, or separate website.

The GitHub README itself is the primary experience.

---

## 2. Design Philosophy

The design is inspired by the visual language of classic Macintosh-era computing and the animated retro-computer wallpaper aesthetic.

The project does NOT copy Apple's artwork or interface directly.

Instead, it creates an original visual language based on:

- pixel grids
- geometric structures
- retro computer windows
- technical diagrams
- monochrome surfaces
- muted accent colors
- system diagnostics
- terminal interfaces
- architectural diagrams
- ambient motion

The visual style should feel like:

RETRO COMPUTER
+
MODERN SOFTWARE ENGINEERING
+
AI SYSTEMS

The design should feel experimental and distinctive without becoming cyberpunk, gaming-oriented, or visually noisy.

---

## 3. Brand Identity

Primary identity:

HARSH GOPAL

Role:

AI ENGINEER // FULL-STACK

Core statement:

"Building intelligent software for a smarter tomorrow"

Terminal identity:

$ echo "Building intelligent software for a smarter tomorrow"

The profile should communicate:

- AI engineering
- agentic AI
- full-stack development
- intelligent software
- experimentation
- systems thinking
- technical depth

---

## 4. Profile Architecture

The README is organized into six primary sections.

### HERO

Animated retro system environment introducing:

HARSH GOPAL

AI ENGINEER // FULL-STACK

and the terminal statement.

The hero establishes the visual identity.

### 01 / ABOUT

A concise professional introduction explaining Harsh's focus on AI engineering, agentic AI systems, full-stack development, backend infrastructure, and premium frontend interfaces.

### 02 / CURRENTLY BUILDING

Visual representations of current projects.

Primary projects:

- Cart Radar
- MySphere

These are represented through retro system architecture diagrams.

### 03 / SYSTEM STATUS

A diagnostic-style system panel showing:

AI SYSTEMS       ONLINE
AGENTIC AI       ACTIVE
FULL-STACK       ONLINE
BUILD PIPELINE   RUNNING

These are visual status indicators and should not be interpreted as literal production metrics.

### 04 / SYSTEM COMPONENTS

Technical stack represented through a retro configuration/system panel.

Categories:

- Languages
- Frontend
- Backend
- Databases
- AI
- Tools

The section prioritizes readability over excessive animation.

### 05 / SELECTED WORK

A recruiter-friendly application/project index containing selected projects and their technology stacks.

Primary projects include:

- Cart Radar
- MySphere
- Adaptive 3D Gameplay

Project links must always use real repository URLs.

### 06 / SYSTEM ACTIVITY

A GitHub contribution visualization represented as a retro contribution matrix.

The matrix is based on actual contribution data and uses intensity levels to represent activity.

---

## 5. Visual System

The primary visual primitive is the square pixel.

Pixels are used to construct:

- letters
- geometric structures
- windows
- diagrams
- system indicators
- activity cells
- signal paths

The pixel language should remain consistent across the entire profile.

---

## 6. Animation System

Animation is ambient rather than interactive in the production README.

Each animation should have semantic meaning.

### Hero

Pixel assembly and transformation.

Conceptual sequence:

PIXEL FIELD
→
GEOMETRIC STRUCTURE
→
SYSTEM WINDOW
→
IDENTITY
→
TERMINAL
→
SYSTEM READY
→
TRANSITION

### Cart Radar

Data packets move through:

SOURCE
→
INGESTION
→
API / LOGIC
→
CLIENT

### MySphere

Signals move between:

MAC
ANDROID
WINDOWS

through the synchronization layer.

### System Status

A subtle diagnostic scan indicates system activity.

### System Components

A restrained configuration scan moves through system categories.

### System Activity

Contribution cells represent actual GitHub activity.

A subtle scan may pass through the matrix.

### Selected Work

No continuous animation is required.

The content should remain easy to scan.

---

## 7. Cursor Interaction

The production GitHub README must not rely on JavaScript.

GitHub does not provide arbitrary JavaScript execution inside README content.

Therefore:

### Production

Uses:

- Markdown
- SVG
- animated SVG
- GitHub Actions

### Local Preview

May provide richer interaction using:

- cursor-responsive pixel parallax
- subtle grid movement
- node highlighting
- small depth/parallax effects

These interactions exist only to improve design testing.

They must never be required for the production README.

The cursor interaction should be subtle and technical.

It must never become a gaming effect.

---

## 8. Theme System

The profile supports:

LIGHT
DARK

Theme selection follows the user's system/browser appearance.

The intended architecture is:

Operating System
→
Browser
→
prefers-color-scheme
→
GitHub appearance
→
appropriate profile SVG

No clock-based switching is used.

No JavaScript time detection is used.

No date is displayed.

The light theme should feel like a warm retro workstation.

The dark theme should feel like a dark retro computer environment.

Both themes must belong to the same visual system.

---

## 9. Color System

Colors are intentionally restrained.

Dark theme:

- deep charcoal
- muted gray
- soft white
- muted blue
- restrained green
- restrained amber

Light theme:

- warm off-white
- graphite
- dark gray
- muted blue
- restrained green
- restrained amber

The profile must not become neon cyberpunk.

The colors support the geometry rather than becoming the primary visual attraction.

---

## 10. SVG Architecture

SVGs are used because they provide:

- scalability
- GitHub compatibility
- lightweight graphics
- animation
- theme variants
- no JavaScript dependency

SVGs should primarily use portable elements such as:

- rect
- path
- line
- polyline
- circle
- text
- group
- transform
- opacity

Avoid:

- foreignObject
- JavaScript
- canvas
- WebGL
- browser-specific features
- unnecessarily complex filters

---

## 11. Production Asset Rules

Every production SVG must:

- render correctly on GitHub
- support the correct theme
- remain readable without animation
- remain reasonably lightweight
- use the common design language
- avoid unnecessary decoration

Production assets must not depend on local preview code.

---

## 12. Local Preview

The local preview exists to reproduce the GitHub README composition.

Start it with:

python3 -m http.server 4173

Open:

http://localhost:4173/preview/

Preview controls may include:

- System theme
- Light theme
- Dark theme
- Reduced motion

The preview may also provide cursor-responsive effects.

These controls are development-only.

They must never appear in README.md.

---

## 13. System Activity

System Activity is a visual representation of GitHub contribution history.

The activity generator should use actual GitHub contribution data.

The contribution matrix should contain:

- contribution cells
- intensity levels
- subtle grid
- minimal labels
- restrained animation

It should resemble a GitHub contribution calendar while maintaining the retro-computer aesthetic.

The GitHub Action periodically regenerates the activity asset.

---

## 14. GitHub Actions

GitHub Actions are used for generated dynamic assets such as contribution activity.

The workflow should:

1. retrieve contribution information
2. generate the visual asset
3. update the repository asset
4. commit only when necessary

The workflow must avoid unnecessary commits.

---

## 15. Accessibility

SVG alt text should communicate the purpose of meaningful visuals.

Examples:

"Animated retro system interface introducing Harsh Gopal"

"Cart Radar architecture visualization"

"MySphere cross-device system visualization"

"GitHub contribution activity matrix"

Decorative graphics may use empty alt text where appropriate.

---

## 16. Responsive Design

The profile must remain readable at:

1440px
1200px
1024px
768px
600px
480px
375px

SVG text must not:

- clip
- overlap
- overflow
- become unreadable

Mobile readability is more important than preserving unnecessary visual complexity.

---

## 17. Design Rules

Always preserve:

- retro computer identity
- pixel-grid language
- geometric system diagrams
- terminal aesthetic
- restrained colors
- ambient motion
- strong whitespace
- readable typography

Never add:

- arcade
- games
- clock
- date
- visitor counters
- badge walls
- generic GitHub stats spam
- neon cyberpunk effects
- random widgets
- unnecessary SVGs
- fake macOS lock screen
- JavaScript-dependent production graphics

---

## 18. Design Hierarchy

Visual importance should follow:

1. HERO
2. CURRENTLY BUILDING
3. SYSTEM STATUS
4. SYSTEM COMPONENTS
5. SELECTED WORK
6. SYSTEM ACTIVITY

The hero is the primary visual statement.

Lower sections should support the identity rather than compete with it.

---

## 19. Core Design Principle

The profile should feel like:

"A custom retro computer system built around a modern AI engineer."

The visitor should feel that the profile is a coherent environment rather than a collection of unrelated GitHub widgets.

The visual story is:

PIXELS
↓
SYSTEM
↓
IDENTITY
↓
AI ENGINEERING
↓
PROJECTS
↓
ACTIVITY

---

## 20. FINAL PROFILE DESIGN

The final implementation of this profile strictly adheres to the principles above, creating a coherent, professional, and visually striking retro-computer environment.

1. **Hero**: Features an animated retro system environment introducing the developer's identity, role, and terminal statement.
2. **About**: Reverted to the precise, professional phrasing that visually bridges the hero and the project sections.
3. **Currently Building**: Uses clean SVG architectural diagrams to showcase Cart Radar and MySphere.
4. **System Status**: A diagnostic-style panel showing active system indicators.
5. **System Components**: A wide configuration panel that lists technical stack categories in a highly readable format.
6. **Selected Work**: A recruiter-friendly list styled as an application index. Selected Work is intentionally implemented as a lightweight application-directory presentation rather than another SVG widget.
7. **System Activity**: A real contribution visualization. System Activity represents actual GitHub contribution data and is designed to resemble a retro contribution monitor while remaining recognizable as a contribution calendar.
8. **Animation Philosophy**: The small animated dot underneath component SVGs was removed because it became repetitive and did not communicate meaningful system state. Semantic animations like data packets and diagnostic sweeps remain.
9. **Theme Architecture**: Leverages `<picture>` and `<source>` tags to seamlessly switch between Light and Dark themes based on OS preferences without JavaScript.
10. **Preview Architecture**: A lightweight local preview environment (`preview/index.html`) using HTML/CSS/JS. Cursor-reactive effects, where present, are preview-only. 
11. **Production GitHub Limitations**: Production GitHub rendering remains completely JavaScript-free. No iframes or external dependencies are required.
