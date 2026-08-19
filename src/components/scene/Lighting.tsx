import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneLightingProps {
  scrollProgress: number;
}

const STATES = [
  { key: '#5EC8D8', ki: 3.0, fill: '#0a1828', fi: 0.5, fog: '#07090D', fd: 0.012 },  // Hero
  { key: '#6ed8e8', ki: 2.4, fill: '#14201a', fi: 0.7, fog: '#080c0d', fd: 0.016 },  // About
  { key: '#7adae8', ki: 2.0, fill: '#0d1520', fi: 0.6, fog: '#080a0e', fd: 0.018 },  // Work
  { key: '#4ab8d4', ki: 1.6, fill: '#080e1a', fi: 0.9, fog: '#06080c', fd: 0.022 },  // Stack
  { key: '#F2A65A', ki: 3.8, fill: '#1a0e06', fi: 1.1, fog: '#0e0806', fd: 0.010 },  // Contact
];

function lerpV(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function SceneLighting({ scrollProgress }: SceneLightingProps) {
  const keyRef  = useRef<THREE.PointLight>(null);
  const fillRef = useRef<THREE.PointLight>(null);
  const rimRef  = useRef<THREE.PointLight>(null);

  useFrame(({ scene }) => {
    const s = scrollProgress * (STATES.length - 1);
    const idx = Math.min(Math.floor(s), STATES.length - 2);
    const t = s - idx;
    const A = STATES[idx], B = STATES[idx + 1];

    const keyCol  = new THREE.Color(A.key).lerp(new THREE.Color(B.key), t);
    const fillCol = new THREE.Color(A.fill).lerp(new THREE.Color(B.fill), t);
    const fogCol  = new THREE.Color(A.fog).lerp(new THREE.Color(B.fog), t);

    if (keyRef.current)  { keyRef.current.color.copy(keyCol);  keyRef.current.intensity  = lerpV(A.ki, B.ki, t); }
    if (fillRef.current) { fillRef.current.color.copy(fillCol); fillRef.current.intensity = lerpV(A.fi, B.fi, t); }
    if (rimRef.current)  { rimRef.current.color.copy(keyCol); }
    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.copy(fogCol);
      scene.fog.density = lerpV(A.fd, B.fd, t);
    }
  });

  return (
    <>
      <ambientLight intensity={0.06} color="#0a1020" />
      <pointLight ref={keyRef}  position={[-4, 6, 3]}   intensity={3.0} decay={2} />
      <pointLight ref={fillRef} position={[5, -4, -3]}  intensity={0.5} decay={2} />
      <pointLight ref={rimRef}  position={[0, 0, -10]}  intensity={0.9} color="#5EC8D8" decay={2} />
    </>
  );
}
