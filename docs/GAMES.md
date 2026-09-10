# Games Documentation

## Tic-Tac-Toe
- **AI Implementation**: Uses a recursive Minimax algorithm for the "Hard" difficulty, ensuring the AI never loses.
- **Difficulty Levels**: Easy (random), Medium (blocks winning moves), Hard (perfect play).
- **Aesthetic**: Implements custom SVG path animations to simulate a handwritten "ink" effect.

## Tetris
- **Board Architecture**: Standard 10x20 matrix using a stateful 2D array.
- **Tetrominoes**: Standard 7 bags (I, J, L, O, S, T, Z) with custom coloring.
- **Collision Detection**: Matrix intersection testing for boundaries and placed blocks.
- **Rotation**: Matrix transposition and reversal (Super Rotation System Lite).
- **Scoring**: Standard Nintendo scoring system.
- **State Machine**: Uses `requestAnimationFrame` with a stabilized ref for the game loop to prevent React cascading update tearing.

## Dino Runner
- **Chromium-Derived Engine**: Built using the actual open-source Chromium T-Rex Runner code.
- **License**: BSD-3-Clause
- **Attribution**: Copyright (c) 2014 The Chromium Authors. Extracted by @liuwayong (wayou/t-rex-runner).
- **React Integration**: The monolithic vanilla JS engine is dynamically imported on the client side (`src/lib/games/dino-engine.js`) and bound to a targeted React `div` wrapper.
- **Rendering**: Authentic Canvas rendering using the original `offline-sprite.png` HDPI assets.
- **Gameplay**: Features jumping, ducking, pterodactyls, day/night transitions, and increasing speed scaling.
