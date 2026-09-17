"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { CelestialBody } from "@/lib/space/types";
import { useSpaceAtlas } from "@/lib/space/store";
import {
  makeGasGiantTexture,
  makeRockyTexture,
  makeEarthTexture,
  makeSunTexture,
} from "./procedural-textures";

/**
 * A single celestial body rendered as a 3D mesh.
 *
 * Behavior:
 *  - Rotates on its own axis (procedural rotation period).
 *  - When clicked, sets the global selected body (camera will fly to it).
 *  - On hover, scales up slightly and shows a label tooltip.
 *  - Optionally renders a ring system (Saturn / Uranus).
 *
 * Texture choice is driven by category + the body's color palette.
 * Textures are generated procedurally so no external assets are loaded.
 */

interface PlanetMeshProps {
  body: CelestialBody;
  /** Position in scene units, set by the parent orbit group. */
  position?: [number, number, number];
  /** When true the body is the Sun and emits light. */
  isSun?: boolean;
}

export function PlanetMesh({ body, position = [0, 0, 0], isSun = false }: PlanetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const selectedBodyId = useSpaceAtlas((s) => s.selectedBodyId);
  const hoveredBodyId = useSpaceAtlas((s) => s.hoveredBodyId);
  const selectBody = useSpaceAtlas((s) => s.selectBody);
  const setHovered = useSpaceAtlas((s) => s.setHovered);
  const showLabels = useSpaceAtlas((s) => s.showLabels);
  const isPlaying = useSpaceAtlas((s) => s.isPlaying);
  const timeScale = useSpaceAtlas((s) => s.timeScale);

  const isSelected = selectedBodyId === body.id;
  const isHovered = hoveredBodyId === body.id;

  /* ---------- Procedural texture ---------- */
  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    if (isSun) return makeSunTexture(body.color, "#fff3c0", body.accentColor ?? "#ff5a18");
    if (body.id === "earth") return makeEarthTexture();
    if (body.category === "planet" || body.category === "dwarf-planet" || body.category === "moon") {
      if (["jupiter", "saturn", "uranus", "neptune"].includes(body.id)) {
        return makeGasGiantTexture(body.color, body.accentColor ?? body.color, hashSeed(body.id));
      }
      // Rocky planet / moon
      const polarCap = body.id === "mars" || body.id === "pluto" || body.id === "earth";
      return makeRockyTexture(body.color, body.accentColor ?? "#000000", hashSeed(body.id), 220, polarCap);
    }
    return null;
  }, [body, isSun]);

  /* ---------- Self rotation ---------- */
  useFrame((_, delta) => {
    if (!meshRef.current || !isPlaying || body.renderRotationPeriod === 0) return;
    const omega = (2 * Math.PI) / body.renderRotationPeriod;
    meshRef.current.rotation.y += omega * delta * timeScale;
  });

  /* ---------- Hover / select feedback ---------- */
  const targetScale =
    (isSelected ? 1.15 : 1) * (isHovered && !isSelected ? 1.08 : 1);

  useFrame(() => {
    if (!groupRef.current) return;
    const s = groupRef.current.scale.x;
    const next = s + (targetScale - s) * 0.15;
    groupRef.current.scale.setScalar(next);
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectBody(body.id);
  };
  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(body.id);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(null);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        rotation={[0, 0, THREE.MathUtils.degToRad(body.axialTiltDeg)]}
        userData={{ bodyId: body.id }}
      >
        <sphereGeometry args={[body.renderRadius, 64, 64]} />
        {isSun ? (
          <meshBasicMaterial map={texture ?? undefined} toneMapped={false} />
        ) : (
          <meshStandardMaterial
            map={texture ?? undefined}
            roughness={0.85}
            metalness={0.0}
            emissive={isSelected ? body.color : "#000000"}
            emissiveIntensity={isSelected ? 0.18 : 0}
          />
        )}
      </mesh>

      {/* Selection ring */}
      {isSelected && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[body.renderRadius * 1.45, body.renderRadius * 1.55, 64]} />
          <meshBasicMaterial color={body.color} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Rings */}
      {body.hasRings && (
        <mesh rotation={[Math.PI / 2 - THREE.MathUtils.degToRad(body.axialTiltDeg), 0, 0]}>
          <ringGeometry args={[body.renderRadius * 1.4, body.renderRadius * 2.4, 96]} />
          <meshBasicMaterial
            color={body.accentColor ?? body.color}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Label */}
      {showLabels && (
        <Html
          position={[0, body.renderRadius + 0.4, 0]}
          center
          distanceFactor={20}
          style={{ pointerEvents: "none" }}
          zIndexRange={[10, 0]}
        >
          <div
            className={`px-2 py-0.5 rounded-full text-[11px] font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
              isSelected || isHovered
                ? "bg-white text-black"
                : "bg-black/60 text-white/80 backdrop-blur-sm border border-white/15"
            }`}
          >
            {body.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function hashSeed(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h << 5) - h + id.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h) || 1;
}
