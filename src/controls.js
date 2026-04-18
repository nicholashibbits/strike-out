import GUI from "lil-gui";

export const addControls = (controls) => {
  const gui = new GUI();
  const { pointLight, ambientLight, material } = controls;

  const lightFolder = gui.addFolder("Light");
  const materialFolder = gui.addFolder("Material");

  lightFolder.add(pointLight.position, "x").min(-3).max(3).step(0.01);
  lightFolder.add(pointLight.position, "y").min(-3).max(3).step(0.01);
  lightFolder.add(pointLight.position, "z").min(-3).max(3).step(0.01);
  lightFolder.add(ambientLight, "intensity").min(0).max(3).step(0.01);

  materialFolder.add(material, "metalness").min(0).max(1).step(0.0001);
  materialFolder.add(material, "roughness").min(0).max(1).step(0.0001);
  materialFolder.add(material, "clearcoat").min(0).max(1).step(0.0001);
  materialFolder.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);
};
