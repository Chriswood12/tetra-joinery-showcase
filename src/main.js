import './styles/tokens.css';
import './styles/main.css';
import { PROJECT } from './data/project.js';
import { mountKineticStudio } from './components/kineticTable.js';
import { renderElevationDiagram } from './components/elevationDiagram.js';
import { initLightbox } from './components/lightbox.js';

const app = document.querySelector('#app');

function renderPicture({ webp, jpg, alt, loading = 'lazy', fetchPriority }) {
  const priorityAttr = fetchPriority ? `fetchpriority="${fetchPriority}"` : '';
  return `
    <picture>
      <source srcset="${webp}" type="image/webp" />
      <img src="${jpg}" alt="${alt}" loading="${loading}" decoding="async" ${priorityAttr} />
    </picture>
  `;
}

function getStatusClass(status) {
  const s = status.toLowerCase();
  if (s === 'completed') return 'step-status step-status--completed';
  if (s === 'in progress') return 'step-status step-status--active';
  return 'step-status';
}

function renderApp() {
  const { hero, story, circularCraft, journal, specifications, homage } = PROJECT;

  app.innerHTML = `
    <header id="site-header" class="site-header">
      <div class="container header-inner">
        <a href="#top" class="brand-lockup" id="nav-brand">
          <span class="brand-mark">${PROJECT.title}</span>
          <span class="brand-meta">${PROJECT.editionLabel}</span>
        </a>

        <nav aria-label="Primary navigation">
          <ul class="nav-links">
            <li><a href="#the-piece" id="nav-the-piece">The Piece</a></li>
            <li><a href="#mechanism" id="nav-mechanism">Mechanism</a></li>
            <li><a href="#circular-craft" id="nav-circular-craft">Material Ethos</a></li>
            <li><a href="#workshop-log" id="nav-workshop-log">Workshop Log</a></li>
            <li><a href="#specifications" id="nav-specifications">Specifications</a></li>
          </ul>
        </nav>

        <button
          type="button"
          id="mobile-menu-toggle"
          class="nav-toggle"
          aria-expanded="false"
          aria-controls="mobile-nav-drawer"
        >
          Menu
        </button>
      </div>
    </header>

    <nav id="mobile-nav-drawer" class="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
      <a href="#the-piece">01 · The Piece</a>
      <a href="#mechanism">02 · Mechanism</a>
      <a href="#circular-craft">03 · Material Ethos</a>
      <a href="#workshop-log">04 · Workshop Log</a>
      <a href="#specifications">05 · Specifications</a>
    </nav>

    <main id="main-content">
      <!-- HERO -->
      <section id="top" class="hero">
        <div class="container">
          <div class="hero-head">
            <div class="hero-title-group">
              <span class="eyebrow">${hero.eyebrow}</span>
              <h1 class="hero-title">${hero.headline}</h1>
            </div>
            <div class="hero-summary">
              <p class="hero-subtitle">${hero.subtitle}</p>
              <div class="hero-actions">
                <a href="#mechanism" id="cta-explore-mechanism" class="btn-primary">
                  Explore the Mechanism
                  <span aria-hidden="true">↓</span>
                </a>
                <a href="#circular-craft" id="cta-material-ledger" class="btn-link">
                  Material Provenance
                </a>
              </div>
            </div>
          </div>

          <figure class="hero-figure reveal is-visible">
            <div
              class="figure-frame"
              role="button"
              tabindex="0"
              aria-label="Enlarge hero photograph of the Tetra coffee table"
              data-lightbox-src="${hero.image.jpg}"
              data-lightbox-alt="${hero.image.alt}"
              data-lightbox-caption="${hero.image.caption}"
            >
              ${renderPicture({ ...hero.image, loading: 'eager', fetchPriority: 'high' })}
            </div>
            <figcaption class="figure-caption-bar">
              <span>${hero.image.caption}</span>
              <span>CLICK PLATE TO INSPECT</span>
            </figcaption>
          </figure>

          <div class="hero-specs-strip reveal">
            <div class="spec-pill">
              <span class="spec-pill__label">Closed Footprint</span>
              <span class="spec-pill__value">585 × 585 mm</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill__label">Extended Span</span>
              <span class="spec-pill__value">1170 × 1170 mm</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill__label">Reversible Elements</span>
              <span class="spec-pill__value">4 Sliding Trays</span>
            </div>
            <div class="spec-pill">
              <span class="spec-pill__label">Timber Ethos</span>
              <span class="spec-pill__value">Reclaimed & Dry-Fit</span>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 01: THE PIECE -->
      <section id="the-piece" class="section section--bordered">
        <div class="container">
          <div class="editorial-intro reveal">
            <div>
              <span class="eyebrow">${story.eyebrow}</span>
              <h2 class="section-heading">Architecture in motion, <em>built by hand.</em></h2>
            </div>
            <div class="editorial-prose">
              <p class="editorial-lead">${story.lead}</p>
              <p class="editorial-body">${story.body}</p>
              <div class="homage-credit">
                <span>ORIGINAL DESIGN:</span>
                <a href="${homage.originalUrl}" target="_blank" rel="noopener noreferrer">
                  ${homage.designer} · ${homage.originalBrand} (${homage.era}) ↗
                </a>
              </div>
            </div>
          </div>

          <div class="plates-grid">
            ${story.plates
              .map(
                (plate) => `
              <article class="plate-card reveal" id="${plate.id}">
                <div
                  class="figure-frame"
                  role="button"
                  tabindex="0"
                  aria-label="Enlarge ${plate.title} photograph"
                  data-lightbox-src="${plate.jpg}"
                  data-lightbox-alt="${plate.alt}"
                  data-lightbox-caption="${plate.figure} — ${plate.title.toUpperCase()} · ${plate.meta}"
                >
                  ${renderPicture(plate)}
                </div>
                <div class="plate-meta">
                  <span>${plate.figure}</span>
                  <span>${plate.meta}</span>
                </div>
                <h3 class="plate-title">${plate.title}</h3>
                <p class="plate-caption">${plate.caption}</p>
              </article>
            `
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- SECTION 02: INTERACTIVE KINETIC PLAN & FINISH STUDIO -->
      <section id="mechanism" class="section section--dark">
        <div class="container">
          <div class="studio-header reveal">
            <div>
              <span class="eyebrow eyebrow--light">02 · Kinetic Architecture</span>
              <h2 class="section-heading">Four surfaces, <em>endless geometry.</em></h2>
            </div>
            <p class="studio-header-note">
              Slide the four staggered wooden-runner shelves outward to see how a single
              58.5 cm square expands up to 2.8× its resting area—or flip individual leaves
              into recessed serving trays and preview wood and inlay pairings.
            </p>
          </div>

          <div id="kinetic-studio-root" class="studio-layout reveal"></div>
        </div>
      </section>

      <!-- SECTION 03: QUIET PERMANENCE (SUBTLE REDUCE · REUSE · RECYCLE) -->
      <section id="circular-craft" class="section">
        <div class="container">
          <div class="editorial-intro reveal">
            <div>
              <span class="eyebrow">${circularCraft.eyebrow}</span>
              <h2 class="section-heading">Quiet <em>permanence.</em></h2>
            </div>
            <div class="editorial-prose">
              <p class="editorial-lead">${circularCraft.intro}</p>
            </div>
          </div>

          <div class="pillars-grid reveal">
            ${circularCraft.pillars
              .map(
                (p) => `
              <article class="pillar-col">
                <span class="pillar-index">${p.index} · ${p.principle}</span>
                <h3 class="pillar-title">${p.title}</h3>
                <p class="pillar-desc">${p.description}</p>
              </article>
            `
              )
              .join('')}
          </div>

          <div class="provenance-grid reveal">
            <figure class="provenance-photo">
              <div
                class="figure-frame"
                role="button"
                tabindex="0"
                aria-label="Enlarge joinery workbench photograph"
                data-lightbox-src="${circularCraft.workshopPhoto.jpg}"
                data-lightbox-alt="${circularCraft.workshopPhoto.alt}"
                data-lightbox-caption="${circularCraft.workshopPhoto.caption}"
              >
                ${renderPicture(circularCraft.workshopPhoto)}
              </div>
              <figcaption class="provenance-photo-caption">
                ${circularCraft.workshopPhoto.caption}
              </figcaption>
            </figure>

            <div>
              <div class="ledger-header">
                <h3 class="ledger-title">Material Provenance Ledger</h3>
                <span class="eyebrow">0% Metal Slides · 0 g/L VOC</span>
              </div>
              <ul class="ledger-list">
                ${circularCraft.ledger
                  .map(
                    (row) => `
                  <li class="ledger-row">
                    <div>
                      <div class="ledger-component">${row.component}</div>
                      <div class="ledger-material">${row.material}</div>
                    </div>
                    <div>
                      <div class="ledger-method">${row.method}</div>
                      <div class="ledger-lifecycle">${row.lifecycle}</div>
                    </div>
                  </li>
                `
                  )
                  .join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- SECTION 04: WORKSHOP BUILD JOURNAL -->
      <section id="workshop-log" class="section section--travertine">
        <div class="container">
          <div class="editorial-intro reveal">
            <div>
              <span class="eyebrow">${journal.eyebrow}</span>
              <h2 class="section-heading">From rough timber to <em>kinetic geometry.</em></h2>
            </div>
            <div class="editorial-prose">
              <p class="editorial-lead">${journal.intro}</p>
            </div>
          </div>

          <div class="journal-layout reveal">
            <ol class="journal-steps" role="tablist" aria-label="Workshop build stages">
              ${journal.stages
                .map(
                  (stage, idx) => `
                <li>
                  <button
                    type="button"
                    role="tab"
                    id="journal-tab-${stage.step}"
                    aria-selected="${idx === 2 ? 'true' : 'false'}"
                    aria-controls="journal-detail-panel"
                    class="journal-step-btn ${idx === 2 ? 'is-active' : ''}"
                    data-stage-index="${idx}"
                  >
                    <span class="step-num">${stage.step}</span>
                    <span class="step-name">${stage.phase}</span>
                    <span class="${getStatusClass(stage.status)}">${stage.status}</span>
                  </button>
                </li>
              `
                )
                .join('')}
            </ol>

            <div
              id="journal-detail-panel"
              class="journal-detail"
              role="tabpanel"
              aria-live="polite"
            ></div>
          </div>
        </div>
      </section>

      <!-- SECTION 05: SPECIFICATIONS & ELEVATION DRAWING -->
      <section id="specifications" class="section">
        <div class="container">
          <div class="editorial-intro reveal">
            <div>
              <span class="eyebrow">${specifications.eyebrow}</span>
              <h2 class="section-heading">Dimensions &amp; <em>construction.</em></h2>
            </div>
            <div class="editorial-prose">
              <p class="editorial-body">
                Built to match the authentic architectural proportions of Bernard Vuarnesson’s
                original Tetra while substituting workshop-reclaimed oak, all-wood rubbing
                channels, and zero-VOC hand-rubbed finishes.
              </p>
            </div>
          </div>

          <div class="specs-layout reveal">
            <div class="elevation-card">
              <div class="elevation-card-head">
                <span>FRONT ELEVATION &amp; SECTION</span>
                <span>UNIT: MM</span>
              </div>
              ${renderElevationDiagram()}
            </div>

            <dl class="spec-table">
              ${specifications.items
                .map(
                  (item) => `
                <div class="spec-row">
                  <dt class="spec-row__key">${item.label}</dt>
                  <dd class="spec-row__val">${item.value}</dd>
                </div>
              `
                )
                .join('')}
            </dl>
          </div>
        </div>
      </section>
    </main>

    <!-- COLOPHON FOOTER -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="footer-title">${PROJECT.title}</div>
            <p class="footer-blurb">
              ${PROJECT.school}. An educational cabinetmaking study dedicated to precision
              woodwork, modular restraint, and enduring materials.
            </p>
          </div>

          <div>
            <h2 class="footer-col-title">Exhibition Credits</h2>
            <ul class="footer-list">
              <li>${PROJECT.makers}</li>
              <li>${PROJECT.location} · ${PROJECT.year}</li>
              <li>Editable specs in <code>src/data/project.js</code></li>
            </ul>
          </div>

          <div>
            <h2 class="footer-col-title">Design Attribution</h2>
            <ul class="footer-list">
              <li>Original Concept: ${homage.designer}</li>
              <li>
                <a href="${homage.originalUrl}" target="_blank" rel="noopener noreferrer">
                  Sculptures Jeux — Tetra Catalogue ↗
                </a>
              </li>
              <li>Non-commercial academic joinery study</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span>TETRA · JOINERY SCHOOL SHOWCASE · ${PROJECT.year}</span>
          <a href="#top" class="back-to-top" id="back-to-top">Return to Top ↑</a>
        </div>
      </div>
    </footer>
  `;
}

function initWorkshopJournal() {
  const panel = document.querySelector('#journal-detail-panel');
  const tabs = document.querySelectorAll('[data-stage-index]');
  const stages = PROJECT.journal.stages;

  function renderStage(index) {
    const stage = stages[index];
    panel.innerHTML = `
      <div>
        <div class="journal-detail-meta">
          <span>STAGE ${stage.step} · ${stage.status}</span>
          <span>BENCH TIME: ${stage.hours} · TOLERANCE: ${stage.tolerance}</span>
        </div>
        <h3 class="journal-detail-title">${stage.phase}</h3>
        <p class="journal-detail-summary">${stage.summary}</p>
        <ul class="journal-notes">
          ${stage.notes.map((n) => `<li>${n}</li>`).join('')}
        </ul>
      </div>
      <div class="journal-detail-foot">
        <span>BENCH LOG · ${PROJECT.makers.toUpperCase()}</span>
        <span>${stage.step} / 0${stages.length}</span>
      </div>
    `;

    tabs.forEach((tab, idx) => {
      const active = idx === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      renderStage(Number(tab.dataset.stageIndex));
    });
  });

  // Default to Stage 03 (In Progress) to reflect an active school build
  renderStage(2);
}

function initNavigation() {
  const header = document.querySelector('#site-header');
  const toggleBtn = document.querySelector('#mobile-menu-toggle');
  const drawer = document.querySelector('#mobile-nav-drawer');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setDrawer(open) {
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => {
    setDrawer(!drawer.classList.contains('is-open'));
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // Active nav highlight based on scroll section
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            navLinks.forEach((a) => {
              a.setAttribute('aria-current', a.getAttribute('href') === id ? 'true' : 'false');
            });
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach((sec) => navObserver.observe(sec));
  }
}

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
}

// Boot application
renderApp();
mountKineticStudio(document.querySelector('#kinetic-studio-root'), PROJECT.finishes);
initWorkshopJournal();
initNavigation();
initLightbox();
initScrollReveal();
