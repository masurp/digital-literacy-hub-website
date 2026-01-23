"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface AIBrainProps {
  onPublicationClick: (publication: any) => void
}

export default function AIBrain({ onPublicationClick }: AIBrainProps) {
  const brainRef = useRef<THREE.Points>(null)
  const synapseRef = useRef<THREE.LineSegments>(null)
  const orbitGroupRef = useRef<THREE.Group>(null)

  // Generate brain-like structure and geometries
  const { brainGeometry, synapseGeometry } = useMemo(() => {
    const nodeCount = 200
    const positions = new Float32Array(nodeCount * 3)
    const synapses = []

    // Create brain-shaped point cloud
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI

      // Brain-like shape (elongated sphere)
      const x = Math.sin(theta) * Math.cos(phi) * (1 + Math.sin(phi * 3) * 0.3)
      const y = Math.cos(theta) * (1.2 + Math.sin(theta * 2) * 0.2)
      const z = Math.sin(theta) * Math.sin(phi) * (1 + Math.cos(phi * 2) * 0.3)

      positions[i * 3] = x * 1.5
      positions[i * 3 + 1] = y * 1.2
      positions[i * 3 + 2] = z * 1.5
    }

    // Create synaptic connections
    for (let i = 0; i < nodeCount; i++) {
      if (Math.random() > 0.95) {
        const targetIndex = Math.floor(Math.random() * nodeCount)
        if (targetIndex !== i) {
          synapses.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[targetIndex * 3],
            positions[targetIndex * 3 + 1],
            positions[targetIndex * 3 + 2],
          )
        }
      }
    }

    // Create brain geometry
    const brainGeo = new THREE.BufferGeometry()
    brainGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    // Create synapse geometry
    const synapseGeo = new THREE.BufferGeometry()
    synapseGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(synapses), 3))

    return { brainGeometry: brainGeo, synapseGeometry: synapseGeo }
  }, [])

  useFrame(({ clock }) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.004
      brainRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1
    }

    if (synapseRef.current) {
      synapseRef.current.rotation.y += 0.004
      synapseRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1
    }

    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.y += 0.01
    }
  })

  return (
    <group>
      {/* Brain neurons */}
      <points ref={brainRef} geometry={brainGeometry}>
        <pointsMaterial transparent color="#6366f1" size={0.03} sizeAttenuation={true} depthWrite={false} />
      </points>

      {/* Neural connections */}
      <lineSegments ref={synapseRef} geometry={synapseGeometry}>
        <lineBasicMaterial color="#a855f7" transparent opacity={0.4} />
      </lineSegments>

      {/* Orbiting publication nodes */}
      <group ref={orbitGroupRef}>
        {Array.from({ length: 4 }).map((_, i) => {
          const angle = (i / 4) * Math.PI * 2
          const radius = 3
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle * 0.7) * 0.5, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial
                color={["#ef4444", "#f59e0b", "#10b981", "#8b5cf6"][i]}
                emissive={["#ef4444", "#f59e0b", "#10b981", "#8b5cf6"][i]}
                emissiveIntensity={0.3}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}
