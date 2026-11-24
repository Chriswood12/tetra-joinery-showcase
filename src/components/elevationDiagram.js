/**
 * Technical Orthographic Elevation & Section SVG Diagram
 * ---------------------------------------------------------------------------
 * Clean architectural drawing detailing closed footprint (585 mm),
 * open tray span (1170 mm), total height (310 mm), and stepped wooden runners.
 */

export function renderElevationDiagram() {
  return `
    <svg
      class="elevation-svg"
      viewBox="0 0 540 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Technical elevation drawing of the Tetra coffee table showing 585 mm closed width, 1170 mm extended width, and 310 mm total height"
    >
      <!-- Background baseline (floor plane) -->
      <line x1="28" y1="246" x2="512" y2="246" stroke="#1F1C18" stroke-opacity="0.22" stroke-width="1"/>

      <!-- Extended Left & Right Tray Profiles (dashed extended envelope -> 1170 mm) -->
      <g stroke="#9E6E3D" stroke-width="1.2">
        <!-- West Tray Extended (Level 2) -->
        <rect x="64" y="136" width="110" height="17" fill="#EDE7DD" stroke-dasharray="4 3"/>
        <line x1="72" y1="141" x2="174" y2="141" stroke-opacity="0.5"/>
        <!-- East Tray Extended (Level 3) -->
        <rect x="366" y="157" width="110" height="17" fill="#EDE7DD" stroke-dasharray="4 3"/>
        <line x1="366" y1="162" x2="468" y2="162" stroke-opacity="0.5"/>
      </g>

      <!-- Main Solid Wood Structure (585 mm width x 310 mm height) -->
      <!-- Left & Right Square Corner Posts -->
      <rect x="174" y="106" width="16" height="140" fill="#E3DDD2" stroke="#1F1C18" stroke-width="1.4"/>
      <rect x="350" y="106" width="16" height="140" fill="#E3DDD2" stroke="#1F1C18" stroke-width="1.4"/>

      <!-- Solid Wood Tabletop Profile (22 mm thick) -->
      <rect x="174" y="106" width="192" height="18" fill="#D8CEBE" stroke="#1F1C18" stroke-width="1.4"/>
      <line x1="175" y1="115" x2="365" y2="115" stroke="#1F1C18" stroke-opacity="0.16" stroke-width="0.9"/>

      <!-- Four Staggered Internal Tray Slots (25 mm modules on wooden runners) -->
      <g stroke="#1F1C18" stroke-width="1.15">
        <rect x="190" y="128" width="160" height="16" fill="#F9F7F3"/>
        <rect x="190" y="148" width="160" height="16" fill="#F5F2EC"/>
        <rect x="190" y="168" width="160" height="16" fill="#F9F7F3"/>
        <rect x="190" y="188" width="160" height="16" fill="#F5F2EC"/>
      </g>

      <!-- Lower Stretcher Apron -->
      <rect x="190" y="208" width="160" height="10" fill="#E3DDD2" stroke="#1F1C18" stroke-width="1.2"/>

      <!-- Dimension Line: Open Span 1170 mm (Top) -->
      <g stroke="#5E574E" stroke-width="0.9" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#5E574E">
        <line x1="64" y1="42" x2="64" y2="128" stroke-dasharray="2 3" stroke-opacity="0.5"/>
        <line x1="476" y1="42" x2="476" y2="148" stroke-dasharray="2 3" stroke-opacity="0.5"/>
        <line x1="64" y1="50" x2="476" y2="50"/>
        <line x1="64" y1="45" x2="64" y2="55"/>
        <line x1="476" y1="45" x2="476" y2="55"/>
        <rect x="218" y="40" width="104" height="18" fill="#F9F7F3" stroke="none"/>
        <text x="270" y="53" text-anchor="middle" letter-spacing="0.08em" stroke="none">OPEN · 1170 MM</text>
      </g>

      <!-- Dimension Line: Closed Footprint 585 mm (Bottom) -->
      <g stroke="#1F1C18" stroke-width="1" font-family="'IBM Plex Mono', monospace" font-size="10.5" fill="#1F1C18">
        <line x1="174" y1="254" x2="174" y2="282"/>
        <line x1="366" y1="254" x2="366" y2="282"/>
        <line x1="174" y1="274" x2="366" y2="274"/>
        <rect x="224" y="264" width="92" height="18" fill="#F9F7F3" stroke="none"/>
        <text x="270" y="277" text-anchor="middle" letter-spacing="0.08em" stroke="none">585 MM</text>
      </g>

      <!-- Dimension Line: Height 310 mm (Right) -->
      <g stroke="#1F1C18" stroke-width="1" font-family="'IBM Plex Mono', monospace" font-size="10" fill="#1F1C18">
        <line x1="374" y1="106" x2="506" y2="106" stroke-dasharray="2 3" stroke-opacity="0.45"/>
        <line x1="498" y1="106" x2="498" y2="246"/>
        <line x1="493" y1="106" x2="503" y2="106"/>
        <line x1="493" y1="246" x2="503" y2="246"/>
        <g transform="translate(514, 176) rotate(90)">
          <text x="0" y="3" text-anchor="middle" letter-spacing="0.1em" stroke="none">H · 310 MM</text>
        </g>
      </g>

      <!-- Callout Annotations -->
      <g font-family="'IBM Plex Mono', monospace" font-size="9" fill="#867E74">
        <text x="64" y="182" letter-spacing="0.08em">REVERSIBLE TRAY</text>
        <text x="64" y="194" letter-spacing="0.08em">25 MM MODULE</text>
        <text x="174" y="92" letter-spacing="0.08em">SOLID WOOD TOP</text>
      </g>
    </svg>
  `;
}
