"use client";

import dynamic from "next/dynamic";
import { NavigationSidebar } from "./NavigationSidebar";
import { TopHeader } from "./TopHeader";
import { InfoPanel } from "./InfoPanel";
import { SceneToolbar } from "./SceneToolbar";
import { IntroOverlay } from "./IntroOverlay";
import { ScaleLegend } from "./ScaleLegend";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

/**
 * The 3D Canvas is loaded with dynamic import + ssr:false because
 * react-three-fiber needs the browser's WebGL context. Server-rendering
 * the Canvas would either crash or produce a hydration mismatch.
 */
const SolarSystemScene = dynamic(
  () => import("./SolarSystemScene").then((m) => m.SolarSystemScene),
  {
    ssr: false,
    loading: () => <SceneLoading />,
  },
);

/**
 * Cosmic Atlas — root application shell.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │ [Sidebar]    [3D Canvas — full bleed]                       │
 *   │  320px       ┌────────────────────────────────────────┐     │
 *   │  search      │  TopHeader (selection chip)            │     │
 *   │  body list   │                                        │     │
 *   │  …           │  Starfield + Sun + Planets             │     │
 *   │              │                                        │     │
 *   │              │            [Toolbar]   [ScaleLegend]   │     │
 *   │              └────────────────────────────────────────┘     │
 *   │                                              [InfoPanel →]  │
 *   └─────────────────────────────────────────────────────────────┘
 */
export function CosmicAtlas() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#04060f] text-white">
      {/* 3D scene — wrapped in error boundary so WebGL failures don't
          crash the whole app. The sidebar + info panel still work
          even if the 3D scene is unavailable. */}
      <div className="absolute inset-0">
        <SceneErrorBoundary>
          <SolarSystemScene />
        </SceneErrorBoundary>
      </div>

      {/* UI overlays */}
      <NavigationSidebar />
      <TopHeader />
      <SceneToolbar />
      <ScaleLegend />
      <InfoPanel />
      <IntroOverlay />
    </div>
  );
}

function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#04060f]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/15" />
          <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white">Initializing the Universe</p>
          <p className="text-[11px] text-slate-400">Loading 3D scene &amp; procedural textures…</p>
        </div>
      </div>
    </div>
  );
}
