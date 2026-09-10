# Architecture

The project leverages a standard Next.js App Router setup with a unified structure that houses both the web application (Arcade) and the static GitHub Profile assets.

## Repository Structure

```
Harsh-Gopal/
├── README.md                 # Static GitHub profile presentation
├── package.json              # Project dependencies and scripts
├── public/
│   └── greeting.svg          # Animated, JS-free SVG generated via script
├── scripts/
│   └── generate-greeting.js  # Node script to create the SVG greeting
├── src/
│   ├── app/
│   │   ├── page.tsx          # Root route (redirects to /arcade)
│   │   ├── layout.tsx        # Global layout & fonts
│   │   ├── globals.css       # Tailwind v4 configuration and design tokens
│   │   ├── arcade/           # Main Arcade landing hub
│   │   └── games/
│   │       ├── tic-tac-toe/  # Game 1
│   │       ├── tetris/       # Game 2
│   │       └── dino/         # Game 3
│   └── lib/
│       └── games/            # Separated game logic (e.g., tetris.ts)
```

## Application Flow

```text
GitHub Profile
      |
      v
README.md (Static Markdown + SVG)
      |
      v
[ ENTER THE ARCADE Link ]
      |
      v
Next.js App: /arcade (Game Hub)
      |
      +---- /games/tic-tac-toe (React state + Minimax logic)
      |
      +---- /games/tetris (React Hooks + Custom Matrix logic)
      |
      +---- /games/dino (React state + requestAnimationFrame physics)
```

## Component Organization & Game Engine Separation
Whenever possible, game engines (like Tetris board manipulation and collision detection) are separated into `src/lib/games/`. The UI components inside `src/app/games/` simply manage React rendering cycles and user input binding, ensuring code remains clean, testable, and performant.
