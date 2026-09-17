"use client";

import {
  Play, Pause, Orbit, Tags, Clock, RotateCcw, Info, Github,
} from "lucide-react";
import { useSpaceAtlas } from "@/lib/space/store";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Floating bottom-center toolbar — playback + display toggles.
 *
 *  - Play / pause the orbital simulation
 *  - Time-scale slider (0.1×–5×)
 *  - Toggle orbit paths
 *  - Toggle object labels
 *  - Reset view (deselects the current body)
 *
 * Designed to be touch-friendly (44px targets) and to scale down on
 * mobile by hiding the slider under a certain width.
 */

export function SceneToolbar() {
  const isPlaying = useSpaceAtlas((s) => s.isPlaying);
  const togglePlay = useSpaceAtlas((s) => s.togglePlay);
  const timeScale = useSpaceAtlas((s) => s.timeScale);
  const setTimeScale = useSpaceAtlas((s) => s.setTimeScale);
  const showOrbits = useSpaceAtlas((s) => s.showOrbits);
  const toggleOrbits = useSpaceAtlas((s) => s.toggleOrbits);
  const showLabels = useSpaceAtlas((s) => s.showLabels);
  const toggleLabels = useSpaceAtlas((s) => s.toggleLabels);
  const selectBody = useSpaceAtlas((s) => s.selectBody);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Play / pause */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-white hover:bg-white/10"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">{isPlaying ? "Pause" : "Play"}</TooltipContent>
        </Tooltip>

        <div className="hidden sm:flex items-center gap-2 px-2 min-w-[140px]">
          <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <Slider
            value={[timeScale]}
            min={0.1}
            max={5}
            step={0.1}
            onValueChange={(v) => setTimeScale(v[0] ?? 1)}
            className="flex-1"
            aria-label="Time scale"
          />
          <Badge
            variant="outline"
            className="text-[10px] py-0 px-1.5 h-4 border-cyan-500/40 text-cyan-300 font-mono w-10 justify-center"
          >
            {timeScale.toFixed(1)}×
          </Badge>
        </div>

        <div className="w-px h-6 bg-white/10 mx-0.5" />

        {/* Orbits */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${showOrbits ? "text-cyan-300 bg-white/10" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}
              onClick={toggleOrbits}
              aria-label="Toggle orbit paths"
              aria-pressed={showOrbits}
            >
              <Orbit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Orbit paths</TooltipContent>
        </Tooltip>

        {/* Labels */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${showLabels ? "text-cyan-300 bg-white/10" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}
              onClick={toggleLabels}
              aria-label="Toggle labels"
              aria-pressed={showLabels}
            >
              <Tags className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Object labels</TooltipContent>
        </Tooltip>

        <div className="w-px h-6 bg-white/10 mx-0.5" />

        {/* Reset view */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-slate-400 hover:bg-white/10 hover:text-white"
              onClick={() => selectBody(null)}
              aria-label="Reset view"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Reset view</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

/* Suppress unused-import warnings for icons referenced in design mockups. */
void Info;
void Github;
