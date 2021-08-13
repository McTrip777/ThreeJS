import './style.css'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('textures/NormalMap1.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const sphereGeometry = new THREE.SphereBufferGeometry( .7, 100, 1 );

// Materials
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.2
material.metalness = 0.7
material.normalMap = normalTexture
material.color = new THREE.Color(0x252525)

// Mesh
const sphere = new THREE.Mesh(sphereGeometry,material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(2,3,4)
scene.add(pointLight)

// Red Light
const pointLightRed = new THREE.PointLight(0xff0000, 2)
pointLightRed.position.set(1.4,1.4,0)
pointLightRed.intensity = 3
scene.add(pointLightRed)

// const redLight = gui.addFolder('Red Light')
// redLight.add(pointLightRed.position, 'x').min(-3).max(3).step(0.01)
// redLight.add(pointLightRed.position, 'y').min(-3).max(3).step(0.01)
// redLight.add(pointLightRed.position, 'z').min(-3).max(3).step(0.01)
// redLight.add(pointLightRed, 'intensity').min(0).max(10).step(0.01)

// Blue Light
const pointLightBlue = new THREE.PointLight(0x0000ff, 2)
pointLightBlue.position.set(-1.4,-1.4,0)
pointLightBlue.intensity = 3
scene.add(pointLightBlue)

// const blueLight = gui.addFolder('Blue Light')
// blueLight.add(pointLightBlue.position, 'x').min(-3).max(3).step(0.01)
// blueLight.add(pointLightBlue.position, 'y').min(-3).max(3).step(0.01)
// blueLight.add(pointLightBlue.position, 'z').min(-3).max(3).step(0.01)
// blueLight.add(pointLightBlue, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLightBlue, .1)
// scene.add(pointLightHelper)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
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
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

const onDocumentMouseMove = event => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
    sphere.position.y = (event.clientY*-.001) + .75
    sphere.position.x = (event.clientX*.001) -.75
}
document.addEventListener('mousemove', onDocumentMouseMove)

const onDocumentScroll = event => {
    sphere.position.y = window.scrollY * -0.002
    sphere.position.x = window.scrollY * -0.002
    sphere.position.z = window.scrollY * -0.0002
}
document.addEventListener('scroll', onDocumentScroll)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .7 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += 1 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()