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
});
