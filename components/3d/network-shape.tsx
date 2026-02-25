"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"

const TERMS = [
  "privacy literacy",
  "AI literacy",
  "news literacy",
  "advertising literacy",
  "computer literacy",
  "social media literacy",
  "data literacy",
  "information literacy",
  "media literacy",
  "digital citizenship",
  "visual literacy",
  "algorithmic literacy",
]

interface NetworkShapeProps {
  mousePosition: { x: number; y: number }
}

export default function NetworkShape({ mousePosition }: NetworkShapeProps) {
  const groupRef = useRef<THREE.Group>(null)

  const { pointsGeometry, linesGeometry, labelPositions } = useMemo(() => {
    const nodeCount = 100
    const positions = new Float32Array(nodeCount * 3)
    const connections: number[] = []

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.5 && Math.random() > 0.7) {
          connections.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          )
        }
      }
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        connections.length > 0 ? new Float32Array(connections) : new Float32Array([0, 0, 0]),
        3,
      ),
    )

    // Evenly pick nodes across the sphere for label anchors
    const step = Math.floor(nodeCount / TERMS.length)
    const labelPositions: [number, number, number][] = TERMS.map((_, i) => {
      const idx = i * step
      return [positions[idx * 3], positions[idx * 3 + 1], positions[idx * 3 + 2]]
    })

    return { pointsGeometry: pointsGeo, linesGeometry: linesGeo, labelPositions }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.x = mousePosition.y * 0.2
      groupRef.current.rotation.z = mousePosition.x * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={pointsGeometry}>
        <pointsMaterial transparent color="#3b82f6" size={0.05} sizeAttenuation opacity={0.35} depthWrite={false} />
      </points>

      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </lineSegments>

      {TERMS.map((term, i) => (
        <Html
          key={term}
          position={[labelPositions[i][0] + 0.15, labelPositions[i][1], labelPositions[i][2]]}
          style={{
            color: "#2563eb",
            fontSize: "8px",
            opacity: 0.38,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "inherit",
          }}
        >
          {term}
        </Html>
      ))}
    </group>
  )
}
