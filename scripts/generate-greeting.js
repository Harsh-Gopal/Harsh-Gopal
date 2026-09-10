/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const greetings = [
  "Hello",
  "नमस्ते",
  "你好",
  "Hola",
  "Bonjour",
  "こんにちは",
  "안녕하세요",
  "مرحبا"
];

// Calculate animation timings
const totalDuration = greetings.length * 3; // 3 seconds per greeting
const percentagePerGreeting = 100 / greetings.length;

let keyframes = '';
let textElements = '';

greetings.forEach((greeting, index) => {
  const startPercent = index * percentagePerGreeting;
  const showPercent = startPercent + (percentagePerGreeting * 0.1);
  const hidePercent = startPercent + (percentagePerGreeting * 0.9);
  const endPercent = (index + 1) * percentagePerGreeting;

  // We want the text to fade in, stay, and fade out
  keyframes += `
    @keyframes anim-${index} {
      0%, ${Math.max(0, startPercent - 0.1)}% { opacity: 0; transform: translateY(10px); }
      ${showPercent}%, ${hidePercent}% { opacity: 1; transform: translateY(0); }
      ${endPercent}%, 100% { opacity: 0; transform: translateY(-10px); }
    }
  `;

  textElements += `
    <text 
      x="50%" 
      y="50%" 
      text-anchor="middle" 
      dominant-baseline="middle" 
      class="greeting g-${index}"
    >${greeting}</text>
  `;
});

const svgContent = `<svg width="800" height="120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400&amp;family=Inter:wght@300;400&amp;display=swap');
      
      .greeting {
        font-family: 'Inter', 'Noto Sans SC', sans-serif;
        font-size: 48px;
        font-weight: 300;
        fill: #fafafa;
        opacity: 0;
      }
      
      ${greetings.map((_, i) => `
      .g-${i} {
        animation: anim-${i} ${totalDuration}s infinite;
      }`).join('')}

      ${keyframes}
    </style>
  </defs>

  ${textElements}
</svg>`;

const outputDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, 'greeting.svg'), svgContent);
console.log('Successfully generated greeting.svg');
