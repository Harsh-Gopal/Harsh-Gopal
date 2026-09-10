# README Design Philosophy

The `README.md` acts as the gateway to the developer identity. Standard GitHub profiles often devolve into noisy walls of badges and statistics. This profile is an intentional departure from that trend.

## Visual Hierarchy
1. **The Multilingual Greeting**: We immediately establish a global, welcoming presence through a custom CSS-animated SVG that cycles through greetings. This bypasses GitHub's restriction on arbitrary JavaScript while keeping the top of the profile dynamic.
2. **The Name Treatment**: "ＨＡＲＳＨ　ＧＯＰＡＬ" utilizes full-width alphanumeric characters. This subtly evokes an East Asian/Cyberpunk aesthetic without inappropriately misusing actual Chinese/Kanji characters.
3. **The Terminal Quote**: Establishes the engineering focus ("Building intelligent software for a smarter tomorrow").
4. **Structured Content**: Sections for "About", "Currently Building", and "Tech Stack" are deliberately sparse. They highlight only the most critical information, avoiding bloat.
5. **The Arcade CTA**: A clear, distinct visual button drawing users out of the static README and into the interactive Next.js application.

## Constraints
Because GitHub sanitizes README files heavily (stripping JS, `style` tags, and external CSS), all "dynamic" visual elements inside the README must be pre-rendered or handled via self-contained SVGs. The `greeting.svg` is generated programmatically during the build step, ensuring it is always perfectly aligned with the repository's font choices.
