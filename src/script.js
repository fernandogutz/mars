import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 1000,
    offset: 100,
    delay: 500
});

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('textures/mars.jpg')

// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(.5, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = .8
material.normalMap = normalTexture
material.color = new THREE.Color(0xd6d6d6)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xC7434B)
pointLight.position.set(0,-6,-2);
pointLight.intensity = .5;
scene.add(pointLight)

/* gui.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
gui.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
gui.add(pointLight.position, 'z').min(-10).max(3).step(0.01)
gui.add(pointLight, 'intensity').min(0).max(10).step(1) */

const pointLight2 = new THREE.PointLight(0x9C2E35)
pointLight2.position.set(-3,6,-1);
pointLight2.intensity = 1.5;

scene.add(pointLight2)

/* gui.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
gui.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
gui.add(pointLight2.position, 'z').min(-10).max(3).step(0.01)
gui.add(pointLight2, 'intensity').min(0).max(10).step(1) */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */


document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX);
    mouseY = (event.clientY - windowY);
}

const updateSphere = (event) => {
    if (window.scrollY < windowY * 7) {
        sphere.position.y = window.scrollY * .001;
        document.querySelector('.webgl').style.display = 'block';
    } else {
        document.querySelector('.webgl').style.display = 'none';
    }
}

window.addEventListener('scroll', updateSphere);


// BG COLOR
const updateBackground = (event) => {
    if (window.scrollY > windowY * 17) {
        document.querySelector('.content').style.backgroundColor = '#000000';
        document.querySelector('.webgl').style.mixBlendMode = 'hard-light';

    } else if(window.scrollY > windowY * 11){
        document.querySelector('.content').style.backgroundColor = '#0B3D91';
        document.querySelector('.webgl').style.mixBlendMode = 'hard-light';

    } else if(window.scrollY > windowY * 3){
        document.querySelector('.content').style.backgroundColor = '#9C2E35';
        document.querySelector('.webgl').style.mixBlendMode = 'hard-light';

    } else {
        document.querySelector('.content').style.backgroundColor = '#101010';
        document.querySelector('.webgl').style.mixBlendMode = 'exclusion';

    }
}

window.addEventListener('scroll', updateBackground);


const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.x += .4 * (targetY - sphere.rotation.x);
    sphere.rotation.y += .4 * (targetX - sphere.rotation.y);
    sphere.rotation.y += .4 * (targetY - sphere.rotation.x);

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()