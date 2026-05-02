import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { addControls } from "./controls";

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const texturePath = "/textures/Marble_Red_004_";

const colorMap = textureLoader.load(texturePath + "basecolor.jpg");
const aoMap = textureLoader.load(texturePath + "ambientOcclusion.jpg");
const heightMap = textureLoader.load(texturePath + "height.png");
const normalMap = textureLoader.load(texturePath + "normal.jpg");
const roughnessMap = textureLoader.load(texturePath + "roughness.jpg");

colorMap.colorSpace = THREE.SRGBColorSpace;

for (const t of [colorMap, aoMap, heightMap, normalMap, roughnessMap]) {
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
}

const material = new THREE.MeshPhysicalMaterial({
  map: colorMap,
  aoMap,
  aoMapIntensity: 1,
  normalMap,
  roughnessMap,
  displacementMap: heightMap,
  displacementScale: 0.02,
});

material.metalness = 0;
material.roughness = 1;
material.clearcoat = 1;
material.clearcoatRoughness = 0;

const geometry = new THREE.SphereGeometry(0.5, 128, 128);
geometry.setAttribute("uv2", geometry.attributes.uv);
const sphere = new THREE.Mesh(geometry, material);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

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
  antialias: true,
});

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

for (const t of [colorMap, aoMap, heightMap, normalMap, roughnessMap]) {
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
}

addControls({ pointLight, ambientLight, material });

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
