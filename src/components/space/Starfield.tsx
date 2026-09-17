"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Starfield — three layered fields of points for parallax depth.
 * Each layer is a sphere of stars at a different radius, with subtle
 * drift to suggest motion. Uses THREE.Points for performance.
 */

export function Starfield() {
  const layer1 = useRef<THREE.Points>(null);
  const layer2 = useRef<THREE.Points>(null);
  const layer3 = useRef<THREE.Points>(null);

  const layers = useMemo(() => {
    return [
      makeStarLayer({ count: 4000, radius: 400, size: 1.4, color: "#ffffff", seed: 1 }),
      makeStarLayer({ count: 2500, radius: 600, size: 1.1, color: "#cfd8ff", seed: 2 }),
      makeStarLayer({ count: 1200, radius: 800, size: 0.9, color: "#ffe6c0", seed: 3 }),
    ];
  }, []);

  useFrame((_, delta) => {
    if (layer1.current) layer1.current.rotation.y += delta * 0.005;
    if (layer2.current) layer2.current.rotation.y -= delta * 0.003;
    if (layer3.current) layer3.current.rotation.y += delta * 0.002;
  });

  return (
    <group>
      <points ref={layer1}>
        <primitive object={layers[0].geometry} attach="geometry" />
        <primitive object={layers[0].material} attach="material" />
      </points>
      <points ref={layer2}>
        <primitive object={layers[1].geometry} attach="geometry" />
        <primitive object={layers[1].material} attach="material" />
      </points>
      <points ref={layer3}>
        <primitive object={layers[2].geometry} attach="geometry" />
        <primitive object={layers[2].material} attach="material" />
      </points>
    </group>
  );
}

function makeStarLayer(opts: {
  count: number;
  radius: number;
  size: number;
  color: string;
  seed: number;
}) {
  const { count, radius, size, color, seed } = opts;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  let a = seed >>> 0;
  const rand = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    // Spherical distribution
    const u = rand();
    const v = rand();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.7 + rand() * 0.3);
    positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    sizes[i] = size * (0.5 + rand() * 1.0);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return { geometry, material };
}
