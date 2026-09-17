"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpaceAtlas } from "@/lib/space/store";

/**
 * Instanced asteroid belt — a torus of small rocks.
 *
 * Uses a single THREE.InstancedMesh with N instances placed randomly
 * in a flat torus between innerRadius and outerRadius. All instances
 * share one material and one geometry, so the cost is essentially that
 * of a single mesh regardless of count.
 *
 * The whole field slowly rotates around the Y axis to suggest orbital
 * motion. Individual rocks do not move relative to each other (which
 * is fine visually at this scale).
 */

interface AsteroidBeltProps {
  count?: number;
  innerRadius?: number;
  outerRadius?: number;
  color?: string;
  size?: number;
  verticalSpread?: number;
}

export function AsteroidBelt({
  count = 1000,
  innerRadius = 18,
  outerRadius = 22,
  color = "#7a6a52",
  size = 0.06,
  verticalSpread = 0.4,
}: AsteroidBeltProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isPlaying = useSpaceAtlas((s) => s.isPlaying);
  const timeScale = useSpaceAtlas((s) => s.timeScale);

  const { matrices, colors } = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const colors: THREE.Color[] = [];
    let a = 12345 >>> 0;
    const rand = () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const baseColor = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      // Torus distribution
      const angle = rand() * Math.PI * 2;
      const radius = innerRadius + rand() * (outerRadius - innerRadius);
      const y = (rand() - 0.5) * verticalSpread;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Random scale 0.4–1.4× the base size
      const s = size * (0.4 + rand() * 1.2);

      const m = new THREE.Matrix4();
      m.makeScale(s, s, s);
      m.setPosition(x, y, z);
      matrices.push(m);

      const c = baseColor.clone();
      c.offsetHSL(0, 0, (rand() - 0.5) * 0.15);
      colors.push(c);
    }
    return { matrices, colors };
  }, [count, innerRadius, outerRadius, color, size, verticalSpread]);

  // Apply matrices once on mount via the ref callback below.
  // (We intentionally do NOT do this in useMemo — refs are not safe
  //  to access during render per the React hooks rules.)

  useFrame((_, delta) => {
    if (!meshRef.current || !isPlaying) return;
    meshRef.current.rotation.y += delta * 0.02 * timeScale;
  });

  return (
    <instancedMesh
      ref={(r) => {
        meshRef.current = r;
        if (r) {
          matrices.forEach((m, i) => r.setMatrixAt(i, m));
          colors.forEach((c, i) => r.setColorAt(i, c));
          r.instanceMatrix.needsUpdate = true;
          if (r.instanceColor) r.instanceColor.needsUpdate = true;
        }
      }}
      args={[undefined, undefined, count]}
    >
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.95} metalness={0.05} />
    </instancedMesh>
  );
}
