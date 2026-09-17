"use client";

import { create } from "zustand";

/**
 * Cosmic Atlas — Global UI/Scene State
 * ------------------------------------
 * Zustand store. Single source of truth for which body is selected,
 * whether the simulation is paused, the time-scale of orbital motion,
 * and which view mode (Solar System vs. Deep Sky) the user is in.
 *
 * Camera focus is owned by the 3D scene (R3F), not by this store — the
 * store just signals intent (focus on body X) and the scene reacts.
 */

export type ViewMode = "solar" | "deep-sky";

interface SpaceAtlasState {
  /** Currently focused body id (null = free-look). */
  selectedBodyId: string | null;
  /** Body being hovered in the sidebar or 3D scene (for highlights). */
  hoveredBodyId: string | null;
  /** Whether the orbital simulation is animating. */
  isPlaying: boolean;
  /** Time multiplier for the orbital animation. */
  timeScale: number;
  /** Whether the orbit path rings are visible. */
  showOrbits: boolean;
  /** Whether object labels are visible in 3D. */
  showLabels: boolean;
  /** Whether the info panel is open (mobile-collapsible). */
  panelOpen: boolean;
  /** Whether the sidebar is open on mobile. */
  sidebarOpen: boolean;
  /** Current view mode. */
  viewMode: ViewMode;
  /** Whether the intro overlay has been dismissed. */
  introDismissed: boolean;

  /* Actions */
  selectBody: (id: string | null) => void;
  setHovered: (id: string | null) => void;
  togglePlay: () => void;
  setTimeScale: (scale: number) => void;
  toggleOrbits: () => void;
  toggleLabels: () => void;
  setPanelOpen: (open: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  dismissIntro: () => void;
}

export const useSpaceAtlas = create<SpaceAtlasState>((set) => ({
  selectedBodyId: null,
  hoveredBodyId: null,
  isPlaying: true,
  timeScale: 1,
  showOrbits: true,
  showLabels: true,
  panelOpen: false,
  sidebarOpen: false,
  viewMode: "solar",
  introDismissed: false,

  selectBody: (id) =>
    set({ selectedBodyId: id, panelOpen: id !== null, sidebarOpen: false }),
  setHovered: (id) => set({ hoveredBodyId: id }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setTimeScale: (scale) => set({ timeScale: scale }),
  toggleOrbits: () => set((s) => ({ showOrbits: !s.showOrbits })),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  setPanelOpen: (open) => set({ panelOpen: open }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setViewMode: (mode) => set({ viewMode: mode }),
  dismissIntro: () => set({ introDismissed: true }),
}));
