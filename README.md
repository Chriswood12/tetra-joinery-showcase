# TETRA — Joinery School Exhibition Website

A modern, gallery-grade showcase website built for a joinery school furniture project—an educational study of Bernard Vuarnesson's iconic **Tetra** coffee table for [Sculptures Jeux](https://sculpturesjeux.com/en/product/catalogue/tetra/), reinterpreted around reclaimed timber, workshop offcut joinery, and quiet material permanence.

## Highlights

- **Interactive Kinetic Plan & Material Studio**: Orthographic top-down SVG blueprint of Tetra's 4 independent sliding, reversible trays (`585 × 585 mm` → `1170 × 1170 mm`), live area telemetry, flush/serving-tray reversal, and wood/linoleum finish previews.
- **Quiet Permanence (Reduce · Reuse · Recycle)**: Integrated with cabinetmaking restraint—reclaimed hardwood stock, offcut slatted top grating, all-wood sliding runners (zero steel slides), and zero-VOC cold-pressed oil.
- **Editable Workshop Build Log & Material Ledger**: Update school info, maker credits, timber notes, and build milestones from a single file (`src/data/project.js`).
- **Museum-Grade Gallery & Technical Drawings**: High-resolution studio photography with accessible lightbox inspection and an architectural elevation diagram.

---

## Local Development

```bash
npm install
npm run dev
```

Build for production & preview locally:

```bash
npm run build
npm run preview
```

---

## Customizing for Your Build

1. **Edit Project Copy, Makers & Build Progress**: Open [`src/data/project.js`](./src/data/project.js) and update your school name, maker credits, wood species, ledger entries, and journal stage statuses (`Completed`, `In Progress`, `Scheduled`).
2. **Swap in Your Own Workshop Photographs**: Replace the files inside `public/images/`:
   - `tetra-hero.webp` / `tetra-hero.jpg` (16:9 hero photograph)
   - `tetra-closed.webp` / `tetra-closed.jpg` (4:3 closed cube study)
   - `tetra-tray.webp` / `tetra-tray.jpg` (4:3 reversible tray detail)
   - `tetra-craft.webp` / `tetra-craft.jpg` (4:3 workbench joinery photo)

---

## Hosting on Vercel (Recommended)

Vercel's free **Hobby** plan supports up to **200 personal / non-commercial projects**, so you can host this right alongside your existing Vercel site at no cost.

1. Open [Vercel → New Project](https://vercel.com/new) (or click the button below).
2. Import this GitHub repository (`tetra-joinery-showcase`).
3. Vercel automatically detects **Vite** (`npm run build` → `dist/`) and applies [`vercel.json`](./vercel.json).
4. Click **Deploy** — every future push to `main` redeploys automatically.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FChriswood12%2Ftetra-joinery-showcase)

### Alternative: GitHub Pages

`vite.config.js` is configured with `base: './'`, so the exact same `dist/` output also works cleanly on GitHub Pages if you ever prefer it.

---

*Academic homage to Bernard Vuarnesson's Tetra (Sculptures Jeux). Built with Vite, semantic HTML5, Vanilla CSS, and Vanilla JavaScript.*
