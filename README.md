# Cosmic Atlas

> An interactive 3D space explorer inspired by the interaction model of
> [thebuggeddev/anatomy](https://github.com/thebuggeddev/anatomy), reimagined
> for the Solar System, deep-sky objects, and the larger universe.

[**Live Demo →**](https://cosmic-atlas-theta.vercel.app/)

Click any planet, moon, star, or galaxy to dive into a scientifically
accurate profile — physical data, internal structure, exploration
missions, and citations back to NASA, ESA, JPL, the IAU, Hubble, JWST,
and peer-reviewed publications.

## Features

- **Interactive 3D Solar System** — Sun + 8 planets + Moon + Pluto +
  Halley's Comet, all orbiting in real time.
- **Click-to-inspect** — select any body to fly the camera to it and
  open a structured scientific profile.
- **8 tabs of data per body** — Overview · Physical · Orbital ·
  Composition · Structure · Missions · Facts · References.
- **Procedural textures** — every planet's surface is generated at
  runtime via `<canvas>`, no image assets required.
- **3-layer parallax starfield** + emissive Sun with corona.
- **Asteroid Belt + Kuiper Belt** rendered as InstancedMesh (2000 rocks
  in two draw calls).
- **Search + categorized sidebar** — find any body by name or browse
  by category (Stars · Planets · Dwarf Planets · Moons · Belts ·
  Comets · Black Holes · Galaxies).
- **Time controls** — pause, scrub speed (0.1×–5×), toggle orbit paths
  and labels.
- **Responsive** — works on mobile (sidebar collapses, panel becomes
  a bottom sheet) and desktop.
- **Scientifically accurate** — every number carries a source
  attribution; every claim cites a real publication.

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** + **shadcn/ui** (New York)
- **Three.js 0.185** + **@react-three/fiber 9** + **@react-three/drei 10**
- **Zustand** for client state
- **Framer Motion** for transitions
- **Lucide** icons

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for the full
technical design document — folder structure, rendering pipeline,
camera system, state management, performance budget, accessibility,
testing strategy, and engineering trade-offs.

## Data sources

Every scientific measurement in this atlas is sourced from one of:

| Publisher | Used for |
|---|---|
| NASA Planetary Fact Sheets | Physical, orbital, atmospheric data |
| NASA Science mission pages | Mission highlights, latest discoveries |
| ESA (Gaia, Solar Orbiter, BepiColombo) | Galactic data, solar observations |
| JPL (Horizons, New Horizons, Perseverance) | Ephemerides, mission data |
| IAU | Planetary/dwarf-planet definitions |
| Hubble / JWST | Deep-sky imagery references |
| Event Horizon Telescope | Sagittarius A* imaging |
| USGS / NOAA | Earth water science, magnetic field |
| Peer-reviewed publications | Black hole physics, cosmology |

If a fact is uncertain or under active scientific debate, the body's
`overview` or `sections[]` explicitly says so.

## Project structure

```
src/
  app/                    Next.js App Router
  components/space/       All 3D + UI components (15 files)
  data/space/             Celestial body database (3 files, ~1500 lines)
  lib/space/              Types + Zustand store
docs/
  ARCHITECTURE.md         Full technical design document
```

## License

MIT — see [`LICENSE`](./LICENSE).

## Acknowledgements

- The interaction model (click-to-inspect with a right-hand info panel)
  is inspired by [`thebuggeddev/anatomy`](https://github.com/thebuggeddev/anatomy).
- All scientific data is sourced from public NASA / ESA / JPL / IAU /
  Hubble / JWST publications. See `references[]` on each body record
  for the citation trail.
- Procedural texture approach inspired by NASA's Eyes on the Solar
  System.
