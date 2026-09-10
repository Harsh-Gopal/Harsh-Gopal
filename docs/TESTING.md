# Testing & QA Checklist

The following checklists were used to verify application stability, performance, and gameplay logic during the QA Phase.

## Application & Routing
- [x] Application compiles successfully (`npm run build`).
- [x] Zero ESLint or TypeScript errors (`npm run lint`).
- [x] `/` redirects to `/arcade` correctly.
- [x] Arcade hub renders correctly with valid links to all three games.
- [x] No missing assets or 404s.

## Tic-Tac-Toe
- [x] Board initializes correctly.
- [x] Player can click empty squares to place an "X".
- [x] AI responds correctly based on difficulty setting.
- [x] Hard mode AI (Minimax) never loses.
- [x] Win detection properly attributes victory to Player or AI.
- [x] Draw detection works when board is full and no winner exists.
- [x] Score tracking increments correctly across multiple rounds.
- [x] Restart functionality resets the board without breaking state.

## Tetris
- [x] 10x20 Grid renders correctly.
- [x] Tetrominoes spawn at the top center.
- [x] Arrow keys successfully move pieces left/right and drop faster.
- [x] Up arrow correctly rotates pieces.
- [x] Wall and floor collision detection works accurately.
- [x] Hard drop (Spacebar) immediately locks piece at the lowest valid position.
- [x] Completed rows clear, existing blocks drop down, and score/level updates.
- [x] "Next Piece" preview renders correctly.
- [x] Game Over triggers when pieces stack to the top.
- [x] Pause functionality successfully suspends the game loop.
- [x] Mobile on-screen controls fire correct events.

## Dino Run
- [x] Game initializes with ground, player, and waiting state.
- [x] Spacebar or Up Arrow initiates jump sequence.
- [x] Procedural obstacles spawn outside the right viewport and move left.
- [x] Hitbox collision accurately detects overlap between player and obstacles.
- [x] Score increments over time; speed progressively increases.
- [x] High score tracking updates upon Game Over.
- [x] Restart properly resets player Y, velocity, and clears old obstacles.

## Responsive & Accessibility
- [x] Terminal UI layout prevents unwanted horizontal scroll at 320px.
- [x] Touch targets on mobile are adequately sized.
- [x] Game screens utilize responsive padding to remain playable on tablets/laptops.
- [x] Semantic HTML and standard contrast ratios maintained against the dark background.

## Performance
- [x] `requestAnimationFrame` loops cleanly cancel when navigating away or resetting.
- [x] React state dependencies managed to prevent excessive cascading renders.
