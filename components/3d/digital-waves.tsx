"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function DigitalWaves() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create wave geometry
  const { geometry, particlePositions } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(8, 8, 50, 50)
    const particleCount = 100
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    return { geometry, particlePositions }
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current?.geometry?.attributes.position) {
      const positions = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
      const array = positions.array as Float32Array

      for (let i = 0; i < array.length; i += 3) {
        const x = array[i]
        const y = array[i + 1]
        array[i + 2] = Math.sin(x * 0.5 + clock.elapsedTime) * 0.3 + Math.cos(y * 0.5 + clock.elapsedTime * 0.7) * 0.2
      }
      positions.needsUpdate = true
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
    }
  })

  return (
    <group>
      {/* Flowing wave surface */}
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.6} wireframe />
      </mesh>

      {/* Floating data particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]} // Float32Array, itemSize = 3
          />
        </bufferGeometry>
        <pointsMaterial color="#0ea5e9" size={0.05} transparent opacity={0.8} />
      </points>
    </group>
  )
}
