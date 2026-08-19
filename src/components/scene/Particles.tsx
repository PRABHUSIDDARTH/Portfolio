import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarFieldProps {
  count?: number;
}

export default function StarField({ count = 1400 }: StarFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { geo, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Place stars in a long tunnel ahead of camera
      positions[i * 3]     = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = -Math.random() * 80;
      velocities[i] = 0.003 + Math.random() * 0.008;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { geo: g, velocities };
  }, [count]);

  useFrame(() => {
    const pos = geo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      // Drift stars toward camera (Z increases)
      pos.setZ(i, pos.getZ(i) + velocities[i]);
      // Reset behind camera
      if (pos.getZ(i) > 5) {
        pos.setX(i, (Math.random() - 0.5) * 30);
        pos.setY(i, (Math.random() - 0.5) * 30);
        pos.setZ(i, -80);
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        size={0.03}
        color="#EDEAE3"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
