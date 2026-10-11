import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion, scrollState } from '../lib/smooth';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

// Domain-warped flow field rendered as contour lines. Scroll velocity bends the field and
// widens the lines; the pointer pulls a soft lens. Kept monochrome so type stays legible.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uVel;
  uniform vec2 uMouse;
  uniform vec2 uRes;
  uniform vec3 uInk;
  uniform vec3 uAccent;
  uniform float uDensity;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i), f), dot(hash(i + vec2(1, 0)), f - vec2(1, 0)), u.x),
               mix(dot(hash(i + vec2(0, 1)), f - vec2(0, 1)), dot(hash(i + vec2(1, 1)), f - vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }
  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
    float d = length(p - m);
    float lens = smoothstep(0.45, 0.0, d);

    float t = uTime * 0.045;
    p.y += uVel * 0.0009 * (0.5 + uv.x);
    vec2 q = vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t + 3.1));
    float f = fbm(p * 1.1 + q * (1.3 + lens * 0.9) + abs(uVel) * 0.0012);

    float bands = f * uDensity;
    float line = abs(fract(bands) - 0.5);
    float w = 0.022 + min(abs(uVel) * 0.0004, 0.05);
    float c = smoothstep(w, 0.0, line);

    float fade = smoothstep(0.0, 0.35, uv.y) * (0.55 + 0.45 * smoothstep(1.0, 0.55, uv.y));
    vec3 col = mix(uInk, uAccent, lens * 0.9 * step(0.5, fract(bands * 0.5)));
    gl_FragColor = vec4(col, c * fade * (0.26 + lens * 0.4));
  }
`;

type Props = { ink?: string; accent?: string; density?: number };

/** Full-bleed WebGL contour field. Pauses when off-screen or the tab is hidden. */
export default function Field({ ink = '#121210', accent = '#FF4D1C', density = 14 }: Props) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // No WebGL: the layout is complete without the field.
    }
    const lowTier = (navigator.hardwareConcurrency || 4) <= 4 || window.matchMedia('(pointer: coarse)').matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowTier ? 1 : 1.5));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const uniforms = {
      uTime: { value: 0 },
      uVel: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.7, 0.6) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uInk: { value: new THREE.Color(ink) },
      uAccent: { value: new THREE.Color(accent) },
      uDensity: { value: density },
    };
    const material = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      uniforms.uRes.value.set(width, height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = new THREE.Vector2(0.7, 0.6);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    let raf = 0;
    const clock = new THREE.Clock();
    const frame = () => {
      raf = 0;
      if (!visible || document.hidden) return;
      uniforms.uTime.value = prefersReducedMotion ? 12 : clock.getElapsedTime();
      uniforms.uVel.value += (scrollState.velocity * 8 - uniforms.uVel.value) * 0.08;
      uniforms.uMouse.value.lerp(target, 0.06);
      renderer.render(scene, camera);
      if (!prefersReducedMotion) raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); };
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; kick(); });
    io.observe(el);
    document.addEventListener('visibilitychange', kick);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', kick);
      window.removeEventListener('pointermove', onMove);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [ink, accent, density]);

  return <div ref={host} className="field" aria-hidden="true" />;
}
