// ---------- hero parallax ----------
const heroVideo = document.querySelector('.hero-video');
const heroScatter = document.querySelector('.hero-scatter');
const heroSection = document.querySelector('.hero');
function onParallax(){
  if (!heroSection) return;
  const rect = heroSection.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) return;
  const y = window.scrollY;
  if (heroVideo) heroVideo.style.transform = `translateY(${y * 0.18}px)`;
  if (heroScatter) heroScatter.style.transform = `translateY(${y * 0.08}px)`;
}
window.addEventListener('scroll', onParallax, { passive: true });
onParallax();

// ---------- header on scroll + progress bar ----------
const header = document.getElementById('header');
const progressBar = document.getElementById('progressBar');

function onScroll(){
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 40);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (y / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---------- mobile nav ----------
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ---------- scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-pop');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// hero elements reveal immediately on load (not scroll-dependent)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-fade').forEach(el => {
    observer.unobserve(el);
    requestAnimationFrame(() => el.classList.add('in'));
  });
});

// ---------- contact form ----------
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn span');
    const original = btn.textContent;
    btn.textContent = 'Надіслано ✓';
    form.querySelector('.submit-btn').style.background = 'var(--accent)';
    setTimeout(() => {
      btn.textContent = original;
      form.reset();
    }, 2400);
  });
}
