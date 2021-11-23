import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Matrix3 } from 'three'
import { seededRandom } from 'three/src/math/MathUtils'


const faders = document.querySelectorAll(".come-up");

const slideup = document.querySelectorAll(".slide-up");

const slideninleft = document.querySelectorAll(".slide-in-left");

const slideinright = document.querySelectorAll(".slide-in-right");




//loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/static/Texture/nomalmapGolf.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects/Material/Mesh
const geometry1 = new THREE.SphereBufferGeometry(.5, 64, 64)
const material1 = new THREE.MeshPhysicalMaterial({
    normalMap: normalTexture,
    normalScale: new THREE.Vector2(0.15,0.15)
})
material1.color = new THREE.Color(0Xff0000)
const sphere1 = new THREE.Mesh(geometry1, material1)
scene.add(sphere1)

// Objects/Material/Mesh
const geometry2 = new THREE.SphereBufferGeometry(.5, 64, 64)
const material2 = new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    normalScale: new THREE.Vector2(0.15,0.15)
})
material2.color = new THREE.Color(0X000000)
const sphere2 = new THREE.Mesh(geometry2, material2)
scene.add(sphere2)

// Objects/Material/Mesh
const geometry3 = new THREE.SphereBufferGeometry(.5, 64, 64)
const material3 = new THREE.MeshStandardMaterial({
    normalMap: normalTexture,
    normalScale: new THREE.Vector2(0.15,0.15)
})
material3.color = new THREE.Color(0X000000)
const sphere3 = new THREE.Mesh(geometry3, material3)
scene.add(sphere3)

const partiklesGeometry = new THREE.BufferGeometry;
const partiklesCNT = 5000;

const posArray = new Float32Array(partiklesCNT * 3)

for(let i = 0; i < partiklesCNT * 3; i++){
    posArray[i] = (Math.random() - 0.5) * 5
}

const material = new THREE.PointsMaterial({
    size: 0.005
})

partiklesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
const particlemesh = new THREE.Points(partiklesGeometry, material)
scene.add(particlemesh)



//------------------------------------------------LIGHT-----------------------------------------------------
const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(200,200,200)
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff0000, 2)

pointLight2.position.set(1,1,1)
pointLight2.intensity = 4;
scene.add(pointLight2)

const light1 = gui.addFolder('red light')

light1.add(pointLight2.position, 'y').min(-10).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-10).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-10).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

const pointLight3 = new THREE.PointLight(0xe1ff, 2)

pointLight3.position.set(1.60,3,4)
pointLight3.intensity = 4;
scene.add(pointLight3)

const light2 = gui.addFolder('blue light')

light2.add(pointLight3.position, 'y').min(-10).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-10).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-10).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000
}

light2.addColor(light2Color, 'color')
.onChange(() => {
  pointLight3.color.set(light2Color.color)
})

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.5, 100)
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

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}
const updateSphere = (event) =>{
    sphere1.position.y = window.scrollY * .02

    sphere2.position.y = window.scrollY * .01

    sphere3.position.y = window.scrollY * .01
}

window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    particlemesh.rotation.y = .05 * elapsedTime

    sphere1.rotation.y = .5 * elapsedTime
    sphere1.rotation.y += .5 * (targetX - sphere1.rotation.y)
    sphere1.rotation.x += .05 * (targetY - sphere1.rotation.x)
    sphere1.position.z += .05 * (targetY - sphere1.rotation.x)

    sphere2.rotation.y = .5 * elapsedTime
    sphere2.rotation.y += .5 * (targetX - sphere1.rotation.y)
    sphere2.rotation.y += .5 * (targetX - sphere1.rotation.y)
    sphere2.position.x = 2
    sphere2.position.z += .05 * (targetY - sphere1.rotation.x)


    sphere3.rotation.y = .5 * elapsedTime
    sphere3.rotation.y += .5 * (targetX - sphere1.rotation.y)
    sphere3.position.x = -2
    sphere3.position.z += .05 * (targetY - sphere1.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()



const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -150px 0px"
};

const appearOnScroll = new IntersectionObserver
(function(
    entries,
    appearOnScroll
) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        }else{
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target)
        }
    });
    
},
appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

slideup.forEach(slide => {
    appearOnScroll.observe(slide);
});

slideninleft.forEach(slideLeft => {
    appearOnScroll.observe(slideLeft);
});

slideinright.forEach(slideRight => {
    appearOnScroll.observe(slideRight);
});

loadinanimation.forEach(loadInAnimation => {
    appearOnScroll.observe(loadInAnimation);
});