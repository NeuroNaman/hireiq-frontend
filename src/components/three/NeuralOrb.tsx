import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)

  const positions = useMemo(() => {
    const count = 3000
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 2 + Math.random() * 3

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.04
    ref.current.rotation.y += delta * 0.06
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  )
}

function NeuralRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Line>(null!)

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return pts
  }, [radius])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * speed
    ref.current.rotation.x += delta * speed * 0.4
  })

  return (
    <line ref={ref as any}>
      <bufferGeometry setFromPoints={points} />
      <lineBasicMaterial color={color} transparent opacity={0.18} />
    </line>
  )
}

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.15
    ref.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05)
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.8, 4]} />
      <meshStandardMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.15}
        emissive="#22d3ee"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

interface NeuralOrbProps {
  className?: string
  interactive?: boolean
}

export default function NeuralOrb({ className = '' }: NeuralOrbProps) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={1} color="#22d3ee" />
        <pointLight position={[-4, -4, -4]} intensity={0.5} color="#818cf8" />

        <ParticleField />
        <CoreOrb />
        <NeuralRing radius={1.5} speed={0.3} color="#22d3ee" />
        <NeuralRing radius={2.1} speed={-0.2} color="#818cf8" />
        <NeuralRing radius={2.7} speed={0.15} color="#fbbf24" />
      </Canvas>
    </div>
  )
}