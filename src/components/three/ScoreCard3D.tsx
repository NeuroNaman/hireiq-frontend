import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'

interface ScoreCardMeshProps {
  score: number
  verdict: string
}

function ScoreCardMesh({ score, verdict }: ScoreCardMeshProps) {
  const groupRef = useRef<THREE.Group>(null!)

  const verdictColor =
    verdict === 'Strong Hire' ? '#34d399' :
    verdict === 'Consider'    ? '#fbbf24' : '#fb7185'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.08
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08
  })

  return (
    <group ref={groupRef}>
      <RoundedBox args={[3.2, 1.8, 0.08]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color="#0f1218"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* Score number */}
      <Text
        position={[-0.6, 0.15, 0.06]}
        fontSize={0.7}
        color={verdictColor}
        font="https://fonts.gstatic.com/s/syne/v22/8vIf7wUr1h7h-d.woff2"
        anchorX="center"
        anchorY="middle"
      >
        {score.toFixed(1)}
      </Text>

      {/* /10 */}
      <Text
        position={[-0.05, 0.05, 0.06]}
        fontSize={0.2}
        color="#8892aa"
        anchorX="left"
        anchorY="middle"
      >
        /10
      </Text>

      {/* Verdict */}
      <Text
        position={[0, -0.3, 0.06]}
        fontSize={0.17}
        color={verdictColor}
        anchorX="center"
        anchorY="middle"
      >
        {verdict}
      </Text>

      {/* Glow plane */}
      <mesh position={[0, 0, -0.06]} scale={[3.4, 2, 1]}>
        <planeGeometry />
        <meshStandardMaterial
          color={verdictColor}
          transparent
          opacity={0.04}
          emissive={verdictColor}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

interface ScoreCard3DProps {
  score: number
  verdict: string
  className?: string
}

export default function ScoreCard3D({ score, verdict, className = '' }: ScoreCard3DProps) {
  return (
    <div className={className} style={{ height: 180 }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#22d3ee" />
        <pointLight position={[-2, -2, 0]} intensity={0.6} color="#818cf8" />
        <ScoreCardMesh score={score} verdict={verdict} />
      </Canvas>
    </div>
  )
}