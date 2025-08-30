const toggleButton = document.querySelector('.menu-toggle');
const tocNav = document.getElementById('toc');

if (toggleButton && tocNav) {
  function closeNav(){
    tocNav.classList.remove('is-open');
    toggleButton.setAttribute('aria-expanded','false');
  }
  function openNav(){
    tocNav.classList.add('is-open');
    toggleButton.setAttribute('aria-expanded','true');
  }

  toggleButton.addEventListener('click', () => {
    const isOpen = tocNav.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (event) => {
    if (!tocNav.classList.contains('is-open')) return;
    const target = event.target;
    if (toggleButton.contains(target) || tocNav.contains(target)) return;
    closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  tocNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
}

