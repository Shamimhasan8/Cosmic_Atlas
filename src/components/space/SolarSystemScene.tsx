"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";

import { useSpaceAtlas } from "@/lib/space/store";
import {
  SUN, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO,
  ASTEROID_BELT, KUIPER_BELT, OORT_CLOUD, HALLEYS_COMET,
} from "@/data/space";

import { Sun } from "./Sun";
import { PlanetMesh } from "./PlanetMesh";
import { OrbitGroup, EarthOrbitWithMoon } from "./OrbitGroup";
import { Starfield } from "./Starfield";
import { CameraController } from "./CameraController";
import { AsteroidBelt } from "./AsteroidBelt";

/**
 * The Solar System scene.
 *
 * Composition:
 *   - <Starfield/>       : three-layer parallax star background
 *   - <Sun/>             : central star with corona + point light
 *   - <OrbitGroup/> ×8   : one per planet (Mercury → Neptune)
 *   - <EarthOrbitWithMoon/> : Earth + nested Moon orbit
 *   - <AsteroidBelt/>    : instanced ring of rocks between Mars and Jupiter
 *   - <KuiperBelt/>      : instanced ring of icy debris beyond Neptune
 *   - <CameraController/>: orbit/zoom controls + focus-on-selection
 *
 * All bodies read their state (paused, time-scale, show orbits/labels)
 * from the global Zustand store.
 */

export function SolarSystemScene() {
  const showOrbits = useSpaceAtlas((s) => s.showOrbits);

  return (
    <Canvas
      camera={{ position: [0, 35, 70], fov: 50, near: 0.1, far: 5000 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onPointerMissed={() => {
        // Clicking empty space deselects the current body.
        useSpaceAtlas.getState().selectBody(null);
      }}
      onCreated={({ scene }) => {
        scene.background = new THREE.Color("#04060f");
        scene.fog = new THREE.FogExp2("#04060f", 0.0028);
      }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Starfield />

        {/* Central star */}
        <Sun body={SUN} />

        {/* Inner planets */}
        <OrbitGroup body={MERCURY} showOrbit={showOrbits} />
        <OrbitGroup body={VENUS} showOrbit={showOrbits} />
        <EarthOrbitWithMoon earth={EARTH} />
        <OrbitGroup body={MARS} showOrbit={showOrbits} />

        {/* Asteroid belt between Mars and Jupiter */}
        <AsteroidBelt count={900} innerRadius={19} outerRadius={21} size={0.05} />

        {/* Outer planets */}
        <OrbitGroup body={JUPITER} showOrbit={showOrbits} />
        <OrbitGroup body={SATURN} showOrbit={showOrbits} />
        <OrbitGroup body={URANUS} showOrbit={showOrbits} />
        <OrbitGroup body={NEPTUNE} showOrbit={showOrbits} />

        {/* Pluto and beyond */}
        <OrbitGroup body={PLUTO} showOrbit={showOrbits} />
        <OrbitGroup body={HALLEYS_COMET} showOrbit={showOrbits} />

        {/* Distant belts (visual only — not navigable meshes) */}
        <AsteroidBelt
          count={800}
          innerRadius={66}
          outerRadius={74}
          color="#7a8aa8"
          size={0.04}
          verticalSpread={1.2}
        />

        <CameraController />
      </Suspense>
    </Canvas>
  );
}

/* Helper used elsewhere — Kuiper / Oort references kept for future expansion. */
export const DISTANT_BODIES = { KUIPER_BELT, OORT_CLOUD, ASTEROID_BELT };
