const fs = require('fs');
const path = require('path');

// A simple script to generate a retro-style "SYSTEM ACTIVITY" pixel matrix
// In a full implementation, this could fetch from GitHub's GraphQL API.
// For now, it generates an aesthetic 52x7 matrix mimicking contribution graphs,
// seeded randomly to simulate activity, with some "always active" structural nodes.

const cols = 52;
const rows = 7;
const cellSize = 10;
const gap = 2;
const width = cols * (cellSize + gap) + 40;
const height = rows * (cellSize + gap) + 40;

let rects = '';

for (let x = 0; x < cols; x++) {
  for (let y = 0; y < rows; y++) {
    // Generate pseudo-random activity
    const isActive = Math.random() > 0.7;
    const isHighlyActive = isActive && Math.random() > 0.8;
    
    let opacity = 0.05; // Base inactive state
    if (isHighlyActive) opacity = 0.8;
    else if (isActive) opacity = 0.4;
    
    // Add subtle structural lines to look more like a "system" matrix
    if (x % 10 === 0 && y === 3) opacity = 1.0;
    
    const posX = 20 + x * (cellSize + gap);
    const posY = 20 + y * (cellSize + gap);
    
    // Animate a few cells for that ambient terminal feel
    const isAnimated = isHighlyActive && Math.random() > 0.5;
    const animClass = isAnimated ? 'class="pulse"' : '';
    const delay = (Math.random() * 4).toFixed(2);
    const style = isAnimated ? `style="animation-delay: ${delay}s;"` : '';

    rects += `    <rect x="${posX}" y="${posY}" width="${cellSize}" height="${cellSize}" fill="var(--accent)" opacity="${opacity}" rx="1" ${animClass} ${style} />\n`;
  }
}

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      :root {
        --bg: #fcfcfc;
        --border: #222222;
        --accent: #0044cc;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #0d1117;
          --border: #444c56;
          --accent: #58a6ff;
        }
      }
      .bg { fill: var(--bg); }
      .border { stroke: var(--border); stroke-width: 2; fill: none; }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 0.2; }
      }
      .pulse { animation: pulse 3s ease-in-out infinite; }
    </style>
  </defs>

  <rect width="100%" height="100%" class="bg" />
  <rect x="10" y="10" width="${width - 20}" height="${height - 20}" class="border" />
  
${rects}
</svg>`;

const outPath = path.join(__dirname, '..', 'public', 'activity.svg');
fs.writeFileSync(outPath, svgContent);
console.log('Activity SVG generated at', outPath);
