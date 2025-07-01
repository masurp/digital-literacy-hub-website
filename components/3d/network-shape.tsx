"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

interface NetworkShapeProps {
  mousePosition: { x: number; y: number }
}

export default function NetworkShape({ mousePosition }: NetworkShapeProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Generate network nodes
  const { positions, connections } = useMemo(() => {
    const nodeCount = 100
    const positions = new Float32Array(nodeCount * 3)
    const connections = []

    // Create nodes in a sphere
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < 1.5 && Math.random() > 0.7) {
          connections.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2],
          )
        }
      }
    }

    return { positions, connections: new Float32Array(connections) }
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.002
      pointsRef.current.rotation.x = mousePosition.y * 0.2
      pointsRef.current.rotation.z = mousePosition.x * 0.2
    }

    if (linesRef.current) {
      linesRef.current.rotation.y += 0.002
      linesRef.current.rotation.x = mousePosition.y * 0.2
      linesRef.current.rotation.z = mousePosition.x * 0.2
    }
  })

  return (
    <group>
      {/* Network nodes */}
      <Points ref={pointsRef} positions={positions}>
        <PointMaterial transparent color="#3b82f6" size={0.05} sizeAttenuation={true} depthWrite={false} />
      </Points>

      {/* Network connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]} // Float32Array, itemSize = 3
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}
