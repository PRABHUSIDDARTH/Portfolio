import React, { Suspense, useRef, useCallback, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import IcosaCore from './IcosaCore';
import StarField from './Particles';
import SceneLighting from './Lighting';
import TechConstellation from './TechConstellation';

// ─── Camera path keyframes ────────────────────────────────────────
// Camera travels forward through Z (tunnel effect like the reference)
const FRAMES = [
  { pos: [0, 0,  5],   look: [0, 0, 0] },    // Hero
  { pos: [-1.5, 0.5, 12], look: [0, 0, 8] },  // About
  { pos: [1.5, -0.5, 20], look: [0, 0, 16] }, // Work
  { pos: [0, 1.5,  30], look: [0, 0, 26] },   // Stack — up
  { pos: [0, 0,  40], look: [0, 0, 36] },     // Contact — push through
];

function lerp3(a: number[], b: number[], t: number) {
  return [
    a[0] + (b[0]-a[0])*t,
    a[1] + (b[1]-a[1])*t,
    a[2] + (b[2]-a[2])*t,
  ] as [number,number,number];
}

function smoothstep(t: number) { return t*t*(3-2*t); }

function SceneCamera({ scrollProgress, mouseX, mouseY }: { scrollProgress: number; mouseX: number; mouseY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const s = Math.min(scrollProgress, 0.9999) * (FRAMES.length - 1);
    const idx = Math.min(Math.floor(s), FRAMES.length - 2);
    const t = smoothstep(s - idx);
    const [px,py,pz] = lerp3(FRAMES[idx].pos, FRAMES[idx+1].pos, t);
    const [lx,ly,lz] = lerp3(FRAMES[idx].look, FRAMES[idx+1].look, t);

    // Mouse parallax offset
    const mx = mouseX * 0.35;
    const my = mouseY * 0.2;

    camera.position.x += (px + mx - camera.position.x) * 0.055;
    camera.position.y += (py + my - camera.position.y) * 0.055;
    camera.position.z += (pz - camera.position.z) * 0.055;
    camera.lookAt(lx + mx * 0.5, ly, lz);
  });

  return null;
}

function PostFX({ lite }: { lite: boolean }) {
  if (lite) return null;
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.45} luminanceThreshold={0.55} luminanceSmoothing={0.85} blendFunction={BlendFunction.ADD} />
      <Vignette offset={0.28} darkness={0.6} eskil={false} />
    </EffectComposer>
  );
}

interface SceneInnerProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  liteMode: boolean;
}

function SceneInner({ scrollProgress, mouseX, mouseY, liteMode }: SceneInnerProps) {
  const [particleCount, setParticleCount] = useState(liteMode ? 500 : 1400);
  const onDecline = useCallback(() => setParticleCount(p => Math.max(300, p - 300)), []);
  const showConstellation = scrollProgress > 0.62 && scrollProgress < 0.84;

  return (
    <>
      <PerformanceMonitor onDecline={onDecline} thresholds={[0.5, 0.8]} flipflops={3} />
      <SceneCamera scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      <SceneLighting scrollProgress={scrollProgress} />
      <StarField count={particleCount} />

      {/* Core — hero section only */}
      <group position={[0, 0, 0]}>
        <IcosaCore scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
      </group>

      {/* Tech constellation — stack section */}
      <group position={[0, 1.5, 28]}>
        <TechConstellation visible={showConstellation} />
      </group>

      {/* Contact portal rings */}
      {scrollProgress > 0.84 && (
        <>
          {[1.2, 1.8, 2.4].map((r, i) => (
            <mesh key={i} position={[0, 0, 38]} rotation={[0, 0, i * 0.5]}>
              <torusGeometry args={[r, 0.025, 8, 80]} />
              <meshStandardMaterial
                color={i === 0 ? '#F2A65A' : '#5EC8D8'}
                emissive={i === 0 ? '#F2A65A' : '#5EC8D8'}
                emissiveIntensity={2.5}
                transparent
                opacity={Math.min(1, (scrollProgress - 0.84) * 6.25) * (i === 0 ? 1 : 0.5)}
              />
            </mesh>
          ))}
        </>
      )}

      <PostFX lite={liteMode} />
    </>
  );
}

interface SceneProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  liteMode: boolean;
}

export default function Scene({ scrollProgress, mouseX, mouseY, liteMode }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 58, near: 0.1, far: 200 }}
      dpr={liteMode ? 1 : [1, 2]}
      gl={{
        antialias: !liteMode,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2('#07090D', 0.012);
        scene.background = new THREE.Color('#08090D');
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <SceneInner scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} liteMode={liteMode} />
      </Suspense>
    </Canvas>
  );
}
