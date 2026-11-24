/**
 * Accessible Gallery Lightbox
 * ---------------------------------------------------------------------------
 * Allows clicking any exhibition plate to view full-resolution photography.
 */

export function initLightbox() {
  const modal = document.createElement('div');
  modal.id = 'gallery-lightbox';
  modal.className = 'lightbox';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('aria-label', 'Exhibition photograph viewer');

  modal.innerHTML = `
    <div class="lightbox-inner">
      <div class="lightbox-bar">
        <span id="lightbox-caption"></span>
        <button type="button" id="lightbox-close" class="lightbox-close">Close · Esc</button>
      </div>
      <img id="lightbox-img" class="lightbox-img" src="" alt="" />
    </div>
  `;

  document.body.appendChild(modal);

  const imgEl = modal.querySelector('#lightbox-img');
  const captionEl = modal.querySelector('#lightbox-caption');
  const closeBtn = modal.querySelector('#lightbox-close');
  let lastTrigger = null;

  function open({ src, alt, caption }, triggerEl) {
    lastTrigger = triggerEl || document.activeElement;
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = caption || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  }

  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      close();
    }
  });

  document.querySelectorAll('[data-lightbox-src]').forEach((el) => {
    const trigger = () =>
      open(
        {
          src: el.dataset.lightboxSrc,
          alt: el.dataset.lightboxAlt,
          caption: el.dataset.lightboxCaption,
        },
        el
      );
    el.addEventListener('click', trigger);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger();
      }
    });
  });
}
