// ── Three.js Hero Scene ──────────────────────────────────────────────────
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 18);

  // Ambient + point lights
  scene.add(new THREE.AmbientLight(0x6366f1, 0.4));
  const pl1 = new THREE.PointLight(0x6366f1, 2, 50); pl1.position.set(10, 10, 10); scene.add(pl1);
  const pl2 = new THREE.PointLight(0x06b6d4, 2, 50); pl2.position.set(-10, -10, 5); scene.add(pl2);
  const pl3 = new THREE.PointLight(0x8b5cf6, 1.5, 40); pl3.position.set(0, 10, -10); scene.add(pl3);

  // Floating objects
  const objects = [];
  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(0.9, 0),
    new THREE.TorusGeometry(0.7, 0.25, 8, 20),
    new THREE.TetrahedronGeometry(0.9, 0),
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.TorusKnotGeometry(0.6, 0.2, 60, 8),
    new THREE.SphereGeometry(0.7, 16, 16),
  ];
  const colors = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0xa855f7, 0x3b82f6, 0x10b981, 0xf59e0b];

  for (let i = 0; i < 22; i++) {
    const geo = geometries[i % geometries.length];
    const mat = new THREE.MeshStandardMaterial({
      color: colors[i % colors.length],
      wireframe: i % 3 === 0,
      transparent: true,
      opacity: i % 3 === 0 ? 0.5 : 0.8,
      roughness: 0.3,
      metalness: 0.6,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const r = 8 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    mesh.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi) - 5);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    const s = 0.4 + Math.random() * 0.7;
    mesh.scale.setScalar(s);
    objects.push({ mesh, speed: 0.003 + Math.random() * 0.008, axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(), floatY: Math.random() * Math.PI * 2, floatSpeed: 0.4 + Math.random() * 0.6 });
    scene.add(mesh);
  }

  // Central glowing sphere
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, wireframe: true, transparent: true, opacity: 0.15 });
  const core = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), coreMat);
  scene.add(core);

  // Grid plane
  const gridHelper = new THREE.GridHelper(40, 30, 0x6366f1, 0x6366f1);
  gridHelper.material.opacity = 0.06; gridHelper.material.transparent = true;
  gridHelper.position.y = -6; scene.add(gridHelper);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;
    objects.forEach(o => {
      o.mesh.rotateOnAxis(o.axis, o.speed);
      o.mesh.position.y += Math.sin(t * o.floatSpeed + o.floatY) * 0.003;
    });
    core.rotation.y += 0.002;
    camera.position.x += (mouseX * 2 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    gridHelper.position.x += (mouseX * 0.5 - gridHelper.position.x) * 0.02;
    renderer.render(scene, camera);
  }
  animate();
}

// ── Three.js About Sphere ────────────────────────────────────────────────
function initAboutScene() {
  const canvas = document.getElementById('about-canvas');
  if (!canvas) return;
  const w = canvas.parentElement.clientWidth || 350;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, w);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 5;

  scene.add(new THREE.AmbientLight(0x6366f1, 0.6));
  const pl = new THREE.PointLight(0x06b6d4, 3, 20); pl.position.set(5, 5, 5); scene.add(pl);
  const pl2 = new THREE.PointLight(0x8b5cf6, 2, 20); pl2.position.set(-5, -3, 3); scene.add(pl2);

  // Main sphere
  const sphereMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.1, metalness: 0.9, wireframe: false });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1.4, 64, 64), sphereMat);
  scene.add(sphere);

  // Wireframe overlay
  const wireMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.3 });
  const wire = new THREE.Mesh(new THREE.SphereGeometry(1.45, 20, 20), wireMat);
  scene.add(wire);

  // Orbital ring
  const ringGeo = new THREE.TorusGeometry(2.2, 0.04, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  // Particles around sphere
  const pGeo = new THREE.BufferGeometry();
  const pVerts = [];
  for (let i = 0; i < 300; i++) {
    const r = 2.5 + Math.random() * 1.5;
    const t = Math.random() * Math.PI * 2, p = Math.random() * Math.PI;
    pVerts.push(r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p));
  }
  pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pVerts, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.04, transparent: true, opacity: 0.7 }));
  scene.add(particles);

  let t2 = 0;
  function animate() {
    requestAnimationFrame(animate);
    t2 += 0.01;
    sphere.rotation.y += 0.006;
    wire.rotation.y -= 0.003;
    ring.rotation.z += 0.008;
    particles.rotation.y += 0.003;
    sphere.position.y = Math.sin(t2 * 0.5) * 0.1;
    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('DOMContentLoaded', () => {
  initHeroScene();
  initAboutScene();
  initSkillsScene();
  initProjectsScene();
});

// ── Three.js Skills Section Background ──────────────────────────────────
function initSkillsScene() {
  const canvas = document.getElementById('skills-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const section = canvas.parentElement;
  const W = section.offsetWidth || window.innerWidth;
  const H = section.offsetHeight || 600;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
  camera.position.z = 30;

  scene.add(new THREE.AmbientLight(0x6366f1, 0.3));
  const plSkills = new THREE.PointLight(0x06b6d4, 2, 60);
  plSkills.position.set(10, 10, 10);
  scene.add(plSkills);

  // Floating icon-like shapes — representing different skill categories
  const geos = [
    new THREE.IcosahedronGeometry(0.6, 0),   // ML
    new THREE.OctahedronGeometry(0.5, 0),    // Algorithms
    new THREE.TorusGeometry(0.4, 0.15, 6, 12), // Tools
    new THREE.BoxGeometry(0.7, 0.7, 0.7),    // Core
    new THREE.TetrahedronGeometry(0.55, 0),  // DL
  ];
  const cols = [0x6366f1, 0x8b5cf6, 0x06b6d4, 0xa855f7, 0x10b981, 0x3b82f6, 0xf59e0b];
  const floaters = [];

  for (let i = 0; i < 38; i++) {
    const geo = geos[i % geos.length];
    const col = cols[i % cols.length];
    const isWire = i % 3 === 0;
    const mat = isWire
      ? new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.25 })
      : new THREE.MeshStandardMaterial({ color: col, transparent: true, opacity: 0.18, roughness: 0.4, metalness: 0.7 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 15
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    const s = 0.5 + Math.random() * 1.2;
    mesh.scale.setScalar(s);
    scene.add(mesh);
    floaters.push({
      mesh,
      rotX: (Math.random() - 0.5) * 0.008,
      rotY: (Math.random() - 0.5) * 0.01,
      floatY: Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.4,
    });
  }

  // Background particle dust
  const pCount = 200;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 80;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 50;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x6366f1, size: 0.18, transparent: true, opacity: 0.4 }));
  scene.add(particles);

  let t = 0;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) loop(); });
  }, { threshold: 0.1 });
  obs.observe(section);

  let running = false;
  function loop() {
    if (running) return; running = true;
    (function animate() {
      requestAnimationFrame(animate);
      t += 0.008;
      floaters.forEach(f => {
        f.mesh.rotation.x += f.rotX;
        f.mesh.rotation.y += f.rotY;
        f.mesh.position.y += Math.sin(t * f.floatSpeed + f.floatY) * 0.005;
      });
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
    })();
  }

  window.addEventListener('resize', () => {
    const nW = section.offsetWidth, nH = section.offsetHeight;
    camera.aspect = nW / nH; camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  });
}

// ── Three.js Projects Section Background ────────────────────────────────
function initProjectsScene() {
  const canvas = document.getElementById('projects-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const section = canvas.parentElement;
  const W = section.offsetWidth || window.innerWidth;
  const H = section.offsetHeight || 700;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
  camera.position.z = 28;

  scene.add(new THREE.AmbientLight(0x8b5cf6, 0.25));
  const plProj1 = new THREE.PointLight(0x6366f1, 2.5, 70);
  plProj1.position.set(-15, 10, 10);
  scene.add(plProj1);
  const plProj2 = new THREE.PointLight(0x06b6d4, 1.5, 60);
  plProj2.position.set(15, -10, 5);
  scene.add(plProj2);

  // Neural network graph — nodes + edges
  const nodeCount = 24;
  const nodePositions = [];
  const nodeMeshes = [];
  const nodeMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, roughness: 0.3, metalness: 0.8, transparent: true, opacity: 0.55 });

  for (let i = 0; i < nodeCount; i++) {
    const pos = new THREE.Vector3(
      (Math.random() - 0.5) * 42,
      (Math.random() - 0.5) * 26,
      (Math.random() - 0.5) * 8
    );
    nodePositions.push(pos);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), nodeMat.clone());
    m.position.copy(pos);
    scene.add(m);
    nodeMeshes.push(m);
  }

  // Connect nearby nodes with glowing lines
  const lineMat = new THREE.LineBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.12 });
  for (let a = 0; a < nodeCount; a++) {
    for (let b = a + 1; b < nodeCount; b++) {
      if (nodePositions[a].distanceTo(nodePositions[b]) < 14) {
        const lGeo = new THREE.BufferGeometry().setFromPoints([nodePositions[a], nodePositions[b]]);
        scene.add(new THREE.Line(lGeo, lineMat));
      }
    }
  }

  // Data flow pulses — small dots that travel along edges
  const pulseGeo = new THREE.SphereGeometry(0.12, 6, 6);
  const pulseMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 1, transparent: true, opacity: 0.9 });
  const pulses = [];
  for (let i = 0; i < 10; i++) {
    const pulse = new THREE.Mesh(pulseGeo, pulseMat.clone());
    scene.add(pulse);
    const a = Math.floor(Math.random() * nodeCount);
    const b = Math.floor(Math.random() * nodeCount);
    pulses.push({ mesh: pulse, from: nodePositions[a], to: nodePositions[b], t: Math.random(), speed: 0.003 + Math.random() * 0.004 });
  }

  // Star-field background
  const starCount = 300;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3]     = (Math.random() - 0.5) * 100;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 80;
    starPos[i * 3 + 2] = -10 - Math.random() * 20;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.3 })));

  let t = 0;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) loop(); });
  }, { threshold: 0.1 });
  obs.observe(section);

  let running = false;
  function loop() {
    if (running) return; running = true;
    (function animate() {
      requestAnimationFrame(animate);
      t += 0.008;
      nodeMeshes.forEach((m, i) => {
        m.position.y += Math.sin(t * 0.4 + i) * 0.003;
      });
      pulses.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) { p.t = 0; }
        p.mesh.position.lerpVectors(p.from, p.to, p.t);
      });
      renderer.render(scene, camera);
    })();
  }

  window.addEventListener('resize', () => {
    const nW = section.offsetWidth, nH = section.offsetHeight;
    camera.aspect = nW / nH; camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  });
}
