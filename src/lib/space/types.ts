/**
 * Cosmic Atlas — Type Definitions
 * --------------------------------
 * Strongly-typed domain model for celestial objects.
 * All physical values use SI base units unless noted otherwise.
 * Distance fields store both the literal value and the unit so that the
 * UI can render them without losing scientific precision.
 */

export type BodyCategory =
  | "star"
  | "planet"
  | "dwarf-planet"
  | "moon"
  | "asteroid-belt"
  | "kuiper-belt"
  | "oort-cloud"
  | "comet"
  | "nebula"
  | "galaxy"
  | "black-hole"
  | "cosmic-structure";

export type SurfaceType =
  | "rocky"
  | "gas"
  | "ice"
  | "liquid"
  | "plasma"
  | "ringed-gas";

/** A single quantitative fact (value + unit + source citation). */
export interface ScientificMeasure {
  label: string;
  value: string;
  unit: string;
  source?: string;
}

/** Internal layer of a planet / star (crust, mantle, core …). */
export interface InternalLayer {
  name: string;
  thickness: string;
  composition: string;
  temperature?: string;
}

/** Notable exploration mission linked to a body. */
export interface Mission {
  name: string;
  agency: string;
  year: string;
  type: "flyby" | "orbiter" | "lander" | "rover" | "sample-return" | "crewed";
  highlight: string;
}

/** Reference entry pointing back to an authoritative source. */
export interface Reference {
  label: string;
  publisher:
    | "NASA"
    | "ESA"
    | "JPL"
    | "JWST"
    | "Hubble"
    | "IAU"
    | "NOAA"
    | "USGS"
    | "Peer-reviewed";
  url: string;
}

/** A trivia / fun-fact bullet with optional citation. */
export interface FactBullet {
  text: string;
  citation?: string;
}

export interface InfoSection {
  id: string;
  title: string;
  body: string[]; // each item is a paragraph (>=3 sentences per content rules)
  bullets?: FactBullet[];
}

/**
 * Canonical celestial-body record.
 * Visual fields (orbitRadius, renderRadius, color) are NOT scientific —
 * they are tuned for the 3D scene. Scientific measurements live in `data`.
 */
export interface CelestialBody {
  /** Stable slug used for routing & selection. */
  id: string;
  name: string;
  category: BodyCategory;
  /** Short tagline shown beneath the name. */
  tagline: string;
  /** Longer overview paragraph (>= 3 sentences per content-depth rule). */
  overview: string;
  /** Parent body that this object orbits (null for the Sun). */
  parentId: string | null;
  /** Sibling ordering inside the parent (used by the sidebar). */
  order: number;

  /* ---------- Visual / scene tuning (NOT scientific) ---------- */
  /** Distance from parent in scene units. */
  renderOrbitRadius: number;
  /** Body radius in scene units (log-scaled, see data file). */
  renderRadius: number;
  /** Hex colors used for the procedural material + UI accents. */
  color: string;
  /** Secondary / accent color (bands, polar caps …). */
  accentColor?: string;
  /** Orbital period in scene-seconds (used by the animation loop). */
  renderOrbitalPeriod: number;
  /** Rotation period in scene-seconds. */
  renderRotationPeriod: number;
  /** Axial tilt in degrees. */
  axialTiltDeg: number;
  /** Whether this body renders a ring system. */
  hasRings?: boolean;
  /** Whether this body emits light (sun). */
  emissive?: boolean;
  /** Orbital inclination in degrees (for slight 3D offset). */
  orbitalInclination?: number;
  /** Initial orbital phase in radians, so planets don't all start aligned. */
  initialPhase?: number;

  /* ---------- Scientific data ---------- */
  data: {
    physical: ScientificMeasure[];
    orbital: ScientificMeasure[];
    atmosphere: ScientificMeasure[];
    composition: ScientificMeasure[];
  };
  internalStructure?: InternalLayer[];
  missions: Mission[];
  facts: FactBullet[];
  references: Reference[];
  /** Curated long-form sections rendered in the info panel. */
  sections: InfoSection[];
  /** IDs of related bodies to surface as "Explore next". */
  related: string[];
}

export interface BodyCategoryMeta {
  id: BodyCategory;
  label: string;
  description: string;
  icon: string; // lucide icon name
}
