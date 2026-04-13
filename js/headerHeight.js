function updateHeaderHeightVar() {
  const sidebar = document.querySelector('.sidebar');
  const root = document.documentElement;

  if (!sidebar) {
    root.style.setProperty('--header-h', '0px');
    return;
  }

  const styles = window.getComputedStyle(sidebar);
  const isFixed = styles.position === 'fixed';

  if (!isFixed) {
    root.style.setProperty('--header-h', '0px');
    return;
  }

  const rect = sidebar.getBoundingClientRect();
  const top = Number.parseFloat(styles.top) || 0;

  // space needed so content/anchors appear below the fixed header
  const extra = 12; // small breathing room
  const headerH = Math.ceil(rect.height + top + extra);
  root.style.setProperty('--header-h', `${headerH}px`);
}

// Initial
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateHeaderHeightVar, { once: true });
} else {
  updateHeaderHeightVar();
}

// Recompute on viewport changes
window.addEventListener('resize', updateHeaderHeightVar, { passive: true });
window.addEventListener('orientationchange', updateHeaderHeightVar, { passive: true });

// Recompute when fonts finish loading (text wrapping can change header height)
if (document.fonts && typeof document.fonts.ready?.then === 'function') {
  document.fonts.ready.then(updateHeaderHeightVar).catch(() => {});
}

// Recompute when mobile nav opens/closes
const toc = document.getElementById('toc');
if (toc && typeof MutationObserver !== 'undefined') {
  const obs = new MutationObserver(updateHeaderHeightVar);
  obs.observe(toc, { attributes: true, attributeFilter: ['class'] });
}

