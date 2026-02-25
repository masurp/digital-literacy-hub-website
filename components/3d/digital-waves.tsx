"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function DigitalWaves() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  // Create wave geometry
  const { geometry, particleGeometry } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(18, 18, 70, 70)

    const particleCount = 250
    const particlePositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 18
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 18
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }

    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))

    return { geometry, particleGeometry }
  }, [])

  useFrame(({ clock }) => {
    if (meshRef.current?.geometry?.attributes.position) {
      const positions = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
      const array = positions.array as Float32Array

      for (let i = 0; i < array.length; i += 3) {
        const x = array[i]
        const y = array[i + 1]
        array[i + 2] = Math.sin(x * 0.5 + clock.elapsedTime) * 0.6 + Math.cos(y * 0.5 + clock.elapsedTime * 0.7) * 0.4
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
      <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#22d3ee" transparent opacity={0.85} wireframe />
      </mesh>

      <points ref={particlesRef} geometry={particleGeometry}>
        <pointsMaterial color="#67e8f9" size={0.1} transparent opacity={0.9} />
      </points>
    </group>
  )
}
