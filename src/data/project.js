/**
 * TETRA — Joinery School Showcase
 * ---------------------------------------------------------------------------
 * Single source of truth for all editable project details.
 * Update school details, maker credits, timber provenance, build log entries,
 * and photo captions here as your physical piece progresses.
 *
 * To insert your own workshop & finished photographs:
 * 1. Drop your photos into `public/images/` (JPG, WebP, or PNG).
 * 2. Set the `src` field below (e.g. `src: './images/tetra-hero.jpg'`).
 *    Leave `src: ''` to display the architectural exhibition placeholder.
 */

export const PROJECT = {
  title: 'Tetra',
  editionLabel: 'Joinery School Study · No. 01',
  year: '2026',
  school: 'Fine Joinery & Cabinetmaking Studio',
  makers: 'Joinery Cohort — Workshop Bench 04',
  location: 'Workshop Edition',
  homage: {
    designer: 'Bernard Vuarnesson',
    originalBrand: 'Sculptures Jeux',
    originalUrl: 'https://sculpturesjeux.com/en/product/catalogue/tetra/',
    era: 'Designed c. 1973–1980',
  },

  hero: {
    eyebrow: 'Joinery School Study · Homage to Bernard Vuarnesson',
    headline: 'Tetra',
    subtitle:
      'A kinetic low table in reclaimed hardwood and natural linoleum — faithfully studied from Sculptures Jeux and built for quiet permanence.',
    image: {
      // Drop your hero photo in public/images/ and set src: './images/tetra-hero.jpg'
      src: '',
      expectedFile: 'public/images/tetra-hero.jpg',
      aspect: '16:9',
      plateCode: 'PLATE 01',
      placeholderTitle: 'Extended Pinwheel View',
      alt: 'Tetra modular low coffee table in extended configuration',
      caption:
        'FIG. 01 — EXTENDED PINWHEEL CONFIGURATION · 1170 × 1170 × 310 MM · RECLAIMED OAK & MATTE LINOLEUM',
    },
  },

  story: {
    eyebrow: '01 · The Piece',
    heading: 'Architecture in motion, built by hand.',
    lead: 'Originally conceived by French engineer and designer Bernard Vuarnesson for Sculptures Jeux, Tetra rejects the stillness of the conventional coffee table. Beneath its checkered solid-wood grating lie four independent, reversible shelves that glide outward on all-wood runners—doubling the footprint in a single gesture.',
    body: 'As our joinery school capstone study, we set out to reproduce Tetra’s exact geometric harmony while honoring traditional cabinetmaking discipline: zero metal drawer slides, tight hand-fitted tolerances, reclaimed hardwood stock, and surfaces finished solely in cold-pressed natural oils.',
    plates: [
      {
        id: 'plate-closed',
        figure: 'FIG. 02',
        plateCode: 'PLATE 02',
        aspect: '4:3',
        title: 'The Compact Cube',
        meta: '585 × 585 × 310 MM · CLOSED STATE',
        caption:
          'When closed, the four stacked trays disappear cleanly inside the mitered corner posts, leaving a calm square aperture grid over the top inlay.',
        // Drop your photo in public/images/ and set src: './images/tetra-closed.jpg'
        src: '',
        expectedFile: 'public/images/tetra-closed.jpg',
        placeholderTitle: 'Closed Cube Study',
        alt: 'Tetra coffee table closed into a 58.5 cm square solid wood cube showing the checkered lattice top',
      },
      {
        id: 'plate-tray',
        figure: 'FIG. 03',
        plateCode: 'PLATE 03',
        aspect: '4:3',
        title: 'Reversible Tray Geometry',
        meta: 'FLUSH SURFACE / RECESSED TRAY',
        caption:
          'Turn any shelf over and its solid-wood perimeter frame rises to form a shallow lip—transforming an extension leaf into a self-contained serving tray.',
        // Drop your photo in public/images/ and set src: './images/tetra-tray.jpg'
        src: '',
        expectedFile: 'public/images/tetra-tray.jpg',
        placeholderTitle: 'Reversible Tray & Corner Detail',
        alt: 'Close-up of a solid wood reversible tray flipped into serving mode',
      },
    ],
  },

  /**
   * Finish swatches for the interactive Kinetic Plan Studio
   */
  finishes: {
    woods: [
      {
        id: 'reclaimed-oak',
        name: 'Reclaimed Oak',
        code: 'W01',
        origin: 'Salvaged European beams',
        grain: '#B58958',
        grainDark: '#8A6238',
        grainStroke: '#6D4B28',
        swatch: '#AE814E',
      },
      {
        id: 'natural-iroko',
        name: 'Natural Iroko',
        code: 'S01',
        origin: 'Classic Sculptures Jeux spec',
        grain: '#9A6336',
        grainDark: '#734521',
        grainStroke: '#573215',
        swatch: '#8F5A2E',
      },
      {
        id: 'smoked-ash',
        name: 'Smoked Ash',
        code: 'W02',
        origin: 'Thermally modified ash',
        grain: '#574539',
        grainDark: '#3A2D24',
        grainStroke: '#281F18',
        swatch: '#4D3D32',
      },
      {
        id: 'steamed-beech',
        name: 'Steamed Beech',
        code: 'S07',
        origin: 'FSC local workshop stock',
        grain: '#CFA982',
        grainDark: '#AA845E',
        grainStroke: '#8A6643',
        swatch: '#C9A27B',
      },
    ],
    inlays: [
      {
        id: 'chalk-charcoal',
        name: 'Chalk & Charcoal',
        code: 'L01 / L19',
        note: 'Natural linoleum on birch core',
        flushColor: '#E8E1D4',
        flushText: '#3A342C',
        trayColor: '#363634',
        trayText: '#DDD7CC',
        swatchA: '#E8E1D4',
        swatchB: '#363634',
      },
      {
        id: 'sage-limestone',
        name: 'Sage & Limestone',
        code: 'L56 / L23',
        note: 'Muted botanical mineral linoleum',
        flushColor: '#A9B2A2',
        flushText: '#232820',
        trayColor: '#DDD6C7',
        trayText: '#38332B',
        swatchA: '#A9B2A2',
        swatchB: '#DDD6C7',
      },
      {
        id: 'slate-cream',
        name: 'Slate Blue & Cream',
        code: 'L51 / L01',
        note: 'Classic Vuarnesson archive pairing',
        flushColor: '#4E6070',
        flushText: '#E8E5DE',
        trayColor: '#ECE4D5',
        trayText: '#353028',
        swatchA: '#4E6070',
        swatchB: '#ECE4D5',
      },
      {
        id: 'terracotta-sand',
        name: 'Terracotta & Sand',
        code: 'L42 / L30',
        note: 'Warm architectural clay tone',
        flushColor: '#A5634B',
        flushText: '#F4EDE4',
        trayColor: '#D6CBB8',
        trayText: '#3A3129',
        swatchA: '#A5634B',
        swatchB: '#D6CBB8',
      },
    ],
  },

  /**
   * Subtle, high-craft Reduce / Reuse / Recycle chapter
   */
  circularCraft: {
    eyebrow: '03 · Material Ethos',
    heading: 'Quiet permanence.',
    intro:
      'True restraint needs no manifesto. Fine joinery has always practiced circularity by instinct: wasting nothing at the saw, honoring reclaimed timber, and building mechanical joints that invite repair rather than replacement.',
    pillars: [
      {
        index: '01',
        principle: 'Reduce',
        title: 'One object, six roles',
        description:
          'A single 58.5 cm square footprint replaces a wide coffee table, occasional side surfaces, and four standalone serving trays—doing more with less timber and visual mass.',
      },
      {
        index: '02',
        principle: 'Reuse',
        title: 'Offcuts elevated to ornament',
        description:
          'The signature slatted lattice is milled entirely from narrow workshop hardwood offcuts too short for conventional panels—turning cabinetmaking remnants into the table’s centerpiece.',
      },
      {
        index: '03',
        principle: 'Recycle',
        title: 'Monomaterial & dry-separable',
        description:
          'Zero metal runner tracks, zero polyurethane coatings. Pegged mortise-and-tenon joinery and cold-pressed oil let every member be re-oiled, swapped, or cleanly separated decades from now.',
      },
    ],
    workshopPhoto: {
      // Drop your bench photo in public/images/ and set src: './images/tetra-craft.jpg'
      src: '',
      expectedFile: 'public/images/tetra-craft.jpg',
      aspect: '4:3',
      plateCode: 'PLATE 04',
      placeholderTitle: 'Workbench & Joinery Study',
      alt: 'Joinery workbench assembly of half-lap battens and hand tools',
      caption: 'FIG. 04 — HALF-LAP LATTICE DRY FIT · RECLAIMED WORKSHOP OFFCUTS',
    },
    ledger: [
      {
        component: 'Top Grating (14 battens)',
        material: 'Salvaged oak offcuts, 18 × 22 mm',
        method: 'Crossed half-lap joints, dry-fitted',
        lifecycle: '100% offcut yield · Re-sandable',
      },
      {
        component: 'Corner Posts & Rails',
        material: 'Reclaimed kiln-dried European oak',
        method: 'Haunched mortise & tenon, oak-pegged',
        lifecycle: 'Structural longevity · Disassemblable',
      },
      {
        component: 'Sliding Runners',
        material: 'Dense quarter-sawn hornbeam / beech',
        method: 'Housed wooden dado channels + beeswax',
        lifecycle: 'Zero steel slides · Self-burnishing',
      },
      {
        component: 'Four Reversible Trays',
        material: 'Solid oak perimeter + natural linoleum',
        method: 'Box-jointed frame · Floating core panel',
        lifecycle: 'Bio-based linoleum · Replaceable insert',
      },
      {
        component: 'Surface Protection',
        material: 'Cold-pressed linseed oil & beeswax',
        method: 'Hand-rubbed in three cured coats',
        lifecycle: '0 g/L VOC · Spot-renewable at home',
      },
    ],
  },

  /**
   * Editable Joinery School Build Log
   * Update `status` to 'Completed', 'In Progress', or 'Scheduled' as you build.
   */
  journal: {
    eyebrow: '04 · Workshop Log',
    heading: 'From rough timber to kinetic geometry.',
    intro:
      'Documenting each stage at the bench—from sorting reclaimed boards and cutting half-lap battens to tuning the four sliding trays by hand plane.',
    stages: [
      {
        step: '01',
        phase: 'Timber Selection & Acclimation',
        status: 'Completed',
        hours: '06 hrs',
        tolerance: 'MC 8.5%',
        summary:
          'Selected reclaimed European oak boards for the four structural corner posts and sorted narrow straight-grained offcuts from the school timber rack for the top lattice.',
        notes: [
          'Moisture content stabilized in the shop for 14 days prior to rough milling.',
          'Grain-matched four corner posts from a single quarter-sawn billet to prevent seasonal twist.',
          'Sorted 22 offcut strips; retained the 14 straightest lengths for the 7×7 top grid.',
        ],
      },
      {
        step: '02',
        phase: 'Structural Frame & Runner Channels',
        status: 'Completed',
        hours: '14 hrs',
        tolerance: '±0.2 mm',
        summary:
          'Cut mortise-and-tenon rails and milled precision stepped wooden runner grooves inside the frame so all four shelves stack vertically at staggered heights.',
        notes: [
          'Staggered runner elevations let opposite and adjacent trays pass cleanly without interference.',
          'Test-assembled frame dry with clamping cauls to verify exact 585.0 mm square diagonals.',
          'Selected quarter-sawn beech rubbing strips waxed with pure beeswax for silent travel.',
        ],
      },
      {
        step: '03',
        phase: 'Half-Lap Lattice Grating',
        status: 'In Progress',
        hours: '12 hrs',
        tolerance: '±0.1 mm',
        summary:
          'Cutting interlocking half-lap notches across 14 narrow hardwood battens to form the signature architectural grid inspired by Japanese kumiko work.',
        notes: [
          'Used a dedicated sled stop-block to guarantee identical square apertures across the entire top.',
          'Hand-pared notch shoulders with a 12 mm paring chisel for crisp zero-gap intersections.',
          'Top grating seats flush inside a rabbeted perimeter frame and lifts out cleanly for dusting or re-oiling.',
        ],
      },
      {
        step: '04',
        phase: 'Four Reversible Tray Frames',
        status: 'Scheduled',
        hours: '16 hrs',
        tolerance: '±0.2 mm',
        summary:
          'Milling four matching solid-wood perimeter frames with crisp box-jointed corners, housing dual-faced natural linoleum panels offset asymmetrically for flush/tray reversal.',
        notes: [
          'Offset panel groove sets one face flush with the wood rim (tabletop mode) and creates a 12 mm recessed lip on the reverse (serving tray mode).',
          'Rounded inner thumb channels gently eased with a block plane for comfortable lifting.',
          'Balanced linoleum lamination on both panel faces prevents cupping over seasonal humidity shifts.',
        ],
      },
      {
        step: '05',
        phase: 'Hand Planing, Oil & Exhibition Fit',
        status: 'Scheduled',
        hours: '08 hrs',
        tolerance: 'P320 / Oil',
        summary:
          'Final smoothing plane pass across exposed end grain, easing arrises to a tactile 0.8 mm chamfer, and hand-rubbing three coats of zero-VOC cold-pressed oil and beeswax.',
        notes: [
          'Burnished sliding wood-on-wood runners with carnauba and beeswax paste.',
          'Final photographic documentation and exhibition label preparation.',
        ],
      },
    ],
  },

  /**
   * Technical Specification Catalogue
   */
  specifications: {
    eyebrow: '05 · Technical Sheet',
    heading: 'Dimensions & Construction',
    items: [
      { label: 'Model Study', value: 'Tetra — Joinery School Edition' },
      { label: 'Original Reference', value: 'Bernard Vuarnesson · Sculptures Jeux (c. 1973)' },
      { label: 'Closed Footprint', value: '585 × 585 × 310 mm' },
      { label: 'Maximum Open Span', value: '1170 × 1170 × 310 mm' },
      { label: 'Individual Tray Module', value: '535 × 485 × 25 mm (× 4 Reversible)' },
      { label: 'Active Surface Expansion', value: '0.34 m² → 0.97 m² (2.8× usable area)' },
      { label: 'Primary Timber', value: 'Reclaimed European Oak + Offcut Battens' },
      { label: 'Tray Inlay Material', value: 'Dual-faced Matte Furniture Linoleum' },
      { label: 'Joinery System', value: 'Mortise & Tenon · Half-Lap · Box-Jointed Trays' },
      { label: 'Mechanical Hardware', value: 'None — 100% waxed solid-wood runners' },
      { label: 'Finish & Emissions', value: 'Cold-pressed Linseed Oil & Beeswax (0 g/L VOC)' },
      { label: 'End-of-Life Path', value: 'Mechanically repairable, refinishable, separable' },
    ],
  },
};
