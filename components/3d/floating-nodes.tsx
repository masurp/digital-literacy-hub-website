"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null)

  const { nodeGeometry, lineGeometry } = useMemo(() => {
    const count = 80
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 18
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3
    }

    const nodeGeometry = new THREE.BufferGeometry()
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const linePositions: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3]     - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 3.5) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
          )
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3))

    return { nodeGeometry, lineGeometry }
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.elapsedTime
      groupRef.current.rotation.z = Math.sin(t * 0.04) * 0.06
      groupRef.current.position.y = Math.sin(t * 0.15) * 0.4
      groupRef.current.position.x = Math.cos(t * 0.10) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeometry}>
        <pointsMaterial color="#e879f9" size={0.05} transparent opacity={0.25} />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#f0abfc" transparent opacity={0.10} />
      </lineSegments>
    </group>
  )
}
