"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Ring } from "@react-three/drei"
import * as THREE from "three"

interface TeamSphereProps {
  onMemberClick: (member: any) => void
}

export default function TeamSphere({ onMemberClick }: TeamSphereProps) {
  const sphereRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.005
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.01
      ring1Ref.current.rotation.z += 0.005
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += 0.008
      ring2Ref.current.rotation.z -= 0.003
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= 0.006
      ring3Ref.current.rotation.y += 0.004
    }
  })

  return (
    <group>
      {/* Central sphere */}
      <Sphere ref={sphereRef} args={[1, 32, 32]}>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} wireframe />
      </Sphere>

      {/* Orbiting rings */}
      <Ring ref={ring1Ref} args={[1.8, 2, 32]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#ec4899" transparent opacity={0.5} side={THREE.DoubleSide} />
      </Ring>

      <Ring ref={ring2Ref} args={[2.3, 2.5, 32]} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.4} side={THREE.DoubleSide} />
      </Ring>

      <Ring ref={ring3Ref} args={[2.8, 3, 32]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} side={THREE.DoubleSide} />
      </Ring>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 3.5 + Math.sin(i) * 0.5
        return (
          <Sphere
            key={i}
            args={[0.05, 8, 8]}
            position={[Math.cos(angle) * radius, Math.sin(i * 0.5) * 2, Math.sin(angle) * radius]}
          >
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} />
          </Sphere>
        )
      })}
    </group>
  )
}
