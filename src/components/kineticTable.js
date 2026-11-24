/**
 * Interactive Kinetic Plan & Material Studio for TETRA
 * ---------------------------------------------------------------------------
 * Precision orthographic top-down SVG simulator replicating Bernard Vuarnesson's
 * 4-tray sliding & reversible geometry (585 × 585 mm → 1170 × 1170 mm).
 */

const BASE_MM = 585;
const MAX_EXTENSION_MM = 292.5; // Each opposing side extends 292.5 mm -> +585 mm total = 1170 mm
const BASE_PX = 216;
const CENTER = 320;
const HALF = BASE_PX / 2;
const ORIGIN = CENTER - HALF; // 212
const MAX_SLIDE_PX = BASE_PX / 2; // 108 px -> total span 432 px (fits 640x640 with margin for dims)

const PRESETS = [
  {
    id: 'compact',
    label: 'Compact Cube',
    trays: {
      north: { ext: 0, flipped: false },
      east: { ext: 0, flipped: false },
      south: { ext: 0, flipped: false },
      west: { ext: 0, flipped: false },
    },
  },
  {
    id: 'pinwheel',
    label: 'Pinwheel Study',
    trays: {
      north: { ext: 0.72, flipped: false },
      east: { ext: 0.72, flipped: true },
      south: { ext: 0.72, flipped: false },
      west: { ext: 0.72, flipped: true },
    },
  },
  {
    id: 'twin',
    label: 'Twin Serving',
    trays: {
      north: { ext: 0.0, flipped: false },
      east: { ext: 0.9, flipped: true },
      south: { ext: 0.0, flipped: false },
      west: { ext: 0.9, flipped: true },
    },
  },
  {
    id: 'full',
    label: 'Full Expansion',
    trays: {
      north: { ext: 1, flipped: true },
      east: { ext: 1, flipped: false },
      south: { ext: 1, flipped: true },
      west: { ext: 1, flipped: false },
    },
  },
];

const TRAY_META = [
  { key: 'west', label: 'West', short: 'W', dirX: -1, dirY: 0, zIndex: 1 },
  { key: 'south', label: 'South', short: 'S', dirX: 0, dirY: 1, zIndex: 2 },
  { key: 'east', label: 'East', short: 'E', dirX: 1, dirY: 0, zIndex: 3 },
  { key: 'north', label: 'North', short: 'N', dirX: 0, dirY: -1, zIndex: 4 },
];

export function mountKineticStudio(rootEl, finishes) {
  const state = {
    woodId: finishes.woods[0].id,
    inlayId: finishes.inlays[0].id,
    activePreset: 'pinwheel',
    trays: {
      north: { ext: 0.72, flipped: false },
      east: { ext: 0.72, flipped: true },
      south: { ext: 0.72, flipped: false },
      west: { ext: 0.72, flipped: true },
    },
  };

  const getWood = () => finishes.woods.find((w) => w.id === state.woodId) || finishes.woods[0];
  const getInlay = () => finishes.inlays.find((i) => i.id === state.inlayId) || finishes.inlays[0];

  // Build static scaffold once, then update DOM/SVG attributes smoothly for fluid CSS transitions
  rootEl.innerHTML = `
    <div class="studio-stage">
      <div class="studio-stage-top">
        <span>ORTHOGRAPHIC PLAN · SCALE 1:5</span>
        <span class="stage-hint">Click any tray to extend or flip</span>
      </div>

      <div class="kinetic-canvas-wrap">
        <svg id="tetra-plan-svg" class="kinetic-svg" viewBox="0 0 640 640" role="img" aria-label="Interactive top-down architectural blueprint of the Tetra coffee table">
          <defs>
            <filter id="trayShadow" x="-12%" y="-12%" width="124%" height="124%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#080604" flood-opacity="0.45"/>
            </filter>
            <filter id="recessShadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.35"/>
            </filter>
          </defs>

          <!-- Subtle architectural reference crosshairs -->
          <g stroke="rgba(242,237,228,0.08)" stroke-width="1" stroke-dasharray="3 5">
            <line x1="320" y1="62" x2="320" y2="578" />
            <line x1="62" y1="320" x2="578" y2="320" />
          </g>

          <!-- Maximum open envelope guide (1170 x 1170 mm) -->
          <rect
            x="${ORIGIN - MAX_SLIDE_PX}"
            y="${ORIGIN - MAX_SLIDE_PX}"
            width="${BASE_PX + MAX_SLIDE_PX * 2}"
            height="${BASE_PX + MAX_SLIDE_PX * 2}"
            fill="none"
            stroke="rgba(181,148,107,0.16)"
            stroke-width="1"
            stroke-dasharray="4 6"
          />

          <!-- Dynamic architectural dimension lines -->
          <g id="dim-lines" font-family="'IBM Plex Mono', monospace" font-size="11" fill="#BFB7AA">
            <!-- Horizontal Width Dimension (Top) -->
            <line id="dim-w-line" x1="212" y1="74" x2="428" y2="74" stroke="rgba(181,148,107,0.6)" stroke-width="1"/>
            <line id="dim-w-tick-l" x1="212" y1="68" x2="212" y2="82" stroke="rgba(181,148,107,0.6)" stroke-width="1"/>
            <line id="dim-w-tick-r" x1="428" y1="68" x2="428" y2="82" stroke="rgba(181,148,107,0.6)" stroke-width="1"/>
            <rect id="dim-w-bg" x="284" y="63" width="72" height="20" fill="#171412"/>
            <text id="dim-w-text" x="320" y="77" text-anchor="middle" letter-spacing="0.08em">585 MM</text>

            <!-- Vertical Depth Dimension (Right) -->
            <line id="dim-d-line" x1="566" y1="212" x2="566" y2="428" stroke="rgba(181,148,107,0.6)" stroke-width="1"/>
            <line id="dim-d-tick-t" x1="558" y1="212" x2="572" y2="212" stroke="rgba(181,148,107,0.6)" stroke-width="1"/>
            <line id="dim-d-tick-b" x1="558" y1="428" x2="572" y2="428" stroke="rgba(181,148,107,0.6)" stroke-width="1"/>
            <g id="dim-d-label-group" transform="translate(566, 320) rotate(90)">
              <rect x="-36" y="-11" width="72" height="20" fill="#171412"/>
              <text id="dim-d-text" x="0" y="3" text-anchor="middle" letter-spacing="0.08em">585 MM</text>
            </g>
          </g>

          <!-- Base floor shadow under central solid-wood cube -->
          <rect
            x="${ORIGIN + 4}"
            y="${ORIGIN + 8}"
            width="${BASE_PX}"
            height="${BASE_PX}"
            fill="rgba(0,0,0,0.45)"
          />

          <!-- Layer 1–4: The Four Independent Sliding & Reversible Trays -->
          <g id="tetra-trays-layer">
            ${TRAY_META.map((t) => renderTrayGroup(t)).join('')}
          </g>

          <!-- Top Layer: Solid Wood Perimeter Frame + 7×7 Checkered Lattice Grating -->
          <g id="tetra-top-lattice" style="pointer-events: none;">
            ${renderLatticeTop()}
          </g>
        </svg>
      </div>

      <div class="studio-telemetry" aria-live="polite">
        <div class="telemetry-item">
          <span class="telemetry-label">Active Span</span>
          <span id="tel-span" class="telemetry-value">1006 × 1006 mm</span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-label">Usable Surface</span>
          <span id="tel-area" class="telemetry-value">0.84 m² (2.5×)</span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-label">Serving Trays Active</span>
          <span id="tel-trays" class="telemetry-value">2 of 4 Flipped</span>
        </div>
      </div>
    </div>

    <aside class="studio-controls" aria-label="Tetra mechanism and finish controls">
      <div class="control-group">
        <div class="control-header">
          <label for="expansion-slider" class="control-label">Master Expansion</label>
          <span id="expansion-pct" class="control-readout">72%</span>
        </div>
        <input
          id="expansion-slider"
          class="architect-slider"
          type="range"
          min="0"
          max="100"
          value="72"
          aria-label="Slide all four Tetra trays simultaneously"
        />
        <div class="preset-grid" role="group" aria-label="Configuration presets">
          ${PRESETS.map(
            (p) => `
              <button
                type="button"
                class="preset-btn ${p.id === state.activePreset ? 'is-active' : ''}"
                data-preset="${p.id}"
                id="preset-${p.id}"
              >${p.label}</button>
            `
          ).join('')}
        </div>
      </div>

      <div class="control-group">
        <div class="control-header">
          <span class="control-label">Individual Reversible Trays</span>
          <span class="control-readout">Slide · Flip</span>
        </div>
        <div class="tray-controls-grid">
          ${['north', 'east', 'south', 'west']
            .map(
              (key) => `
              <div class="tray-ctrl" data-tray-panel="${key}">
                <div class="tray-ctrl-top">
                  <span>${key.toUpperCase()}</span>
                  <span id="status-${key}">72%</span>
                </div>
                <div class="tray-ctrl-actions">
                  <button type="button" class="mini-toggle" id="btn-slide-${key}" data-action="slide" data-tray="${key}">Extend</button>
                  <button type="button" class="mini-toggle" id="btn-flip-${key}" data-action="flip" data-tray="${key}">Tray</button>
                </div>
              </div>
            `
            )
            .join('')}
        </div>
      </div>

      <div class="control-group">
        <div class="control-header">
          <span class="control-label">Structure Timber</span>
          <span id="wood-origin-readout" class="control-readout">${finishes.woods[0].origin}</span>
        </div>
        <div class="swatch-row" role="radiogroup" aria-label="Structure wood finish">
          ${finishes.woods
            .map(
              (w) => `
              <button
                type="button"
                class="swatch-btn ${w.id === state.woodId ? 'is-active' : ''}"
                data-wood="${w.id}"
                id="swatch-wood-${w.id}"
                aria-pressed="${w.id === state.woodId}"
              >
                <span class="swatch-chip" style="background: linear-gradient(135deg, ${w.grain}, ${w.grainDark});"></span>
                <span class="swatch-text">
                  <span class="swatch-name">${w.name}</span>
                  <span class="swatch-code">${w.code}</span>
                </span>
              </button>
            `
            )
            .join('')}
        </div>
      </div>

      <div class="control-group">
        <div class="control-header">
          <span class="control-label">Reversible Inlay Pair</span>
          <span id="inlay-note-readout" class="control-readout">${finishes.inlays[0].code}</span>
        </div>
        <div class="swatch-row" role="radiogroup" aria-label="Reversible tray surface pair">
          ${finishes.inlays
            .map(
              (inlay) => `
              <button
                type="button"
                class="swatch-btn ${inlay.id === state.inlayId ? 'is-active' : ''}"
                data-inlay="${inlay.id}"
                id="swatch-inlay-${inlay.id}"
                aria-pressed="${inlay.id === state.inlayId}"
              >
                <span class="swatch-chip swatch-chip--split">
                  <span style="background: ${inlay.swatchA};"></span>
                  <span style="background: ${inlay.swatchB};"></span>
                </span>
                <span class="swatch-text">
                  <span class="swatch-name">${inlay.name}</span>
                  <span class="swatch-code">${inlay.code}</span>
                </span>
              </button>
            `
            )
            .join('')}
        </div>
      </div>
    </aside>
  `;

  function renderTrayGroup(tray) {
    const pad = 12;
    const x = ORIGIN + pad;
    const y = ORIGIN + pad;
    const size = BASE_PX - pad * 2; // 192 x 192
    const rim = 11;

    // Position the subtle mode stamp along each tray's outward-facing edge so it stays unclipped
    let labelTransform = '';
    if (tray.key === 'north') labelTransform = `translate(${CENTER}, ${y + 30})`;
    if (tray.key === 'south') labelTransform = `translate(${CENTER}, ${y + size - 22})`;
    if (tray.key === 'west') labelTransform = `translate(${x + 28}, ${CENTER}) rotate(-90)`;
    if (tray.key === 'east') labelTransform = `translate(${x + size - 28}, ${CENTER}) rotate(90)`;

    return `
      <g
        id="svg-tray-${tray.key}"
        class="tetra-tray-group"
        data-svg-tray="${tray.key}"
        filter="url(#trayShadow)"
        tabindex="0"
        role="button"
        aria-label="${tray.label} reversible tray — click to extend or flip"
      >
        <!-- Solid wood perimeter frame of the tray -->
        <rect
          class="tray-frame-fill"
          x="${x}"
          y="${y}"
          width="${size}"
          height="${size}"
          rx="1.5"
          stroke-width="1"
        />

        <!-- Corner box-joint ticks -->
        <g stroke="rgba(0,0,0,0.28)" stroke-width="1">
          <line x1="${x}" y1="${y + rim}" x2="${x + rim}" y2="${y + rim}" />
          <line x1="${x + size - rim}" y1="${y + rim}" x2="${x + size}" y2="${y + rim}" />
          <line x1="${x}" y1="${y + size - rim}" x2="${x + rim}" y2="${y + size - rim}" />
          <line x1="${x + size - rim}" y1="${y + size - rim}" x2="${x + size}" y2="${y + size - rim}" />
        </g>

        <!-- Inlay laminate / linoleum panel -->
        <rect
          id="svg-tray-surface-${tray.key}"
          class="tray-surface-fill"
          x="${x + rim}"
          y="${y + rim}"
          width="${size - rim * 2}"
          height="${size - rim * 2}"
          rx="0.5"
        />

        <!-- Recessed tray inner lip bevel (shown when flipped to Serving Tray mode) -->
        <rect
          id="svg-tray-recess-${tray.key}"
          x="${x + rim + 2}"
          y="${y + rim + 2}"
          width="${size - rim * 2 - 4}"
          height="${size - rim * 2 - 4}"
          fill="none"
          stroke="rgba(0,0,0,0.34)"
          stroke-width="2.5"
          opacity="0"
        />

        <!-- Subtle directional label aligned to exposed outer margin -->
        <text
          id="svg-tray-badge-${tray.key}"
          transform="${labelTransform}"
          x="0"
          y="3"
          text-anchor="middle"
          font-family="'IBM Plex Mono', monospace"
          font-size="8.5"
          letter-spacing="0.14em"
          opacity="0.72"
        >${tray.short} · FLUSH</text>

        <!-- Subtle hover outline -->
        <rect
          class="tray-hover-ring"
          x="${x - 2}"
          y="${y - 2}"
          width="${size + 4}"
          height="${size + 4}"
          fill="none"
          stroke="#B5946B"
          stroke-width="1.25"
          stroke-dasharray="4 3"
        />
      </g>
    `;
  }

  function renderLatticeTop() {
    const outerRim = 13;
    const innerOrigin = ORIGIN + outerRim;
    const innerSpan = BASE_PX - outerRim * 2; // 190
    const cells = 7; // Authentic 7x7 square checkered grating
    const batten = 7.5;
    const step = innerSpan / cells;

    let bars = '';
    // Vertical battens (6 internal)
    for (let i = 1; i < cells; i++) {
      const bx = innerOrigin + step * i - batten / 2;
      bars += `<rect class="lattice-wood-fill" x="${bx.toFixed(1)}" y="${innerOrigin}" width="${batten}" height="${innerSpan}" />`;
    }
    // Horizontal battens (6 internal)
    for (let i = 1; i < cells; i++) {
      const by = innerOrigin + step * i - batten / 2;
      bars += `<rect class="lattice-wood-fill" x="${innerOrigin}" y="${by.toFixed(1)}" width="${innerSpan}" height="${batten}" />`;
    }

    // Corner post caps (square solid wood legs meeting top rails)
    const post = 18;
    const corners = [
      [ORIGIN, ORIGIN],
      [ORIGIN + BASE_PX - post, ORIGIN],
      [ORIGIN, ORIGIN + BASE_PX - post],
      [ORIGIN + BASE_PX - post, ORIGIN + BASE_PX - post],
    ];

    return `
      <!-- Outer perimeter rails (hollow center so trays show cleanly through lattice!) -->
      <path
        class="lattice-wood-fill"
        fill-rule="evenodd"
        d="M ${ORIGIN} ${ORIGIN} H ${ORIGIN + BASE_PX} V ${ORIGIN + BASE_PX} H ${ORIGIN} Z
           M ${innerOrigin} ${innerOrigin} V ${innerOrigin + innerSpan} H ${innerOrigin + innerSpan} V ${innerOrigin} Z"
        stroke-width="1"
      />
      <!-- Interlocking half-lap grating battens -->
      <g class="lattice-bars">
        ${bars}
      </g>
      <!-- Four solid corner leg post caps -->
      ${corners
        .map(
          ([cx, cy]) => `
        <rect
          class="lattice-wood-fill"
          x="${cx}"
          y="${cy}"
          width="${post}"
          height="${post}"
          stroke-width="1"
        />`
        )
        .join('')}
    `;
  }

  // Synchronize SVG positions, colors, dimensions, and sidebar readouts with state
  function updateView() {
    const wood = getWood();
    const inlay = getInlay();

    // Update wood tones across lattice & tray borders
    rootEl.querySelectorAll('.lattice-wood-fill').forEach((el) => {
      el.setAttribute('fill', wood.grain);
      el.setAttribute('stroke', wood.grainStroke);
    });
    rootEl.querySelectorAll('.tray-frame-fill').forEach((el) => {
      el.setAttribute('fill', wood.grainDark);
      el.setAttribute('stroke', wood.grainStroke);
    });

    // Update each tray transform, surface side, and sidebar buttons
    let flippedCount = 0;
    let totalExt = 0;

    TRAY_META.forEach((meta) => {
      const t = state.trays[meta.key];
      totalExt += t.ext;
      if (t.flipped) flippedCount += 1;

      const dx = (meta.dirX * t.ext * MAX_SLIDE_PX).toFixed(1);
      const dy = (meta.dirY * t.ext * MAX_SLIDE_PX).toFixed(1);

      const groupEl = rootEl.querySelector(`#svg-tray-${meta.key}`);
      const surfaceEl = rootEl.querySelector(`#svg-tray-surface-${meta.key}`);
      const recessEl = rootEl.querySelector(`#svg-tray-recess-${meta.key}`);
      const badgeEl = rootEl.querySelector(`#svg-tray-badge-${meta.key}`);

      groupEl.style.transform = `translate(${dx}px, ${dy}px)`;
      surfaceEl.setAttribute('fill', t.flipped ? inlay.trayColor : inlay.flushColor);
      recessEl.setAttribute('opacity', t.flipped ? '1' : '0');
      badgeEl.setAttribute('fill', t.flipped ? inlay.trayText : inlay.flushText);
      badgeEl.textContent = t.flipped ? `${meta.short} · TRAY` : `${meta.short} · FLUSH`;
      badgeEl.setAttribute('opacity', t.ext > 0.25 ? '0.8' : '0');

      // Sidebar controls
      const statusEl = rootEl.querySelector(`#status-${meta.key}`);
      const slideBtn = rootEl.querySelector(`#btn-slide-${meta.key}`);
      const flipBtn = rootEl.querySelector(`#btn-flip-${meta.key}`);

      statusEl.textContent = `${Math.round(t.ext * 100)}%`;
      slideBtn.textContent = t.ext > 0.1 ? 'Close' : 'Extend';
      slideBtn.classList.toggle('is-on', t.ext > 0.1);
      flipBtn.textContent = t.flipped ? 'Tray Lip' : 'Flush';
      flipBtn.classList.toggle('is-on', t.flipped);
    });

    // Compute exact live bounding dimensions in mm and SVG coordinates
    const extW = state.trays.west.ext;
    const extE = state.trays.east.ext;
    const extN = state.trays.north.ext;
    const extS = state.trays.south.ext;

    const widthMm = Math.round(BASE_MM + (extW + extE) * MAX_EXTENSION_MM);
    const depthMm = Math.round(BASE_MM + (extN + extS) * MAX_EXTENSION_MM);

    const leftX = ORIGIN - extW * MAX_SLIDE_PX;
    const rightX = ORIGIN + BASE_PX + extE * MAX_SLIDE_PX;
    const topY = ORIGIN - extN * MAX_SLIDE_PX;
    const bottomY = ORIGIN + BASE_PX + extS * MAX_SLIDE_PX;

    // Update top width dimension callout
    const wLine = rootEl.querySelector('#dim-w-line');
    const wTickL = rootEl.querySelector('#dim-w-tick-l');
    const wTickR = rootEl.querySelector('#dim-w-tick-r');
    const wBg = rootEl.querySelector('#dim-w-bg');
    const wText = rootEl.querySelector('#dim-w-text');
    const midX = (leftX + rightX) / 2;

    wLine.setAttribute('x1', leftX.toFixed(1));
    wLine.setAttribute('x2', rightX.toFixed(1));
    wTickL.setAttribute('x1', leftX.toFixed(1));
    wTickL.setAttribute('x2', leftX.toFixed(1));
    wTickR.setAttribute('x1', rightX.toFixed(1));
    wTickR.setAttribute('x2', rightX.toFixed(1));
    wBg.setAttribute('x', (midX - 38).toFixed(1));
    wText.setAttribute('x', midX.toFixed(1));
    wText.textContent = `${widthMm} MM`;

    // Update right depth dimension callout
    const dLine = rootEl.querySelector('#dim-d-line');
    const dTickT = rootEl.querySelector('#dim-d-tick-t');
    const dTickB = rootEl.querySelector('#dim-d-tick-b');
    const dLabelGroup = rootEl.querySelector('#dim-d-label-group');
    const dText = rootEl.querySelector('#dim-d-text');
    const midY = (topY + bottomY) / 2;

    dLine.setAttribute('y1', topY.toFixed(1));
    dLine.setAttribute('y2', bottomY.toFixed(1));
    dTickT.setAttribute('y1', topY.toFixed(1));
    dTickT.setAttribute('y2', topY.toFixed(1));
    dTickB.setAttribute('y1', bottomY.toFixed(1));
    dTickB.setAttribute('y2', bottomY.toFixed(1));
    dLabelGroup.setAttribute('transform', `translate(566, ${midY.toFixed(1)}) rotate(90)`);
    dText.textContent = `${depthMm} MM`;

    // Calculate live usable surface area (base 0.342 m² + each exposed tray portion ~0.182 m² at full extension)
    const baseArea = (BASE_MM / 1000) * (BASE_MM / 1000); // 0.3422 m²
    const exposedTrayArea = (extN + extE + extS + extW) * 0.535 * 0.2925;
    const totalArea = baseArea + exposedTrayArea;
    const multiplier = (totalArea / baseArea).toFixed(1);

    rootEl.querySelector('#tel-span').textContent = `${widthMm} × ${depthMm} mm`;
    rootEl.querySelector('#tel-area').textContent = `${totalArea.toFixed(2)} m² (${multiplier}×)`;
    rootEl.querySelector('#tel-trays').textContent = `${flippedCount} of 4 Flipped`;

    // Update master slider average display
    const avgPct = Math.round((totalExt / 4) * 100);
    rootEl.querySelector('#expansion-slider').value = String(avgPct);
    rootEl.querySelector('#expansion-pct').textContent = `${avgPct}%`;

    // Update active presets & swatches
    rootEl.querySelectorAll('[data-preset]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.preset === state.activePreset);
    });
    rootEl.querySelectorAll('[data-wood]').forEach((btn) => {
      const active = btn.dataset.wood === state.woodId;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    rootEl.querySelectorAll('[data-inlay]').forEach((btn) => {
      const active = btn.dataset.inlay === state.inlayId;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    rootEl.querySelector('#wood-origin-readout').textContent = wood.origin;
    rootEl.querySelector('#inlay-note-readout').textContent = inlay.code;
  }

  // Event bindings
  const slider = rootEl.querySelector('#expansion-slider');
  slider.addEventListener('input', (e) => {
    const val = Number(e.target.value) / 100;
    state.activePreset = null;
    Object.keys(state.trays).forEach((k) => {
      state.trays[k].ext = val;
    });
    updateView();
  });

  rootEl.querySelectorAll('[data-preset]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
      if (!preset) return;
      state.activePreset = preset.id;
      Object.keys(preset.trays).forEach((k) => {
        state.trays[k] = { ...preset.trays[k] };
      });
      updateView();
    });
  });

  rootEl.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.tray;
      const action = btn.dataset.action;
      state.activePreset = null;
      if (action === 'slide') {
        state.trays[key].ext = state.trays[key].ext > 0.1 ? 0 : 0.85;
      } else if (action === 'flip') {
        state.trays[key].flipped = !state.trays[key].flipped;
        if (state.trays[key].ext < 0.2) state.trays[key].ext = 0.7;
      }
      updateView();
    });
  });

  // Direct interaction on SVG trays
  rootEl.querySelectorAll('[data-svg-tray]').forEach((trayEl) => {
    const activate = () => {
      const key = trayEl.dataset.svgTray;
      state.activePreset = null;
      if (state.trays[key].ext < 0.2) {
        state.trays[key].ext = 0.85;
      } else {
        state.trays[key].flipped = !state.trays[key].flipped;
      }
      updateView();
    };
    trayEl.addEventListener('click', activate);
    trayEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  rootEl.querySelectorAll('[data-wood]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.woodId = btn.dataset.wood;
      updateView();
    });
  });

  rootEl.querySelectorAll('[data-inlay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.inlayId = btn.dataset.inlay;
      updateView();
    });
  });

  // Initial render
  updateView();
}
