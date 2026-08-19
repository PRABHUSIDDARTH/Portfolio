import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_NODES } from '../../data';

interface TechConstellationProps {
  visible: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  language:  '#5EC8D8',
  framework: '#7ee8a2',
  tool:      '#848A99',
  ai:        '#c47af5',
  infra:     '#F2A65A',
};

function TechNode({ node, visible }: { node: typeof TECH_NODES[0]; visible: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const color = new THREE.Color(CATEGORY_COLORS[node.category] || '#5EC8D8');

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = node.y + Math.sin(t * 0.8 + node.x) * 0.06;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = hovered ? 3 : 1.2 + Math.sin(t * 2 + node.z) * 0.4;
    const scale = visible ? (hovered ? 1.5 : 1) : 0;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, scale, 0.08));
  });

  return (
    <mesh
      ref={ref}
      position={[node.x, node.y, node.z]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        roughness={0.1}
        metalness={0.8}
      />
      {hovered && (
        <Html
          center
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: CATEGORY_COLORS[node.category],
            background: 'rgba(17,19,25,0.9)',
            border: `1px solid ${CATEGORY_COLORS[node.category]}40`,
            padding: '0.25rem 0.6rem',
            borderRadius: '3px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            transform: 'translateY(-130%)',
          }}
        >
          {node.label}
        </Html>
      )}
    </mesh>
  );
}

// Draw lines between nearby nodes
function ConstellationEdges() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const geometry = React.useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < TECH_NODES.length; i++) {
      for (let j = i + 1; j < TECH_NODES.length; j++) {
        const a = new THREE.Vector3(TECH_NODES[i].x, TECH_NODES[i].y, TECH_NODES[i].z);
        const b = new THREE.Vector3(TECH_NODES[j].x, TECH_NODES[j].y, TECH_NODES[j].z);
        if (a.distanceTo(b) < 1.6) { points.push(a, b); }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setFromPoints(points);
    return geo;
  }, []);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#5EC8D8" transparent opacity={0.12} />
    </lineSegments>
  );
}

export default function TechConstellation({ visible }: TechConstellationProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ConstellationEdges />
      {TECH_NODES.map(node => (
        <TechNode key={node.id} node={node} visible={visible} />
      ))}
    </group>
  );
}
