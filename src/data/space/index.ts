import type { CelestialBody } from "@/lib/space/types";
import {
  SUN, MERCURY, VENUS, EARTH, MOON, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO,
} from "./bodies-solar";
import {
  ASTEROID_BELT, KUIPER_BELT, OORT_CLOUD, HALLEYS_COMET,
  SAGITTARIUS_A, MILKY_WAY, ANDROMEDA,
} from "./bodies-deep";

/* Re-export individual body records so consumers can import them by name. */
export {
  SUN, MERCURY, VENUS, EARTH, MOON, MARS, JUPITER, SATURN, URANUS, NEPTUNE, PLUTO,
  ASTEROID_BELT, KUIPER_BELT, OORT_CLOUD, HALLEYS_COMET,
  SAGITTARIUS_A, MILKY_WAY, ANDROMEDA,
};
export { BODY_CATEGORIES } from "./bodies-solar";

/**
 * Master list of all celestial bodies in the atlas, in canonical
 * display order. Order matters: it drives the sidebar listing.
 */
export const ALL_BODIES: CelestialBody[] = [
  SUN,
  MERCURY,
  VENUS,
  EARTH,
  MOON,
  MARS,
  ASTEROID_BELT,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
  KUIPER_BELT,
  PLUTO,
  OORT_CLOUD,
  HALLEYS_COMET,
  SAGITTARIUS_A,
  MILKY_WAY,
  ANDROMEDA,
];

/** Quick id → body lookup. */
export const BODY_MAP: Record<string, CelestialBody> = Object.fromEntries(
  ALL_BODIES.map((b) => [b.id, b]),
);

/** Bodies that are rendered as 3D meshes orbiting in the solar-system scene. */
export const ORBITAL_BODIES: CelestialBody[] = ALL_BODIES.filter(
  (b) => b.parentId === "sun" && b.renderOrbitRadius > 0,
);

/** The Sun and anything else that sits at the scene origin. */
export const CENTRAL_BODIES: CelestialBody[] = ALL_BODIES.filter(
  (b) => b.parentId === null && b.id === "sun",
);

/** Moons orbit a planet rather than the Sun directly. */
export const MOONS: CelestialBody[] = ALL_BODIES.filter(
  (b) => b.category === "moon",
);

/** Bodies that exist in 3D space but do not orbit a single parent (galaxies, etc.). */
export const DEEP_SKY: CelestialBody[] = ALL_BODIES.filter(
  (b) => b.parentId === null && b.id !== "sun",
);

/** Get a body by id, throwing if missing (used for routing). */
export function getBody(id: string): CelestialBody {
  const body = BODY_MAP[id];
  if (!body) throw new Error(`Unknown celestial body: ${id}`);
  return body;
}

/** Get a body by id without throwing. */
export function findBody(id: string): CelestialBody | undefined {
  return BODY_MAP[id];
}
