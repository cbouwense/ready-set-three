import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function main() {
    const canvas = document.querySelector("#c");
    const scene = new THREE.Scene();

    // Set up camera
    const fov = 90;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 30;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // Set up cube
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const material = new THREE.MeshStandardMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas,  });
    renderer.setSize(window.innerWidth, window.innerHeight, true);
    renderer.render(scene, camera);

    // Set up lighting
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xefefef);
    scene.add(ambientLight);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);

    // Set up grid
    const gridHelper = new THREE.GridHelper(200, 50);
    scene.add(gridHelper);

    // Set up controls
    const controls = new OrbitControls(camera, renderer.domElement);

    function loop(time) {
        { // Update state
            time *= 0.001;  // convert time to seconds
        
            cube.rotation.x = time;
            cube.rotation.y = time;
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