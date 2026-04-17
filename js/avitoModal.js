const avitoModal = document.getElementById('avitoModal');

if (avitoModal) {
  const closeButtons = avitoModal.querySelectorAll('[data-close-avito]');
  let previousActiveElement = null;

  const openModal = () => {
    // Проверяем, не было ли модальное окно уже закрыто пользователем в этой сессии
    const wasClosed = sessionStorage.getItem('avitoModalClosed');
    if (wasClosed === 'true') {
      return;
    }

    previousActiveElement = document.activeElement;
    avitoModal.classList.add('is-open');
    avitoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Фокусируемся на кнопке закрытия для доступности
    const firstCloseButton = closeButtons[0];
    if (firstCloseButton) {
      setTimeout(() => firstCloseButton.focus(), 100);
    }
  };

  const closeModal = () => {
    avitoModal.classList.remove('is-open');
    avitoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Сохраняем в sessionStorage, что модальное окно было закрыто
    sessionStorage.setItem('avitoModalClosed', 'true');
    
    previousActiveElement?.focus();
  };

  // Обработчики для кнопок закрытия
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  // Закрытие при клике вне модального окна
  avitoModal.addEventListener('click', (event) => {
    if (event.target === avitoModal) {
      closeModal();
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && avitoModal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Автооткрытие отключено: модальное окно больше не показывается при загрузке страницы.
}
