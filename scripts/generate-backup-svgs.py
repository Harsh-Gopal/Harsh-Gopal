import os

# --- BASE TEMPLATES ---
BASE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="600" height="340">
  <defs>
    <style>
      :root {{
{theme_vars}      }}
      .bg {{ fill: var(--bg); }}
      .grid-line {{ stroke: var(--grid-line); stroke-width: 1; }}
      .border {{ stroke: var(--panel-border); stroke-width: 2; fill: none; }}
      .border-thin {{ stroke: var(--panel-border); stroke-width: 1; fill: none; }}
      .panel {{ fill: var(--panel-bg); stroke: var(--panel-border); stroke-width: 2; }}
      .window-bar {{ fill: var(--window-bar); stroke: var(--panel-border); stroke-width: 2; }}
      .fill {{ fill: var(--panel-border); }}
      .text-title {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 16px; font-weight: bold; fill: var(--text-dark); }}
      .text-sub   {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; fill: var(--text-muted); }}
      .text-node  {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 10px; fill: var(--text-dark); text-anchor: middle; }}
      .text-small {{ font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 9px; fill: var(--text-muted); text-anchor: middle; }}
      .accent {{ fill: var(--accent); }}
      .accent-stroke {{ stroke: var(--accent); fill: none; stroke-width: 2; }}
      
      .signal {{ stroke: var(--panel-border); stroke-width: 1; stroke-dasharray: 4 4; opacity: 0.5; }}
      .signal-active {{ stroke: var(--accent); stroke-width: 2; stroke-dasharray: 4 4; }}
    </style>
    <pattern id="bgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" class="grid-line" />
    </pattern>
  </defs>

  <rect width="100%" height="100%" class="bg" />
  <rect width="100%" height="100%" fill="url(#bgGrid)" />

  <rect x="20" y="20" width="560" height="300" class="panel" />

  <rect x="20" y="20" width="560" height="24" class="window-bar" />
  <line x1="20" y1="44" x2="580" y2="44" class="border" />
  <line x1="60" y1="28" x2="540" y2="28" class="border-thin" opacity="0.5" />
  <line x1="60" y1="32" x2="540" y2="32" class="border-thin" opacity="0.5" />
  <line x1="60" y1="36" x2="540" y2="36" class="border-thin" opacity="0.5" />
  <rect x="28" y="26" width="12" height="12" class="bg" stroke="var(--panel-border)" stroke-width="1" />

  <rect x="30" y="54" width="540" height="256" class="bg" stroke="var(--panel-border)" stroke-width="1" />

  <text x="50" y="83" class="text-title">{title}</text>
  <text x="50" y="101" class="text-sub">{subtitle}</text>

{content}
</svg>"""

THEMES = {
    'light': """        --bg: #f4f5f5;
        --grid-line: rgba(0, 0, 0, 0.05);
        --panel-bg: #e8e8e8;
        --panel-border: #111111;
        --window-bar: #cccccc;
        --text-dark: #111111;
        --text-muted: #666666;
        --accent: #0033cc;
        --accent-alt: #009933;
""",
    'dark': """        --bg: #0d1117;
        --grid-line: rgba(255, 255, 255, 0.05);
        --panel-bg: #161b22;
        --panel-border: #444c56;
        --window-bar: #21262d;
        --text-dark: #c9d1d9;
        --text-muted: #8b949e;
        --accent: #58a6ff;
        --accent-alt: #3fb950;
"""
}

# --- PROJECT CONTENT ---

CART_RADAR_CONTENT = """
  <!-- Top: Quick-Commerce Sources -->
  <g transform="translate(60, 120)">
    <rect x="0" y="0" width="80" height="30" class="border" />
    <text x="40" y="19" class="text-node">SOURCES</text>
  </g>
  <path d="M 140 135 L 200 135 L 200 150" class="signal" />

  <!-- Hex Grid / Location Sweep -->
  <g transform="translate(160, 150)">
    <polygon points="40,0 60,15 60,35 40,50 20,35 20,15" class="border" />
    <polygon points="60,35 80,50 80,70 60,85 40,70 40,50" class="border" opacity="0.3" />
    <polygon points="20,35 40,50 40,70 20,85 0,70 0,50" class="border" opacity="0.3" />
    <text x="40" y="30" class="text-small">SWEEP</text>
  </g>
  <path d="M 240 180 L 280 180" class="signal-active" />

  <!-- Playwright Ingestion -->
  <g transform="translate(280, 160)">
    <rect x="0" y="0" width="100" height="40" class="border" fill="var(--panel-bg)" />
    <rect x="5" y="5" width="10" height="10" class="border-thin" />
    <text x="55" y="24" class="text-node">INGESTION</text>
  </g>
  <path d="M 330 200 L 330 230" class="signal" />

  <!-- FastAPI + Cache -->
  <g transform="translate(260, 230)">
    <rect x="0" y="0" width="140" height="60" class="border" />
    <line x1="0" y1="25" x2="140" y2="25" class="border-thin" />
    <text x="70" y="17" class="text-node">FASTAPI CORE</text>
    <text x="70" y="45" class="text-small">STORE CACHE</text>
  </g>
  <path d="M 400 260 L 460 260" class="signal-active" />

  <!-- Live Map / Client -->
  <g transform="translate(460, 230)">
    <rect x="0" y="0" width="80" height="60" class="border" rx="4" />
    <rect x="5" y="5" width="70" height="40" class="border-thin" />
    <circle cx="40" cy="52" r="3" class="fill" />
    <text x="40" y="30" class="text-node">CLIENT</text>
  </g>
"""

MYSPHERE_CONTENT = """
  <!-- macOS -->
  <g transform="translate(60, 130)">
    <rect x="0" y="0" width="70" height="45" class="border" />
    <rect x="5" y="5" width="60" height="25" class="border-thin" />
    <path d="M 25 45 L 20 55 L 50 55 L 45 45" class="border" fill="var(--panel-bg)" />
    <text x="35" y="21" class="text-node">MAC</text>
  </g>
  
  <!-- Windows -->
  <g transform="translate(60, 220)">
    <rect x="0" y="0" width="70" height="45" class="border" />
    <rect x="5" y="5" width="60" height="25" class="border-thin" />
    <path d="M 10 55 L 60 55" class="border" />
    <rect x="25" y="45" width="20" height="10" class="border" fill="var(--panel-bg)" />
    <text x="35" y="21" class="text-node">WIN</text>
  </g>
  
  <!-- Android -->
  <g transform="translate(160, 175)">
    <rect x="0" y="0" width="30" height="55" class="border" rx="3" />
    <rect x="4" y="8" width="22" height="38" class="border-thin" />
    <circle cx="15" cy="4" r="1" class="fill" />
    <text x="15" y="68" class="text-small">AND</text>
  </g>
  
  <!-- Connections to Local Network -->
  <path d="M 130 152 L 220 152 L 220 185 L 250 185" class="signal" />
  <path d="M 130 242 L 220 242 L 220 215 L 250 215" class="signal" />
  <path d="M 190 200 L 250 200" class="signal" />

  <!-- SYNC CORE -->
  <g transform="translate(250, 160)">
    <rect x="0" y="0" width="100" height="80" class="border" rx="8" />
    <circle cx="50" cy="40" r="20" class="border" stroke-dasharray="2 2" />
    <circle cx="50" cy="40" r="5" class="fill" />
    <text x="50" y="20" class="text-node">SYNC CORE</text>
  </g>
  <path d="M 350 200 L 400 200" class="signal-active" />

  <!-- Capabilities & Firebase -->
  <g transform="translate(400, 130)">
    <rect x="0" y="0" width="110" height="80" class="border" fill="var(--panel-bg)" />
    <rect x="10" y="10" width="90" height="15" class="border-thin" />
    <rect x="10" y="32" width="90" height="15" class="border-thin" />
    <rect x="10" y="54" width="90" height="15" class="border-thin" />
    <text x="55" y="21" class="text-small">CLIPBOARD</text>
    <text x="55" y="43" class="text-small">MEDIA</text>
    <text x="55" y="65" class="text-small">FILES</text>
  </g>
  <path d="M 455 210 L 455 240" class="signal" />
  
  <g transform="translate(400, 240)">
    <rect x="0" y="0" width="110" height="30" class="border" />
    <text x="55" y="19" class="text-node">CLOUD RELAY</text>
  </g>
"""

ADAPTIVE_GAMEPLAY_CONTENT = """
  <!-- Left Column: Telemetry -->
  <g transform="translate(60, 130)">
    <rect x="0" y="0" width="100" height="40" class="border" />
    <polyline points="10,25 25,25 35,15 45,30 55,20 65,25 90,25" class="border-thin" stroke="var(--accent)" />
    <text x="50" y="55" class="text-small">PLAYER TELEMETRY</text>
  </g>
  <path d="M 160 150 L 220 150" class="signal-active" />

  <!-- Center: Game State & 3D Abstract Grid -->
  <g transform="translate(220, 130)">
    <rect x="0" y="0" width="120" height="100" class="border" fill="var(--panel-bg)" />
    <text x="60" y="15" class="text-node">GAME STATE</text>
    <!-- Isometric Grid -->
    <path d="M 20 60 L 60 40 L 100 60 L 60 80 Z" class="border-thin" />
    <path d="M 20 70 L 60 50 L 100 70 L 60 90 Z" class="border-thin" opacity="0.5" />
    <path d="M 60 40 L 60 90" class="border-thin" />
    <!-- Abstract 3D Cube -->
    <polygon points="55,45 65,40 75,45 65,50" class="fill" />
    <polygon points="55,45 65,50 65,60 55,55" class="fill" opacity="0.7" />
    <polygon points="75,45 65,50 65,60 75,55" class="fill" opacity="0.4" />
  </g>
  
  <path d="M 340 160 L 400 160" class="signal" />
  <path d="M 400 200 L 340 200" class="signal-active" />

  <!-- Right Column: ML-Agents / Adaptive Logic -->
  <g transform="translate(400, 140)">
    <rect x="0" y="0" width="120" height="80" class="border" />
    <line x1="0" y1="25" x2="120" y2="25" class="border-thin" />
    <text x="60" y="17" class="text-node">ML-AGENTS</text>
    <circle cx="60" cy="55" r="15" class="border-thin" />
    <circle cx="45" cy="55" r="3" class="fill" />
    <circle cx="75" cy="55" r="3" class="fill" />
    <circle cx="60" cy="40" r="3" class="fill" />
    <circle cx="60" cy="70" r="3" class="fill" />
    <path d="M 45 55 L 60 40 L 75 55 L 60 70 Z" class="border-thin" />
  </g>
  
  <!-- Adaptation Loop -->
  <path d="M 280 230 L 280 270 L 110 270 L 110 185" class="signal" />
  <text x="280" y="265" class="text-small" fill="var(--bg)">.</text>
  <text x="195" y="265" class="text-small">REAL-TIME ADAPTATION</text>
"""

XYZ_STOCKS_CONTENT = """
  <!-- Top: Market Data Stream -->
  <g transform="translate(60, 120)">
    <rect x="0" y="0" width="450" height="30" class="border" />
    <rect x="5" y="5" width="20" height="20" class="fill" opacity="0.2" />
    <text x="40" y="19" class="text-small" text-anchor="start">MARKET DATA :: NY / LND / TYO [ OK ]</text>
    <path d="M 320 15 L 340 10 L 360 20 L 380 5 L 400 25 L 420 15 L 440 10" class="border-thin" stroke="var(--accent)" />
  </g>

  <!-- Left: AI Engine & Momentum -->
  <g transform="translate(60, 160)">
    <rect x="0" y="0" width="150" height="110" class="border" fill="var(--panel-bg)" />
    <text x="75" y="25" class="text-node">AI ANALYSIS ENGINE</text>
    <line x1="10" y1="40" x2="140" y2="40" class="border-thin" />
    <rect x="15" y="55" width="50" height="40" class="border-thin" />
    <text x="40" y="75" class="text-small">NLP</text>
    <rect x="85" y="55" width="50" height="40" class="border-thin" />
    <text x="110" y="75" class="text-small">MOMENTUM</text>
  </g>
  <path d="M 210 215 L 260 215" class="signal-active" />

  <!-- Center: Portfolio Intelligence -->
  <g transform="translate(260, 160)">
    <rect x="0" y="0" width="120" height="110" class="border" />
    <text x="60" y="25" class="text-node">INTELLIGENCE</text>
    <circle cx="60" cy="65" r="25" class="border-thin" />
    <path d="M 60 40 A 25 25 0 0 1 85 65 L 60 65 Z" class="fill" opacity="0.6" />
    <path d="M 60 65 L 85 65 A 25 25 0 0 1 42 82 L 60 65 Z" class="fill" opacity="0.3" />
  </g>
  <path d="M 380 215 L 430 215" class="signal" />

  <!-- Right: Investor Dashboard -->
  <g transform="translate(430, 160)">
    <rect x="0" y="0" width="80" height="110" class="border" rx="4" />
    <rect x="10" y="20" width="60" height="15" class="border-thin" />
    <rect x="10" y="45" width="60" height="40" class="border-thin" fill="var(--panel-bg)" />
    <line x1="10" y1="95" x2="70" y2="95" class="border-thin" />
    <text x="40" y="130" class="text-small">DASHBOARD</text>
  </g>
"""

FAMILYVAULT_CONTENT = """
  <!-- Top: Go Backend & Auth -->
  <g transform="translate(200, 120)">
    <rect x="0" y="0" width="160" height="60" class="border" fill="var(--panel-bg)" />
    <line x1="0" y1="25" x2="160" y2="25" class="border-thin" />
    <text x="80" y="17" class="text-node">GO BACKEND CORE</text>
    <rect x="10" y="32" width="65" height="20" class="border-thin" />
    <text x="42" y="45" class="text-small">AUTH</text>
    <rect x="85" y="32" width="65" height="20" class="border-thin" />
    <text x="117" y="45" class="text-small">RBAC</text>
  </g>
  <path d="M 280 180 L 280 210" class="signal-active" />

  <!-- Center: Secure Storage (Vault motif) -->
  <g transform="translate(240, 210)">
    <rect x="0" y="0" width="80" height="60" class="border" rx="6" />
    <circle cx="40" cy="30" r="12" class="border" stroke-dasharray="2 2" />
    <circle cx="40" cy="30" r="4" class="fill" />
    <line x1="40" y1="30" x2="48" y2="22" class="border-thin" />
    <text x="40" y="85" class="text-node">SECURE STORAGE</text>
  </g>

  <!-- Left: Mac Desktop -->
  <path d="M 240 240 L 160 240" class="signal" />
  <g transform="translate(70, 215)">
    <rect x="0" y="0" width="90" height="50" class="border" />
    <rect x="5" y="5" width="80" height="30" class="border-thin" />
    <path d="M 35 50 L 30 60 L 60 60 L 55 50" class="border" fill="var(--panel-bg)" />
    <text x="45" y="75" class="text-small">DESKTOP</text>
  </g>

  <!-- Right: Android Mobile -->
  <path d="M 320 240 L 400 240" class="signal" />
  <g transform="translate(400, 210)">
    <rect x="0" y="0" width="40" height="70" class="border" rx="3" />
    <rect x="5" y="8" width="30" height="48" class="border-thin" />
    <circle cx="20" cy="63" r="2" class="fill" />
    <text x="20" y="85" class="text-small">MOBILE</text>
  </g>
"""

PROJECTS = [
    {
        'filename': 'cart-radar',
        'title': 'PROJECT 01: CART RADAR',
        'subtitle': 'Real-Time Quick-Commerce Inventory Aggregator',
        'content': CART_RADAR_CONTENT
    },
    {
        'filename': 'mysphere',
        'title': 'PROJECT 02: MYSPHERE',
        'subtitle': 'Cross-Device Sync Ecosystem',
        'content': MYSPHERE_CONTENT
    },
    {
        'filename': 'adaptive-gameplay',
        'title': 'PROJECT 03: ADAPTIVE 3D GAMEPLAY',
        'subtitle': 'AI-Driven Difficulty Scaling / IEEE Research',
        'content': ADAPTIVE_GAMEPLAY_CONTENT
    },
    {
        'filename': 'xyz-stocks',
        'title': 'PROJECT 04: XYZ STOCKS',
        'subtitle': 'AI-Powered Stock Analysis Platform',
        'content': XYZ_STOCKS_CONTENT
    },
    {
        'filename': 'familyvault',
        'title': 'PROJECT 05: FAMILYVAULT',
        'subtitle': 'Secure Group File Sharing',
        'content': FAMILYVAULT_CONTENT
    }
]

def main():
    for p in PROJECTS:
        for theme_name, theme_vars in THEMES.items():
            svg_content = BASE_SVG.format(
                theme_vars=theme_vars,
                title=p['title'],
                subtitle=p['subtitle'],
                content=p['content']
            )
            filepath = f"assets/projects/{p['filename']}-{theme_name}.svg"
            with open(filepath, 'w') as f:
                f.write(svg_content)
            print(f"Generated {filepath}")

    with open("assets/projects/README.md", "w") as f:
        f.write("# Backup Project SVGs\n\nThese SVGs are backup variants of project architectures. They follow the global profile aesthetic and support proper Light/Dark mode variants for GitHub README usage.\n\n")
        f.write("## Index\n\n")
        for p in PROJECTS:
            f.write(f"- `{p['title']}`: `{p['filename']}-light.svg` / `{p['filename']}-dark.svg`\n")

if __name__ == "__main__":
    main()
