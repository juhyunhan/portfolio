import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function alignToVector(object: THREE.Object3D, start: THREE.Vector3, end: THREE.Vector3) {
  const direction = end.clone().sub(start)
  object.position.copy(start.clone().add(end).multiplyScalar(0.5))
  object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize())
}

function AerospaceScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x041225, 0.065)
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.35, 10)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x041225, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    const world = new THREE.Group()
    world.rotation.x = -0.05
    scene.add(world)

    scene.add(new THREE.AmbientLight(0x8dbfff, 1.45))
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.4)
    keyLight.position.set(5, 5, 7)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0x1685ff, 35, 20)
    rimLight.position.set(-5, 2, 3)
    scene.add(rimLight)

    const earth = new THREE.Group()
    earth.position.set(0, -2.7, 0)
    world.add(earth)
    const earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(3.35, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x092b55, roughness: 0.7, metalness: 0.18, emissive: 0x031a39, emissiveIntensity: 0.8 }),
    )
    earth.add(earthMesh)
    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(3.38, 28, 18),
      new THREE.MeshBasicMaterial({ color: 0x258cff, wireframe: true, transparent: true, opacity: 0.22 }),
    )
    earth.add(grid)
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(3.48, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0x1678e8, transparent: true, opacity: 0.1, side: THREE.BackSide }),
    )
    earth.add(atmosphere)

    const latitude = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 3.7, 1.32, 0, Math.PI * 2).getPoints(160).map((p) => new THREE.Vector3(p.x, p.y + 0.1, -0.1))),
      new THREE.LineBasicMaterial({ color: 0x58a8ff, transparent: true, opacity: 0.42 }),
    )
    world.add(latitude)

    const satellite = new THREE.Group()
    const satelliteBody = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.48, 0.58), new THREE.MeshStandardMaterial({ color: 0xdde8f5, metalness: 0.8, roughness: 0.25 }))
    satellite.add(satelliteBody)
    const gold = new THREE.MeshStandardMaterial({ color: 0xd89a35, metalness: 0.62, roughness: 0.34 })
    const core = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.3, 0.72), gold)
    satellite.add(core)
    const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x0751a8, metalness: 0.45, roughness: 0.28, emissive: 0x032855, emissiveIntensity: 0.8 })
    ;[-1, 1].forEach((side) => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.06, 0.06), new THREE.MeshStandardMaterial({ color: 0x91a5bb, metalness: 0.75 }))
      arm.position.x = side * 0.53
      satellite.add(arm)
      const panel = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.05, 0.64), panelMaterial)
      panel.position.x = side * 1.38
      satellite.add(panel)
      for (let i = -2; i <= 2; i += 1) {
        const seam = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.058, 0.65), new THREE.MeshBasicMaterial({ color: 0x67a8eb }))
        seam.position.x = side * 1.38 + i * 0.19
        satellite.add(seam)
      }
    })
    const dish = new THREE.Mesh(new THREE.ConeGeometry(0.23, 0.18, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xeaf4ff, metalness: 0.6, side: THREE.DoubleSide }))
    dish.rotation.x = Math.PI
    dish.position.set(0, -0.33, 0)
    satellite.add(dish)
    satellite.scale.setScalar(0.9)
    world.add(satellite)

    const aircraft = new THREE.Group()
    const aircraftMaterial = new THREE.MeshStandardMaterial({ color: 0xdce9f7, metalness: 0.55, roughness: 0.3 })
    const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x0d345d, metalness: 0.4, roughness: 0.4 })
    const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.24, 2.35, 22), aircraftMaterial)
    fuselage.rotation.z = Math.PI / 2
    aircraft.add(fuselage)
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.5, 22), aircraftMaterial)
    nose.rotation.z = -Math.PI / 2
    nose.position.x = 1.42
    aircraft.add(nose)
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 2.25), aircraftMaterial)
    wing.position.x = -0.05
    aircraft.add(wing)
    const tailWing = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.05, 0.95), aircraftMaterial)
    tailWing.position.x = -0.92
    aircraft.add(tailWing)
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.75, 0.08), aircraftMaterial)
    tail.position.set(-0.92, 0.34, 0)
    tail.rotation.z = -0.28
    aircraft.add(tail)
    ;[-0.66, 0.66].forEach((z) => {
      const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.56, 18), darkMaterial)
      engine.rotation.z = Math.PI / 2
      engine.position.set(0.08, -0.12, z)
      aircraft.add(engine)
    })
    aircraft.scale.setScalar(0.75)
    aircraft.rotation.set(0.08, -0.18, -0.05)
    world.add(aircraft)

    const satelliteBeam = new THREE.Mesh(
      new THREE.ConeGeometry(1.1, 3.25, 28, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x2196ff, transparent: true, opacity: 0.17, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    world.add(satelliteBeam)
    const aircraftBeam = new THREE.Mesh(
      new THREE.ConeGeometry(0.62, 1.9, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: 0x58c7ff, transparent: true, opacity: 0.14, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    )
    world.add(aircraftBeam)

    const orbit = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 4.35, 2.15, 0.1, Math.PI * 1.1).getPoints(120).map((p) => new THREE.Vector3(p.x, p.y - 0.7, 0))),
      new THREE.LineDashedMaterial({ color: 0x60adff, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity: 0.6 }),
    )
    orbit.computeLineDistances()
    world.add(orbit)

    const starGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(330)
    for (let i = 0; i < starPositions.length; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 15
      starPositions[i + 1] = (Math.random() - 0.2) * 9
      starPositions[i + 2] = (Math.random() - 0.5) * 6 - 1
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
    const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xa9d5ff, size: 0.025, transparent: true, opacity: 0.75 }))
    world.add(stars)

    const pointer = new THREE.Vector2()
    const targetRotation = new THREE.Vector2()
    const handlePointer = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      targetRotation.set(pointer.y * 0.12, pointer.x * 0.18)
    }
    const resetPointer = () => targetRotation.set(0, 0)
    mount.addEventListener('pointermove', handlePointer)
    mount.addEventListener('pointerleave', resetPointer)

    const startTime = performance.now()
    let frameId = 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      world.rotation.x += (targetRotation.x - world.rotation.x) * 0.035
      world.rotation.y += (targetRotation.y - world.rotation.y) * 0.035
      earth.rotation.y = elapsed * (reduceMotion ? 0.015 : 0.05)
      const satelliteAngle = 2.18 + Math.sin(elapsed * 0.16) * 0.18
      satellite.position.set(Math.cos(satelliteAngle) * 4.05, Math.sin(satelliteAngle) * 2.2 - 0.35, 0.25)
      satellite.rotation.y = elapsed * 0.18
      satellite.rotation.z = -0.18 + Math.sin(elapsed * 0.4) * 0.04
      aircraft.position.set(2.35 + Math.sin(elapsed * 0.24) * 0.18, -0.05 + Math.sin(elapsed * 0.55) * 0.08, 0.65)
      aircraft.rotation.z = -0.05 + Math.sin(elapsed * 0.42) * 0.03
      const satTarget = new THREE.Vector3(-0.62, -1.12, 0)
      alignToVector(satelliteBeam, satellite.position, satTarget)
      satelliteBeam.scale.y = satellite.position.distanceTo(satTarget) / 3.25
      const planeTarget = new THREE.Vector3(1.1, -1.55, 0)
      alignToVector(aircraftBeam, aircraft.position, planeTarget)
      aircraftBeam.scale.y = aircraft.position.distanceTo(planeTarget) / 1.9
      const pulse = 0.13 + (Math.sin(elapsed * 2.2) + 1) * 0.035
      ;(satelliteBeam.material as THREE.MeshBasicMaterial).opacity = pulse
      ;(aircraftBeam.material as THREE.MeshBasicMaterial).opacity = pulse * 0.8
      stars.rotation.y = elapsed * 0.008
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    return () => {
      cancelAnimationFrame(frameId)
      observer.disconnect()
      mount.removeEventListener('pointermove', handlePointer)
      mount.removeEventListener('pointerleave', resetPointer)
      renderer.dispose()
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => material.dispose())
        }
      })
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="aerospace-scene" ref={mountRef}>
    <div className="scene-hud scene-hud-satellite"><span>01</span><b>ORBITAL SENSOR</b></div>
    <div className="scene-hud scene-hud-aircraft"><span>02</span><b>AIRBORNE IMAGING</b></div>
    <div className="scene-interaction">MOVE TO EXPLORE <i>↗</i></div>
  </div>
}

export default AerospaceScene
