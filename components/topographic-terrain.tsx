"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

interface TopographicTerrainProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
}

// 1. Deterministic Permutation Table for Procedural Simplex/Perlin Noise
const permTable = new Uint8Array(512)
const perm: number[] = []
let seed = 1984
function rng() {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}
for (let i = 0; i < 256; i++) perm.push(i)
for (let i = 255; i > 0; i--) {
  const j = Math.floor(rng() * (i + 1))
  const tmp = perm[i]
  perm[i] = perm[j]
  perm[j] = tmp
}
for (let i = 0; i < 256; i++) {
  permTable[i] = permTable[i + 256] = perm[i]
}

function grad2d(hash: number, x: number, y: number): number {
  const h = hash & 7
  const u = h < 4 ? x : y
  const v = h < 4 ? y : x
  return (h & 1 ? -u : u) + (h & 2 ? -2.0 * v : 2.0 * v)
}

function noise2d(x: number, y: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)
  const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10)
  const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10)
  const aa = permTable[permTable[X] + Y]
  const ab = permTable[permTable[X] + Y + 1]
  const ba = permTable[permTable[X + 1] + Y]
  const bb = permTable[permTable[X + 1] + Y + 1]
  const x1 = (1 - u) * grad2d(aa, xf, yf) + u * grad2d(ba, xf - 1, yf)
  const x2 = (1 - u) * grad2d(ab, xf, yf - 1) + u * grad2d(bb, xf - 1, yf - 1)
  return (1 - v) * x1 + v * x2
}

// Multi-octave ridged multi-fractal noise (produces sharp geological arêtes & ridges)
function ridgedNoise(x: number, z: number): number {
  let sum = 0
  let freq = 0.024
  let amp = 1.0
  let weight = 1.0
  for (let i = 0; i < 5; i++) {
    let n = 1.0 - Math.abs(noise2d(x * freq, z * freq))
    n = n * n
    sum += n * amp * weight
    weight = Math.min(1.0, n * 1.6)
    freq *= 2.05
    amp *= 0.48
  }
  return sum
}

// Full terrain extents
const xMin = -65, xMax = 65
const zMin = -55, zMax = 50

// Realistic alpine elevation function modeled directly from reference topography
function getElevation(x: number, z: number): number {
  // Domain warping for natural geological fluid folding & meandering spurs
  const wx = noise2d(x * 0.018 + 2.3, z * 0.018 + 5.1) * 12.0
  const wz = noise2d(x * 0.018 + 6.7, z * 0.018 + 1.9) * 12.0
  const qx = x + wx
  const qz = z + wz

  // 1. Dominant Left Mountain Massif (broad ridge cascading forward)
  const d1 = Math.hypot(qx + 18, qz - 4) / 28.0
  const p1 = Math.max(0, 1 - d1 * d1)
  const peak1 = p1 * p1 * 2.8

  // 2. Right Mountain Massif (sharp conical pyramid peak)
  const d2 = Math.hypot(qx - 26, qz - 2) / 22.0
  const p2 = Math.max(0, 1 - d2 * d2)
  const peak2 = p2 * p2 * 2.4

  // 3. Background Mountain Range (receding horizon ridges)
  const d3 = Math.hypot(qx * 0.7 + 6, qz + 28) / 34.0
  const p3 = Math.max(0, 1 - d3 * d3)
  const peak3 = p3 * p3 * 2.2

  // 4. Center-rear Connecting Saddle Ridge
  const d4 = Math.hypot(qx - 4, qz + 12) / 24.0
  const p4 = Math.max(0, 1 - d4 * d4)
  const peak4 = p4 * p4 * 1.4

  // 5. Geological erosion multi-fractal layer & fine crags
  const r = ridgedNoise(qx, qz)
  const micro = noise2d(x * 0.1, z * 0.1) * 0.08

  // Natural boundary falloff so contours form closed loops instead of cutting off at the edges
  const fx = Math.min(1.0, Math.max(0, Math.min(x - xMin, xMax - x) / 10.0))
  const fz = Math.min(1.0, Math.max(0, Math.min(z - zMin, zMax - z) / 10.0))
  const f = fx * fz
  const edgeFalloff = f * f * (3 - 2 * f)

  const mountainShapes = peak1 + peak2 + peak3 + peak4
  return ((mountainShapes * (0.55 + 0.45 * r) + r * 0.3 + micro)) * edgeFalloff
}

// Correct Marching squares lookup table for 16 cell boundary cases
// Bit 0: TL, Bit 1: TR, Bit 2: BR, Bit 3: BL
// Edges: 0: Top, 1: Right, 2: Bottom, 3: Left
const MS_EDGES = [
  [],           // 0
  [3, 0],       // 1 (TL)
  [0, 1],       // 2 (TR)
  [3, 1],       // 3 (TL, TR)
  [1, 2],       // 4 (BR)
  [3, 0, 1, 2], // 5 (TL, BR saddle)
  [0, 2],       // 6 (TR, BR)
  [3, 2],       // 7 (TL, TR, BR)
  [3, 2],       // 8 (BL)
  [0, 2],       // 9 (TL, BL)
  [0, 1, 3, 2], // 10 (TR, BL saddle)
  [1, 2],       // 11 (TL, TR, BL)
  [3, 1],       // 12 (BR, BL)
  [0, 1],       // 13 (TL, BR, BL)
  [3, 0],       // 14 (TR, BR, BL)
  []            // 15 (all)
]

function getEdgePoint(
  edge: number,
  H: number,
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  v00: number,
  v10: number,
  v11: number,
  v01: number
): [number, number] {
  let t = 0.5
  if (edge === 0) {
    const denom = v10 - v00
    if (Math.abs(denom) > 1e-6) t = (H - v00) / denom
    t = Math.max(0, Math.min(1, t))
    return [x0 + t * (x1 - x0), z0]
  } else if (edge === 1) {
    const denom = v11 - v10
    if (Math.abs(denom) > 1e-6) t = (H - v10) / denom
    t = Math.max(0, Math.min(1, t))
    return [x1, z0 + t * (z1 - z0)]
  } else if (edge === 2) {
    const denom = v11 - v01
    if (Math.abs(denom) > 1e-6) t = (H - v01) / denom
    t = Math.max(0, Math.min(1, t))
    return [x0 + t * (x1 - x0), z1]
  } else {
    const denom = v01 - v00
    if (Math.abs(denom) > 1e-6) t = (H - v00) / denom
    t = Math.max(0, Math.min(1, t))
    return [x0, z0 + t * (z1 - z0)]
  }
}

export function TopographicTerrain({ scrollContainerRef }: TopographicTerrainProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    const canvasContainer = canvasContainerRef.current
    const scrollContainer = scrollContainerRef.current
    if (!container || !canvasContainer || !scrollContainer) return

    // 1. Scene, Camera & Renderer Setup
    const width = container.clientWidth || 800
    const height = container.clientHeight || 600

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    // Oblique high-altitude fly-over camera angle looking across the terrain (shifted ~200px down towards page bottom)
    const camPos = new THREE.Vector3(0, 16, 68)
    const lookTarget = new THREE.Vector3(0, 11.6, 0)
    camera.position.copy(camPos)
    camera.lookAt(lookTarget)

    // Compute Camera Orientation Vectors for Sub-pixel Line Thickness dilation
    const camDir = new THREE.Vector3().subVectors(lookTarget, camPos).normalize()
    const worldUp = new THREE.Vector3(0, 1, 0)
    const camRight = new THREE.Vector3().crossVectors(camDir, worldUp).normalize()
    const camUp = new THREE.Vector3().crossVectors(camRight, camDir).normalize()
    const offVec = new THREE.Vector3()
      .addScaledVector(camRight, 0.065)
      .addScaledVector(camUp, 0.065)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    canvasContainer.appendChild(renderer.domElement)

    // 2. Compute 2D Elevation Field
    const cols = 140
    const rows = 110
    const dx = (xMax - xMin) / (cols - 1)
    const dz = (zMax - zMin) / (rows - 1)

    const heights = new Float32Array(cols * rows)
    let minH = Infinity, maxH = -Infinity
    for (let j = 0; j < rows; j++) {
      const z = zMin + j * dz
      for (let i = 0; i < cols; i++) {
        const x = xMin + i * dx
        const h = getElevation(x, z)
        heights[j * cols + i] = h
        if (h < minH) minH = h
        if (h > maxH) maxH = h
      }
    }

    // 3. Extract Marching Squares Contour Lines
    const numLevels = 42
    const regularCoords: number[] = []
    const indexCoords: number[] = []
    const crestCoords: number[] = []

    for (let lvl = 1; lvl < numLevels; lvl++) {
      const norm = lvl / numLevels
      const threshold = minH + (maxH - minH) * norm
      // Elevation mapped to Y (relief scale 2.2, grounded cleanly below view center)
      const yElev = (threshold - minH) * 2.2 - 9.0
      const isCrest = norm >= 0.82
      const isIndex = !isCrest && lvl % 5 === 0
      const targetArr = isCrest ? crestCoords : isIndex ? indexCoords : regularCoords

      for (let j = 0; j < rows - 1; j++) {
        const z0 = zMin + j * dz
        const z1 = z0 + dz
        for (let i = 0; i < cols - 1; i++) {
          const x0 = xMin + i * dx
          const x1 = x0 + dx

          const v00 = heights[j * cols + i]
          const v10 = heights[j * cols + (i + 1)]
          const v11 = heights[(j + 1) * cols + (i + 1)]
          const v01 = heights[(j + 1) * cols + i]

          let mask = 0
          if (v00 >= threshold) mask |= 1
          if (v10 >= threshold) mask |= 2
          if (v11 >= threshold) mask |= 4
          if (v01 >= threshold) mask |= 8

          if (mask === 0 || mask === 15) continue
          const edges = MS_EDGES[mask]
          for (let e = 0; e < edges.length; e += 2) {
            const p1 = getEdgePoint(edges[e], threshold, x0, x1, z0, z1, v00, v10, v11, v01)
            const p2 = getEdgePoint(edges[e + 1], threshold, x0, x1, z0, z1, v00, v10, v11, v01)

            // Primary line stroke
            targetArr.push(p1[0], yElev, p1[1], p2[0], yElev, p2[1])

            // Sub-pixel dilation stroke: increases perceived line thickness cleanly
            targetArr.push(
              p1[0] + offVec.x, yElev + offVec.y, p1[1] + offVec.z,
              p2[0] + offVec.x, yElev + offVec.y, p2[1] + offVec.z
            )

            // Index contours & crest summits receive an extra stroke for bold hierarchy
            if (isIndex || isCrest) {
              targetArr.push(
                p1[0] - offVec.x, yElev - offVec.y, p1[1] - offVec.z,
                p2[0] - offVec.x, yElev - offVec.y, p2[1] - offVec.z
              )
            }
          }
        }
      }
    }

    // 4. Build Three.js 3D Line Geometries
    const terrainGroup = new THREE.Group()
    scene.add(terrainGroup)

    const isDark = resolvedTheme === "dark"
    const baseColor = isDark ? 0xffffff : 0x0f172a
    const crestColor = isDark ? 0xe0f2fe : 0x0f172a // Slight luminous cyan-white crest in dark mode

    // 3-Tier Materials matching the glowing blueprint aesthetic of reference (halved to 50% opacity)
    const regularMat = new THREE.LineBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: isDark ? 0.06 : 0.04,
    })
    const indexMat = new THREE.LineBasicMaterial({
      color: baseColor,
      transparent: true,
      opacity: isDark ? 0.16 : 0.11,
    })
    const crestMat = new THREE.LineBasicMaterial({
      color: crestColor,
      transparent: true,
      opacity: isDark ? 0.425 : 0.275,
    })

    // Tilt-Shift Depth-of-Field shader hook: tight focal plane with steep atmospheric distance falloff
    const applyDepthOfFieldShader = (material: THREE.LineBasicMaterial) => {
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uFocusDist = { value: 68.0 }
        shader.uniforms.uFocusRange = { value: 12.0 }

        shader.vertexShader =
          `
          uniform float uFocusDist;
          uniform float uFocusRange;
          varying float vDepthFactor;
        ` + shader.vertexShader

        shader.vertexShader = shader.vertexShader.replace(
          "#include <project_vertex>",
          `
          #include <project_vertex>
          float d = length(mvPosition.xyz);
          float diff = abs(d - uFocusDist);
          float t = clamp((diff - uFocusRange) / 36.0, 0.0, 1.0);
          vDepthFactor = 0.12 + 0.88 * (1.0 - t * t * (3.0 - 2.0 * t));
          `
        )

        shader.fragmentShader =
          `
          varying float vDepthFactor;
        ` + shader.fragmentShader

        shader.fragmentShader = shader.fragmentShader.replace(
          "#include <color_fragment>",
          `
          #include <color_fragment>
          diffuseColor.a *= vDepthFactor;
          `
        )
      }
    }

    applyDepthOfFieldShader(regularMat)
    applyDepthOfFieldShader(indexMat)
    applyDepthOfFieldShader(crestMat)

    const regularGeo = new THREE.BufferGeometry()
    regularGeo.setAttribute("position", new THREE.Float32BufferAttribute(regularCoords, 3))
    const regularLines = new THREE.LineSegments(regularGeo, regularMat)
    terrainGroup.add(regularLines)

    const indexGeo = new THREE.BufferGeometry()
    indexGeo.setAttribute("position", new THREE.Float32BufferAttribute(indexCoords, 3))
    const indexLines = new THREE.LineSegments(indexGeo, indexMat)
    terrainGroup.add(indexLines)

    const crestGeo = new THREE.BufferGeometry()
    crestGeo.setAttribute("position", new THREE.Float32BufferAttribute(crestCoords, 3))
    const crestLines = new THREE.LineSegments(crestGeo, crestMat)
    terrainGroup.add(crestLines)

    // Initial position & whisper-subtle scroll parallax
    terrainGroup.position.set(0, 0, 0)
    const startOrbit = Math.PI * 0.05
    const totalOrbit = Math.PI * 0.10625 // Whisper-subtle ~19 deg drift across full scroll

    // 5. Direct Scroll Listener & Dynamic Progress Calculation
    let targetProgress = 0
    let currentProgress = 0

    const updateScroll = () => {
      const containerMax = scrollContainer.scrollHeight - scrollContainer.clientHeight
      if (containerMax > 5) {
        targetProgress = Math.min(1, Math.max(0, scrollContainer.scrollTop / containerMax))
      } else {
        const windowMax = document.documentElement.scrollHeight - window.innerHeight
        if (windowMax > 5) {
          targetProgress = Math.min(1, Math.max(0, window.scrollY / windowMax))
        } else {
          targetProgress = 0
        }
      }
    }

    updateScroll()
    scrollContainer.addEventListener("scroll", updateScroll, { passive: true })
    window.addEventListener("scroll", updateScroll, { passive: true })

    // 6. Physics Render Loop
    let animationFrameId: number
    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08
      terrainGroup.rotation.y = startOrbit + totalOrbit * currentProgress
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight
        camera.updateProjectionMatrix()
        camera.lookAt(0, 11.6, 0)
        renderer.setSize(newWidth, newHeight)
        updateScroll()
      }
    })
    resizeObserver.observe(container)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollContainer.removeEventListener("scroll", updateScroll)
      window.removeEventListener("scroll", updateScroll)
      resizeObserver.disconnect()

      regularGeo.dispose()
      indexGeo.dispose()
      crestGeo.dispose()
      regularMat.dispose()
      indexMat.dispose()
      crestMat.dispose()

      renderer.dispose()
      if (canvasContainer.contains(renderer.domElement)) {
        canvasContainer.removeChild(renderer.domElement)
      }
    }
  }, [scrollContainerRef, resolvedTheme])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none sticky top-0 left-0 w-full h-[85vh] -mb-[85vh] overflow-hidden -z-10 translate-y-[50px]"
      aria-hidden="true"
    >
      {/* 3D WebGL Canvas Layer (Stacked at z-0) */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Tilt-Shift Horizon Heavy Blur Layer (Dramatic 28px creamy blur over background) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[71%] z-10 backdrop-blur-[28px] [-webkit-backdrop-filter:blur(28px)] [mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_75%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Tilt-Shift Intermediate Horizon Smoothing Layer (14px) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[73%] z-10 backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)] [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Tilt-Shift Foreground Heavy Blur Layer (Dramatic 20px blur across near foreground) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] z-10 backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] [mask-image:linear-gradient(to_top,black_0%,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Tilt-Shift Intermediate Foreground Smoothing Layer (10px) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[16%] z-10 backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)] [mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_45%,transparent_100%)]"
        aria-hidden="true"
      />
    </div>
  )
}
