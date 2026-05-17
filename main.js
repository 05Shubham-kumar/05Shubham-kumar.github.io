window.addEventListener('DOMContentLoaded', () => {
  buildSkills();
  buildServices();
  initParticles();
  initNavbar();
  initScrollAnimations();
  initCounters();
  initProjectTilt();
  checkFormPlaceholder();
});

// ── Build Skills Grid ────────────────────────────────────────────────────
function buildSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  SKILLS.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card reveal-up';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="skill-icon-wrap" style="--skill-color:${s.color}">
        <i class="${s.icon}"></i>
      </div>
      <span class="skill-name">${s.name}</span>
      <span class="skill-cat">${s.cat}</span>
    `;
    grid.appendChild(card);
  });
}

// ── Build Services Grid ──────────────────────────────────────────────────
function buildServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  SERVICES.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'service-card reveal-up';
    card.style.setProperty('--svc-color', s.color);
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="svc-icon-wrap"><i class="${s.icon}"></i></div>
      <h3 class="svc-title">${s.title}</h3>
      <p class="svc-desc">${s.desc}</p>
      <div class="svc-arrow"><i class="ri-arrow-right-up-line"></i></div>
    `;
    grid.appendChild(card);
  });
}

// ── tsParticles ──────────────────────────────────────────────────────────
async function initParticles() {
  if (typeof tsParticles === 'undefined') return;
  await tsParticles.load('particles-hero', {
    fullScreen: false,
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 80, density: { enable: true, area: 900 } },
      color: { value: ['#6366f1', '#06b6d4', '#8b5cf6'] },
      links: { enable: true, color: '#6366f1', opacity: 0.15, distance: 150, width: 1 },
      move: { enable: true, speed: 0.8, outModes: 'bounce' },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
      opacity: { value: { min: 0.2, max: 0.6 } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 100 }, push: { quantity: 3 } },
    },
  });
}

// ── Sticky Navbar ────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === current);
  });
}

// ── Scroll Reveal ────────────────────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-up, .skill-card, .service-card').forEach(el => observer.observe(el));
}

// ── Animated Counters ────────────────────────────────────────────────────
function initCounters() {
  const nums = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = +el.dataset.target;
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 25);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

// ── 3D Tilt on Project Card ──────────────────────────────────────────────
function initProjectTilt() {
  const card = document.getElementById('projectCard');
  if (!card) return;
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
    card.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
}

// ── Check Google Form placeholder ───────────────────────────────────────
function checkFormPlaceholder() {
  const iframe = document.getElementById('contactForm');
  const placeholder = document.getElementById('formPlaceholder');
  if (iframe && iframe.src.includes('PASTE_GOOGLE_FORM')) {
    iframe.style.display = 'none';
    if (placeholder) placeholder.style.display = 'flex';
  } else {
    if (placeholder) placeholder.style.display = 'none';
  }
}
