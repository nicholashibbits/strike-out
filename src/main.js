import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const gui = new GUI();

const material = new THREE.MeshPhysicalMaterial();

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);

material.metalness = 0.5;
material.roughness = 1;
material.clearcoat = 1;
material.clearcoatRoughness = 0;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

const lightFolder = gui.addFolder("Light");
lightFolder.add(pointLight.position, "x").min(-3).max(3).step(0.01);
lightFolder.add(pointLight.position, "y").min(-3).max(3).step(0.01);
lightFolder.add(pointLight.position, "z").min(-3).max(3).step(0.01);
lightFolder.add(ambientLight, "intensity").min(0).max(3).step(0.01);

scene.add(pointLight);
scene.add(sphere);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

const materialFolder = gui.addFolder("Material");

materialFolder.add(material, "metalness").min(0).max(1).step(0.0001);
materialFolder.add(material, "roughness").min(0).max(1).step(0.0001);
materialFolder.add(material, "clearcoat").min(0).max(1).step(0.0001);
materialFolder.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
