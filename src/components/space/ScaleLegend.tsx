"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Small disclosure that the scene is NOT to scale.
 *
 * Real Solar System distances are so vast relative to planet sizes
 * that rendering them at true scale would make every planet invisible.
 * We compress distances logarithmically and slightly exaggerate planet
 * sizes — which is standard practice in astronomy education tools
 * (NASA's own Eyes on the Solar System does the same).
 */

export function ScaleLegend() {
  return (
    <div className="hidden lg:flex absolute bottom-3 left-3 z-30 items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-300">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="flex items-center gap-1.5 text-[11px] cursor-help"
              aria-label="Scale information"
            >
              <Info className="h-3 w-3 text-cyan-400" />
              <span>Distances &amp; sizes not to scale</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[240px] text-xs">
            Real distances would make planets invisible at this view. We compress
            orbits logarithmically and slightly enlarge planet sizes — the same
            approach used by NASA&apos;s Eyes on the Solar System.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
