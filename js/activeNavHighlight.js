const navLinks = document.querySelectorAll('#toc a');
if (navLinks.length) {
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

  sections.forEach((section) => activeObserver.observe(section));
  navLinks.forEach((link) => link.addEventListener('click', () => {
    const id = link.getAttribute('href').slice(1);
    setActive(id);
  }));
}

