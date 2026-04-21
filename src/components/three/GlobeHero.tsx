// /**
//  * GlobeHero.tsx — SAFE VERSION
//  * ✅ NO Text component  (was crashing via font download)
//  * ✅ NO Billboard       (was imported but not needed)
//  * ✅ NO font URLs       (no network dependency)
//  * Orbiting labels = plain HTML divs animated with requestAnimationFrame
//  */
// import { useRef, useMemo, useEffect, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import { Sphere, Line } from '@react-three/drei'
// import * as THREE from 'three'

// /* ─────────────────────────────────────────────────────────
//    THREE.JS SCENE COMPONENTS
// ───────────────────────────────────────────────────────── */

// function Stars() {
//   const ref = useRef<THREE.Points>(null!)
//   const positions = useMemo(() => {
//     const pos = new Float32Array(1800 * 3)
//     for (let i = 0; i < 1800; i++) {
//       pos[i * 3]     = (Math.random() - 0.5) * 50
//       pos[i * 3 + 1] = (Math.random() - 0.5) * 50
//       pos[i * 3 + 2] = (Math.random() - 0.5) * 50
//     }
//     return pos
//   }, [])
//   useFrame((_, d) => { ref.current.rotation.y += d * 0.004 })
//   return (
//     <points ref={ref}>
//       <bufferGeometry>
//         <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//       </bufferGeometry>
//       <pointsMaterial color="#a0b4d0" size={0.04} transparent opacity={0.45} sizeAttenuation />
//     </points>
//   )
// }

// function ParticleRing({ radius, count, speed, color, tilt }: {
//   radius: number; count: number; speed: number; color: string; tilt: number
// }) {
//   const ref = useRef<THREE.Points>(null!)
//   const positions = useMemo(() => {
//     const pos = new Float32Array(count * 3)
//     for (let i = 0; i < count; i++) {
//       const a = (i / count) * Math.PI * 2
//       pos[i * 3]     = Math.cos(a) * radius
//       pos[i * 3 + 1] = (Math.random() - 0.5) * 0.12
//       pos[i * 3 + 2] = Math.sin(a) * radius
//     }
//     return pos
//   }, [radius, count])
//   useFrame((_, d) => { ref.current.rotation.y += d * speed; ref.current.rotation.x = tilt })
//   return (
//     <points ref={ref}>
//       <bufferGeometry>
//         <bufferAttribute attach="attributes-position" args={[positions, 3]} />
//       </bufferGeometry>
//       <pointsMaterial color={color} size={0.022} transparent opacity={0.75} sizeAttenuation />
//     </points>
//   )
// }

// function GlobeCore() {
//   const groupRef = useRef<THREE.Group>(null!)
//   const glowRef  = useRef<THREE.Mesh>(null!)

//   const lines = useMemo(() => {
//     const segs: THREE.Vector3[][] = []
//     const R = 1.4
//     for (let lat = -75; lat <= 75; lat += 25) {
//       const rad = (lat * Math.PI) / 180
//       const pts: THREE.Vector3[] = []
//       for (let i = 0; i <= 64; i++) {
//         const lon = (i / 64) * Math.PI * 2
//         pts.push(new THREE.Vector3(
//           R * Math.cos(rad) * Math.cos(lon),
//           R * Math.sin(rad),
//           R * Math.cos(rad) * Math.sin(lon)
//         ))
//       }
//       segs.push(pts)
//     }
//     for (let lon = 0; lon < 360; lon += 30) {
//       const rad = (lon * Math.PI) / 180
//       const pts: THREE.Vector3[] = []
//       for (let i = 0; i <= 64; i++) {
//         const lat = (i / 64) * Math.PI * 2 - Math.PI
//         pts.push(new THREE.Vector3(
//           R * Math.cos(lat) * Math.cos(rad),
//           R * Math.sin(lat),
//           R * Math.cos(lat) * Math.sin(rad)
//         ))
//       }
//       segs.push(pts)
//     }
//     return segs
//   }, [])

//   useFrame((state) => {
//     const t = state.clock.elapsedTime
//     groupRef.current.rotation.y += 0.0025
//     groupRef.current.rotation.x  = Math.sin(t * 0.18) * 0.04
//     glowRef.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.018)
//   })

//   return (
//     <group ref={groupRef}>
//       <Sphere args={[1.3, 64, 64]}>
//         <meshStandardMaterial color="#0b1a35" metalness={0.6} roughness={0.25} transparent opacity={0.92} />
//       </Sphere>

//       <Sphere ref={glowRef} args={[1.35, 32, 32]}>
//         <meshBasicMaterial color="#22d3ee" transparent opacity={0.035} side={THREE.BackSide} />
//       </Sphere>

//       {lines.map((pts, i) => (
//         <Line
//           key={i}
//           points={pts}
//           color={i % 3 === 0 ? '#22d3ee' : '#1a4060'}
//           lineWidth={i % 3 === 0 ? 0.5 : 0.25}
//           transparent
//           opacity={i % 3 === 0 ? 0.3 : 0.15}
//         />
//       ))}

//       {([
//         [0.9, 0.7, 0.8], [-1.0, 0.2, 0.9],
//         [0.3,-1.1, 0.85],[1.1,-0.4,-0.5], [-0.5,0.95,-1.0]
//       ] as [number,number,number][]).map((pos, i) => (
//         <mesh key={i} position={pos}>
//           <sphereGeometry args={[0.035, 8, 8]} />
//           <meshBasicMaterial color={i % 2 === 0 ? '#22d3ee' : '#818cf8'} />
//         </mesh>
//       ))}
//     </group>
//   )
// }

// function Scene() {
//   return (
//     <>
//       <Stars />
//       <ambientLight intensity={0.35} />
//       <pointLight position={[4, 4, 4]}   intensity={2.5} color="#22d3ee" />
//       <pointLight position={[-4,-3,-2]}  intensity={1.5} color="#818cf8" />
//       <pointLight position={[0,-4,3]}    intensity={0.8} color="#fbbf24" />
//       <GlobeCore />
//       <ParticleRing radius={1.82} count={120} speed={0.14}  color="#22d3ee" tilt={0.2} />
//       <ParticleRing radius={2.12} count={80}  speed={-0.11} color="#818cf8" tilt={0.8} />
//       <ParticleRing radius={2.44} count={60}  speed={0.09}  color="#fbbf24" tilt={1.3} />
//     </>
//   )
// }

// /* ─────────────────────────────────────────────────────────
//    HTML ORBITING LABELS  (no Three.js Text = zero crashes)
// ───────────────────────────────────────────────────────── */

// const LABELS = [
//   { text: '⚡ Strong Response', color: '#34d399', bg: 'rgba(13,34,25,0.92)',  border: 'rgba(52,211,153,0.45)',  r: 210, speed: 22,  startDeg: 0   },
//   { text: '★  Strong Hire',     color: '#22d3ee', bg: 'rgba(10,30,42,0.92)',  border: 'rgba(34,211,238,0.45)',  r: 245, speed:-18,  startDeg: 130 },
//   { text: '◎  Empathy 9/10',    color: '#fbbf24', bg: 'rgba(30,26,8,0.92)',   border: 'rgba(251,191,36,0.45)',  r: 195, speed: 26,  startDeg: 250 },
//   { text: '✓  Clarity 8.5/10',  color: '#818cf8', bg: 'rgba(19,15,42,0.92)', border: 'rgba(129,140,248,0.45)', r: 230, speed:-14,  startDeg: 70  },
//   { text: '↑  Warmth Detected', color: '#c084fc', bg: 'rgba(26,14,36,0.92)', border: 'rgba(192,132,252,0.45)', r: 205, speed: 19,  startDeg: 190 },
// ]

// type LabelDef = typeof LABELS[0]

// function OrbitLabel({ label, cx, cy }: { label: LabelDef; cx: number; cy: number }) {
//   const [deg, setDeg]   = useState(label.startDeg)
//   const rafRef  = useRef<number>()
//   const prevRef = useRef<number | null>(null)

//   useEffect(() => {
//     const tick = (ts: number) => {
//       if (!prevRef.current) prevRef.current = ts
//       const dt = Math.min((ts - prevRef.current) / 1000, 0.05)
//       prevRef.current = ts
//       setDeg(d => d + label.speed * dt)
//       rafRef.current = requestAnimationFrame(tick)
//     }
//     rafRef.current = requestAnimationFrame(tick)
//     return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
//   }, [label.speed])

//   const rad = (deg * Math.PI) / 180
//   const x   = cx + Math.cos(rad) * label.r
//   const y   = cy + Math.sin(rad) * label.r * 0.35  // flatten → ellipse

//   return (
//     <div style={{
//       position: 'absolute',
//       left: x, top: y,
//       transform: 'translate(-50%,-50%)',
//       padding: '4px 12px',
//       borderRadius: 7,
//       background: label.bg,
//       border: `1px solid ${label.border}`,
//       color: label.color,
//       fontSize: '0.7rem',
//       fontFamily: '"DM Mono", monospace',
//       letterSpacing: '0.04em',
//       whiteSpace: 'nowrap',
//       pointerEvents: 'none',
//       backdropFilter: 'blur(10px)',
//       WebkitBackdropFilter: 'blur(10px)',
//       userSelect: 'none',
//       boxShadow: `0 0 12px ${label.border}`,
//     }}>
//       {label.text}
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────
//    MAIN EXPORT
// ───────────────────────────────────────────────────────── */

// export default function GlobeHero({ className = '' }: { className?: string }) {
//   const wrapRef = useRef<HTMLDivElement>(null)
//   const [size, setSize] = useState({ w: 560, h: 520 })

//   useEffect(() => {
//     const el = wrapRef.current
//     if (!el) return
//     // Set initial size
//     setSize({ w: el.clientWidth, h: el.clientHeight })
//     const ro = new ResizeObserver(([e]) => {
//       setSize({ w: e.contentRect.width, h: e.contentRect.height })
//     })
//     ro.observe(el)
//     return () => ro.disconnect()
//   }, [])

//   return (
//     <div
//       ref={wrapRef}
//       className={className}
//       style={{ width: '100%', height: '100%', position: 'relative' }}
//     >
//       {/* Three.js canvas — Sphere + Line only, no Text, no font downloads */}
//       <Canvas
//         camera={{ position: [0, 0, 6], fov: 45 }}
//         gl={{ antialias: true, alpha: true }}
//         style={{ background: 'transparent', width: '100%', height: '100%' }}
//       >
//         <Scene />
//       </Canvas>

//       {/* HTML labels — perfectly safe, no Three.js dependency */}
//       <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
//         {LABELS.map((l, i) => (
//           <OrbitLabel key={i} label={l} cx={size.w / 2} cy={size.h / 2} />
//         ))}
//       </div>
//     </div>
//   )
// }







/**
 * GlobeHero.tsx — SaaS UPGRADED VERSION
 * ✅ NO Text component  (no font download)
 * ✅ NO Billboard
 * ✅ NO font URLs
 * ✅ Deep navy blue palette matched to dark background
 * ✅ Phong shading + dual atmosphere glow + arc connections
 * ✅ Depth-fading orbiting HTML labels
 */
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

/* ─────────────────────────────────────────────────────────
   THREE.JS SCENE COMPONENTS
───────────────────────────────────────────────────────── */

function Stars() {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return pos
  }, [])
  useFrame((_, d) => { ref.current.rotation.y += d * 0.003 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7ab3d4" size={0.035} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function ParticleRing({ radius, count, speed, color, tiltX, tiltZ }: {
  radius: number; count: number; speed: number; color: string; tiltX: number; tiltZ?: number
}) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2
      pos[i * 3]     = Math.cos(a) * radius
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      pos[i * 3 + 2] = Math.sin(a) * radius
    }
    return pos
  }, [radius, count])

  useFrame((_, d) => {
    ref.current.rotation.y += d * speed
    ref.current.rotation.x = tiltX
    ref.current.rotation.z = tiltZ ?? 0
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.018} transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function ArcLine({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const mid = start.clone().add(end).normalize().multiplyScalar(start.length() * 1.35)
    const curve = new THREE.QuadraticBezierCurve3(start.clone(), mid, end.clone())
    return curve.getPoints(40)
  }, [start, end])

  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <line>
      <primitive object={geo} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={0.38} />
    </line>
  )
}

function GlobeCore() {
  const groupRef  = useRef<THREE.Group>(null!)
  const keyLightRef = useRef<THREE.PointLight>(null!)

  const R = 1.33

  // Grid lines
  const { primaryLines, secondaryLines } = useMemo(() => {
    const primary: THREE.Vector3[][] = []
    const secondary: THREE.Vector3[][] = []

    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const phi = (lat * Math.PI) / 180
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 80; i++) {
        const lon = (i / 80) * Math.PI * 2
        pts.push(new THREE.Vector3(
          R * Math.cos(phi) * Math.cos(lon),
          R * Math.sin(phi),
          R * Math.cos(phi) * Math.sin(lon)
        ))
      }
      lat % 40 === 0 ? primary.push(pts) : secondary.push(pts)
    }

    // Longitude lines
    for (let lon = 0; lon < 360; lon += 20) {
      const lam = (lon * Math.PI) / 180
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 80; i++) {
        const lat = (i / 80) * Math.PI * 2 - Math.PI
        pts.push(new THREE.Vector3(
          R * Math.cos(lat) * Math.cos(lam),
          R * Math.sin(lat),
          R * Math.cos(lat) * Math.sin(lam)
        ))
      }
      lon % 60 === 0 ? primary.push(pts) : secondary.push(pts)
    }

    return { primaryLines: primary, secondaryLines: secondary }
  }, [])

  // Hotspot positions
  const hotspots = useMemo<{ pos: THREE.Vector3; color: string }[]>(() => {
    const raw: [number, number, number, string][] = [
      [ 0.88,  0.72,  0.82, '#38bdf8'],
      [-0.95,  0.18,  0.88, '#818cf8'],
      [ 0.28, -1.08,  0.82, '#38bdf8'],
      [ 1.08, -0.38, -0.48, '#a78bfa'],
      [-0.48,  0.92, -0.95, '#38bdf8'],
      [ 0.55,  0.05, -1.20, '#818cf8'],
    ]
    return raw.map(([x, y, z, color]) => ({
      pos: new THREE.Vector3(x, y, z).normalize().multiplyScalar(R),
      color,
    }))
  }, [])

  // Arc pairs
  const arcs = useMemo(() => [
    { a: hotspots[0].pos, b: hotspots[2].pos, color: '#2563a8' },
    { a: hotspots[1].pos, b: hotspots[4].pos, color: '#4f46e5' },
    { a: hotspots[3].pos, b: hotspots[5].pos, color: '#2563a8' },
    { a: hotspots[0].pos, b: hotspots[3].pos, color: '#6366f1' },
  ], [hotspots])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y += 0.0022
    groupRef.current.rotation.x = Math.sin(t * 0.16) * 0.035
    if (keyLightRef.current) {
      keyLightRef.current.intensity = 5.5 + Math.sin(t * 0.9) * 0.8
    }
  })

  // Grid line geometries
  const primaryGeos  = useMemo(() => primaryLines.map(pts => new THREE.BufferGeometry().setFromPoints(pts)),  [primaryLines])
  const secondaryGeos = useMemo(() => secondaryLines.map(pts => new THREE.BufferGeometry().setFromPoints(pts)), [secondaryLines])

  return (
    <group ref={groupRef}>
      {/* Core sphere */}
      <Sphere args={[1.32, 64, 64]}>
        <meshPhongMaterial
          color="#060d1a"
          emissive="#0a1a30"
          shininess={120}
          transparent
          opacity={0.97}
        />
      </Sphere>

      {/* Inner atmosphere glow */}
      <Sphere args={[1.38, 64, 64]}>
        <meshBasicMaterial color="#2d7fc1" transparent opacity={0.07} side={THREE.BackSide} />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[1.45, 32, 32]}>
        <meshBasicMaterial color="#0d4a8c" transparent opacity={0.04} side={THREE.BackSide} />
      </Sphere>

      {/* Primary grid lines */}
      {primaryGeos.map((geo, i) => (
        <line key={`p${i}`}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color="#2563a8" transparent opacity={0.55} />
        </line>
      ))}

      {/* Secondary grid lines */}
      {secondaryGeos.map((geo, i) => (
        <line key={`s${i}`}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color="#0f2d52" transparent opacity={0.22} />
        </line>
      ))}

      {/* Hotspot dots */}
      {hotspots.map((h, i) => (
        <group key={i} position={h.pos}>
          <mesh>
            <sphereGeometry args={[0.028, 8, 8]} />
            <meshBasicMaterial color={h.color} />
          </mesh>
          {/* Halo ring */}
          <mesh lookAt={h.pos.clone().multiplyScalar(2)}>
            <ringGeometry args={[0.045, 0.07, 24]} />
            <meshBasicMaterial color={h.color} transparent opacity={0.35} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Arc connections */}
      {arcs.map((arc, i) => (
        <ArcLine key={i} start={arc.a} end={arc.b} color={arc.color} />
      ))}

      {/* Lights inside globe group so they follow rotation */}
      <pointLight ref={keyLightRef} position={[4, 3, 3]}   intensity={5.5} color="#3b82f6" />
      <pointLight                   position={[-4, -2, -1]} intensity={3.0} color="#6366f1" />
      <pointLight                   position={[0, -5, 2]}   intensity={2.5} color="#0ea5e9" />
    </group>
  )
}

function Scene() {
  return (
    <>
      <Stars />
      <ambientLight intensity={1.4} color="#0d1a2e" />
      <GlobeCore />
      <ParticleRing radius={1.72} count={130} speed={ 0.13} color="#38bdf8" tiltX={ 0.22} tiltZ={0}     />
      <ParticleRing radius={2.02} count={90}  speed={-0.10} color="#6366f1" tiltX={-0.82} tiltZ={0.3}   />
      <ParticleRing radius={2.30} count={65}  speed={ 0.07} color="#7c3aed" tiltX={ 1.35} tiltZ={-0.1}  />
    </>
  )
}

/* ─────────────────────────────────────────────────────────
   ORBITING HTML LABELS  — depth-fading, elliptical orbit
───────────────────────────────────────────────────────── */

const LABELS = [
  { text: '⚡ Strong Response', color: '#38bdf8', bg: 'rgba(6,18,42,0.88)',   border: 'rgba(56,189,248,0.4)',   r: 195, speed:  21, startDeg: 0   },
  { text: '★  Strong Hire',     color: '#818cf8', bg: 'rgba(10,10,40,0.88)',  border: 'rgba(129,140,248,0.4)', r: 228, speed: -17, startDeg: 130 },
  { text: '◎  Empathy 9/10',    color: '#7dd3fc', bg: 'rgba(4,20,46,0.88)',   border: 'rgba(125,211,252,0.4)', r: 185, speed:  25, startDeg: 250 },
  { text: '✓  Clarity 8.5/10',  color: '#a5b4fc', bg: 'rgba(12,10,40,0.88)', border: 'rgba(165,180,252,0.4)', r: 218, speed: -13, startDeg: 70  },
  { text: '↑  Warmth Detected', color: '#93c5fd', bg: 'rgba(4,14,42,0.88)',  border: 'rgba(147,197,253,0.38)', r: 200, speed:  18, startDeg: 190 },
]

type LabelDef = typeof LABELS[0]

function OrbitLabel({ label, cx, cy }: { label: LabelDef; cx: number; cy: number }) {
  const [deg, setDeg] = useState(label.startDeg)
  const rafRef  = useRef<number>()
  const prevRef = useRef<number | null>(null)

  useEffect(() => {
    const tick = (ts: number) => {
      if (!prevRef.current) prevRef.current = ts
      const dt = Math.min((ts - prevRef.current) / 1000, 0.05)
      prevRef.current = ts
      setDeg(d => d + label.speed * dt)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [label.speed])

  const rad     = (deg * Math.PI) / 180
  const x       = cx + Math.cos(rad) * label.r
  const y       = cy + Math.sin(rad) * label.r * 0.32   // flatten → ellipse
  const sinVal  = Math.sin(rad)
  // Behind the globe → fade out
  const opacity = sinVal > 0 ? 1 : 0.35 + 0.5 * ((sinVal + 1))

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: 'translate(-50%,-50%)',
      padding: '5px 14px',
      borderRadius: 20,
      background: label.bg,
      border: `1px solid ${label.border}`,
      color: label.color,
      fontSize: '0.7rem',
      fontFamily: '"DM Mono", "Fira Mono", monospace',
      letterSpacing: '0.06em',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      userSelect: 'none',
      opacity,
      boxShadow: `0 0 14px ${label.border}, inset 0 0 8px rgba(255,255,255,0.03)`,
      transition: 'opacity 0.15s',
    }}>
      {label.text}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────── */

export default function GlobeHero({ className = '' }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 560, h: 520 })

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    setSize({ w: el.clientWidth, h: el.clientHeight })
    const ro = new ResizeObserver(([e]) => {
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <Canvas
        camera={{ position: [0, 0.3, 5.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>

      {/* Depth-fading orbiting labels */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {LABELS.map((l, i) => (
          <OrbitLabel key={i} label={l} cx={size.w / 2} cy={size.h / 2} />
        ))}
      </div>
    </div>
  )
}