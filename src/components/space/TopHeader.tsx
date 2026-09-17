"use client";

import { Sparkles, X } from "lucide-react";
import { useSpaceAtlas } from "@/lib/space/store";
import { findBody } from "@/data/space";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Top header — fixed brand mark + current selection chip.
 *
 * On mobile, the hamburger menu (in NavigationSidebar) sits to the left
 * of this header; on desktop the sidebar is permanent, so the header
 * is offset by the sidebar width.
 */

export function TopHeader() {
  const selectedBodyId = useSpaceAtlas((s) => s.selectedBodyId);
  const selectBody = useSpaceAtlas((s) => s.selectBody);
  const body = selectedBodyId ? findBody(selectedBodyId) : undefined;

  return (
    <header className="lg:pl-[320px] fixed top-0 left-0 right-0 z-20 pointer-events-none">
      <div className="flex items-center justify-between px-3 sm:px-5 py-3">
        {/* Brand — hidden on mobile to make room for the menu button */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-white leading-tight">
              Cosmic Atlas
            </h1>
            <p className="text-[10px] text-slate-400 leading-tight">
              Interactive 3D Space Explorer
            </p>
          </div>
        </div>

        {/* Selection chip */}
        {body && (
          <div className="ml-auto pointer-events-auto">
            <div className="flex items-center gap-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 pl-3 pr-1 py-1 shadow-lg">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full ring-1 ring-white/30"
                style={{ backgroundColor: body.color }}
              />
              <span className="text-xs text-slate-300 hidden sm:inline">Viewing:</span>
              <span className="text-xs font-medium text-white">{body.name}</span>
              <Badge
                variant="outline"
                className="text-[9px] py-0 px-1.5 h-4 border-cyan-500/40 text-cyan-300 capitalize"
              >
                {body.category.replace("-", " ")}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-slate-400 hover:text-white hover:bg-white/10"
                onClick={() => selectBody(null)}
                aria-label="Exit body view"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
