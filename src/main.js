import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function addStar(scene) {
    const geometry = new THREE.SphereGeometry(0.1, 12, 12);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(30));
    star.position.set(x, y, z);
    scene.add(star);
}

function main() {
    const canvas = document.querySelector("#c");
    const scene = new THREE.Scene();

    // Set up camera
    const fov = 90;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 300;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.x = 4;
    camera.position.y = 2;
    camera.position.z = 3;

    // Load up the pizza box boys
    const loader = new GLTFLoader();
    let pizzaBox;
    loader.load(
        'source/pizza.glb',
        (gltf) => {
            pizzaBox = gltf.scene;
            scene.add(gltf.scene);
        },
        undefined,
        (error) => console.error('An error occurred while loading the model:', error)
    );

    // Set up stars
    Array(200).fill().forEach(() => addStar(scene));

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas,  });
    renderer.setSize(window.innerWidth, window.innerHeight, true);
    renderer.render(scene, camera);

    // Set up lighting
    // const pointLight = new THREE.PointLight(0xffffff)
    // pointLight.position.set(1.01, 1.01, 1.01);
    // scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // scene.add(lightHelper);

    // Set up grid
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(gridHelper);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);

    function loop(time) {
        { // Update state
            time *= 0.0003;  // convert time to seconds
        
            if (pizzaBox) pizzaBox.rotation.y = time;
            // cube.rotation.y = time;
        }

        { // Update view
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight, true);
            renderer.render(scene, camera);
        }

        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    
    loop(0);
}

main();