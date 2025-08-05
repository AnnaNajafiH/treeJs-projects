// ✅ Use the correct CDN and version
import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

// Simple molecule data: water (H2O)
const molecule = {
  atoms: [
    { type: "O", position: [0, 0, 0] },
    { type: "H", position: [0.96, 0.26, 0] },
    { type: "H", position: [-0.96, 0.26, 0] },
  ],
  bonds: [
    [0, 1],
    [0, 2],
  ],
};

// Atom colors
const atomColors = {
  H: 0xffffff,
  O: 0xff0000,
  C: 0x222222,
  N: 0x0000ff,
  S: 0xffff00,
};
const bondColor = 0x888888;

let scene, camera, renderer, controls, moleculeGroup;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x404040, 1.5));
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  moleculeGroup = new THREE.Group();
  scene.add(moleculeGroup);

  // Add atoms
  const atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  molecule.atoms.forEach(({ type, position }) => {
    const material = new THREE.MeshPhongMaterial({ color: atomColors[type] || 0xaaaaaa });
    const sphere = new THREE.Mesh(atomGeometry, material);
    sphere.position.set(...position);
    moleculeGroup.add(sphere);
  });

  // Add bonds
  molecule.bonds.forEach(([i1, i2]) => {
    const pos1 = new THREE.Vector3(...molecule.atoms[i1].position);
    const pos2 = new THREE.Vector3(...molecule.atoms[i2].position);
    const bond = createBond(pos1, pos2, 0.05, bondColor);
    moleculeGroup.add(bond);
  });

  window.addEventListener('resize', onWindowResize);
}

function createBond(start, end, radius, color) {
  const dir = new THREE.Vector3().subVectors(end, start);
  const length = dir.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 16);
  const material = new THREE.MeshPhongMaterial({ color });
  const cylinder = new THREE.Mesh(geometry, material);

  const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  cylinder.position.copy(midpoint);
  cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());

  return cylinder;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  moleculeGroup.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
