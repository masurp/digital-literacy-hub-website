"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Cylinder, Torus } from "@react-three/drei"
import type * as THREE from "three"

interface ResearchPlatformProps {
  onProjectClick: (project: any) => void
}

export default function ResearchPlatform({ onProjectClick }: ResearchPlatformProps) {
  const platformRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (platformRef.current) {
      platformRef.current.rotation.y += 0.003
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01
      torusRef.current.rotation.z += 0.005
    }
  })

  return (
    <group>
      {/* Central platform */}
      <Cylinder ref={platformRef} args={[2, 2, 0.2, 8]}>
        <meshStandardMaterial color="#059669" transparent opacity={0.8} />
      </Cylinder>

      {/* Floating torus */}
      <Torus ref={torusRef} args={[1.5, 0.3, 16, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
      </Torus>

      {/* Project nodes */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 3
        return (
          <Box
            key={i}
            args={[0.4, 0.4, 0.4]}
            position={[Math.cos(angle) * radius, Math.sin(Date.now() / 1000 + i) * 0.5, Math.sin(angle) * radius]}
          >
            <meshStandardMaterial
              color={["#ef4444", "#f59e0b", "#10b981", "#8b5cf6"][i]}
              emissive={["#ef4444", "#f59e0b", "#10b981", "#8b5cf6"][i]}
              emissiveIntensity={0.2}
            />
          </Box>
        )
      })}

      {/* Connecting lines */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 3
        return (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attachObject={["attributes", "position"]}
                array={new Float32Array([0, 0, 0, Math.cos(angle) * radius, 0, Math.sin(angle) * radius])}
                itemSize={3}
                count={2}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#059669" transparent opacity={0.5} />
          </line>
        )
      })}
    </group>
  )
}
