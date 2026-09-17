"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { CelestialBody } from "@/lib/space/types";
import { useSpaceAtlas } from "@/lib/space/store";
import { PlanetMesh } from "./PlanetMesh";
import { makeSunTexture } from "./procedural-textures";

/**
 * The Sun — a special PlanetMesh wrapped in:
 *   1. A point light at the center (illuminates all planets)
 *   2. A layered corona sprite (always faces camera, additive blending)
 *   3. The base sun mesh (emissive, toneMapped=false so it stays bright)
 *
 * The corona is generated procedurally as a radial gradient texture
 * so no external sprite asset is required.
 */

export function Sun({ body }: { body: CelestialBody }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Sprite>(null);
  const isPlaying = useSpaceAtlas((s) => s.isPlaying);
  const timeScale = useSpaceAtlas((s) => s.timeScale);
  const showLabels = useSpaceAtlas((s) => s.showLabels);
  const selectedBodyId = useSpaceAtlas((s) => s.selectedBodyId);
  const hoveredBodyId = useSpaceAtlas((s) => s.hoveredBodyId);
  const selectBody = useSpaceAtlas((s) => s.selectBody);
  const setHovered = useSpaceAtlas((s) => s.setHovered);

  const texture = useMemo(
    () => (typeof document === "undefined" ? null : makeSunTexture(body.color, "#fff3c0", body.accentColor ?? "#ff5a18")),
    [body],
  );

  const coronaTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,220,120,0.9)");
    g.addColorStop(0.25, "rgba(255,180,80,0.5)");
    g.addColorStop(0.55, "rgba(255,120,40,0.18)");
    g.addColorStop(1, "rgba(255,80,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current || !isPlaying) return;
    const omega = (2 * Math.PI) / body.renderRotationPeriod;
    meshRef.current.rotation.y += omega * delta * timeScale;
    if (coronaRef.current) {
      coronaRef.current.material.opacity = 0.85 + Math.sin(performance.now() * 0.001) * 0.08;
    }
  });

  const isSelected = selectedBodyId === body.id;
  const isHovered = hoveredBodyId === body.id;

  return (
    <group>
      {/* Point light at the Sun's position */}
      <pointLight
        intensity={3.5}
        color={"#fff4d8"}
        distance={0}
        decay={0}
      />
      {/* Soft ambient so dark sides aren't pure black */}
      <ambientLight intensity={0.08} />

      {/* Sun mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); selectBody(body.id); }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(body.id); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(null); document.body.style.cursor = "auto"; }}
        rotation={[0, 0, THREE.MathUtils.degToRad(body.axialTiltDeg)]}
        userData={{ bodyId: body.id }}
      >
        <sphereGeometry args={[body.renderRadius, 64, 64]} />
        <meshBasicMaterial map={texture ?? undefined} toneMapped={false} />
      </mesh>

      {/* Corona sprite (always faces camera) */}
      {coronaTexture && (
        <sprite ref={coronaRef} scale={[body.renderRadius * 5, body.renderRadius * 5, 1]}>
          <spriteMaterial
            map={coronaTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={0.9}
          />
        </sprite>
      )}

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[body.renderRadius * 1.4, body.renderRadius * 1.5, 64]} />
          <meshBasicMaterial color={body.color} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Label */}
      {showLabels && (
        <Html
          position={[0, body.renderRadius + 0.5, 0]}
          center
          distanceFactor={20}
          style={{ pointerEvents: "none" }}
          zIndexRange={[10, 0]}
        >
          <div
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
              isSelected || isHovered
                ? "bg-white text-black"
                : "bg-amber-500/80 text-white backdrop-blur-sm border border-amber-300/30"
            }`}
          >
            {body.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Re-export for compatibility with code that imports PlanetMesh
export { PlanetMesh };
