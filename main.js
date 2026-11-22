window.addEventListener('DOMContentLoaded', () => {
  try { initBootSequence(); } catch (e) { console.warn('boot error', e); }
  try { initNavbar(); } catch (e) { console.warn('navbar error', e); }
  try { buildSkills(); } catch (e) { console.warn('skills error', e); }
  try { buildProjects(); } catch (e) { console.warn('projects error', e); }
  try { buildServices(); } catch (e) { console.warn('services error', e); }
  try { initReveals(); } catch (e) { console.warn('reveal error', e); }
  try { initForm(); } catch (e) { console.warn('form error', e); }
  try { setYear(); } catch (e) { console.warn('year error', e); }
  try { initCursor(); } catch (e) { console.warn('cursor error', e); }
});

// ── Boot Sequence Typewriter ─────────────────────────────────────────────
function initBootSequence() {
  const bootLine = document.getElementById('bootLine');
  const bootOutput = document.getElementById('bootOutput');
  const typewriter = document.getElementById('typewriter');
  if (!bootLine || !bootOutput || !typewriter) return;

  const bootMsgs = [
    '> initializing system...',
    '> loading kernel modules...',
    '> mounting filesystem...',
    '> starting network services...',
    '> system ready.',
  ];

  let i = 0;
  function nextBoot() {
    if (i < bootMsgs.length) {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.textContent = bootMsgs[i];
      bootOutput.appendChild(line);
      i++;
      setTimeout(nextBoot, 400);
    } else {
      setTimeout(() => {
        typeWriter('welcome to shubham@portfolio:~$ — data science & machine learning terminal', typewriter, 30, () => {
          typewriter.innerHTML += '<span class="blink">_</span>';
        });
      }, 500);
    }
  }
  setTimeout(nextBoot, 300);
}

function typeWriter(text, element, speed, callback) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

// ── Navbar ───────────────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  document.querySelector('.nav-container').appendChild(hamburger);

  const navLinks = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
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
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.section === current);
  });
}

// ── Build Skills (clean categories with progress bars) ───────────────────
function buildSkills() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;
  SKILL_CATEGORIES.forEach(cat => {
    const section = document.createElement('div');
    section.className = 'skill-category reveal';
    section.innerHTML = `
      <div class="skill-category-header">
        <div class="skill-category-dot"></div>
        <span class="skill-category-title">${cat.title}</span>
      </div>
      <div class="skill-list">
        ${cat.items.map(s => {
          const filled = Math.round(s.level / 20);
          const dots = Array.from({ length: 5 }, (_, i) =>
            `<span class="skill-dot${i < filled ? ' filled' : ''}"></span>`
          ).join('');
          return `
            <div class="skill-item">
              <span class="skill-name">${s.name}</span>
              <div class="skill-dots">${dots}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    grid.appendChild(section);
  });
}

// ── Build Projects (list view) ───────────────────────────────────────────
function buildProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;
  PROJECTS.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="project-header">
        <span class="project-tag">${p.tag}</span>
      </div>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-subtitle">${p.subtitle}</p>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="project-links">
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary">
          <i class="ri-external-link-line"></i> Live App
        </a>` : ''}
        <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline">
          <i class="ri-github-line"></i> GitHub
        </a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Build Services ───────────────────────────────────────────────────────
function buildServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  SERVICES.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = 'service-card reveal';
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <h3 class="svc-title">${s.title}</h3>
      <p class="svc-desc">${s.desc}</p>
    `;
    grid.appendChild(card);
  });
}

// ── Scroll Reveals (IntersectionObserver, no GSAP needed) ────────────────
function initReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('reveal-pending');
    observer.observe(el);
  });

  // Add CSS for reveal animation
  const style = document.createElement('style');
  style.textContent = `
    .reveal-pending { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal-pending.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);
}

// ── Contact Form ─────────────────────────────────────────────────────────
function initForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-btn');
    const original = btn.innerHTML;
    btn.innerHTML = '<span>SENDING...</span>';
    btn.disabled = true;
    if (note) {
      note.textContent = '';
      note.style.color = 'var(--text-muted)';
    }
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        btn.innerHTML = '<span>MESSAGE SENT</span>';
        btn.style.background = 'var(--success)';
        btn.style.color = 'var(--bg)';
        if (note) {
          note.textContent = 'Message sent successfully. I will respond shortly.';
          note.style.color = 'var(--success)';
        }
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      btn.innerHTML = '<span>SEND FAILED</span>';
      btn.style.background = 'var(--error)';
      btn.style.color = '#fff';
      if (note) {
        note.textContent = 'Something went wrong. Please email me directly.';
        note.style.color = 'var(--error)';
      }
    } finally {
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 2000);
    }
  });
}

// ── Footer Year ──────────────────────────────────────────────────────────
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Custom Cursor ────────────────────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor) return;
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  const hoverables = document.querySelectorAll('a, button, .skill-item, .project-card, .service-card, .btn, .contact-link');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      cursor.style.background = 'var(--accent)';
      cursor.style.opacity = '0.6';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.background = 'var(--accent)';
      cursor.style.opacity = '1';
    });
  });
}
