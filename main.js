window.addEventListener('DOMContentLoaded', () => {
  buildSkills();
  buildServices();
  initParticles();
  initNavbar();
  initScrollAnimations();
  initCounters();
  initProjectTilt();
  checkFormPlaceholder();
  initServiceCanvases();
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
    card.dataset.svcColor = s.color;
    card.dataset.svcIndex = i;
    card.innerHTML = `
      <canvas class="svc-3d-canvas" id="svcCanvas${i}"></canvas>
      <div class="svc-icon-wrap"><i class="${s.icon}"></i></div>
      <h3 class="svc-title">${s.title}</h3>
      <p class="svc-desc">${s.desc}</p>
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

// ── 3D Tilt on Project Cards ──────────────────────────────────────────────
function initProjectTilt() {
  ['projectCard', 'projectCard2'].forEach(id => {
    const card = document.getElementById(id);
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

// ── 3D Service Card Canvases (DS/ML Themed) ──────────────────────────────
function initServiceCanvases() {
  if (typeof THREE === 'undefined') return;

  // Scene builders — one per service card, DS/ML themed
  const builders = [
    buildScatterCloud,      // 0: Data Analysis     → 3D scatter plot
    buildNeuralNetwork,     // 1: ML Model Building  → neural net nodes + edges
    buildNeuralLayers,      // 2: Deep Learning      → stacked layer planes
    buildBarChart3D,        // 3: Dashboard Creation → 3D bar chart
    buildOrbitParticles,    // 4: Python Automation  → orbiting data particles
    buildDatabaseRings,     // 5: SQL Data Analysis  → stacked DB rings
    buildWirePolygon,       // 6: 3D Landing Website → wireframe dodecahedron
  ];

  SERVICES.forEach((svc, i) => {
    const canvas = document.getElementById(`svcCanvas${i}`);
    if (!canvas) return;

    const W = 120, H = 120;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pt = new THREE.PointLight(new THREE.Color(svc.color), 3, 10);
    pt.position.set(2, 2, 2);
    scene.add(pt);

    const fn = builders[i % builders.length];
    const { group, animate: customAnimate } = fn(svc.color);
    scene.add(group);

    let hovered = false;
    const card = canvas.closest('.service-card');
    if (card) {
      card.addEventListener('mouseenter', () => { hovered = true; });
      card.addEventListener('mouseleave', () => { hovered = false; });
    }

    (function loop() {
      requestAnimationFrame(loop);
      customAnimate(group, hovered);
      renderer.render(scene, camera);
    })();
  });

  // ── 0: Scatter Plot Cloud (Data Analysis) ───────────────────────────────
  function buildScatterCloud(hex) {
    const group = new THREE.Group();
    const color = new THREE.Color(hex);
    const count = 60;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color, size: 0.09, transparent: true, opacity: 0.85 });
    group.add(new THREE.Points(geo, mat));

    // trend line
    const lGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1, -0.8, 0), new THREE.Vector3(1, 0.8, 0)
    ]);
    group.add(new THREE.Line(lGeo, new THREE.LineBasicMaterial({ color, opacity: 0.5, transparent: true })));
    return { group, animate: (g, h) => { g.rotation.y += h ? 0.025 : 0.006; g.rotation.x += 0.003; } };
  }

  // ── 1: Neural Network (ML Model Building) ───────────────────────────────
  function buildNeuralNetwork(hex) {
    const group = new THREE.Group();
    const color = new THREE.Color(hex);
    const nodeMat = new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.9 });
    const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
    const layers = [[[-0.7, 0.4], [-0.7, -0.4]], [[0, 0.7], [0, 0], [0, -0.7]], [[0.7, 0.4], [0.7, -0.4]]];
    const nodes = [];
    layers.forEach(layer => {
      layer.forEach(([x, y]) => {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 10), nodeMat.clone());
        mesh.position.set(x, y, 0);
        group.add(mesh);
        nodes.push(mesh.position);
      });
    });
    // Connect layers with lines
    [[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,5],[2,6],[3,5],[3,6],[4,5],[4,6]].forEach(([a,b]) => {
      const pts = [nodes[a].clone(), nodes[b].clone()];
      group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    });
    return { group, animate: (g, h) => { g.rotation.y += h ? 0.03 : 0.007; } };
  }

  // ── 2: Stacked Neural Layers (Deep Learning) ────────────────────────────
  function buildNeuralLayers(hex) {
    const group = new THREE.Group();
    const color = new THREE.Color(hex);
    const layerCount = 5;
    for (let i = 0; i < layerCount; i++) {
      const t = i / (layerCount - 1);
      const c = new THREE.Color().lerpColors(new THREE.Color(hex), new THREE.Color('#06b6d4'), t);
      const mat = new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.55 });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.8, 4, 2), mat);
      mesh.position.y = (i - 2) * 0.32;
      mesh.rotation.x = 0.3;
      group.add(mesh);

      // Nodes on each layer
      for (let j = 0; j < 4; j++) {
        const n = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 6, 6),
          new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.8 })
        );
        n.position.set(-0.45 + j * 0.3, (i - 2) * 0.32, 0);
        group.add(n);
      }
    }
    return { group, animate: (g, h) => { g.rotation.y += h ? 0.028 : 0.006; g.rotation.x = Math.sin(Date.now() * 0.0005) * 0.2; } };
  }

  // ── 3: 3D Bar Chart (Dashboard Creation) ────────────────────────────────
  function buildBarChart3D(hex) {
    const group = new THREE.Group();
    const heights = [0.5, 1.1, 0.7, 1.4, 0.9, 1.2];
    heights.forEach((h, i) => {
      const t = i / (heights.length - 1);
      const c = new THREE.Color().lerpColors(new THREE.Color(hex), new THREE.Color('#06b6d4'), t);
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, h, 0.22),
        new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.85 })
      );
      bar.position.set(-0.6 + i * 0.24, h / 2 - 0.7, 0);
      group.add(bar);
      // Wireframe outline
      const wire = new THREE.Mesh(bar.geometry, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.4 }));
      wire.position.copy(bar.position);
      group.add(wire);
    });
    return { group, animate: (g, h) => { g.rotation.y += h ? 0.03 : 0.007; } };
  }

  // ── 4: Orbiting Data Particles (Python Automation) ──────────────────────
  function buildOrbitParticles(hex) {
    const group = new THREE.Group();
    const color = new THREE.Color(hex);
    // Core sphere
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 16),
      new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.7 })
    );
    group.add(core);
    // Orbit rings
    [0.65, 0.9, 1.1].forEach((r, ri) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.015, 8, 48),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 - ri * 0.06 })
      );
      ring.rotation.x = ri * 0.6;
      ring.rotation.z = ri * 0.4;
      group.add(ring);
    });
    // Orbiting data dots
    const orbiters = [];
    for (let k = 0; k < 8; k++) {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 8, 8),
        new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.5 })
      );
      group.add(dot);
      orbiters.push({ mesh: dot, angle: (k / 8) * Math.PI * 2, radius: 0.65 + (k % 3) * 0.25, speed: 0.02 + k * 0.003, axis: new THREE.Vector3(Math.sin(k), Math.cos(k * 0.7), 0.5).normalize() });
    }
    let t = 0;
    return { group, animate: (g, h) => {
      t += h ? 0.04 : 0.012;
      orbiters.forEach(o => {
        o.angle += o.speed * (h ? 2.5 : 1);
        o.mesh.position.set(Math.cos(o.angle) * o.radius, Math.sin(o.angle) * o.radius * 0.5, Math.sin(o.angle * 0.7) * o.radius * 0.4);
      });
      g.rotation.y += 0.005;
    }};
  }

  // ── 5: Database Rings (SQL) ─────────────────────────────────────────────
  function buildDatabaseRings(hex) {
    const group = new THREE.Group();
    const color = new THREE.Color(hex);
    const levels = 4;
    for (let i = 0; i < levels; i++) {
      const t = i / (levels - 1);
      const c = new THREE.Color().lerpColors(new THREE.Color(hex), new THREE.Color('#06b6d4'), t);
      const disk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 0.1, 32),
        new THREE.MeshPhongMaterial({ color: c, transparent: true, opacity: 0.75 })
      );
      disk.position.y = -0.45 + i * 0.3;
      group.add(disk);
      const wire = new THREE.Mesh(disk.geometry, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.4 }));
      wire.position.copy(disk.position);
      group.add(wire);
    }
    // Vertical connector
    const connector = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 })
    );
    group.add(connector);
    return { group, animate: (g, h) => { g.rotation.y += h ? 0.03 : 0.007; g.rotation.x = Math.sin(Date.now() * 0.0004) * 0.15; } };
  }

  // ── 6: Wireframe Dodecahedron + Satellite (3D Landing) ──────────────────
  function buildWirePolygon(hex) {
    const group = new THREE.Group();
    const color = new THREE.Color(hex);
    const solid = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.6, 0),
      new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.12 })
    );
    const wire = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.6, 0),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.65 })
    );
    group.add(solid, wire);

    // Orbiting satellite ring
    const pivot = new THREE.Object3D();
    group.add(pivot);
    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 8, 8),
      new THREE.MeshPhongMaterial({ color, emissive: color, emissiveIntensity: 0.7 })
    );
    sat.position.set(1.0, 0, 0);
    pivot.add(sat);

    let t = 0;
    return { group, animate: (g, h) => {
      t += h ? 0.04 : 0.01;
      solid.rotation.x += 0.005; solid.rotation.y += 0.008;
      wire.rotation.x  += 0.005; wire.rotation.y  += 0.008;
      pivot.rotation.z += h ? 0.045 : 0.015;
      pivot.rotation.x = Math.sin(t * 0.5) * 0.6;
    }};
  }
}

