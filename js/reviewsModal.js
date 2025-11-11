const modal = document.getElementById('reviewsModal');
const modalImage = document.getElementById('reviewsModalImage');

if (modal && modalImage) {
  const closeButton = modal.querySelector('[data-close]');
  let previousActiveElement = null;

  const openModal = (src, alt) => {
    previousActiveElement = document.activeElement;
    modalImage.src = src;
    modalImage.alt = alt || 'Просмотр отзыва';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    closeButton?.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
    document.body.style.overflow = '';
    previousActiveElement?.focus();
  };

  closeButton?.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  document.querySelectorAll('.review-card button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const figure = event.currentTarget.closest('.review-card');
      const img = figure?.querySelector('img');
      if (img) {
        openModal(img.src, img.alt);
      }
    });
  });
}

