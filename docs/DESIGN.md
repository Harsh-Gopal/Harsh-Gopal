# Design System

The visual design language across the README and Arcade relies on the concepts of:
1. **Premium Minimalism**: Restrained, deliberate use of visual elements without clutter.
2. **Terminal Aesthetics**: Monospace fonts, bracketed interfaces, high-contrast text.
3. **East Asian Influence**: Distinctive geometric characters (via Noto Sans SC) that add an architectural feel to the typography.

## Typography
- **Primary Reading**: `Inter`
- **Terminal & Code**: `JetBrains Mono`
- **Accents/Asian Script**: `Noto Sans SC`

## Color Palette
The colors are managed directly inside Tailwind's v4 `@theme inline` structure within `globals.css`:
- **Backgrounds**: `var(--color-background)` - pitch black `#050505`.
- **Foregrounds**: `var(--color-foreground)` - off-white `#fafafa`.
- **Neutrals**: Sleek grays `#121212`, `#1e1e1e`, `#404040` for borders, unused elements, and shadows.
- **Accent**: Cyan/Teal `#00E5FF` used for active states, terminal headers, and highlight glows.

## Layout & Spacing
- Borders are sharply rounded (2px to 4px) mimicking hardware screens.
- Generous padding ensures the text feels open despite the dark background.
- UI elements emphasize borders over solid fill to maintain the lightweight terminal feel.

## Animation Principles
- Reduced motion: Avoid excessive slide-ins or bouncing.
- Transitions: Focus on opacity and subtle color changes (hover states, focus rings).
- The SVG greeting utilizes simple CSS keyframe opacity and transform cycling to maintain elegance.
