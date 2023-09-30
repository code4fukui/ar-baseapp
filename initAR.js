import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // for PC
import { ARButton } from "three/addons/webxr/ARButton.js";

export const initAR = () => {
	const container = document.createElement("div");
	document.body.appendChild(container);

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 10);
	camera.position.set(0, 0, 3);

	const controls = new OrbitControls(camera, container);
	controls.minDistance = 0;
	controls.maxDistance = 8;

	scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

	const light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 6, 0);
	scene.add(light);

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio(devicePixelRatio);
	renderer.setSize(innerWidth, innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.xr.enabled = true;
	container.appendChild(renderer.domElement);

	document.body.appendChild(ARButton.createButton(renderer));

	addEventListener("resize", () => {
		camera.aspect = innerWidth / innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(innerWidth, innerHeight);
	});
	renderer.setAnimationLoop(() => {
		renderer.render(scene, camera);
	});
	return scene;
};
