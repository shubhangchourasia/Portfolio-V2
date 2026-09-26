
    const root = document.documentElement;


    document.getElementById('themeToggle').addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (next === 'light') root.removeAttribute('data-theme');
      else root.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('shubhang-portfolio', next); } catch {}
    });

    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    mobileToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); mobileToggle.setAttribute('aria-expanded', open); mobileToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navLinks.classList.remove('open'); mobileToggle.setAttribute('aria-expanded', 'false'); }));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sections = ['work', 'craft', 'timeline', 'contact'];
    const anchors = [...document.querySelectorAll('.nav-links a')];
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      anchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + visible.target.id));
    }, { rootMargin: '-35% 0px -50% 0px', threshold: [0, .25, .5, 1] });
    sections.forEach(id => { const section = document.getElementById(id); if (section) sectionObserver.observe(section); });

document.querySelectorAll('#year, [data-current-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
const contactSection = document.getElementById('contact');
const floatingTop = document.querySelector('.floating-top');
if (contactSection && floatingTop) {
  const updateFloatingTop = () => { floatingTop.hidden = contactSection.getBoundingClientRect().top >= window.innerHeight; };
  window.addEventListener('scroll', updateFloatingTop, { passive: true });
  window.addEventListener('resize', updateFloatingTop);
  updateFloatingTop();
}

