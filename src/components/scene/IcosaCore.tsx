import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IcosaCoreProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

export default function IcosaCore({ scrollProgress, mouseX, mouseY }: IcosaCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shardMeshes = useRef<THREE.Mesh[]>([]);
  const assemblyRef = useRef(0);

  const { shards, assembled, scattered } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const posAttr = geo.getAttribute('position');
    const indexAttr = geo.getIndex();
    const count = indexAttr ? indexAttr.count / 3 : posAttr.count / 3;

    const shards: { geo: THREE.BufferGeometry; col: THREE.Color }[] = [];
    const assembled: THREE.Vector3[] = [];
    const scattered: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      let a = i * 3, b = i * 3 + 1, c = i * 3 + 2;
      if (indexAttr) { a = indexAttr.getX(i*3); b = indexAttr.getX(i*3+1); c = indexAttr.getX(i*3+2); }

      const vA = new THREE.Vector3(posAttr.getX(a), posAttr.getY(a), posAttr.getZ(a));
      const vB = new THREE.Vector3(posAttr.getX(b), posAttr.getY(b), posAttr.getZ(b));
      const vC = new THREE.Vector3(posAttr.getX(c), posAttr.getY(c), posAttr.getZ(c));
      const centroid = new THREE.Vector3().addVectors(vA, vB).add(vC).divideScalar(3);
      const normal = new THREE.Vector3().crossVectors(vB.clone().sub(vA), vC.clone().sub(vA)).normalize();

      const inset = 0.04;
      const aiV = vA.clone().lerp(centroid, inset);
      const biV = vB.clone().lerp(centroid, inset);
      const ciV = vC.clone().lerp(centroid, inset);

      const g = new THREE.BufferGeometry();
      g.setFromPoints([aiV, biV, ciV]);
      g.setIndex([0,1,2]);
      g.computeVertexNormals();

      const t = Math.random();
      const col = new THREE.Color().setHSL(0.52 + t * 0.06, 0.55, 0.38 + t * 0.28);

      shards.push({ geo: g, col });
      assembled.push(centroid.clone());

      const scatter = centroid.clone()
        .add(normal.clone().multiplyScalar(2 + Math.random() * 3.5))
        .add(new THREE.Vector3((Math.random()-0.5)*5, (Math.random()-0.5)*5, (Math.random()-0.5)*5));
      scattered.push(scatter);
    }

    return { shards, assembled, scattered };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Assembly: 0-15% scroll
    const targetAssembly = Math.min(1, scrollProgress / 0.18);
    assemblyRef.current += (targetAssembly - assemblyRef.current) * 0.035;
    const a = assemblyRef.current;

    // Auto-rotate + mouse parallax
    groupRef.current.rotation.y = t * 0.10 + mouseX * 0.5;
    groupRef.current.rotation.x = Math.sin(t * 0.06) * 0.12 + mouseY * 0.3;

    // Scale out as camera passes through (25%+ scroll)
    const globalScale = 1 - Math.max(0, (scrollProgress - 0.25) * 1.5);
    groupRef.current.scale.setScalar(Math.max(0, globalScale));

    shardMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.lerpVectors(scattered[i], assembled[i], a);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = THREE.MathUtils.lerp(0.08, 1.0, a);
      const s = THREE.MathUtils.lerp(0.2, 1, a);
      mesh.scale.setScalar(s);
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh
          key={i}
          geometry={s.geo}
          ref={(el) => { if (el) shardMeshes.current[i] = el; }}
        >
          <meshStandardMaterial
            color={s.col}
            emissive={s.col}
            emissiveIntensity={0.4}
            transparent
            opacity={0.05}
            metalness={0.7}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#5EC8D8" emissive="#5EC8D8" emissiveIntensity={3} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
