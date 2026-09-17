"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { CelestialBody } from "@/lib/space/types";
import { useSpaceAtlas } from "@/lib/space/store";
import { findBody } from "@/data/space";
import { PlanetMesh } from "./PlanetMesh";

/**
 * Orbital group — rotates a child body around the Y axis at a fixed
 * radius. The body itself is rendered as a child <PlanetMesh/>.
 *
 * The orbital plane is the XZ plane (Y up). Orbital inclination is
 * applied to the parent group so that each orbit can be tilted out
 * of the ecliptic by a few degrees (matching reality).
 *
 * To nest a moon inside a planet's orbit, pass a custom `child` that
 * contains both the planet mesh AND a nested <OrbitGroup> for the moon.
 */

interface OrbitGroupProps {
  body: CelestialBody;
  /** When true the orbit ring is rendered as a faint line. */
  showOrbit: boolean;
  /** Custom content to render at the orbital position. Defaults to a
   *  <PlanetMesh> for this body. */
  child?: React.ReactNode;
}

export function OrbitGroup({ body, showOrbit, child }: OrbitGroupProps) {
  const pivotRef = useRef<THREE.Group>(null);
  const isPlaying = useSpaceAtlas((s) => s.isPlaying);
  const timeScale = useSpaceAtlas((s) => s.timeScale);

  /* ---------- Orbit path (visual ring) ---------- */
  const orbitObject = useMemo(() => {
    const segments = 192;
    const points: THREE.Vector3[] = [];
    const r = body.renderOrbitRadius;
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: body.color,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });
    return new THREE.Line(geo, mat);
  }, [body.renderOrbitRadius, body.color]);

  /* ---------- Orbit motion ---------- */
  useFrame((_, delta) => {
    if (!pivotRef.current || !isPlaying || body.renderOrbitalPeriod === 0) return;
    const omega = (2 * Math.PI) / body.renderOrbitalPeriod;
    pivotRef.current.rotation.y += omega * delta * timeScale;
  });

  const inclination = THREE.MathUtils.degToRad(body.orbitalInclination ?? 0);

  return (
    <group rotation={[inclination, 0, 0]}>
      {showOrbit && <primitive object={orbitObject} />}

      <group ref={pivotRef} rotation={[0, body.initialPhase ?? 0, 0]}>
        <group position={[body.renderOrbitRadius, 0, 0]}>
          {child ?? <PlanetMesh body={body} />}
        </group>
      </group>
    </group>
  );
}

/**
 * Earth + Moon system. Earth orbits the Sun; the Moon orbits Earth
 * (nested). The Moon's orbit group is rendered as a sibling of
 * Earth's mesh, so Earth's self-rotation doesn't drag the Moon along.
 */
export function EarthOrbitWithMoon({ earth }: { earth: CelestialBody }) {
  const moon = findBody("moon");
  if (!moon) return <OrbitGroup body={earth} showOrbit={true} />;
  return (
    <OrbitGroup body={earth} showOrbit={true}>
      <PlanetMesh body={earth} />
      <OrbitGroup body={moon} showOrbit={false} />
    </OrbitGroup>
  );
}
